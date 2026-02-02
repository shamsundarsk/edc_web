'use client';

import { useState } from 'react';
import { Plus, Megaphone, Trash2, GripVertical } from 'lucide-react';
import type { Announcement } from '../../types';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
  onAdd: (announcement: Partial<Announcement>) => Promise<boolean>;
  onUpdate: (id: string, announcement: Partial<Announcement>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReorder: (announcements: Announcement[]) => Promise<boolean>;
  loading: boolean;
}

export function AnnouncementsSection({ announcements, onAdd, onUpdate, onDelete, onReorder, loading }: AnnouncementsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const announcementData: Partial<Announcement> = {
      message: formData.get('message') as string,
      date: formData.get('date') as string,
      dateTBA: formData.get('dateTBA') === 'on',
    };

    let success = false;
    if (editingAnnouncement) {
      success = await onUpdate(editingAnnouncement.id, announcementData);
    } else {
      success = await onAdd(announcementData);
    }

    if (success) {
      setShowForm(false);
      setEditingAnnouncement(null);
      (e.target as HTMLFormElement).reset();
    }
  };

  const startEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
    
    // Pre-fill form
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement).value = announcement.message;
        (form.querySelector('input[name="date"]') as HTMLInputElement).value = announcement.date;
        (form.querySelector('input[name="dateTBA"]') as HTMLInputElement).checked = announcement.dateTBA || false;
      }
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-light text-charcoal">Announcements</h2>
          <p className="text-charcoal-light/60 font-sans text-sm mt-1">
            Manage important announcements and updates
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAnnouncement(null);
          }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Announcement
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-charcoal/10 p-8">
          <h3 className="text-xl font-display font-light text-charcoal mb-6">
            {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                placeholder="Important announcement message..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                Date
              </label>
              <input
                name="date"
                type="date"
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
              />
              <label className="flex items-center gap-2 mt-2 text-sm text-charcoal-light font-sans">
                <input name="dateTBA" type="checkbox" className="rounded" />
                Date TBA
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAnnouncement(null);
                }}
                className="bg-charcoal/10 text-charcoal px-8 py-3 rounded-2xl font-medium font-sans hover:bg-charcoal/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-3xl border border-charcoal/10 p-12 text-center">
            <Megaphone className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
            <p className="text-charcoal-light/60 font-sans">No announcements yet. Add your first announcement!</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-3xl border border-charcoal/10 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <GripVertical className="w-4 h-4 text-charcoal/40 cursor-move" />
                    {announcement.dateTBA ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-sans">
                        Date TBA
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-sans">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-charcoal font-sans text-base leading-relaxed">
                    {announcement.message}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(announcement)}
                    className="text-charcoal-light hover:text-primary transition-colors p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(announcement.id)}
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