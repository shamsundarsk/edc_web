'use client';

import { useState, useEffect, useRef } from 'react';

interface Media {
  type: string;
  url: string;
}

interface EventMediaSliderProps {
  media: Media[];
  eventTitle: string;
}

export default function EventMediaSlider({ media, eventTitle }: EventMediaSliderProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const currentMedia = media[currentMediaIndex];
  const imageMedia = media.filter(m => m.type === 'image');

  // Auto-start video when component mounts or when switching to a video
  useEffect(() => {
    if (currentMedia?.type === 'video') {
      setIsVideoPlaying(true);
      // Clear any image interval
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
    } else if (currentMedia?.type === 'image') {
      setIsVideoPlaying(false);
      // Start image slideshow after video ends
      startImageSlideshow();
    }
  }, [currentMediaIndex]);

  // Start image slideshow
  const startImageSlideshow = () => {
    if (imageMedia.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        setCurrentMediaIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          // If we reach the end, loop back to the first image
          if (nextIndex >= media.length) {
            return media.findIndex(m => m.type === 'image');
          }
          // If next item is video, skip to first image
          if (media[nextIndex]?.type === 'video') {
            return media.findIndex(m => m.type === 'image');
          }
          return nextIndex;
        });
      }, 3000); // Change image every 3 seconds
    }
  };

  // Auto-scroll thumbnails to keep current item visible
  useEffect(() => {
    if (thumbnailContainerRef.current && media.length > 1) {
      const container = thumbnailContainerRef.current;
      const thumbnailWidth = 88; // 80px + 8px gap
      const containerWidth = container.clientWidth;
      const scrollPosition = (currentMediaIndex * thumbnailWidth) - (containerWidth / 2) + (thumbnailWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentMediaIndex, media.length]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
    // Move to first image after video ends
    const firstImageIndex = media.findIndex(m => m.type === 'image');
    if (firstImageIndex !== -1) {
      setCurrentMediaIndex(firstImageIndex);
    }
  };

  const nextMedia = () => {
    // Clear image interval when manually navigating
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }
    
    if (currentMediaIndex < media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else {
      setCurrentMediaIndex(0); // Loop back to beginning
    }
  };

  const prevMedia = () => {
    // Clear image interval when manually navigating
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }
    
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else {
      setCurrentMediaIndex(media.length - 1); // Loop to end
    }
  };

  return (
    <div className="mb-12">
      <div className="relative border border-foreground/10 overflow-hidden liquid-glass rounded-lg" style={{ minHeight: '500px' }}>
        {currentMedia?.type === 'video' && isVideoPlaying ? (
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="w-full h-auto rounded-lg"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={() => {
              // Ensure video plays when loaded
              if (videoRef.current) {
                videoRef.current.play().catch(console.error);
              }
            }}
          />
        ) : currentMedia ? (
          <div className="relative w-full h-full min-h-[500px]">
            <img
              src={currentMedia.url}
              alt={eventTitle}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Image slideshow indicator */}
            {imageMedia.length > 1 && currentMedia.type === 'image' && (
              <div className="absolute top-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm">
                Auto-playing slideshow
              </div>
            )}
          </div>
        ) : null}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-foreground/70 hover:bg-foreground/90 text-background p-3 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-foreground/70 hover:bg-foreground/90 text-background p-3 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Media Counter */}
        <div className="absolute bottom-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm">
          {currentMediaIndex + 1} / {media.length}
        </div>
      </div>

      {/* Animated Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="mt-6">
          {/* Thumbnail Progress Bar */}
          <div className="relative mb-4">
            <div className="h-1 bg-foreground/20 rounded-full">
              <div 
                className="h-full bg-[#EE6983] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentMediaIndex + 1) / media.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-foreground/50">
              <span>1</span>
              <span className="font-medium text-[#EE6983]">{currentMediaIndex + 1} of {media.length}</span>
              <span>{media.length}</span>
            </div>
          </div>

          {/* Scrollable Thumbnail Container */}
          <div 
            ref={thumbnailContainerRef}
            className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#EE6983 transparent' }}
          >
            {media.map((mediaItem, index) => (
              <button
                key={index}
                onClick={() => {
                  // Clear image interval when manually selecting
                  if (imageIntervalRef.current) {
                    clearInterval(imageIntervalRef.current);
                    imageIntervalRef.current = null;
                  }
                  setCurrentMediaIndex(index);
                  if (mediaItem.type === 'video') {
                    setIsVideoPlaying(true);
                  }
                }}
                className={`relative flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentMediaIndex === index 
                    ? 'border-[#EE6983] shadow-lg scale-110 z-10' 
                    : 'border-foreground/20 hover:border-[#EE6983]/50 hover:scale-105'
                }`}
              >
                {/* Thumbnail Content */}
                {mediaItem.type === 'video' ? (
                  <div className="w-full h-full bg-[#850E35] flex items-center justify-center relative">
                    <svg className="w-6 h-6 text-[#EE6983]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {/* Video indicator */}
                    <div className="absolute top-1 right-1 w-2 h-2 bg-[#EE6983] rounded-full"></div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img src={mediaItem.url} alt="" className="w-full h-full object-cover" />
                    {/* Image indicator */}
                    <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}

                {/* Active indicator overlay */}
                {currentMediaIndex === index && (
                  <div className="absolute inset-0 bg-[#EE6983]/20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#EE6983] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Thumbnail number */}
                <div className="absolute bottom-0 left-0 bg-foreground/80 text-background text-xs px-1 rounded-tr">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Thumbnail Navigation Arrows */}
          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={() => {
                if (thumbnailContainerRef.current) {
                  thumbnailContainerRef.current.scrollBy({ left: -176, behavior: 'smooth' }); // 2 thumbnails width
                }
              }}
              className="p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-all"
              title="Scroll thumbnails left"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (thumbnailContainerRef.current) {
                  thumbnailContainerRef.current.scrollBy({ left: 176, behavior: 'smooth' }); // 2 thumbnails width
                }
              }}
              className="p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-all"
              title="Scroll thumbnails right"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Auto-play Controls */}
      {imageMedia.length > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => {
              if (imageIntervalRef.current) {
                clearInterval(imageIntervalRef.current);
                imageIntervalRef.current = null;
              } else {
                startImageSlideshow();
              }
            }}
            className="px-4 py-2 bg-[#850E35] text-[#EE6983] rounded-full text-sm font-medium hover:bg-[#850E35]/90 transition-all"
          >
            {imageIntervalRef.current ? 'Pause Slideshow' : 'Start Slideshow'}
          </button>
        </div>
      )}
    </div>
  );
}
