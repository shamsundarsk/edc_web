// Blogs management section
'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { Blog } from '../../types';
import { Card } from '../ui/Card';
import { FormInput } from '../ui/FormInput';
import { FormTextarea } from '../ui/FormTextarea';
import { ImageUpload } from '../ui/ImageUpload';
import { Button } from '../ui/Button';
import { OrderControls } from '../ui/OrderControls';
import { useImageUpload } from '../../hooks/useImageUpload';
import { generateSlug } from '../../utils/helpers';

interface BlogsSectionProps {
  blogs: Blog[];
  onAdd: (blog: Partial<Blog>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReorder: (blogs: Blog[]) => Promise<boolean>;
  loading: boolean;
}

export function BlogsSection({ blogs, onAdd, onDelete, onReorder, loading }: BlogsSectionProps) {
  const { uploading, uploadImage } = useImageUpload();
  const [form, setForm] = useState<Partial<Blog>>({
    title: '',
    content: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...form,
      slug: form.title ? generateSlug(form.title) : '',
    };
    
    const success = await onAdd(blogData);
    if (success) {
      setForm({ title: '', content: '', imageUrl: '' });
    }
  };

  const handleImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (url) {
      setForm(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newBlogs = [...blogs];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newBlogs.length) return;
    
    [newBlogs[index], newBlogs[newIndex]] = [newBlogs[newIndex], newBlogs[index]];
    onReorder(newBlogs);
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <Card title="Add New Blog">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Title"
            placeholder="Enter blog title"
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <FormTextarea
            label="Content"
            placeholder="Write your blog content..."
            value={form.content || ''}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            rows={5}
          />

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">
              Featured Image
            </label>
            <ImageUpload
              imageUrl={form.imageUrl}
              onUpload={handleImageUpload}
              onRemove={() => setForm({ ...form, imageUrl: '' })}
              uploading={uploading}
            />
          </div>

          <Button type="submit" loading={loading || uploading}>
            Add Blog
          </Button>
        </form>
      </Card>

      {/* Blogs List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-charcoal/5 to-primary/5 border-b border-charcoal/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Image
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {blogs.map((blog, idx) => (
                <tr key={blog.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <OrderControls
                      onMoveUp={() => moveItem(idx, 'up')}
                      onMoveDown={() => moveItem(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < blogs.length - 1}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-charcoal font-sans">{blog.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    {blog.imageUrl && (
                      <img src={blog.imageUrl} alt="" className="w-16 h-16 object-cover rounded-xl" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onDelete(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <div className="text-center py-16 text-charcoal-light/60 font-sans">
              <p className="text-lg">No blogs yet</p>
              <p className="text-sm mt-2">Add your first blog post above</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
