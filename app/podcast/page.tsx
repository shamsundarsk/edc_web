'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import SideNav from '@/app/components/SideNav';
import { generatePageMetadata } from '@/app/metadata';

// Note: This would typically be generated server-side, but for demo we'll use client-side
// export const metadata: Metadata = generatePageMetadata(
//   'Podcasts | EDC CIT - Entrepreneurship Talks & Insights',
//   'Listen to our entrepreneurship podcasts featuring startup stories, business insights, and conversations with successful entrepreneurs. Available on Spotify.',
//   '/podcast'
// );

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const podcasts = [
    {
      id: 1,
      title: "Entrepreneurship Unleashed",
      description: "Dive deep into the world of entrepreneurship with inspiring stories, practical advice, and insights from successful business leaders.",
      spotifyUrl: "https://open.spotify.com/show/6HubqiKmeU6YPN7yVOI9Bd?si=Da9sx1nJT1mS3mzaKJrNcA&utm_source=ig&utm_medium=social&utm_content=link_in_bio&nd=1&dlsi=eb144170e5c24b93",
      embedUrl: "https://open.spotify.com/embed/show/6HubqiKmeU6YPN7yVOI9Bd?utm_source=generator&theme=0",
      showId: "6HubqiKmeU6YPN7yVOI9Bd",
      topics: ["Startup Stories", "Business Strategy", "Leadership", "Innovation"]
    },
    {
      id: 2,
      title: "Innovation Talks",
      description: "Explore cutting-edge innovations, emerging technologies, and the minds behind revolutionary ideas that are shaping our future.",
      spotifyUrl: "https://open.spotify.com/show/7na8KkBGav2CPPgdDv3GQE?si=xPvngVRNS_Wlf84ybm0EHg&utm_source=ig&utm_medium=social&utm_content=link_in_bio&nd=1&dlsi=aed55a7dddbc4220",
      embedUrl: "https://open.spotify.com/embed/show/7na8KkBGav2CPPgdDv3GQE?utm_source=generator&theme=0",
      showId: "7na8KkBGav2CPPgdDv3GQE",
      topics: ["Technology", "Innovation", "Future Trends", "Research"]
    }
  ];

  // Mock episode data - In production, this would come from Spotify API
  useEffect(() => {
    const mockEpisodes = [
      {
        id: "ep1",
        name: "Building Your First Startup: From Idea to MVP",
        description: "Join us as we explore the journey of turning a simple idea into a minimum viable product. Our guest shares insights on market validation, team building, and early-stage funding.",
        duration: "45 min",
        publishDate: "2024-01-15",
        showId: "6HubqiKmeU6YPN7yVOI9Bd",
        showName: "Entrepreneurship Unleashed",
        spotifyUrl: "https://open.spotify.com/episode/example1",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: "ep2",
        name: "The Future of AI in Business",
        description: "Exploring how artificial intelligence is revolutionizing industries and creating new opportunities for entrepreneurs and innovators.",
        duration: "38 min",
        publishDate: "2024-01-10",
        showId: "7na8KkBGav2CPPgdDv3GQE",
        showName: "Innovation Talks",
        spotifyUrl: "https://open.spotify.com/episode/example2",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: "ep3",
        name: "Scaling Your Startup: Lessons from Unicorn Founders",
        description: "Learn from successful entrepreneurs who have scaled their startups to billion-dollar valuations. Discover the strategies, challenges, and key decisions that made the difference.",
        duration: "52 min",
        publishDate: "2024-01-08",
        showId: "6HubqiKmeU6YPN7yVOI9Bd",
        showName: "Entrepreneurship Unleashed",
        spotifyUrl: "https://open.spotify.com/episode/example3",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: "ep4",
        name: "Blockchain and Web3: The Next Frontier",
        description: "Dive into the world of blockchain technology and Web3 innovations. Understanding the potential impact on traditional business models and new opportunities.",
        duration: "41 min",
        publishDate: "2024-01-05",
        showId: "7na8KkBGav2CPPgdDv3GQE",
        showName: "Innovation Talks",
        spotifyUrl: "https://open.spotify.com/episode/example4",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: "ep5",
        name: "Women in Entrepreneurship: Breaking Barriers",
        description: "Celebrating female entrepreneurs and their journey in breaking barriers, overcoming challenges, and creating successful ventures in male-dominated industries.",
        duration: "47 min",
        publishDate: "2024-01-03",
        showId: "6HubqiKmeU6YPN7yVOI9Bd",
        showName: "Entrepreneurship Unleashed",
        spotifyUrl: "https://open.spotify.com/episode/example5",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=center"
      },
      {
        id: "ep6",
        name: "Sustainable Innovation: Green Tech Revolution",
        description: "Exploring sustainable technologies and green innovations that are reshaping industries while addressing climate change and environmental challenges.",
        duration: "43 min",
        publishDate: "2024-01-01",
        showId: "7na8KkBGav2CPPgdDv3GQE",
        showName: "Innovation Talks",
        spotifyUrl: "https://open.spotify.com/episode/example6",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center"
      }
    ];

    // Simulate API loading
    setTimeout(() => {
      setEpisodes(mockEpisodes);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/podcast" />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="mt-12 mb-20 text-center border-b border-border pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">
            Podcasts
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto font-light leading-relaxed">
            Listen to inspiring conversations about entrepreneurship, innovation, and the future of business. 
            Available on Spotify and embedded right here for your convenience.
          </p>
        </div>

        {/* Podcast Shows Overview */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
            Our Shows
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 hover:bg-card/70 transition-all">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-4">{podcast.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">{podcast.description}</p>
                
                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {podcast.topics.map((topic, idx) => (
                    <span key={idx} className="px-3 py-1 bg-foreground/10 text-foreground rounded-full text-sm font-medium border border-border">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Spotify Link */}
                <a
                  href={podcast.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:bg-foreground/90 transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Listen on Spotify
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* All Episodes Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
            Latest Episodes
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 animate-pulse">
                  <div className="w-full h-48 bg-foreground/10 rounded-lg mb-4"></div>
                  <div className="h-4 bg-foreground/10 rounded mb-2"></div>
                  <div className="h-4 bg-foreground/10 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-foreground/10 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((episode) => (
                <div key={episode.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:bg-card/70 transition-all hover-lift">
                  {/* Episode Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={episode.image} 
                      alt={episode.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = "relative h-48 bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center";
                          const playIcon = document.createElement('div');
                          playIcon.className = "w-16 h-16 bg-foreground/20 rounded-full flex items-center justify-center";
                          playIcon.innerHTML = '<svg class="w-8 h-8 text-foreground/60" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>';
                          parent.appendChild(playIcon);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                      {episode.duration}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Show Badge */}
                    <div className="inline-block px-3 py-1 bg-foreground/10 text-foreground rounded-full text-xs font-medium mb-3 border border-border">
                      {episode.showName}
                    </div>
                    
                    {/* Episode Title */}
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2 line-clamp-2">
                      {episode.name}
                    </h3>
                    
                    {/* Episode Description */}
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {episode.description}
                    </p>
                    
                    {/* Episode Meta */}
                    <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
                      <span>{new Date(episode.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>{episode.duration}</span>
                    </div>
                    
                    {/* Listen Button */}
                    <a
                      href={episode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-foreground/10 hover:bg-foreground/20 text-foreground px-4 py-2 rounded-lg font-medium transition-colors border border-border"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Listen Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Embedded Players Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
            Listen Directly
          </h2>
          
          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">{podcast.title}</h3>
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={podcast.embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout - Stacked */}
          <div className="lg:hidden space-y-8">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-foreground mb-4">{podcast.title}</h3>
                <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={podcast.embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            Have a Story to Share?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're always looking for inspiring entrepreneurs and innovators to feature on our podcasts. 
            If you have an interesting story or insights to share, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:edc@cit.edu.in?subject=Podcast Guest Inquiry"
              className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Be a Guest
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-foreground text-foreground font-semibold rounded-full hover:bg-foreground hover:text-background transition-all transform hover:scale-105"
            >
              View Our Events
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}