// Refactored modular admin page
'use client';

import { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { AdminLayout } from './components/AdminLayout';
import { BlogsSection } from './components/sections/BlogsSection';
import { MembersSection } from './components/sections/MembersSection';
import { EventsSection } from './components/sections/EventsSection';
import { GallerySection } from './components/sections/GallerySection';
import { AnnouncementsSection } from './components/sections/AnnouncementsSection';
import { useAdminData } from './hooks/useAdminData';
import type { Blog, Member, Event, GalleryItem, Announcement, Collection, TabConfig } from './types';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Collection>('blogs');
  
  const {
    data,
    loading,
    fetchAll,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
  } = useAdminData<any>();

  useEffect(() => {
    if (authenticated) {
      fetchAll();
    }
  }, [authenticated, fetchAll]);

  const handleLogin = (password: string) => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  if (!authenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const tabs: TabConfig[] = [
    { id: 'blogs', label: 'Blogs', count: data.blogs.length },
    { id: 'members', label: 'Members', count: data.members.length },
    { id: 'events', label: 'Events', count: data.events.length },
    { id: 'gallery', label: 'Gallery', count: data.gallery.length },
    { id: 'announcements', label: 'Announcements', count: data.announcements.length },
  ];

  const totalItems = Object.values(data).reduce((sum, items) => sum + items.length, 0);

  return (
    <AdminLayout totalItems={totalItems}>
      {/* Tabs */}
      <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 opacity-0 animate-fade-in-up [animation-delay:200ms]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all font-sans ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white text-charcoal-light hover:bg-charcoal/5 border border-charcoal/10'
            }`}
          >
            {tab.label} <span className="ml-2 opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="opacity-0 animate-fade-in-up [animation-delay:400ms]">
        {activeTab === 'blogs' && (
          <BlogsSection
            blogs={data.blogs as Blog[]}
            onAdd={(blog) => addItem('blogs', blog)}
            onDelete={(id) => deleteItem('blogs', id)}
            onReorder={(blogs) => reorderItems('blogs', blogs)}
            loading={loading}
          />
        )}

        {activeTab === 'members' && (
          <MembersSection
            members={data.members as Member[]}
            onAdd={(member) => addItem('members', member)}
            onUpdate={(id, member) => updateItem('members', id, member)}
            onDelete={(id) => deleteItem('members', id)}
            onReorder={(members) => reorderItems('members', members)}
            loading={loading}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={data.events as Event[]}
            onAdd={(event) => addItem('events', event)}
            onUpdate={(id, event) => updateItem('events', id, event)}
            onDelete={(id) => deleteItem('events', id)}
            onReorder={(events) => reorderItems('events', events)}
            loading={loading}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            gallery={data.gallery as GalleryItem[]}
            onAdd={(item) => addItem('gallery', item)}
            onUpdate={(id, item) => updateItem('gallery', id, item)}
            onDelete={(id) => deleteItem('gallery', id)}
            onReorder={(items) => reorderItems('gallery', items)}
            loading={loading}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsSection
            announcements={data.announcements as Announcement[]}
            onAdd={(announcement) => addItem('announcements', announcement)}
            onUpdate={(id, announcement) => updateItem('announcements', id, announcement)}
            onDelete={(id) => deleteItem('announcements', id)}
            onReorder={(announcements) => reorderItems('announcements', announcements)}
            loading={loading}
          />
        )}
      </div>
    </AdminLayout>
  );
}
