'use client';

import { useEffect, useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import MinimalNav from '../components/MinimalNav';
import MinimalFooter from '../components/MinimalFooter';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  dateTBA?: boolean;
  time?: string;
  location?: string;
  type?: string;
  imageUrl?: string;
  videoUrl?: string;
  registrationLink?: string;
  completed?: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  // Default events if API fails and loading is complete
  const defaultEvents: Event[] = [
    {
      id: '1',
      title: "The Founder's Dilemma",
      description: 'Navigating equity splits and co-founder relationships. A deep dive into the psychological contracts that bind early-stage teams.',
      date: '2024-12-15',
      time: '14:00 — 16:00',
      location: 'The Atrium',
      type: 'Workshop',
      completed: false
    },
    {
      id: '2',
      title: 'Zero to One',
      description: 'Guest lecture by Elena Vance on building vertical monopolies. How to escape competition and define your own category.',
      date: '2024-12-24',
      time: '18:00 — 19:30',
      location: 'Hall B',
      type: 'Keynote',
      completed: false
    },
    {
      id: '3',
      title: 'Capital & Courage',
      description: 'A candid conversation with three Tier-1 VC analysts about what really happens inside the investment committee meetings.',
      date: '2024-11-05',
      time: '17:00 — 18:30',
      location: 'Main Auditorium',
      type: 'Panel',
      completed: true
    },
    {
      id: '4',
      title: 'The Art of the Pitch',
      description: 'Storytelling for startups. Learn to craft a narrative that compels investors not just to listen, but to believe.',
      date: '2024-10-18',
      time: '10:00 — 13:00',
      location: 'Studio 4',
      type: 'Masterclass',
      completed: true
    },
  ];

  const displayEvents = events.length > 0 ? events : (loading ? [] : defaultEvents);
  
  // Separate upcoming and completed events
  const upcomingEvents = displayEvents.filter(event => !event.completed);
  const completedEvents = displayEvents.filter(event => event.completed);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEvent) {
        closeEventModal();
      }
    };

    if (selectedEvent) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-white">
      <MinimalNav />

      <header className="w-full px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center relative z-10">
        <div className="max-w-[1400px] w-full text-center">
          <div className="title-gradient inline-block">
            <h1 className="text-foreground text-[14vw] md:text-[12vw] leading-[0.85] tracking-[-0.04em] font-light font-display select-none animate-[fadeIn_1s_ease-out_forwards]">
              Gatherings<span className="text-primary">.</span>
            </h1>
          </div>
          <p className="mt-8 md:mt-12 text-foreground/60 text-lg md:text-xl font-light font-sans tracking-wide animate-[fadeIn_1s_ease-out_0.3s_forwards] opacity-0">
            A chronology of innovation.
          </p>
        </div>
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-b from-rose-100/40 to-transparent blur-[100px] -z-10 rounded-full pointer-events-none"></div>
      </header>

      <main className="w-full px-6 pb-32 flex justify-center">
        <div className="max-w-[1100px] w-full flex flex-col">
          {/* Upcoming Events Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-light text-foreground mb-8 border-b border-foreground/10 pb-4">
              Upcoming Events
            </h2>
            
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <article
                  key={i}
                  className="group flex flex-col md:flex-row gap-6 md:gap-20 py-16 border-t border-foreground/10 animate-pulse"
                >
                  <div className="md:w-1/4 flex flex-col pt-2">
                    <div className="h-16 bg-foreground/10 rounded w-20 mb-3"></div>
                    <div className="h-3 bg-foreground/10 rounded w-16"></div>
                  </div>
                  <div className="md:w-3/4 flex flex-col gap-6">
                    <div className="h-12 bg-foreground/10 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-foreground/5 rounded w-full"></div>
                      <div className="h-5 bg-foreground/5 rounded w-5/6"></div>
                    </div>
                    <div className="flex items-center gap-8 mt-4">
                      <div className="h-4 bg-foreground/10 rounded w-20"></div>
                      <div className="h-4 bg-foreground/10 rounded w-24"></div>
                      <div className="h-4 bg-foreground/10 rounded w-16 ml-auto"></div>
                    </div>
                  </div>
                </article>
              ))
            ) : upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <article
                  key={event.id}
                  className={`group flex flex-col md:flex-row gap-6 md:gap-20 py-16 border-t border-foreground/10 ${
                    index === upcomingEvents.length - 1 ? 'border-b' : ''
                  } transition-all duration-500 hover:bg-white/40 hover:px-6 -mx-6 rounded-[2rem] opacity-0 animate-fade-in-up cursor-pointer`}
                  style={{
                    animationDelay: `${0.2 + index * 0.2}s`
                  }}
                  onClick={() => openEventModal(event)}
                >
                  <div className="md:w-1/4 flex flex-col pt-2">
                    <span className="text-primary text-5xl md:text-6xl font-light font-display tracking-tight">
                      {formatDisplayDate(event.date)}
                    </span>
                    <span className="mt-3 text-foreground/40 text-xs font-bold uppercase tracking-[0.2em] font-sans">
                      {event.type || 'Event'}
                    </span>
                  </div>
                  <div className="md:w-3/4 flex flex-col gap-6">
                    <h2 className="text-3xl md:text-5xl text-foreground font-display font-medium leading-[1.1] group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {event.title}
                    </h2>
                    <p className="text-foreground/60 text-lg md:text-xl font-light font-sans leading-relaxed max-w-2xl">
                      {event.description}
                    </p>
                    <div className="mt-4 flex items-center gap-8 text-sm text-foreground/60 font-medium font-sans">
                      {event.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <span className="ml-auto text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-xs font-bold">
                        View Details →
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-16 text-foreground/40">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="font-sans">No upcoming events at the moment.</p>
              </div>
            )}
          </div>

          {/* Completed Events Section */}
          {completedEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-light text-foreground mb-8 border-b border-foreground/10 pb-4">
                Past Events
              </h2>
              
              {completedEvents.map((event, index) => (
                <article
                  key={event.id}
                  className={`group flex flex-col md:flex-row gap-6 md:gap-20 py-12 border-t border-foreground/5 ${
                    index === completedEvents.length - 1 ? 'border-b border-foreground/5' : ''
                  } transition-all duration-500 hover:bg-white/20 hover:px-6 -mx-6 rounded-[2rem] opacity-60 hover:opacity-80 cursor-pointer`}
                  onClick={() => openEventModal(event)}
                >
                  <div className="md:w-1/4 flex flex-col pt-2">
                    <span className="text-foreground/40 text-4xl md:text-5xl font-light font-display tracking-tight">
                      {formatDisplayDate(event.date)}
                    </span>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-foreground/30 text-xs font-bold uppercase tracking-[0.2em] font-sans">
                        {event.type || 'Event'}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-sans">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="md:w-3/4 flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl text-foreground/70 font-display font-medium leading-[1.1] group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {event.title}
                    </h2>
                    <p className="text-foreground/50 text-base md:text-lg font-light font-sans leading-relaxed max-w-2xl line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mt-2 flex items-center gap-6 text-sm text-foreground/40 font-medium font-sans">
                      {event.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <span className="ml-auto text-foreground/40 hover:text-foreground/60 transition-colors uppercase tracking-widest text-xs font-bold">
                        View Details →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="relative">
              {selectedEvent.imageUrl && (
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {selectedEvent.completed && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-sans">
                  Completed
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-12rem)]">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary text-sm font-sans font-medium">
                    {formatDate(selectedEvent.date)}
                  </span>
                  {selectedEvent.type && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-sans uppercase tracking-wide">
                      {selectedEvent.type}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-medium text-charcoal leading-tight mb-4">
                  {selectedEvent.title}
                </h1>
                <p className="text-charcoal-light text-lg font-sans leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-4 mb-8">
                {selectedEvent.time && (
                  <div className="flex items-center gap-3 text-charcoal-light">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-sans">{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-charcoal-light">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-sans">{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.dateTBA && (
                  <div className="flex items-center gap-3 text-charcoal-light">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-sans">Date to be announced</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {selectedEvent.registrationLink && !selectedEvent.completed && (
                  <a
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-medium font-sans hover:bg-primary/90 transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    Register Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedEvent.videoUrl && (
                  <a
                    href={selectedEvent.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-secondary text-charcoal px-6 py-3 rounded-2xl font-medium font-sans hover:bg-secondary/80 transition-colors"
                  >
                    Watch Recording
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={closeEventModal}
          />
        </div>
      )}

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
