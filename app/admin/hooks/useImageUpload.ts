// Custom hook for image upload functionality
import { useState, useCallback } from 'react';
import { ApiService } from '../services/api.service';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * Upload a single image
   */
  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    setUploading(true);
    setProgress(0);
    
    try {
      const url = await ApiService.uploadImage(file);
      setProgress(100);
      return url;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  }, []);

  /**
   * Upload multiple images
   */
  const uploadMultiple = useCallback(async (files: File[]): Promise<string[]> => {
    setUploading(true);
    setProgress(0);
    
    try {
      const uploadPromises = files.map(file => ApiService.uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter((url): url is string => url !== null);
      
      setProgress(100);
      return validUrls;
    } catch (error) {
      console.error('Multiple upload error:', error);
      return [];
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  }, []);

  return {
    uploading,
    progress,
    uploadImage,
    uploadMultiple,
  };
}
