import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Us - EDC Cell',
  description: 'Join the Entrepreneurship Development Cell. Be part of a collective of builders, thinkers, and architects of change.',
  openGraph: {
    title: 'Join Us - EDC Cell',
    description: 'Join the Entrepreneurship Development Cell community',
    type: 'website',
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
