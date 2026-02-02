'use client';

import { useEffect, useState } from 'react';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching members:', error);
        setLoading(false);
      });
  }, []);

  // Default members if API fails and loading is complete
  const displayMembers = members.length > 0 ? members : (loading ? [] : [
    { id: 1, name: 'Alexander Wright', role: 'President' },
    { id: 2, name: 'Elena Rossi', role: 'Vice President' },
    { id: 3, name: 'Marcus Chen', role: 'Head of Product' },
    { id: 4, name: "Sarah O'Connor", role: 'Head of Outreach' },
    { id: 5, name: 'David Kim', role: 'Tech Lead' },
    { id: 6, name: 'Priya Patel', role: 'Events Coordinator' },
  ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      <main className="flex flex-col items-center min-h-screen w-full px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-[1400px] w-full flex flex-col gap-20 md:gap-32">
          <div className="flex flex-col items-start gap-6 border-b border-foreground/10 pb-16 w-full">
            <div className="title-gradient">
              <h1 className="text-foreground text-[12vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none">
                Founders<span className="text-primary">.</span>
              </h1>
            </div>
            <div className="w-full flex justify-between items-end">
              <p className="font-sans text-foreground/60 text-sm md:text-base max-w-md leading-relaxed font-light">
                The architects of our ecosystem. A collective of ambitious minds driving innovation and fostering the spirit of entrepreneurship.
              </p>
              <span className="hidden md:block font-sans text-xs tracking-widest uppercase text-foreground/40">
                Academic Year 2024-25
              </span>
            </div>
          </div>

          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24 w-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group flex flex-col gap-2 relative animate-pulse">
                  <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-2">
                    <div className="h-3 bg-foreground/10 rounded w-24"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground/10"></div>
                  </div>
                  <div className="h-8 bg-foreground/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-foreground/5 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            // Actual content
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24 w-full">
              {displayMembers.map((member, index) => (
                <div key={member.id} className="group flex flex-col gap-2 relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between border-b border-foreground/20 pb-4 mb-2 transition-all duration-500 group-hover:border-primary">
                    <span className="font-sans text-xs tracking-widest text-foreground/40 uppercase">
                      {member.role}
                    </span>
                    <div className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-primary animate-pulse' : 'bg-primary/40 group-hover:bg-primary'} transition-colors`}></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-normal font-display text-foreground transition-all duration-300 group-hover:translate-x-2">
                    {member.name}
                  </h3>
                  <p className="font-sans text-foreground/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Leading innovation and entrepreneurship initiatives.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div aria-hidden="true" className="absolute top-[20%] right-0 w-[50%] h-[50%] bg-gradient-to-bl from-rose-100/20 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      </main>

      <MinimalFooter />
    </div>
  );
}
