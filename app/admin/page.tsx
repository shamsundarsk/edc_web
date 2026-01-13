'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type AnyObj = Record<string, any>;

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');

  const [blogs, setBlogs] = useState<AnyObj[]>([]);
  const [members, setMembers] = useState<AnyObj[]>([]);
  const [events, setEvents] = useState<AnyObj[]>([]);
  const [projects, setProjects] = useState<AnyObj[]>([]);
  const [gallery, setGallery] = useState<AnyObj[]>([]);
  const [announcements, setAnnouncements] = useState<AnyObj[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AnyObj>({});

  const [blogForm, setBlogForm] = useState({ title: '', slug: '', content: '', imageUrl: '' });
  const [memberForm, setMemberForm] = useState({ name: '', role: '', linkedin: '', imageUrl: '' });
  const [eventForm, setEventForm] = useState({ title: '', slug: '', date: '', location: '', description: '', imageUrl: '', videoUrl: '', images: '', videos: '', registrationLink: '' });
  const [eventMedia, setEventMedia] = useState<{images: string[], videos: string[]}>({ images: [], videos: [] });
  const [projectForm, setProjectForm] = useState({ name: '', team: '', links: '' });
  const [galleryForm, setGalleryForm] = useState({ caption: '', imageUrl: '' });
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [announceForm, setAnnounceForm] = useState({ message: '', date: '' });

  useEffect(()=>{ if (authed) fetchAll(); }, [authed]);

  const login = ()=>{
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASS) setAuthed(true);
    else alert('Wrong password');
  };

  async function fetchAll(){
    try{
      const endpoints = ['blogs','members','events','projects','gallery','announcements'];
      for(const e of endpoints){
        const res = await fetch(`/api/${e}`);
        const json = await res.json();
        if(json?.items){
          if(e==='blogs') setBlogs(json.items);
          if(e==='members') setMembers(json.items);
          if(e==='events') setEvents(json.items);
          if(e==='projects') setProjects(json.items);
          if(e==='gallery') setGallery(json.items);
          if(e==='announcements') setAnnouncements(json.items);
        }
      }
    }catch(err){ console.error(err); }
  }

  async function uploadAndSet(fileInput: File | undefined){
    if(!fileInput) return '';
    
    setUploadingImage(true);
    try {
      const form = new FormData();
      form.append('file', fileInput);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const json = await res.json();
      
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || 'Upload failed');
      }
      
      return json.data.secure_url as string;
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      return '';
    } finally {
      setUploadingImage(false);
    }
  }

  async function uploadMultipleFiles(files: FileList | null, type: 'images' | 'videos') {
    if (!files || files.length === 0) return;
    
    setLoading(true);
    const uploadPromises = Array.from(files).map(file => uploadAndSet(file));
    
    try {
      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter(url => url);
      
      setEventMedia(prev => ({
        ...prev,
        [type]: [...prev[type], ...validUrls]
      }));
    } catch (error) {
      alert(`Error uploading ${type}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const removeMediaItem = (type: 'images' | 'videos', index: number) => {
    setEventMedia(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Function to generate URL-friendly slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .substring(0, 50); // Limit length
  };

  async function addItem(collection:string, data:AnyObj){
    setLoading(true);
    const res = await fetch(`/api/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if(res.ok){ 
      fetchAll();
      if(collection === 'blogs') setBlogForm({ title: '', slug: '', content: '', imageUrl: '' });
      if(collection === 'members') setMemberForm({ name: '', role: '', linkedin: '', imageUrl: '' });
      if(collection === 'events') {
        setEventForm({ title: '', slug: '', date: '', location: '', description: '', imageUrl: '', videoUrl: '', images: '', videos: '', registrationLink: '' });
        setEventMedia({ images: [], videos: [] });
      }
      if(collection === 'projects') setProjectForm({ name: '', team: '', links: '' });
      if(collection === 'gallery') setGalleryForm({ caption: '', imageUrl: '' });
      if(collection === 'announcements') setAnnounceForm({ message: '', date: '' });
    }
    else alert('Error adding item');
  }

  async function deleteItem(collection:string, id:string){
    if(!confirm('Delete this item?')) return;
    const res = await fetch(`/api/${collection}/${id}`, { method: 'DELETE' });
    if(res.ok) fetchAll();
  }

  async function updateItem(collection:string, id:string, data:AnyObj){
    const res = await fetch(`/api/${collection}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if(res.ok) {
      fetchAll();
      setEditingId(null);
      setEditForm({});
    }
  }

  const moveItem = async (collection: string, index: number, direction: 'up' | 'down') => {
    let items: AnyObj[] = [];
    let setItems: (items: AnyObj[]) => void = () => {};
    
    if(collection === 'blogs') { items = [...blogs]; setItems = setBlogs; }
    else if(collection === 'members') { items = [...members]; setItems = setMembers; }
    else if(collection === 'events') { items = [...events]; setItems = setEvents; }
    else if(collection === 'gallery') { items = [...gallery]; setItems = setGallery; }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if(newIndex < 0 || newIndex >= items.length) return;
    
    // Swap items in local state
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    setItems(items);

    // Persist the new order to the database
    try {
      const response = await fetch(`/api/${collection}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      
      if (!response.ok) {
        console.error(`Failed to update ${collection} order`);
        // Revert the local state if API call fails
        fetchAll();
      }
    } catch (error) {
      console.error(`Error updating ${collection} order:`, error);
      // Revert the local state if API call fails
      fetchAll();
    }
  };

  const startEdit = (item: AnyObj) => {
    setEditingId(item.id);
    setEditForm({...item});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  if(!authed){
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-neutral-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-neutral-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">Admin Login</h1>
              <p className="text-neutral-500">Enter password to continue</p>
            </div>
            <div className="space-y-4">
              <input 
                value={pass} 
                onChange={(e)=>setPass(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && login()}
                type="password" 
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900" 
                placeholder="Password" 
              />
              <button 
                onClick={login} 
                className="w-full px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-medium transition"
              >
                Sign In
              </button>
              <Link href="/" className="block text-center text-sm text-neutral-500 hover:text-neutral-700">
                ← Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'blogs', label: 'Blogs', count: blogs.length },
    { id: 'members', label: 'Members', count: members.length },
    { id: 'events', label: 'Events', count: events.length },
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'gallery', label: 'Gallery', count: gallery.length },
    { id: 'announcements', label: 'Announcements', count: announcements.length },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-neutral-900">Admin Dashboard</h1>
            <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">Exit</Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label} <span className="ml-1 text-xs">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* BLOGS TABLE */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {/* Add Form */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Blog</h2>
              <form onSubmit={async(e)=>{ e.preventDefault(); await addItem('blogs', blogForm); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Title" 
                    value={blogForm.title} 
                    onChange={(e)=>setBlogForm({...blogForm, title: e.target.value})} 
                    required 
                  />
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Slug" 
                    value={blogForm.slug} 
                    onChange={(e)=>setBlogForm({...blogForm, slug: e.target.value})} 
                    required 
                  />
                </div>
                <textarea 
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg" 
                  placeholder="Content" 
                  value={blogForm.content} 
                  onChange={(e)=>setBlogForm({...blogForm, content: e.target.value})} 
                  required 
                  rows={3} 
                />
                
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">Featured Image</label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={async (ev)=>{ 
                          const file = ev.target.files?.[0]; 
                          if(file){ 
                            const url = await uploadAndSet(file); 
                            if (url) {
                              setBlogForm({...blogForm, imageUrl: url}); 
                            }
                          } 
                        }} 
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-900"></div>
                          Uploading image...
                        </div>
                      )}
                    </div>
                    
                    {/* Image Preview */}
                    {blogForm.imageUrl && (
                      <div className="relative flex-shrink-0">
                        <img 
                          src={blogForm.imageUrl} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded border-2 border-neutral-200" 
                        />
                        <button
                          type="button"
                          onClick={() => setBlogForm({...blogForm, imageUrl: ''})}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium" 
                  disabled={loading || uploadingImage}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding Blog...
                    </div>
                  ) : (
                    'Add Blog'
                  )}
                </button>
              </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-24">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Slug</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-20">Image</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {blogs.map((b, idx) => (
                    <tr key={b.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={()=>moveItem('blogs', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30" title="Move up">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button onClick={()=>moveItem('blogs', idx, 'down')} disabled={idx === blogs.length - 1} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30" title="Move down">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {editingId === b.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.title || ''} onChange={(e)=>setEditForm({...editForm, title: e.target.value})} />
                        ) : (
                          <span className="font-medium">{b.title}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {editingId === b.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.slug || ''} onChange={(e)=>setEditForm({...editForm, slug: e.target.value})} />
                        ) : (
                          b.slug
                        )}
                      </td>
                      <td className="px-4 py-3">{b.imageUrl && <img src={b.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === b.id ? (
                            <>
                              <button onClick={()=>updateItem('blogs', b.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(b)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('blogs', b.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {blogs.length === 0 && <div className="text-center py-12 text-neutral-500">No blogs yet</div>}
            </div>
          </div>
        )}

        {/* MEMBERS TABLE */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
              <form onSubmit={async(e)=>{ 
                e.preventDefault(); 
                if (!memberForm.imageUrl) {
                  alert('Please upload a photo first');
                  return;
                }
                await addItem('members', memberForm); 
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Name" 
                    value={memberForm.name} 
                    onChange={(e)=>setMemberForm({...memberForm, name: e.target.value})} 
                    required 
                  />
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Role" 
                    value={memberForm.role} 
                    onChange={(e)=>setMemberForm({...memberForm, role: e.target.value})} 
                    required 
                  />
                </div>
                <input 
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg" 
                  placeholder="LinkedIn URL (optional)" 
                  value={memberForm.linkedin} 
                  onChange={(e)=>setMemberForm({...memberForm, linkedin: e.target.value})} 
                />
                
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">Profile Photo *</label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={async (ev)=>{ 
                          const file = ev.target.files?.[0]; 
                          if(file){ 
                            const url = await uploadAndSet(file); 
                            if (url) {
                              setMemberForm({...memberForm, imageUrl: url}); 
                            }
                          } 
                        }} 
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-900"></div>
                          Uploading image...
                        </div>
                      )}
                    </div>
                    
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      {memberForm.imageUrl ? (
                        <div className="relative">
                          <img 
                            src={memberForm.imageUrl} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded-full border-2 border-neutral-200" 
                          />
                          <button
                            type="button"
                            onClick={() => setMemberForm({...memberForm, imageUrl: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-neutral-100 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center">
                          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium" 
                  disabled={loading || uploadingImage || !memberForm.imageUrl}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding Member...
                    </div>
                  ) : (
                    'Add Member'
                  )}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-24">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-20">Photo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">LinkedIn</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {members.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={()=>moveItem('members', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button onClick={()=>moveItem('members', idx, 'down')} disabled={idx === members.length - 1} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">{m.imageUrl && <img src={m.imageUrl} alt="" className="w-10 h-10 object-cover rounded-full" />}</td>
                      <td className="px-4 py-3">
                        {editingId === m.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.name || ''} onChange={(e)=>setEditForm({...editForm, name: e.target.value})} />
                        ) : (
                          <span className="font-medium">{m.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {editingId === m.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.role || ''} onChange={(e)=>setEditForm({...editForm, role: e.target.value})} />
                        ) : (
                          m.role
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === m.id ? (
                            <>
                              <button onClick={()=>updateItem('members', m.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(m)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('members', m.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {members.length === 0 && <div className="text-center py-12 text-neutral-500">No members yet</div>}
            </div>
          </div>
        )}

        {/* EVENTS TABLE */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
              <form onSubmit={async(e)=>{ 
                e.preventDefault(); 
                const data:any = {...eventForm}; 
                
                // Ensure we have a valid slug
                if (!data.slug || data.slug.trim() === '') {
                  data.slug = generateSlug(data.title);
                }
                
                // Clean and validate slug
                data.slug = generateSlug(data.slug);
                
                // Combine uploaded media with manual URLs
                const allImages = [...eventMedia.images];
                const allVideos = [...eventMedia.videos];
                if(data.images) allImages.push(...data.images.split(',').map((s:string)=>s.trim()).filter(Boolean));
                if(data.videos) allVideos.push(...data.videos.split(',').map((s:string)=>s.trim()).filter(Boolean));
                data.images = allImages;
                data.videos = allVideos;
                
                console.log('Submitting event data:', data); // Debug log
                await addItem('events', data); 
              }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Title" 
                    value={eventForm.title} 
                    onChange={(e)=>{
                      const title = e.target.value;
                      setEventForm({
                        ...eventForm, 
                        title,
                        slug: eventForm.slug || generateSlug(title) // Auto-generate slug if empty
                      });
                    }} 
                    required 
                  />
                  <input 
                    className="px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Slug (URL) - auto-generated" 
                    value={eventForm.slug} 
                    onChange={(e)=>setEventForm({...eventForm, slug: e.target.value})} 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="px-3 py-2 border border-neutral-300 rounded-lg" value={eventForm.date} onChange={(e)=>setEventForm({...eventForm, date: e.target.value})} required />
                  <input className="px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Location" value={eventForm.location} onChange={(e)=>setEventForm({...eventForm, location: e.target.value})} />
                </div>
                <textarea className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Description" value={eventForm.description} onChange={(e)=>setEventForm({...eventForm, description: e.target.value})} required rows={3} />
                
                <input className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Main Video URL (optional)" value={eventForm.videoUrl} onChange={(e)=>setEventForm({...eventForm, videoUrl: e.target.value})} />
                
                <input className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Registration Link (optional)" value={eventForm.registrationLink} onChange={(e)=>setEventForm({...eventForm, registrationLink: e.target.value})} />

                {/* Main Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Image:</label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*" onChange={async (ev)=>{ const file = ev.target.files?.[0]; if(file){ const url = await uploadAndSet(file); setEventForm({...eventForm, imageUrl: url}); } }} className="text-sm" />
                    {eventForm.imageUrl && <img src={eventForm.imageUrl} alt="" className="w-16 h-16 object-cover rounded" />}
                  </div>
                </div>

                {/* Multiple Images Upload */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Additional Images:</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => uploadMultipleFiles(e.target.files, 'images')} 
                    className="text-sm w-full px-3 py-2 border border-neutral-300 rounded-lg" 
                  />
                  <input 
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm" 
                    placeholder="Or paste image URLs (comma-separated)" 
                    value={eventForm.images} 
                    onChange={(e)=>setEventForm({...eventForm, images: e.target.value})} 
                  />
                  {eventMedia.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {eventMedia.images.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img src={url} alt="" className="w-full h-20 object-cover rounded border" />
                          <button
                            type="button"
                            onClick={() => removeMediaItem('images', idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Multiple Videos Upload */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Additional Videos:</label>
                  <input 
                    type="file" 
                    accept="video/*" 
                    multiple 
                    onChange={(e) => uploadMultipleFiles(e.target.files, 'videos')} 
                    className="text-sm w-full px-3 py-2 border border-neutral-300 rounded-lg" 
                  />
                  <input 
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm" 
                    placeholder="Or paste video URLs (comma-separated)" 
                    value={eventForm.videos} 
                    onChange={(e)=>setEventForm({...eventForm, videos: e.target.value})} 
                  />
                  {eventMedia.videos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {eventMedia.videos.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <video src={url} className="w-full h-20 object-cover rounded border" muted />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMediaItem('videos', idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800" disabled={loading}>{loading?'Adding...':'Add Event'}</button>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-24">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-20">Image</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {events.map((ev, idx) => (
                    <tr key={ev.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={()=>moveItem('events', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button onClick={()=>moveItem('events', idx, 'down')} disabled={idx === events.length - 1} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {editingId === ev.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.title || ''} onChange={(e)=>setEditForm({...editForm, title: e.target.value})} />
                        ) : (
                          <span className="font-medium">{ev.title}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {editingId === ev.id ? (
                          <input type="date" className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.date || ''} onChange={(e)=>setEditForm({...editForm, date: e.target.value})} />
                        ) : (
                          ev.date
                        )}
                      </td>
                      <td className="px-4 py-3">{ev.imageUrl && <img src={ev.imageUrl} alt="" className="w-12 h-12 object-cover rounded" />}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === ev.id ? (
                            <>
                              <button onClick={()=>updateItem('events', ev.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(ev)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('events', ev.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {events.length === 0 && <div className="text-center py-12 text-neutral-500">No events yet</div>}
            </div>
          </div>
        )}

        {/* PROJECTS TABLE */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
              <form onSubmit={async(e)=>{ e.preventDefault(); await addItem('projects', projectForm); }} className="space-y-4">
                <input className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Project Name" value={projectForm.name} onChange={(e)=>setProjectForm({...projectForm, name: e.target.value})} required />
                <input className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Team (comma separated)" value={projectForm.team} onChange={(e)=>setProjectForm({...projectForm, team: e.target.value})} />
                <input className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Links (comma separated)" value={projectForm.links} onChange={(e)=>setProjectForm({...projectForm, links: e.target.value})} />
                <button type="submit" className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800" disabled={loading}>{loading?'Adding...':'Add Project'}</button>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Team</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        {editingId === p.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.name || ''} onChange={(e)=>setEditForm({...editForm, name: e.target.value})} />
                        ) : (
                          <span className="font-medium">{p.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {editingId === p.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.team || ''} onChange={(e)=>setEditForm({...editForm, team: e.target.value})} />
                        ) : (
                          (p.team || '').toString()
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === p.id ? (
                            <>
                              <button onClick={()=>updateItem('projects', p.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(p)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('projects', p.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {projects.length === 0 && <div className="text-center py-12 text-neutral-500">No projects yet</div>}
            </div>
          </div>
        )}

        {/* GALLERY TABLE */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add Gallery Images</h2>
              
              {/* Multiple Images Upload Form */}
              <form onSubmit={async(e)=>{ 
                e.preventDefault(); 
                if (galleryImages.length === 0 && !galleryForm.imageUrl) {
                  alert('Please select at least one image');
                  return;
                }
                
                // Upload all selected images
                const imagesToAdd = [...galleryImages];
                if (galleryForm.imageUrl) {
                  imagesToAdd.push(galleryForm.imageUrl);
                }
                
                setLoading(true);
                try {
                  // Add each image as a separate gallery item
                  for (const imageUrl of imagesToAdd) {
                    await addItem('gallery', { 
                      imageUrl, 
                      caption: galleryForm.caption || '' 
                    });
                  }
                  // Reset form
                  setGalleryImages([]);
                  setGalleryForm({ caption: '', imageUrl: '' });
                } catch (error) {
                  alert('Error adding images to gallery');
                } finally {
                  setLoading(false);
                }
              }} className="space-y-6">
                
                {/* Caption for all images */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Caption (will be applied to all uploaded images)
                  </label>
                  <input 
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg" 
                    placeholder="Enter caption for all images (optional)" 
                    value={galleryForm.caption} 
                    onChange={(e)=>setGalleryForm({...galleryForm, caption: e.target.value})} 
                  />
                </div>

                {/* Multiple File Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Select Multiple Images
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      
                      setUploadingImage(true);
                      try {
                        const uploadPromises = Array.from(files).map(file => uploadAndSet(file));
                        const urls = await Promise.all(uploadPromises);
                        const validUrls = urls.filter(url => url);
                        setGalleryImages(prev => [...prev, ...validUrls]);
                      } catch (error) {
                        alert('Error uploading images');
                      } finally {
                        setUploadingImage(false);
                      }
                    }}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
                    disabled={uploadingImage}
                  />
                  
                  {uploadingImage && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-900"></div>
                      Uploading images...
                    </div>
                  )}
                </div>

                {/* Single Image Upload (Alternative) */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Or Upload Single Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (ev)=>{ 
                        const file = ev.target.files?.[0]; 
                        if(file){ 
                          const url = await uploadAndSet(file); 
                          if (url) {
                            setGalleryForm({...galleryForm, imageUrl: url}); 
                          }
                        } 
                      }} 
                      className="text-sm flex-1"
                      disabled={uploadingImage}
                    />
                    {galleryForm.imageUrl && (
                      <div className="relative">
                        <img src={galleryForm.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded border-2 border-neutral-200" />
                        <button
                          type="button"
                          onClick={() => setGalleryForm({...galleryForm, imageUrl: ''})}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Grid for Multiple Images */}
                {galleryImages.length > 0 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-neutral-700">
                      Selected Images ({galleryImages.length})
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-64 overflow-y-auto p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                      {galleryImages.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img 
                            src={url} 
                            alt={`Preview ${idx + 1}`} 
                            className="w-full aspect-square object-cover rounded border-2 border-neutral-200 hover:border-neutral-400 transition-colors" 
                          />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-neutral-600">
                    {galleryImages.length > 0 && (
                      <span>{galleryImages.length} image{galleryImages.length !== 1 ? 's' : ''} ready to upload</span>
                    )}
                    {galleryForm.imageUrl && galleryImages.length > 0 && <span> + 1 single image</span>}
                    {galleryForm.imageUrl && galleryImages.length === 0 && <span>1 image ready to upload</span>}
                  </div>
                  
                  <div className="flex gap-3">
                    {(galleryImages.length > 0 || galleryForm.imageUrl) && (
                      <button
                        type="button"
                        onClick={() => {
                          setGalleryImages([]);
                          setGalleryForm({ caption: '', imageUrl: '' });
                        }}
                        className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                    
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors" 
                      disabled={loading || uploadingImage || (galleryImages.length === 0 && !galleryForm.imageUrl)}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Adding Images...
                        </div>
                      ) : (
                        `Add ${(galleryImages.length + (galleryForm.imageUrl ? 1 : 0))} Image${(galleryImages.length + (galleryForm.imageUrl ? 1 : 0)) !== 1 ? 's' : ''} to Gallery`
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-24">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase w-32">Image</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Caption</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {gallery.map((g, idx) => (
                    <tr key={g.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={()=>moveItem('gallery', idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button onClick={()=>moveItem('gallery', idx, 'down')} disabled={idx === gallery.length - 1} className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <img src={g.imageUrl} alt="" className="w-20 h-20 object-cover rounded border-2 border-neutral-200" />
                      </td>
                      <td className="px-4 py-3">
                        {editingId === g.id ? (
                          <input className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.caption || ''} onChange={(e)=>setEditForm({...editForm, caption: e.target.value})} />
                        ) : (
                          <span className="text-sm text-neutral-600">{g.caption || '—'}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === g.id ? (
                            <>
                              <button onClick={()=>updateItem('gallery', g.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(g)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('gallery', g.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {gallery.length === 0 && <div className="text-center py-12 text-neutral-500">No images yet</div>}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TABLE */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Announcement</h2>
              <form onSubmit={async(e)=>{ e.preventDefault(); await addItem('announcements', announceForm); }} className="space-y-4">
                <textarea className="w-full px-3 py-2 border border-neutral-300 rounded-lg" placeholder="Message" value={announceForm.message} onChange={(e)=>setAnnounceForm({...announceForm, message: e.target.value})} required rows={3} />
                <input type="date" className="w-full px-3 py-2 border border-neutral-300 rounded-lg" value={announceForm.date} onChange={(e)=>setAnnounceForm({...announceForm, date: e.target.value})} required />
                <button type="submit" className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800" disabled={loading}>{loading?'Adding...':'Add Announcement'}</button>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Message</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {announcements.map((a) => (
                    <tr key={a.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {editingId === a.id ? (
                          <input type="date" className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.date || ''} onChange={(e)=>setEditForm({...editForm, date: e.target.value})} />
                        ) : (
                          a.date
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === a.id ? (
                          <textarea className="w-full px-2 py-1 border border-neutral-300 rounded" value={editForm.message || ''} onChange={(e)=>setEditForm({...editForm, message: e.target.value})} rows={2} />
                        ) : (
                          <span className="text-sm">{a.message}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          {editingId === a.id ? (
                            <>
                              <button onClick={()=>updateItem('announcements', a.id, editForm)} className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                              <button onClick={cancelEdit} className="px-3 py-1 text-xs bg-neutral-300 text-neutral-700 rounded hover:bg-neutral-400">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={()=>startEdit(a)} className="px-3 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">Edit</button>
                              <button onClick={()=>deleteItem('announcements', a.id)} className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {announcements.length === 0 && <div className="text-center py-12 text-neutral-500">No announcements yet</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
