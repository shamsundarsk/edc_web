'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const podcasts = [
    {
      id: 1,
      title: "Entrepreneurship Unleashed",
      spotifyUrl: "https://open.spotify.com/show/6HubqiKmeU6YPN7yVOI9Bd",
      showId: "6HubqiKmeU6YPN7yVOI9Bd",
    },
    {
      id: 2,
      title: "Innovation Talks",
      spotifyUrl: "https://open.spotify.com/show/7na8KkBGav2CPPgdDv3GQE",
      showId: "7na8KkBGav2CPPgdDv3GQE",
    }
  ];

  // Mock episode data
  useEffect(() => {
    const mockEpisodes = [
      {
        id: "ep1",
        episode: "04",
        name: "Building Your First Startup",
        description: "From Idea to MVP",
        guest: "Sarah Chen",
        guestTitle: "Founder of Vertex AI",
        duration: "48 min",
        publishDate: "2024-01-15",
        showId: "6HubqiKmeU6YPN7yVOI9Bd",
        spotifyUrl: "https://open.spotify.com/episode/example1",
      },
      {
        id: "ep2",
        episode: "03",
        name: "The Future of AI in Business",
        description: "Design Systems for Scale",
        guest: "Marcus Thorne",
        guestTitle: "CPO at Lumina",
        duration: "52 min",
        publishDate: "2024-01-10",
        showId: "7na8KkBGav2CPPgdDv3GQE",
        spotifyUrl: "https://open.spotify.com/episode/example2",
      },
      {
        id: "ep3",
        episode: "02",
        name: "Scaling Your Startup",
        description: "Bootstrapping to $1M",
        guest: "Elena Rodriguez",
        guestTitle: "Founder of Base",
        duration: "45 min",
        publishDate: "2024-01-08",
        showId: "6HubqiKmeU6YPN7yVOI9Bd",
        spotifyUrl: "https://open.spotify.com/episode/example3",
      },
      {
        id: "ep4",
        episode: "01",
        name: "The Psychology of Founding",
        description: "Understanding the Founder's Mind",
        guest: "Dr. James Alistair",
        guestTitle: "Behavioral Economist",
        duration: "60 min",
        publishDate: "2024-01-05",
        showId: "7na8KkBGav2CPPgdDv3GQE",
        spotifyUrl: "https://open.spotify.com/episode/example4",
      },
    ];

    setTimeout(() => {
      setEpisodes(mockEpisodes);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      {/* Header */}
      <header className="w-full px-6 pt-32 pb-16 md:pt-48 md:pb-24 relative z-10 flex flex-col items-center">
        <div className="max-w-[1400px] w-full text-center">
          <div className="title-gradient inline-block">
            <h1 className="text-foreground text-[15vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none cursor-default opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              Voices<span className="text-primary">.</span>
            </h1>
          </div>
          <p className="mt-8 text-foreground/70 text-lg md:text-xl font-sans font-light tracking-wide max-w-lg mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            Conversations with the architects of the future. Unfiltered, insightful, and purely entrepreneurial.
          </p>
        </div>
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-rose-100/30 to-transparent dark:from-rose-900/10 dark:to-transparent blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      </header>

      {/* Episodes List */}
      <main className="w-full px-6 md:px-20 pb-32 flex justify-center z-20">
        <div className="max-w-[1000px] w-full flex flex-col gap-0 border-t border-border">
          {loading ? (
            <div className="py-20 text-center text-foreground/50">Loading episodes...</div>
          ) : (
            episodes.map((episode) => (
              <article
                key={episode.id}
                className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-12 border-b border-border/50 transition-all duration-500 hover:bg-white/40 dark:hover:bg-white/5 hover:px-8 -mx-8 rounded-2xl cursor-pointer"
              >
                {/* Play Button */}
                <div className="flex items-center justify-center shrink-0">
                  <button className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300 bg-transparent group-hover:bg-primary text-foreground group-hover:text-white">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Episode Info */}
                <div className="flex flex-col flex-grow gap-2">
                  <div className="flex items-baseline gap-4 mb-1">
                    <span className="text-primary text-xs font-sans font-bold tracking-widest uppercase">
                      Ep. {episode.episode}
                    </span>
                    <span className="text-foreground/40 text-xs font-sans">
                      {episode.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl text-foreground font-light font-display leading-tight group-hover:text-primary transition-colors duration-300">
                    {episode.name}
                  </h2>
                  <p className="text-foreground/60 font-sans text-base md:text-lg font-light mt-1">
                    with <span className="font-normal text-foreground">{episode.guest}</span>, {episode.guestTitle}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

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
