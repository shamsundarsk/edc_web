'use client';

export default function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Entrepreneurship Development Cell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Entrepreneurship Development Cell (EDC) is a student-driven initiative that fosters entrepreneurial spirit, provides mentorship, and creates opportunities for aspiring innovators and startup founders.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I join Entrepreneurship Development Cell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can join by filling out our membership form or contacting us directly through email. We welcome all students passionate about entrepreneurship and innovation.'
        }
      },
      {
        '@type': 'Question',
        name: 'What events does EDC organize?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We organize workshops, hackathons, ideathons, startup pitch competitions, networking sessions with industry leaders, and mentorship programs throughout the year.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need prior experience to participate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No prior experience is required! We welcome students from all backgrounds and skill levels. Our events and programs are designed to help you learn and grow.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can EDC help my startup idea?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide mentorship, resources, networking opportunities, and guidance to help you develop your idea from concept to prototype. We also connect you with industry experts and potential investors.'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
