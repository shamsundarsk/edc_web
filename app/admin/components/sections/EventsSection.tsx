'use client';

import { useState } from 'react';
import { Plus, Calendar, Link, Image, Video, Trash2, GripVertical } from 'lucide-react';
import { ApiService } from '../../services/api.service';
import type { Event } from '../../types';

interface EventFormData {
  title: string;
  date: string;
  dateTBA?: boolean;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  registrationLink?: string;
  completed?: boolean;
  slug?: string;
  time?: string;
  location?: string;
  type?: string;
}

interface EventsSectionProps {
  events: Event[];
  onAdd: (event: Partial<Event>) => Promise<boolean>;
  onUpdate: (id: string, event: Partial<Event>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  onReorder: (events: Event[]) => Promise<boolean>;
  loading: boolean;
}

export function EventsSection({ events, onAdd, onUpdate, onDelete, onReorder, loading }: EventsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const eventData: EventFormData = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      dateTBA: formData.get('dateTBA') === 'on',
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      videoUrl: formData.get('videoUrl') as string || undefined,
      registrationLink: formData.get('registrationLink') as string || undefined,
      completed: formData.get('completed') === 'on',
      slug: (formData.get('title') as string)?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    let success = false;
    if (editingEvent) {
      success = await onUpdate(editingEvent.id, eventData);
    } else {
      success = await onAdd(eventData);
    }

    if (success) {
      setShowForm(false);
      setEditingEvent(null);
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageUrl = await ApiService.uploadImage(file);
    setUploading(false);

    if (imageUrl) {
      const imageInput = document.querySelector('input[name="imageUrl"]') as HTMLInputElement;
      if (imageInput) imageInput.value = imageUrl;
    }
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
    
    // Pre-fill form
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        (form.querySelector('input[name="title"]') as HTMLInputElement).value = event.title;
        (form.querySelector('input[name="date"]') as HTMLInputElement).value = event.date;
        (form.querySelector('input[name="dateTBA"]') as HTMLInputElement).checked = event.dateTBA || false;
        (form.querySelector('textarea[name="description"]') as HTMLTextAreaElement).value = event.description;
        (form.querySelector('input[name="imageUrl"]') as HTMLInputElement).value = event.imageUrl || '';
        (form.querySelector('input[name="videoUrl"]') as HTMLInputElement).value = event.videoUrl || '';
        (form.querySelector('input[name="registrationLink"]') as HTMLInputElement).value = event.registrationLink || '';
        (form.querySelector('input[name="completed"]') as HTMLInputElement).checked = event.completed || false;
      }
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-light text-charcoal">Events</h2>
          <p className="text-charcoal-light/60 font-sans text-sm mt-1">
            Manage upcoming events and workshops
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingEvent(null);
          }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-charcoal/10 p-8">
          <h3 className="text-xl font-display font-light text-charcoal mb-6">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                  Event Title *
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                  placeholder="Workshop on Innovation"
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
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                placeholder="Event description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                  Event Image
                </label>
                <input
                  name="imageUrl"
                  type="url"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans mb-2"
                  placeholder="https://..."
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-sm text-charcoal-light font-sans"
                />
                {uploading && <p className="text-sm text-primary mt-1">Uploading...</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                  Video URL
                </label>
                <input
                  name="videoUrl"
                  type="url"
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
                Registration Link
              </label>
              <input
                name="registrationLink"
                type="url"
                className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-sans"
                placeholder="https://forms.google.com/..."
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-charcoal-light font-sans">
                <input name="completed" type="checkbox" className="rounded" />
                Mark as completed
              </label>
              <p className="text-xs text-charcoal-light/60 font-sans">
                Completed events will appear in the "Past Events" section
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }}
                className="bg-charcoal/10 text-charcoal px-8 py-3 rounded-2xl font-medium font-sans hover:bg-charcoal/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="bg-white rounded-3xl border border-charcoal/10 p-12 text-center">
            <Calendar className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
            <p className="text-charcoal-light/60 font-sans">No events yet. Add your first event!</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-charcoal/10 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <GripVertical className="w-4 h-4 text-charcoal/40 cursor-move" />
                    <h3 className="text-lg font-display font-medium text-charcoal">
                      {event.title}
                    </h3>
                    {event.dateTBA ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-sans">
                        Date TBA
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-sans">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    )}
                    {event.completed && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-sans">
                        Completed
                      </span>
                    )}
                  </div>
                  
                  <p className="text-charcoal-light/80 font-sans text-sm mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-charcoal-light/60 font-sans">
                    {event.imageUrl && (
                      <span className="flex items-center gap-1">
                        <Image className="w-3 h-3" />
                        Image
                      </span>
                    )}
                    {event.videoUrl && (
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Video
                      </span>
                    )}
                    {event.registrationLink && (
                      <span className="flex items-center gap-1">
                        <Link className="w-3 h-3" />
                        Registration
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(event)}
                    className="text-charcoal-light hover:text-primary transition-colors p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
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