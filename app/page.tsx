'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import StaggeredMenu from './components/StaggeredMenu';
import SpotlightCard from './components/SpotlightCard';
import CardSwap, { Card } from './components/CardSwap';
import HeroFigmaNew from './components/HeroFigmaNew';

// Lazy load heavy components
// CircularGallery removed - using simple grid layout instead

const HomePage = () => {
  const [counts, setCounts] = useState({ events: 0, participants: 0, ideas: 0, partners: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    // Fetch members
    fetch('/api/members')
      .then(res => res.json())
      .then(data => setMembers(data.items?.slice(0, 4) || []))
      .catch(console.error);

    // Fetch gallery
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setGallery(data.items?.slice(0, 6) || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { events: 25, participants: 1000, ideas: 20, partners: 15 };
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      // Use easing function for more natural animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCounts({
        events: Math.floor(targets.events * easeOutQuart),
        participants: Math.floor(targets.participants * easeOutQuart),
        ideas: Math.floor(targets.ideas * easeOutQuart),
        partners: Math.floor(targets.partners * easeOutQuart)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  return (
    <div className="relative overflow-x-hidden bg-background text-foreground">
      {/* Global Navigation - Visible on entire page */}
      <div className="fixed top-0 left-0 right-0 z-[9999]">
        <StaggeredMenu
          position="right"
          items={[
            { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
            { label: 'Blog', ariaLabel: 'View our blog', link: '/blog' },
            { label: 'Events', ariaLabel: 'View our events', link: '/events' },
            { label: 'Podcast', ariaLabel: 'Listen to our podcasts', link: '/podcast' },
            { label: 'Gallery', ariaLabel: 'View our gallery', link: '/gallery' },
            { label: 'Members', ariaLabel: 'Meet our team', link: '/members' },
            { label: 'Admin', ariaLabel: 'Admin panel', link: '/admin' }
          ]}
          socialItems={[
            { label: 'Instagram', link: 'https://instagram.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' },
            { label: 'Twitter', link: 'https://twitter.com' }
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000000"
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#FDFBF7', '#f0f0f0']}
          logoUrl="/logo.png"
          accentColor="#ec4899"
          isFixed={true}
        />
      </div>

      {/* Hero Section - From Figma Design */}
      <section className="relative w-full h-screen">
        {/* Figma Hero Design - New Optimized Version */}
        <HeroFigmaNew />
      </section>

      {/* About Section - Mobile Optimized */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 bg-background relative overflow-visible" style={{ zIndex: 100 }}>
        <div className="max-w-7xl mx-auto overflow-visible">
          
          {/* Mobile-First Layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 xl:gap-16">
            
            {/* Title Section - Better mobile typography */}
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold text-foreground tracking-tight leading-tight mb-6 lg:mb-8">
                About<br />Entrepreneurship<br />Development Cell
              </h2>

              {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
              <div className="hidden lg:flex gap-3">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).cardSwapNext) {
                      (window as any).cardSwapNext();
                    }
                  }}
                  className="p-3 lg:p-4 bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 rounded-full transition-all group backdrop-blur-sm"
                  aria-label="Previous card"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-foreground group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).cardSwapNext) {
                      (window as any).cardSwapNext();
                    }
                  }}
                  className="p-3 lg:p-4 bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 rounded-full transition-all group backdrop-blur-sm"
                  aria-label="Next card"
                >
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-foreground group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:flex-1">
              
              {/* Mobile: Simple Cards Grid */}
              <div className="lg:hidden grid gap-6 sm:gap-8">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 hover:bg-card/70 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">Our Mission</h3>
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                    The Entrepreneurship Development Cell (EDC) at our college aims to nurture entrepreneurial spirit among students by providing mentorship, resources, and opportunities to transform innovative ideas into successful ventures.
                  </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 hover:bg-card/70 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">Mentorship</h3>
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                    We connect students with experienced entrepreneurs, industry leaders, and successful founders who provide guidance, share insights, and help navigate the challenging journey from idea to execution.
                  </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 hover:bg-card/70 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">Innovation Hub</h3>
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                    Through workshops, hackathons, ideathons, and startup mentorship programs, we create an ecosystem where creativity thrives and groundbreaking ideas come to life through collaboration and experimentation.
                  </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 hover:bg-card/70 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground">Community</h3>
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                    Join a vibrant community of like-minded innovators, entrepreneurs, and dreamers. Network, collaborate, and build lasting connections that extend beyond the classroom into the real world of business and innovation.
                  </p>
                </div>
              </div>

              {/* Desktop: Interactive Card Stack */}
              <div className="hidden lg:block" style={{ minHeight: '500px', position: 'relative' }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={true}
                  width={600}
                  height={400}
                  onSwapRef={(swapFn) => {
                    if (typeof window !== 'undefined') {
                      (window as any).cardSwapNext = swapFn;
                    }
                  }}
                >
                  <Card>
                    <div className="p-6 lg:p-8 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Our Mission</h3>
                      </div>
                      <p className="text-base lg:text-lg text-foreground/90 leading-relaxed font-light">
                        The Entrepreneurship Development Cell (EDC) at our college aims to nurture entrepreneurial spirit among students by providing mentorship, resources, and opportunities to transform innovative ideas into successful ventures.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 lg:p-8 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Mentorship</h3>
                      </div>
                      <p className="text-base lg:text-lg text-foreground/90 leading-relaxed font-light">
                        We connect students with experienced entrepreneurs, industry leaders, and successful founders who provide guidance, share insights, and help navigate the challenging journey from idea to execution.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 lg:p-8 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Innovation Hub</h3>
                      </div>
                      <p className="text-base lg:text-lg text-foreground/90 leading-relaxed font-light">
                        Through workshops, hackathons, ideathons, and startup mentorship programs, we create an ecosystem where creativity thrives and groundbreaking ideas come to life through collaboration and experimentation.
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-6 lg:p-8 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-foreground/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">Community</h3>
                      </div>
                      <p className="text-base lg:text-lg text-foreground/90 leading-relaxed font-light">
                        Join a vibrant community of like-minded innovators, entrepreneurs, and dreamers. Network, collaborate, and build lasting connections that extend beyond the classroom into the real world of business and innovation.
                      </p>
                    </div>
                  </Card>
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="events" className="py-12 sm:py-16 md:py-24 px-4 bg-background relative" style={{ zIndex: 100 }}>
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-12 md:mb-16 text-foreground tracking-tight px-4">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.3)">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-foreground/20">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Startup Support</h3>
              <p className="text-foreground/70 font-light">Guiding students from idea to prototype</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.3)">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-foreground/20">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Workshops & Bootcamps</h3>
              <p className="text-foreground/70 font-light">Hands-on sessions on entrepreneurship & tech</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.3)">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-foreground/20">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Industry Collaboration</h3>
              <p className="text-foreground/70 font-light">Partnering with startups & incubators</p>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.3)">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-foreground/20">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Innovation Events</h3>
              <p className="text-foreground/70 font-light">Hackathons, ideathons, and competitions</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-20 px-4 bg-background text-foreground relative" style={{ zIndex: 100 }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-12 md:mb-16 tracking-tight text-foreground px-4">Our Impact So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 liquid-glass p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">{counts.events}+</div>
              <div className="text-lg md:text-xl text-foreground/90 font-light">Successful Events</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">{counts.participants}+</div>
              <div className="text-lg md:text-xl text-foreground/90 font-light">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">{counts.ideas}+</div>
              <div className="text-lg md:text-xl text-foreground/90 font-light">Startup Ideas Nurtured</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">{counts.partners}+</div>
              <div className="text-lg md:text-xl text-foreground/90 font-light">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 px-4 bg-background relative" style={{ zIndex: 100 }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-4 text-foreground tracking-tight px-4">Moments of Innovation</h2>
          <p className="text-center text-foreground/70 mb-12 text-lg font-light">A glimpse into our vibrant events and activities</p>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4">
              {gallery.slice(0, 6).map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <img 
                    src={img.imageUrl} 
                    alt={img.caption || 'Event'} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">{img.caption || 'Event'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center border border-foreground/10 rounded-sm mb-8">
              <p className="text-foreground/50 text-lg font-light">Loading gallery...</p>
            </div>
          )}
          <div className="text-center">
            <Link href="/gallery" className="inline-block px-8 py-4 bg-[#850E35] text-[#EE6983] font-semibold rounded-full hover:bg-[#850E35]/90 transition-all transform hover:scale-105 shadow-lg">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-4 bg-background relative" style={{ zIndex: 100 }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-4 text-foreground tracking-tight px-4">Meet Our Team</h2>
          <p className="text-center text-foreground/70 mb-12 text-lg font-light">The passionate minds behind Entrepreneurship Development Cell</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 px-4">
            {members.length > 0 ? members.map((member) => (
              <div key={member.id} className="bg-card p-6 rounded-2xl shadow-lg text-center hover-lift border border-border">
                {member.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-pink-400" />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    {member.name?.charAt(0) || '?'}
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-foreground/70">{member.role}</p>
              </div>
            )) : [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  ?
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Team Member</h3>
                <p className="text-foreground/70">Position</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/members" className="inline-block px-8 py-4 bg-[#850E35] text-[#EE6983] font-semibold rounded-full hover:bg-[#850E35]/90 transition-all transform hover:scale-105 shadow-lg">
              Meet Everyone
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-background relative" style={{ zIndex: 100 }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left side - Sticky Title */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight leading-tight text-center px-4">
                  Frequently<br />Asked<br />Questions
                </h2>
              </div>
            </div>

            {/* Right side - Questions */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                <details className="group bg-card rounded-xl p-6 hover:bg-card/80 transition-all border border-border">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-foreground">
                    What is Entrepreneurship Development Cell?
                    <span className="text-2xl text-pink-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed">
                    The Entrepreneurship Development Cell (EDC) is a student-driven initiative that fosters entrepreneurial spirit, provides mentorship, and creates opportunities for aspiring innovators and startup founders.
                  </p>
                </details>

                <details className="group bg-card rounded-xl p-6 hover:bg-card/80 transition-all border border-border">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-foreground">
                    How can I join Entrepreneurship Development Cell?
                    <span className="text-2xl text-pink-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed">
                    You can join by filling out our membership form or contacting us directly through email. We welcome all students passionate about entrepreneurship and innovation.
                  </p>
                </details>

                <details className="group bg-card rounded-xl p-6 hover:bg-card/80 transition-all border border-border">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-foreground">
                    What events does EDC organize?
                    <span className="text-2xl text-pink-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed">
                    We organize workshops, hackathons, ideathons, startup pitch competitions, networking sessions with industry leaders, and mentorship programs throughout the year.
                  </p>
                </details>

                <details className="group bg-card rounded-xl p-6 hover:bg-card/80 transition-all border border-border">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-foreground">
                    Do I need prior experience to participate?
                    <span className="text-2xl text-pink-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed">
                    No prior experience is required! We welcome students from all backgrounds and skill levels. Our events and programs are designed to help you learn and grow.
                  </p>
                </details>

                <details className="group bg-card rounded-xl p-6 hover:bg-card/80 transition-all border border-border">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-foreground">
                    How can EDC help my startup idea?
                    <span className="text-2xl text-pink-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-foreground/70 leading-relaxed">
                    We provide mentorship, resources, networking opportunities, and guidance to help you develop your idea from concept to prototype. We also connect you with industry experts and potential investors.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <section className="py-20 px-4 bg-background text-foreground relative" style={{ zIndex: 100 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-foreground/70">entrepreneurship@college.edu</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-foreground/70">Coimbatore, Tamil Nadu</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4 justify-center">
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Instagram</a>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 text-foreground/50 text-sm">
            <p className="mb-4">© 2024 Entrepreneurship Development Cell Coimbatore. Building tomorrow's entrepreneurs today.</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-foreground/50">designed by</span>
              <a
                href="https://www.instagram.com/porygonsol/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-all hover:scale-110"
                aria-label="Porygon Design Instagram"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/porygon-logo.png"
                  alt="Porygon Design"
                  className="w-8 h-8 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
