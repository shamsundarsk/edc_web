// API service layer for admin operations
import type { Collection } from '../types';

export class ApiService {
  /**
   * Fetch all items from a collection
   */
  static async fetchCollection<T>(collection: Collection): Promise<T[]> {
    try {
      const res = await fetch(`/api/${collection}`);
      const json = await res.json();
      return json?.items || [];
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);
      return [];
    }
  }

  /**
   * Add a new item to a collection
   */
  static async addItem<T>(collection: Collection, data: Partial<T>): Promise<boolean> {
    try {
      const res = await fetch(`/api/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch (error) {
      console.error(`Error adding to ${collection}:`, error);
      return false;
    }
  }

  /**
   * Update an existing item
   */
  static async updateItem<T>(collection: Collection, id: string, data: Partial<T>): Promise<boolean> {
    try {
      const res = await fetch(`/api/${collection}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch (error) {
      console.error(`Error updating ${collection}/${id}:`, error);
      return false;
    }
  }

  /**
   * Delete an item
   */
  static async deleteItem(collection: Collection, id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/${collection}/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch (error) {
      console.error(`Error deleting ${collection}/${id}:`, error);
      return false;
    }
  }

  /**
   * Reorder items in a collection
   */
  static async reorderItems<T>(collection: Collection, items: T[]): Promise<boolean> {
    try {
      const res = await fetch(`/api/${collection}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      return res.ok;
    } catch (error) {
      console.error(`Error reordering ${collection}:`, error);
      return false;
    }
  }

  /**
   * Upload an image file
   */
  static async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      });
      
      const json = await res.json();
      
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || 'Upload failed');
      }
      
      return json.data.secure_url;
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      return null;
    }
  }
}
