// Members management section
'use client';

import { useState } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import type { Member } from '../../types';
import { Card } from '../ui/Card';
import { FormInput } from '../ui/FormInput';
import { ImageUpload } from '../ui/ImageUpload';
import { Button } from '../ui/Button';
import { OrderControls } from '../ui/OrderControls';
import { useImageUpload } from '../../hooks/useImageUpload';

interface MembersSectionProps {
  members: Member[];
  onAdd: (member: Partial<Member>) => Promise<boolean>;
  onUpdate: (id: string, member: Partial<Member>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReorder: (members: Member[]) => Promise<boolean>;
  loading: boolean;
}

export function MembersSection({ members, onAdd, onUpdate, onDelete, onReorder, loading }: MembersSectionProps) {
  const { uploading, uploadImage } = useImageUpload();
  const [form, setForm] = useState<Partial<Member>>({
    name: '',
    role: '',
    linkedin: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Member>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.imageUrl) {
      alert('Please upload a photo first');
      return;
    }
    
    const success = await onAdd(form);
    if (success) {
      setForm({ name: '', role: '', linkedin: '', imageUrl: '' });
    }
  };

  const handleImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (url) {
      setForm(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleEditImageUpload = async (file: File) => {
    const url = await uploadImage(file);
    if (url) {
      setEditForm(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const startEdit = (member: Member) => {
    setEditingId(member.id);
    setEditForm({ ...member });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    const success = await onUpdate(id, editForm);
    if (success) {
      cancelEdit();
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newMembers = [...members];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= newMembers.length) return;
    
    [newMembers[index], newMembers[newIndex]] = [newMembers[newIndex], newMembers[index]];
    onReorder(newMembers);
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <Card title="Add New Member">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Name"
              placeholder="Full name"
              value={form.name || ''}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <FormInput
              label="Role"
              placeholder="Position/Role"
              value={form.role || ''}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </div>

          <FormInput
            label="LinkedIn URL (optional)"
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin || ''}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">
              Profile Photo *
            </label>
            <ImageUpload
              imageUrl={form.imageUrl}
              onUpload={handleImageUpload}
              onRemove={() => setForm({ ...form, imageUrl: '' })}
              uploading={uploading}
              shape="circle"
            />
          </div>

          <Button type="submit" loading={loading || uploading} disabled={!form.imageUrl}>
            Add Member
          </Button>
        </form>
      </Card>

      {/* Members List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-charcoal/5 to-primary/5 border-b border-charcoal/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Role
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {members.map((member, idx) => (
                <tr key={member.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <OrderControls
                      onMoveUp={() => moveItem(idx, 'up')}
                      onMoveDown={() => moveItem(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < members.length - 1}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {editingId === member.id ? (
                      <ImageUpload
                        imageUrl={editForm.imageUrl || member.imageUrl}
                        onUpload={handleEditImageUpload}
                        uploading={uploading}
                        shape="circle"
                        className="w-16 h-16"
                      />
                    ) : (
                      member.imageUrl && (
                        <img
                          src={member.imageUrl}
                          alt=""
                          className="w-16 h-16 object-cover rounded-full border-2 border-charcoal/10"
                        />
                      )
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === member.id ? (
                      <input
                        className="w-full px-3 py-2 border-2 border-charcoal/10 rounded-lg font-sans focus:border-primary outline-none"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    ) : (
                      <span className="font-medium text-charcoal font-sans">{member.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === member.id ? (
                      <input
                        className="w-full px-3 py-2 border-2 border-charcoal/10 rounded-lg font-sans focus:border-primary outline-none"
                        value={editForm.role || ''}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      />
                    ) : (
                      <span className="text-charcoal-light font-sans">{member.role}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      {editingId === member.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(member.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            type="button"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-charcoal-light hover:bg-charcoal/10 rounded-lg transition-colors"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(member)}
                            className="p-2 text-charcoal-light hover:bg-charcoal/10 rounded-lg transition-colors"
                            type="button"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(member.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            type="button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && (
            <div className="text-center py-16 text-charcoal-light/60 font-sans">
              <p className="text-lg">No members yet</p>
              <p className="text-sm mt-2">Add your first team member above</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
