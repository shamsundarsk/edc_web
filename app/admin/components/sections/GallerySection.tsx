'use client';

import { useState } from 'react';
import { Plus, Image, Trash2, GripVertical, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ApiService } from '../../services/api.service';
import type { GalleryItem } from '../../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
  onAdd: (item: Partial<GalleryItem>) => Promise<boolean>;
  onUpdate: (id: string, item: Partial<GalleryItem>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReorder: (items: GalleryItem[]) => Promise<boolean>;
  loading: boolean;
}

interface PendingImage {
  file: File;
  preview: string;
  caption: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  error?: string;
}

export function GallerySection({ gallery, onAdd, onUpdate, onDelete, onReorder, loading }: GallerySectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Get uploaded images from pending images
    const uploadedImages = pendingImages
      .filter(img => img.uploaded && img.url)
      .map(img => ({
        url: img.url!,
        caption: img.caption || undefined,
      }));

    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const itemData: Partial<GalleryItem> = {
      title: formData.get('title') as string || undefined,
      images: uploadedImages,
      mainCaption: formData.get('mainCaption') as string || undefined,
    };

    let success = false;
    if (editingItem) {
      success = await onUpdate(editingItem.id, itemData);
    } else {
      success = await onAdd(itemData);
    }

    if (success) {
      setShowForm(false);
      setEditingItem(null);
      setPendingImages([]);
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPendingImages: PendingImage[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: '',
      uploading: false,
      uploaded: false,
    }));

    setPendingImages(prev => [...prev, ...newPendingImages]);
  };

  const updatePendingImageCaption = (index: number, caption: string) => {
    setPendingImages(prev => prev.map((img, i) => 
      i === index ? { ...img, caption } : img
    ));
  };

  const removePendingImage = (index: number) => {
    setPendingImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return updated;
    });
  };

  const uploadPendingImage = async (index: number) => {
    const pendingImage = pendingImages[index];
    if (pendingImage.uploaded || pendingImage.uploading) return;

    setPendingImages(prev => prev.map((img, i) => 
      i === index ? { ...img, uploading: true, error: undefined } : img
    ));

    try {
      const imageUrl = await ApiService.uploadImage(pendingImage.file);
      
      if (imageUrl) {
        setPendingImages(prev => prev.map((img, i) => 
          i === index ? { ...img, uploading: false, uploaded: true, url: imageUrl } : img
        ));
      } else {
        setPendingImages(prev => prev.map((img, i) => 
          i === index ? { ...img, uploading: false, error: 'Upload failed' } : img
        ));
      }
    } catch (error) {
      setPendingImages(prev => prev.map((img, i) => 
        i === index ? { ...img, uploading: false, error: 'Upload error' } : img
      ));
    }
  };

  const uploadAllPendingImages = async () => {
    setUploading(true);
    
    for (let i = 0; i < pendingImages.length; i++) {
      if (!pendingImages[i].uploaded) {
        await uploadPendingImage(i);
      }
    }
    
    setUploading(false);
  };

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setShowForm(true);
    
    // Convert existing images to pending images for editing
    // Handle both old and new data formats
    let existingImages: PendingImage[] = [];
    
    if (item.images && Array.isArray(item.images)) {
      // New format
      existingImages = item.images.map(img => ({
        file: null as any,
        preview: img.url,
        caption: img.caption || '',
        uploading: false,
        uploaded: true,
        url: img.url,
      }));
    } else if ((item as any).imageUrl) {
      // Old format - convert to new format
      existingImages = [{
        file: null as any,
        preview: (item as any).imageUrl,
        caption: (item as any).caption || '',
        uploading: false,
        uploaded: true,
        url: (item as any).imageUrl,
      }];
    }
    
    setPendingImages(existingImages);
    
    // Pre-fill form
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        (form.querySelector('input[name="title"]') as HTMLInputElement).value = item.title || (item as any).caption || '';
        (form.querySelector('input[name="mainCaption"]') as HTMLInputElement).value = item.mainCaption || (item as any).caption || '';
      }
    }, 100);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    // Clean up object URLs
    pendingImages.forEach(img => {
      if (img.preview.startsWith('blob:')) {
        URL.revokeObjectURL(img.preview);
      }
    });
    setPendingImages([]);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: GalleryItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedItem) return;

    const dragIndex = gallery.findIndex(item => item.id === draggedItem.id);
    if (dragIndex === dropIndex) return;

    // Create new array with reordered items
    const newGallery = [...gallery];
    const [removed] = newGallery.splice(dragIndex, 1);
    newGallery.splice(dropIndex, 0, removed);

    // Update the order immediately for better UX
    await onReorder(newGallery);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-light text-charcoal">Gallery</h2>
          <p className="text-charcoal-light/60 font-sans text-sm mt-1">
            Create gallery items with multiple images (carousels)
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
            setPendingImages([]);
          }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Gallery Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-charcoal/10 p-8">
          <h3 className="text-xl font-display font-light text-charcoal mb-6">
            {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                  Title (Optional)
                </label>
                <input
                  name="title"
                  type="text"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                  placeholder="Event name or title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                  Main Caption (Optional)
                </label>
                <input
                  name="mainCaption"
                  type="text"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                  placeholder="Overall description..."
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                Images *
              </label>
              <div className="border-2 border-dashed border-charcoal/20 rounded-xl p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-charcoal/40" />
                  <span className="text-charcoal-light font-sans">
                    Click to select multiple images
                  </span>
                  <span className="text-xs text-charcoal-light/60 font-sans">
                    You can select multiple images at once
                  </span>
                </label>
              </div>
            </div>

            {/* Pending Images Preview */}
            {pendingImages.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-display font-light text-charcoal">
                    Images ({pendingImages.length})
                  </h4>
                  <button
                    type="button"
                    onClick={uploadAllPendingImages}
                    disabled={uploading || pendingImages.every(img => img.uploaded)}
                    className="bg-secondary text-charcoal px-4 py-2 rounded-xl font-medium font-sans hover:bg-secondary/80 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload All'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingImages.map((pendingImage, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl overflow-hidden ${
                        pendingImage.uploaded 
                          ? 'border-green-200 bg-green-50' 
                          : pendingImage.error 
                          ? 'border-red-200 bg-red-50'
                          : 'border-charcoal/20'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={pendingImage.preview}
                          alt="Preview"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePendingImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                          disabled={pendingImage.uploading}
                        >
                          <X className="w-3 h-3" />
                        </button>
                        
                        {pendingImage.uploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          </div>
                        )}
                        
                        {pendingImage.uploaded && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white p-1 rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <input
                          type="text"
                          placeholder="Image caption (optional)"
                          value={pendingImage.caption}
                          onChange={(e) => updatePendingImageCaption(index, e.target.value)}
                          className="w-full px-3 py-2 border border-charcoal/20 rounded-lg text-sm font-sans focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={pendingImage.uploading}
                        />
                        
                        {pendingImage.error && (
                          <p className="text-red-500 text-xs mt-1 font-sans">
                            {pendingImage.error}
                          </p>
                        )}
                        
                        {!pendingImage.uploaded && !pendingImage.uploading && (
                          <button
                            type="button"
                            onClick={() => uploadPendingImage(index)}
                            className="w-full mt-2 bg-primary text-white px-3 py-1 rounded text-xs font-sans hover:bg-primary/90 transition-colors"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || pendingImages.length === 0 || !pendingImages.every(img => img.uploaded)}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {editingItem ? 'Update Gallery Item' : 'Add Gallery Item'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="bg-charcoal/10 text-charcoal px-8 py-3 rounded-2xl font-medium font-sans hover:bg-charcoal/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Items List */}
      <div className="space-y-4">
        {gallery.length === 0 ? (
          <div className="bg-white rounded-3xl border border-charcoal/10 p-12 text-center">
            <Image className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
            <p className="text-charcoal-light/60 font-sans">No gallery items yet. Add your first gallery item!</p>
          </div>
        ) : (
          gallery.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-white rounded-3xl border transition-all duration-200 p-6 hover:shadow-lg ${
                draggedItem?.id === item.id 
                  ? 'opacity-50 scale-95 border-primary/50' 
                  : dragOverIndex === index 
                  ? 'border-primary shadow-lg scale-102' 
                  : 'border-charcoal/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <GripVertical className="w-4 h-4 text-charcoal/40 cursor-move hover:text-primary transition-colors" />
                    <h3 className="text-lg font-display font-medium text-charcoal">
                      {item.title || 'Gallery Item'}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-sans">
                      {(item.images || []).length} image{(item.images || []).length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  {item.mainCaption && (
                    <p className="text-charcoal-light/80 font-sans text-sm mb-3">
                      {item.mainCaption}
                    </p>
                  )}
                  
                  {/* Image Preview Carousel */}
                  <div className="flex gap-2 mb-3">
                    {(item.images || []).slice(0, 4).map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img.url}
                        alt={img.caption || `Image ${imgIndex + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-charcoal/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                        }}
                      />
                    ))}
                    {(item.images || []).length > 4 && (
                      <div className="w-16 h-16 bg-charcoal/10 rounded-lg flex items-center justify-center text-xs text-charcoal-light font-sans">
                        +{(item.images || []).length - 4}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-charcoal-light hover:text-primary transition-colors p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}