import Link from 'next/link';

export default function BackButton() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 group">
      <svg 
        className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="font-medium">Back to Home</span>
    </Link>
  );
}
