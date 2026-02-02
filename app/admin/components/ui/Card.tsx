// Reusable card component
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={cn('bg-white rounded-3xl border border-charcoal/10 p-8 shadow-lg', className)}>
      {title && (
        <h2 className="text-2xl font-display font-light text-charcoal mb-6">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
