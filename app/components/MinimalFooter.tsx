import Link from 'next/link';

export default function MinimalFooter() {
  return (
    <footer className="w-full px-6 py-12 md:py-20 mt-auto bg-transparent">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8 border-t border-foreground/10 pt-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-foreground text-lg font-bold tracking-tight font-display">EDC</span>
            <span className="text-foreground/50 text-sm font-sans">Est. 2024. All rights reserved.</span>
          </div>
          <nav className="flex flex-wrap gap-8 md:gap-16 font-sans">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-base font-medium"
            >
              Instagram
              <svg className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-base font-medium"
            >
              LinkedIn
              <svg className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors text-base font-medium"
            >
              Contact
              <svg className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </nav>
        </div>
        
        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-foreground/5">
          <p className="text-foreground/40 text-xs font-sans">
            Designed & Developed by{' '}
            <a 
              href="https://www.porygonsol.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Porygon
            </a>
          </p>
          
          {/* Hidden Admin Access - looks like a copyright symbol */}
          <Link
            href="/admin"
            className="text-foreground/20 hover:text-primary transition-colors text-xs font-mono select-none"
            title="Admin"
          >
            ©
          </Link>
        </div>
      </div>
    </footer>
  );
}
