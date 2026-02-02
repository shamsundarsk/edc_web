import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - EDC Cell',
  description: 'Get in touch with the Entrepreneurship Development Cell. We are here to support your entrepreneurial journey.',
  openGraph: {
    title: 'Contact Us - EDC Cell',
    description: 'Get in touch with the Entrepreneurship Development Cell',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
