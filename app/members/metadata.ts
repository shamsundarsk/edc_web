import { Metadata } from 'next';
import { generatePageMetadata } from '@/app/metadata';

export const membersMetadata: Metadata = generatePageMetadata(
  'Our Team - EDC Cell',
  'Meet the passionate team behind EDC Cell Coimbatore. Our members are dedicated to fostering entrepreneurship and innovation among students.',
  '/members'
);

export function generateTeamSchema(members: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EDC Cell Coimbatore',
    url: 'https://edccell.edu',
    member: members.map(member => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      image: member.imageUrl,
      sameAs: member.linkedin ? [member.linkedin] : []
    }))
  };
}
