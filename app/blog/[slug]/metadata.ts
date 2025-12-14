import { Metadata } from 'next';
import { generatePageMetadata } from '@/app/metadata';

export function generateBlogMetadata(blog: {
  title: string;
  content: string;
  imageUrl?: string;
  slug: string;
  createdAt?: any;
}): Metadata {
  const description = blog.content.substring(0, 160).replace(/<[^>]*>/g, '');
  
  return {
    ...generatePageMetadata(
      blog.title,
      description,
      `/blog/${blog.slug}`,
      blog.imageUrl
    ),
    openGraph: {
      type: 'article',
      publishedTime: blog.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      authors: ['EDC Cell Coimbatore'],
    },
  };
}

export function generateBlogSchema(blog: {
  title: string;
  content: string;
  imageUrl?: string;
  slug: string;
  createdAt?: any;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.imageUrl || 'https://edccell.edu/og-image.jpg',
    datePublished: blog.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    dateModified: blog.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'EDC Cell Coimbatore',
      url: 'https://edccell.edu'
    },
    publisher: {
      '@type': 'Organization',
      name: 'EDC Cell Coimbatore',
      logo: {
        '@type': 'ImageObject',
        url: 'https://edccell.edu/logo.png'
      }
    },
    description: blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://edccell.edu/blog/${blog.slug}`
    }
  };
}
