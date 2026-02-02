'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Upload, X, Save, Edit2, Trash2, ChevronUp, ChevronDown, Calendar, Image as ImageIcon, Video } from 'lucide-react';

type AnyObj = Record<string, any>;

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');

  const [blogs, setBlogs] = useState<AnyObj[]>([]);
  const [members, setMembers] = useState<AnyObj[]>([]);
  const [events, setEvents] = useState<AnyObj[]>([]);
  const [gallery, setGallery] = useState<AnyObj[]>([]);
  const [announcements, setAnnouncements] = useState<AnyObj[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AnyObj>({});

  const [blogForm, setBlogForm] = useState({ title: '', content: '', imageUrl: '' });
  const [memberForm, setMemberForm] = useState({ name: '', role: '', linkedin: '', imageUrl: '' });
  const [eventForm, setEventForm] = useState({ 
    title: '', 
    date: '', 
    dateTBA: false,
    description: '', 
    imageUrl: '', 
    videoUrl: '', 
    registrationLink: '' 
  });
  const [galleryForm, setGalleryForm] = useState({ caption: '', imageUrl: '' });
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [announceForm, setAnnounceForm] = useState({ message: '', date: '', dateTBA: false });

  useEffect(()=>{ if (authed) fetchAll(); }, [authed]);

  const login = ()=>{
    if (pass === process.env.NEXT_PUBLIC_ADMIN_PASS) setAuthed(true);
    else alert('Wrong password');
  };

  async function fetchAll(){
    try{
      const endpoints = ['blogs','members','events','gallery','announcements'];
      for(const e of endpoints){
        const res = await fetch(`/api/${e}`);
        const json = await res.json();
        if(json?.items){
          if(e==='blogs') setBlogs(json.items);
          if(e==='members') setMembers(json.items);
          if(e==='events') setEvents(json.items);
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 50);
  };

  async function addItem(collection:string, data:AnyObj){
    setLoading(true);
    
    // Auto-generate slug for blogs and events
    if ((collection === 'blogs' || collection === 'events') && data.title) {
      data.slug = generateSlug(data.title);
    }
    
    const res = await fetch(`/api/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if(res.ok){ 
      fetchAll();
      // Reset forms
      if(collection === 'blogs') setBlogForm({ title: '', content: '', imageUrl: '' });
      if(collection === 'members') setMemberForm({ name: '', role: '', linkedin: '', imageUrl: '' });
      if(collection === 'events') setEventForm({ title: '', date: '', dateTBA: false, description: '', imageUrl: '', videoUrl: '', registrationLink: '' });
      if(collection === 'gallery') {
        setGalleryForm({ caption: '', imageUrl: '' });
        setGalleryImages([]);
      }
      if(collection === 'announcements') setAnnounceForm({ message: '', date: '', dateTBA: false });
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
    
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    setItems(items);

    try {
      const response = await fetch(`/api/${collection}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      
      if (!response.ok) fetchAll();
    } catch (error) {
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

  const tabs = [
    { id: 'blogs', label: 'Blogs', count: blogs.length },
    { id: 'members', label: 'Members', count: members.length },
    { id: 'events', label: 'Events', count: events.length },
    { id: 'gallery', label: 'Gallery', count: gallery.length },
    { id: 'announcements', label: 'Announcements', count: announcements.length },
  ];

  if(!authed){
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl border border-charcoal/10 p-10 shadow-2xl shadow-primary/5">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-display font-light text-charcoal mb-2">Authority<span className="text-primary">.</span></h1>
              <p className="text-charcoal-light/60 font-sans text-sm">Enter credentials to continue</p>
            </div>
            <div className="space-y-5">
              <input 
                value={pass} 
                onChange={(e)=>setPass(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && login()}
                type="password" 
                className="w-full px-5 py-4 border-2 border-charcoal/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-sans transition-all" 
                placeholder="Password" 
              />
              <button 
                onClick={login} 
                className="w-full px-5 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 font-sans"
              >
                Sign In
              </button>
              <Link href="/" className="block text-center text-sm text-charcoal-light/60 hover:text-primary transition-colors font-sans">
                ← Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background-light to-primary/5">
      {/* Header */}
      <nav className="w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 border-b border-charcoal/5 bg-white/50 backdrop-blur-md sticky top-0">
        <Link href="/" className="text-charcoal text-xl font-bold tracking-tight hover:text-primary transition-colors font-display">
          EDC<span className="text-primary text-2xl">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-charcoal-light font-sans">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-700 text-xs font-medium">System Online</span>
          </div>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-charcoal/5 rounded-xl transition-colors">
            <span>Exit</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-6 md:px-12 py-12 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex items-end justify-between mb-8">
            <div className="title-gradient">
              <h1 className="text-charcoal text-[8vw] md:text-[6rem] leading-[0.85] tracking-[-0.04em] font-display font-light select-none">
                Authority<span className="text-primary">.</span>
              </h1>
            </div>
            <div className="hidden lg:grid grid-cols-3 gap-8">
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-charcoal-light/60 font-sans font-bold mb-1">Total Items</p>
                <p className="text-4xl font-light text-charcoal font-display">
                  {blogs.length + members.length + events.length + gallery.length + announcements.length}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 opacity-0 animate-fade-in-up [animation-delay:200ms]">
          {tabs.map(tab => (
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

          {/* BLOGS SECTION */}
          {activeTab === 'blogs' && (
            <div className="space-y-8">
              {/* Add Form */}
              <div className="bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg">
                <h2 className="text-2xl font-display font-light text-charcoal mb-6">Add New Blog</h2>
                <form onSubmit={async(e)=>{ e.preventDefault(); await addItem('blogs', blogForm); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Title</label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                      placeholder="Enter blog title" 
                      value={blogForm.title} 
                      onChange={(e)=>setBlogForm({...blogForm, title: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Content</label>
                    <textarea 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none" 
                      placeholder="Write your blog content..." 
                      value={blogForm.content} 
                      onChange={(e)=>setBlogForm({...blogForm, content: e.target.value})} 
                      required 
                      rows={5} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">Featured Image</label>
                    <div className="flex items-center gap-4">
                      {blogForm.imageUrl ? (
                        <div className="relative group">
                          <img src={blogForm.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border-2 border-charcoal/10" />
                          <button
                            type="button"
                            onClick={() => setBlogForm({...blogForm, imageUrl: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-charcoal/20 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                          <Upload className="w-8 h-8 text-charcoal-light/40 mb-2" />
                          <span className="text-xs text-charcoal-light/60 font-sans">Upload</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (ev)=>{ 
                              const file = ev.target.files?.[0]; 
                              if(file){ 
                                const url = await uploadAndSet(file); 
                                if (url) setBlogForm({...blogForm, imageUrl: url}); 
                              } 
                            }} 
                            disabled={uploadingImage}
                          />
                        </label>
                      )}
                      {uploadingImage && (
                        <div className="flex items-center gap-2 text-sm text-charcoal-light/70 font-sans">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium font-sans transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" 
                    disabled={loading || uploadingImage}
                  >
                    {loading ? 'Adding...' : 'Add Blog'}
                  </button>
                </form>
              </div>

              {/* Blogs List */}
              <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-charcoal/5 to-primary/5 border-b border-charcoal/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Order</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Image</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/5">
                      {blogs.map((b, idx) => (
                        <tr key={b.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button onClick={()=>moveItem('blogs', idx, 'up')} disabled={idx === 0} className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors">
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button onClick={()=>moveItem('blogs', idx, 'down')} disabled={idx === blogs.length - 1} className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors">
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-charcoal font-sans">{b.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            {b.imageUrl && <img src={b.imageUrl} alt="" className="w-16 h-16 object-cover rounded-xl" />}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              <button onClick={()=>deleteItem('blogs', b.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
              </div>
            </div>
          )}

          {/* MEMBERS SECTION */}
          {activeTab === 'members' && (
            <div className="space-y-8">
              {/* Add Form */}
              <div className="bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg">
                <h2 className="text-2xl font-display font-light text-charcoal mb-6">Add New Member</h2>
                <form onSubmit={async(e)=>{ 
                  e.preventDefault(); 
                  if (!memberForm.imageUrl) {
                    alert('Please upload a photo first');
                    return;
                  }
                  await addItem('members', memberForm); 
                }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Name</label>
                      <input 
                        className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                        placeholder="Full name" 
                        value={memberForm.name} 
                        onChange={(e)=>setMemberForm({...memberForm, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Role</label>
                      <input 
                        className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                        placeholder="Position/Role" 
                        value={memberForm.role} 
                        onChange={(e)=>setMemberForm({...memberForm, role: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">LinkedIn URL (optional)</label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                      placeholder="https://linkedin.com/in/..." 
                      value={memberForm.linkedin} 
                      onChange={(e)=>setMemberForm({...memberForm, linkedin: e.target.value})} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">Profile Photo *</label>
                    <div className="flex items-center gap-4">
                      {memberForm.imageUrl ? (
                        <div className="relative group">
                          <img src={memberForm.imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full border-4 border-charcoal/10" />
                          <button
                            type="button"
                            onClick={() => setMemberForm({...memberForm, imageUrl: ''})}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-charcoal/20 rounded-full cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                          <Upload className="w-8 h-8 text-charcoal-light/40 mb-2" />
                          <span className="text-xs text-charcoal-light/60 font-sans">Upload</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (ev)=>{ 
                              const file = ev.target.files?.[0]; 
                              if(file){ 
                                const url = await uploadAndSet(file); 
                                if (url) setMemberForm({...memberForm, imageUrl: url}); 
                              } 
                            }} 
                            disabled={uploadingImage}
                          />
                        </label>
                      )}
                      {uploadingImage && (
                        <div className="flex items-center gap-2 text-sm text-charcoal-light/70 font-sans">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium font-sans transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" 
                    disabled={loading || uploadingImage || !memberForm.imageUrl}
                  >
                    {loading ? 'Adding...' : 'Add Member'}
                  </button>
                </form>
              </div>

              {/* Members List */}
              <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-charcoal/5 to-primary/5 border-b border-charcoal/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Order</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Photo</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Role</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-charcoal-light/70 uppercase tracking-wider font-sans">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/5">
                      {members.map((m, idx) => (
                        <tr key={m.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex gap-1">
                              <button onClick={()=>moveItem('members', idx, 'up')} disabled={idx === 0} className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors">
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button onClick={()=>moveItem('members', idx, 'down')} disabled={idx === members.length - 1} className="p-2 hover:bg-charcoal/10 rounded-lg disabled:opacity-30 transition-colors">
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {editingId === m.id ? (
                              <div className="relative group">
                                <img src={editForm.imageUrl || m.imageUrl} alt="" className="w-16 h-16 object-cover rounded-full border-2 border-charcoal/10" />
                                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                  <Upload className="w-6 h-6 text-white" />
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden"
                                    onChange={async (ev)=>{ 
                                      const file = ev.target.files?.[0]; 
                                      if(file){ 
                                        const url = await uploadAndSet(file); 
                                        if (url) setEditForm({...editForm, imageUrl: url}); 
                                      } 
                                    }} 
                                  />
                                </label>
                              </div>
                            ) : (
                              m.imageUrl && <img src={m.imageUrl} alt="" className="w-16 h-16 object-cover rounded-full border-2 border-charcoal/10" />
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === m.id ? (
                              <input 
                                className="w-full px-3 py-2 border-2 border-charcoal/10 rounded-lg font-sans focus:border-primary outline-none" 
                                value={editForm.name || ''} 
                                onChange={(e)=>setEditForm({...editForm, name: e.target.value})} 
                              />
                            ) : (
                              <span className="font-medium text-charcoal font-sans">{m.name}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === m.id ? (
                              <input 
                                className="w-full px-3 py-2 border-2 border-charcoal/10 rounded-lg font-sans focus:border-primary outline-none" 
                                value={editForm.role || ''} 
                                onChange={(e)=>setEditForm({...editForm, role: e.target.value})} 
                              />
                            ) : (
                              <span className="text-charcoal-light font-sans">{m.role}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              {editingId === m.id ? (
                                <>
                                  <button onClick={()=>updateItem('members', m.id, editForm)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button onClick={cancelEdit} className="p-2 text-charcoal-light hover:bg-charcoal/10 rounded-lg transition-colors">
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button onClick={()=>startEdit(m)} className="p-2 text-charcoal-light hover:bg-charcoal/10 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button onClick={()=>deleteItem('members', m.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
              </div>
            </div>
          )}

          {/* EVENTS SECTION - Simplified */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg">
                <h2 className="text-2xl font-display font-light text-charcoal mb-6">Add New Event</h2>
                <form onSubmit={async(e)=>{ 
                  e.preventDefault(); 
                  const data = {...eventForm};
                  if (data.dateTBA) data.date = 'TBA';
                  await addItem('events', data); 
                }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Title</label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                      placeholder="Event title" 
                      value={eventForm.title} 
                      onChange={(e)=>setEventForm({...eventForm, title: e.target.value})} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Date</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="date" 
                        className="flex-1 px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all disabled:bg-charcoal/5" 
                        value={eventForm.date} 
                        onChange={(e)=>setEventForm({...eventForm, date: e.target.value})} 
                        disabled={eventForm.dateTBA}
                        required={!eventForm.dateTBA}
                      />
                      <label className="flex items-center gap-2 px-4 py-3 border-2 border-charcoal/10 rounded-xl cursor-pointer hover:bg-charcoal/5 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={eventForm.dateTBA}
                          onChange={(e)=>setEventForm({...eventForm, dateTBA: e.target.checked, date: e.target.checked ? '' : eventForm.date})}
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <span className="text-sm font-sans text-charcoal-light">Date TBA</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Description</label>
                    <textarea 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none" 
                      placeholder="Event description..." 
                      value={eventForm.description} 
                      onChange={(e)=>setEventForm({...eventForm, description: e.target.value})} 
                      required 
                      rows={4} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">Image</label>
                      {eventForm.imageUrl ? (
                        <div className="relative group">
                          <img src={eventForm.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-xl border-2 border-charcoal/10" />
                          <button
                            type="button"
                            onClick={() => setEventForm({...eventForm, imageUrl: ''})}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-charcoal/20 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                          <ImageIcon className="w-8 h-8 text-charcoal-light/40 mb-2" />
                          <span className="text-xs text-charcoal-light/60 font-sans">Upload Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={async (ev)=>{ 
                              const file = ev.target.files?.[0]; 
                              if(file){ 
                                const url = await uploadAndSet(file); 
                                if (url) setEventForm({...eventForm, imageUrl: url}); 
                              } 
                            }} 
                          />
                        </label>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Video URL (optional)</label>
                      <input 
                        className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                        placeholder="YouTube/Vimeo URL" 
                        value={eventForm.videoUrl} 
                        onChange={(e)=>setEventForm({...eventForm, videoUrl: e.target.value})} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Registration Link (optional)</label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" 
                      placeholder="https://..." 
                      value={eventForm.registrationLink} 
                      onChange={(e)=>setEventForm({...eventForm, registrationLink: e.target.value})} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 font-medium font-sans transition-all shadow-lg shadow-primary/20" 
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Event'}
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-charcoal/5 to-primary/5 border-b border-charcoal/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase font-sans">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-charcoal-light/70 uppercase font-sans">Date</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-charcoal-light/70 uppercase font-sans">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal/5">
                      {events.map((ev) => (
                        <tr key={ev.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-charcoal font-sans">{ev.title}</td>
                          <td className="px-6 py-4 text-charcoal-light font-sans">{ev.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              <button onClick={()=>deleteItem('events', ev.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {events.length === 0 && <div className="text-center py-16 text-charcoal-light/60 font-sans">No events yet</div>}
                </div>
              </div>
            </div>
          )}

          {/* GALLERY SECTION */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg">
                <h2 className="text-2xl font-display font-light text-charcoal mb-6">Add Gallery Images</h2>
                <form onSubmit={async(e)=>{ 
                  e.preventDefault(); 
                  if (galleryImages.length === 0 && !galleryForm.imageUrl) {
                    alert('Please select at least one image');
                    return;
                  }
                  const imagesToAdd = [...galleryImages];
                  if (galleryForm.imageUrl) imagesToAdd.push(galleryForm.imageUrl);
                  
                  setLoading(true);
                  for (const imageUrl of imagesToAdd) {
                    await addItem('gallery', { imageUrl, caption: galleryForm.caption || '' });
                  }
                  setLoading(false);
                }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-3 font-sans">Upload Images</label>
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-charcoal/20 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                      <Upload className="w-12 h-12 text-charcoal-light/40 mb-3" />
                      <span className="text-sm text-charcoal-light/60 font-sans">Click to upload or drag and drop</span>
                      <span className="text-xs text-charcoal-light/40 font-sans mt-1">Multiple images supported</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          
                          setUploadingImage(true);
                          const uploadPromises = Array.from(files).map(file => uploadAndSet(file));
                          const urls = await Promise.all(uploadPromises);
                          const validUrls = urls.filter(url => url);
                          setGalleryImages(prev => [...prev, ...validUrls]);
                          setUploadingImage(false);
                        }}
                      />
                    </label>
                  </div>
                  
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {galleryImages.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <img src={url} alt="" className="w-full aspect-square object-cover rounded-xl border-2 border-charcoal/10" />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 font-medium font-sans transition-all shadow-lg shadow-primary/20" 
                    disabled={loading || (galleryImages.length === 0 && !galleryForm.imageUrl)}
                  >
                    {loading ? 'Adding...' : `Add ${galleryImages.length} Image${galleryImages.length !== 1 ? 's' : ''}`}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="relative group">
                    <img src={g.imageUrl} alt="" className="w-full aspect-square object-cover rounded-xl border-2 border-charcoal/10" />
                    <button
                      onClick={()=>deleteItem('gallery', g.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {gallery.length === 0 && <div className="text-center py-16 text-charcoal-light/60 font-sans bg-white rounded-3xl border border-charcoal/10">No gallery images yet</div>}
            </div>
          )}

          {/* ANNOUNCEMENTS SECTION */}
          {activeTab === 'announcements' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg">
                <h2 className="text-2xl font-display font-light text-charcoal mb-6">Add Announcement</h2>
                <form onSubmit={async(e)=>{ 
                  e.preventDefault(); 
                  const data = {...announceForm};
                  if (data.dateTBA) data.date = 'TBA';
                  await addItem('announcements', data); 
                }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Message</label>
                    <textarea 
                      className="w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none" 
                      placeholder="Announcement message..." 
                      value={announceForm.message} 
                      onChange={(e)=>setAnnounceForm({...announceForm, message: e.target.value})} 
                      required 
                      rows={3} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">Date</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="date" 
                        className="flex-1 px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all disabled:bg-charcoal/5" 
                        value={announceForm.date} 
                        onChange={(e)=>setAnnounceForm({...announceForm, date: e.target.value})} 
                        disabled={announceForm.dateTBA}
                        required={!announceForm.dateTBA}
                      />
                      <label className="flex items-center gap-2 px-4 py-3 border-2 border-charcoal/10 rounded-xl cursor-pointer hover:bg-charcoal/5 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={announceForm.dateTBA}
                          onChange={(e)=>setAnnounceForm({...announceForm, dateTBA: e.target.checked, date: e.target.checked ? '' : announceForm.date})}
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <span className="text-sm font-sans text-charcoal-light">Date TBA</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 font-medium font-sans transition-all shadow-lg shadow-primary/20" 
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Announcement'}
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-white rounded-2xl border border-charcoal/10 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-charcoal font-sans mb-2">{a.message}</p>
                        <p className="text-sm text-charcoal-light/60 font-sans">{a.date}</p>
                      </div>
                      <button onClick={()=>deleteItem('announcements', a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && <div className="text-center py-16 text-charcoal-light/60 font-sans bg-white rounded-3xl border border-charcoal/10">No announcements yet</div>}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
