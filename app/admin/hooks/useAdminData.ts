// Custom hook for managing admin data
import { useState, useCallback } from 'react';
import { ApiService } from '../services/api.service';
import type { Collection } from '../types';

export function useAdminData<T>() {
  const [data, setData] = useState<Record<Collection, T[]>>({
    blogs: [],
    members: [],
    events: [],
    gallery: [],
    announcements: [],
  });
  const [loading, setLoading] = useState(false);

  /**
   * Fetch all collections
   */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const collections: Collection[] = ['blogs', 'members', 'events', 'gallery', 'announcements'];
      const results = await Promise.all(
        collections.map(collection => ApiService.fetchCollection<T>(collection))
      );
      
      // Migrate gallery data from old format to new format
      const migratedGallery = results[3].map((item: any) => {
        if (item.imageUrl && !item.images) {
          // Convert old format to new format
          return {
            ...item,
            images: [{ url: item.imageUrl, caption: item.caption }],
            title: item.caption,
            mainCaption: item.caption,
          };
        }
        return item;
      });
      
      const newData: Record<Collection, T[]> = {
        blogs: results[0],
        members: results[1],
        events: results[2],
        gallery: migratedGallery,
        announcements: results[4],
      };
      
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single collection
   */
  const fetchCollection = useCallback(async (collection: Collection) => {
    const items = await ApiService.fetchCollection<T>(collection);
    
    // Apply migration for gallery collection
    let processedItems = items;
    if (collection === 'gallery') {
      processedItems = items.map((item: any) => {
        if (item.imageUrl && !item.images) {
          // Convert old format to new format
          return {
            ...item,
            images: [{ url: item.imageUrl, caption: item.caption }],
            title: item.caption,
            mainCaption: item.caption,
          };
        }
        return item;
      });
    }
    
    setData(prev => ({ ...prev, [collection]: processedItems }));
  }, []);

  /**
   * Add item to collection
   */
  const addItem = useCallback(async (collection: Collection, item: Partial<T>) => {
    setLoading(true);
    const success = await ApiService.addItem<T>(collection, item);
    setLoading(false);
    
    if (success) {
      await fetchCollection(collection);
    }
    
    return success;
  }, [fetchCollection]);

  /**
   * Update item in collection
   */
  const updateItem = useCallback(async (collection: Collection, id: string, item: Partial<T>) => {
    const success = await ApiService.updateItem<T>(collection, id, item);
    
    if (success) {
      await fetchCollection(collection);
    }
    
    return success;
  }, [fetchCollection]);

  /**
   * Delete item from collection
   */
  const deleteItem = useCallback(async (collection: Collection, id: string) => {
    if (!confirm('Delete this item?')) return false;
    
    const success = await ApiService.deleteItem(collection, id);
    
    if (success) {
      await fetchCollection(collection);
    }
    
    return success;
  }, [fetchCollection]);

  /**
   * Reorder items in collection
   */
  const reorderItems = useCallback(async (collection: Collection, items: T[]) => {
    setData(prev => ({ ...prev, [collection]: items }));
    
    const success = await ApiService.reorderItems<T>(collection, items);
    
    if (!success) {
      await fetchCollection(collection);
    }
    
    return success;
  }, [fetchCollection]);

  return {
    data,
    loading,
    fetchAll,
    fetchCollection,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
  };
}
