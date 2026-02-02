'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  // Default blogs if API fails and loading is complete
  const displayBlogs = blogs.length > 0 ? blogs : (loading ? [] : [
    {
      id: 1,
      title: "The Architect's Dilemma",
      content: "Balancing the structural integrity of a business model with the chaotic nature of rapid scaling. A look into sustainable growth.",
      date: 'Oct 24, 2024',
      slug: 'architects-dilemma'
    },
    {
      id: 2,
      title: 'Minimalism in Product',
      content: 'Why removing features is often more powerful than adding them. Case studies on streamlined user experiences.',
      date: 'Oct 10, 2024',
      slug: 'minimalism-in-product'
    },
    {
      id: 3,
      title: 'Venture Capital Dynamics',
      content: 'Understanding the psychology of the investor. How to position your narrative for maximum impact in seed rounds.',
      date: 'Sep 28, 2024',
      slug: 'venture-capital-dynamics'
    },
    {
      id: 4,
      title: 'The Zero to One Canvas',
      content: 'Before the product, there is the problem. A deep dive into problem space validation and early discovery.',
      date: 'Sep 15, 2024',
      slug: 'zero-to-one-canvas'
    },
  ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      <main className="flex flex-col items-center min-h-screen w-full px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-[1000px] w-full flex flex-col gap-16">
          <header className="flex flex-col gap-4 border-b border-foreground/10 pb-12">
            <div className="title-gradient">
              <h1 className="text-foreground text-[12vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none">
                Insights<span className="text-primary">.</span>
              </h1>
            </div>
            <p className="text-foreground/60 text-base md:text-lg font-sans font-light tracking-wide uppercase text-xs">
              Curated thoughts on innovation & scale
            </p>
          </header>

          <div className="flex flex-col gap-0">
            {loading ? (
              // Loading skeleton
              [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="group flex flex-col gap-4 py-12 border-b border-foreground/5 animate-pulse"
                >
                  <div className="h-4 bg-foreground/10 rounded w-20"></div>
                  <div className="h-10 bg-foreground/10 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-foreground/5 rounded w-full"></div>
                    <div className="h-5 bg-foreground/5 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            ) : (
              displayBlogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col gap-4 py-12 border-b border-foreground/5 transition-all duration-500 hover:bg-white/40 hover:px-8 -mx-8 rounded-2xl opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <span className="text-primary text-sm font-sans font-medium">
                    {blog.date}
                  </span>
                  <h2 className="text-3xl md:text-4xl text-foreground font-display font-normal leading-tight group-hover:text-primary transition-colors duration-300">
                    {blog.title}
                  </h2>
                  <p className="text-foreground/60 font-sans text-base md:text-lg font-light leading-relaxed">
                    {blog.content}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div aria-hidden="true" className="absolute top-[20%] right-0 w-[50%] h-[50%] bg-gradient-to-bl from-rose-100/20 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      </main>

      <MinimalFooter />
    </div>
  );
}
