'use client';

import MinimalNav from './components/MinimalNav';
import MinimalFooter from './components/MinimalFooter';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[90vh] w-full px-6 py-20 relative z-10">
        <div className="max-w-[1400px] w-full flex flex-col items-center text-center gap-12">
          <div className="title-gradient">
            <h1 className="text-foreground text-[15vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none cursor-default opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              Visionaries<span className="text-primary">.</span>
            </h1>
          </div>
          <div className="flex flex-col items-center gap-10 mt-4 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            <p className="text-foreground/70 text-lg md:text-xl font-normal font-sans leading-relaxed max-w-[520px] text-center">
              Where ambition meets architecture. We build the founders of tomorrow through curated mentorship and refined innovation.
            </p>
            <Link
              href="/members"
              className="group relative flex items-center justify-center gap-3 bg-primary text-white rounded-full px-10 py-4 text-base font-medium font-sans tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
            >
              <span>Enter</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-rose-100/30 to-transparent blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      </main>

      {/* Mission Section */}
      <section className="w-full px-6 md:px-20 py-32 md:py-48 flex justify-center bg-transparent">
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start border-t border-foreground/10 pt-12">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-primary text-sm uppercase tracking-widest font-bold font-sans">01 — The Mission</span>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            <p className="text-2xl md:text-4xl text-foreground leading-tight font-light font-display">
              To cultivate a refined ecosystem of innovation, bridging the gap between academic theory and market reality.
            </p>
            <p className="text-foreground/60 text-lg leading-relaxed max-w-2xl font-sans font-light">
              We believe that true entrepreneurship is an art form. It requires the discipline of an architect and the vision of an artist. Our cell provides the canvas—resources, network, and capital—for you to design the future.
            </p>
          </div>
        </div>
      </section>

      <MinimalFooter />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
