'use client';

import { useEffect, useState } from 'react';
import SideNav from '@/app/components/SideNav';
import ChromaGrid, { ChromaItem } from '@/app/components/ChromaGrid';

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
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Function to group members by teams
  const groupMembersByTeam = () => {
    const teams: { [key: string]: any[] } = {};
    
    members.forEach(member => {
      const role = member.role || 'Other';
      let teamKey = 'Other Team';
      
      // Categorize based on role
      if (role.toLowerCase().includes('secretary') || role.toLowerCase().includes('treasurer')) {
        teamKey = 'Leadership Team';
      } else if (role.toLowerCase().includes('director')) {
        teamKey = 'Directors';
      } else if (role.toLowerCase().includes('ideabin')) {
        teamKey = 'Ideabin Team';
      } else if (role.toLowerCase().includes('podcast')) {
        teamKey = 'Podcast Team';
      } else if (role.toLowerCase().includes('event')) {
        teamKey = 'Event Planning Team';
      } else if (role.toLowerCase().includes('startup')) {
        teamKey = 'Let\'s Startup Team';
      } else if (role.toLowerCase().includes('outreach')) {
        teamKey = 'Outreach Team';
      }
      
      if (!teams[teamKey]) {
        teams[teamKey] = [];
      }
      teams[teamKey].push(member);
    });
    
    return teams;
  };

  // Function to render members organized by teams
  const renderMembersByTeams = () => {
    const teamGroups = groupMembersByTeam();
    const teamOrder = [
      'Leadership Team',
      'Directors', 
      'Ideabin Team',
      'Podcast Team',
      'Event Planning Team',
      'Let\'s Startup Team',
      'Outreach Team',
      'Other Team'
    ];

    return (
      <div className="space-y-16">
        {teamOrder.map(teamName => {
          const teamMembers = teamGroups[teamName];
          if (!teamMembers || teamMembers.length === 0) return null;

          return (
            <div key={teamName} className="space-y-8">
              {/* Team Title */}
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 tracking-tight">
                  {teamName}
                </h2>
                <div className="w-24 h-1 bg-[#EE6983] mx-auto rounded-full"></div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {teamMembers.map(member => (
                  <div key={member.id} className="group liquid-glass hover:shadow-xl transition-all duration-500 overflow-hidden rounded-xl cursor-pointer w-full max-w-sm">
                    {/* Member Photo */}
                    <div className="aspect-square overflow-hidden rounded-t-xl relative">
                      <img 
                        src={member.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Member')}&size=512&background=random`}
                        alt={member.name || 'Team Member'} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-[#EE6983]/20 group-hover:bg-[#EE6983]/10 transition-all duration-700"></div>
                    </div>
                    
                    {/* Member Info */}
                    <div className="p-6 border-t border-foreground/10">
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2 text-center">
                        {member.name || 'Team Member'}
                      </h3>
                      <p className="text-foreground/70 text-center mb-4 font-light">
                        {member.role || 'Member'}
                      </p>
                      
                      {/* LinkedIn Button */}
                      {member.linkedin && (
                        <div className="text-center">
                          <button
                            onClick={() => window.open(member.linkedin, '_blank')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#850E35] text-[#EE6983] text-sm font-medium rounded-full hover:bg-[#850E35]/90 transition-all duration-300"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav currentPath="/members" />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        <div className="mt-12 mb-20 text-center border-b border-foreground/10 pb-12">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">Our Team</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">The individuals driving innovation and entrepreneurship</p>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border border-foreground/20 border-t-foreground"></div>
            <p className="text-foreground/50 mt-6 font-light">Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-24 liquid-glass rounded-xl">
            <p className="text-foreground/50 text-lg font-light">No team members added yet</p>
          </div>
        ) : (
          <div className="px-8 py-12">
            {renderMembersByTeams()}
          </div>
        )}
      </div>
    </div>
  );
}
