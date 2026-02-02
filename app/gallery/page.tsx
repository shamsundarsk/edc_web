'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

interface GalleryItem {
  id: string;
  title?: string;
  images: {
    url: string;
    caption?: string;
  }[];
  mainCaption?: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        // Handle both old and new data formats
        const items = (data.items || []).map((item: any) => {
          if (item.imageUrl) {
            // Convert old format to new format
            return {
              id: item.id,
              title: item.caption,
              images: [{ url: item.imageUrl, caption: item.caption }],
              mainCaption: item.caption,
            };
          }
          return item;
        });
        setGallery(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gallery:', error);
        setLoading(false);
      });
  }, []);

  const openModal = (itemIndex: number, imageIndex: number = 0) => {
    setSelectedItem(itemIndex);
    setSelectedImageIndex(imageIndex);
    setImageLoading(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setSelectedImageIndex(0);
    setImageLoading(false);
  };

  const nextImage = () => {
    if (selectedItem !== null) {
      const currentItem = gallery[selectedItem];
      if (selectedImageIndex < currentItem.images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
        setImageLoading(true);
      }
    }
  };

  const prevImage = () => {
    if (selectedItem !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
      setImageLoading(true);
    }
  };

  const nextItem = () => {
    if (selectedItem !== null && selectedItem < gallery.length - 1) {
      setSelectedItem(selectedItem + 1);
      setSelectedImageIndex(0);
      setImageLoading(true);
    }
  };

  const prevItem = () => {
    if (selectedItem !== null && selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
      setSelectedImageIndex(0);
      setImageLoading(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItem === null) return;
    
    switch (e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowUp':
        e.preventDefault();
        prevItem();
        break;
      case 'ArrowDown':
        e.preventDefault();
        nextItem();
        break;
    }
  };

  useEffect(() => {
    if (selectedItem !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, selectedImageIndex]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      <main className="flex flex-col items-center w-full px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-24">
          <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-foreground/10 pb-12">
            <div className="title-gradient">
              <h1 className="text-foreground text-[12vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none">
                Moments<span className="text-primary">.</span>
              </h1>
            </div>
            <p className="text-foreground/60 text-base md:text-lg max-w-sm text-right md:mb-4 leading-relaxed font-light font-sans">
              A visual archive of innovation, connection, and the silent ambition that drives us forward.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 w-full">
            {loading ? (
              // Loading skeleton
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`group relative flex flex-col gap-4 animate-pulse ${
                    i % 3 === 2 ? 'md:mt-24' : i % 3 === 0 ? 'lg:mt-32' : ''
                  }`}
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-foreground/10 rounded-2xl"></div>
                  <div className="flex justify-between items-baseline pt-2">
                    <div className="h-3 bg-foreground/10 rounded w-8"></div>
                    <div className="h-4 bg-foreground/10 rounded w-20"></div>
                  </div>
                </div>
              ))
            ) : gallery.length > 0 ? (
              gallery.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative flex flex-col gap-4 cursor-pointer opacity-0 animate-fade-in-up ${
                    index % 3 === 1 ? 'md:mt-24' : index % 3 === 2 ? 'lg:mt-32' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openModal(index, 0)}
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-gray-200 rounded-2xl">
                    <img
                      src={item.images[0]?.url}
                      alt={item.title || item.mainCaption || 'Gallery image'}
                      className="w-full h-full object-cover grayscale transition-all duration-700 ease-out opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm rounded-2xl">
                      <div className="text-center">
                        <span className="text-primary text-xl md:text-2xl font-light italic tracking-wide font-display block">
                          View
                        </span>
                        {item.images.length > 1 && (
                          <span className="text-charcoal text-sm font-sans mt-1 block">
                            {item.images.length} photos
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Multiple images indicator */}
                    {item.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-sans">
                        {item.images.length}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-transparent group-hover:border-primary/20 transition-colors duration-500">
                    <span className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-sans">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium font-sans text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                      {item.title || item.mainCaption || 'Gallery'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Empty state
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <svg className="w-16 h-16 text-foreground/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-foreground/40 font-sans">No gallery items yet.</p>
              </div>
            )}
          </div>
        </div>

        <div aria-hidden="true" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-b from-rose-50/20 to-transparent blur-[150px] -z-10 rounded-full pointer-events-none"></div>
      </main>

      {/* Image Modal */}
      {selectedItem !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons - Images within current item */}
          {gallery[selectedItem].images.length > 1 && (
            <>
              {selectedImageIndex > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {selectedImageIndex < gallery[selectedItem].images.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </>
          )}

          {/* Gallery Item Navigation */}
          {selectedItem > 0 && (
            <button
              onClick={prevItem}
              className="absolute left-6 top-6 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
              title="Previous gallery item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </button>
          )}

          {selectedItem < gallery.length - 1 && (
            <button
              onClick={nextItem}
              className="absolute right-6 top-6 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
              title="Next gallery item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
            
            <img
              src={gallery[selectedItem]?.images[selectedImageIndex]?.url}
              alt={gallery[selectedItem]?.images[selectedImageIndex]?.caption || gallery[selectedItem]?.title || 'Gallery image'}
              className="max-w-full max-h-full object-contain rounded-lg"
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                setImageLoading(false);
              }}
            />

            {/* Image Caption */}
            {(gallery[selectedItem]?.images[selectedImageIndex]?.caption || gallery[selectedItem]?.mainCaption) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-center font-sans text-lg">
                  {gallery[selectedItem].images[selectedImageIndex]?.caption || gallery[selectedItem].mainCaption}
                </p>
              </div>
            )}

            {/* Counters */}
            <div className="absolute top-4 left-4 space-y-2">
              {/* Gallery Item Counter */}
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-sans">
                Item {selectedItem + 1} / {gallery.length}
              </div>
              
              {/* Image Counter (if multiple images) */}
              {gallery[selectedItem].images.length > 1 && (
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-sans">
                  Photo {selectedImageIndex + 1} / {gallery[selectedItem].images.length}
                </div>
              )}
            </div>

            {/* Gallery Item Title */}
            {gallery[selectedItem]?.title && (
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-sans max-w-xs truncate">
                {gallery[selectedItem].title}
              </div>
            )}

            {/* Image Thumbnails (if multiple images) */}
            {gallery[selectedItem].images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-full">
                {gallery[selectedItem].images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setImageLoading(true);
                    }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex 
                        ? 'border-primary scale-110' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeModal}
          />
        </div>
      )}

      <MinimalFooter />
    </div>
  );
}
