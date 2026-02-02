'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';

export default function MinimalNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Members', href: '/members' },
    { label: 'Blog', href: '/blog' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Join', href: '/join' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-transparent">
        <Link href="/" className="text-charcoal text-xl font-bold tracking-tight font-display hover:text-primary transition-colors">
          EDC
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-sans tracking-wide liquid-glass px-6 py-3 rounded-2xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href 
                  ? 'text-primary font-medium border-b-2 border-primary pb-1' 
                  : 'text-charcoal-light hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-charcoal hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl animate-[slideInRight_0.3s_ease-out]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-charcoal/10">
                <span className="text-charcoal text-xl font-bold tracking-tight font-display">EDC</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-charcoal hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl font-sans text-base transition-all ${
                        pathname === item.href 
                          ? 'bg-primary text-white font-medium' 
                          : 'text-charcoal-light hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
              
              {/* Footer */}
              <div className="p-6 border-t border-charcoal/10">
                <p className="text-xs text-charcoal-light/60 font-sans text-center">
                  © 2024 EDC. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
