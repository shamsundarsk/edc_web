// Admin layout wrapper
'use client';

import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  totalItems: number;
}

export function AdminLayout({ children, totalItems }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
            <div className="hidden lg:block">
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-charcoal-light/60 font-sans font-bold mb-1">
                  Total Items
                </p>
                <p className="text-4xl font-light text-charcoal font-display">
                  {totalItems}
                </p>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
