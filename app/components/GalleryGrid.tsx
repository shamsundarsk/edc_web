'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = items.findIndex(item => item.id === selectedImage.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) newIndex = items.length - 1;
    if (newIndex >= items.length) newIndex = 0;
    
    setSelectedImage(items[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-24 liquid-glass rounded-xl">
            <p className="text-foreground/50 text-lg font-light">No images available</p>
          </div>
        ) : (
          items.map(img => (
            <div 
              key={img.id} 
              className="group liquid-glass hover:shadow-xl transition-all duration-500 overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(img)}
            >
              <div className="aspect-square overflow-hidden rounded-t-xl flex items-center justify-center relative">
                {img.imageUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img.imageUrl} 
                      alt={img.caption || 'Gallery image'} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-[#EE6983]/20 group-hover:bg-[#EE6983]/10 transition-all duration-700"></div>
                  </>
                ) : (
                  <div className="text-foreground/50 text-center p-6">
                    <p className="text-sm font-light">No image</p>
                  </div>
                )}
              </div>
              {img.caption && (
                <div className="p-4 border-t border-foreground/10">
                  <p className="text-sm text-foreground/70 font-light line-clamp-2">{img.caption}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl font-light z-10 w-12 h-12 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Previous Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl font-light z-10 w-12 h-12 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl font-light z-10 w-12 h-12 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.caption || 'Gallery image'}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {selectedImage.caption && (
              <div className="mt-6 text-center max-w-2xl">
                <p className="text-white text-lg font-light">{selectedImage.caption}</p>
              </div>
            )}
          </div>

          {/* Image Counter */}
          {items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light">
              {items.findIndex(item => item.id === selectedImage.id) + 1} / {items.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
