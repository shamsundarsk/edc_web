// Type definitions for admin panel

export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug?: string;
  createdAt?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  linkedin?: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  dateTBA?: boolean;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  registrationLink?: string;
  slug?: string;
}

export interface GalleryItem {
  id: string;
  title?: string;
  images: {
    url: string;
    caption?: string;
  }[];
  mainCaption?: string;
}

export interface Announcement {
  id: string;
  message: string;
  date: string;
  dateTBA?: boolean;
}

export type Collection = 'blogs' | 'members' | 'events' | 'gallery' | 'announcements';

export interface TabConfig {
  id: Collection;
  label: string;
  count: number;
}
