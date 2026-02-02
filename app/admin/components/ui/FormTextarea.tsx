// Reusable textarea component
import { cn } from '@/lib/utils';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, className, ...props }: FormTextareaProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
        {label}
      </label>
      <textarea 
        className={cn(
          'w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans',
          'focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all',
          'resize-none',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 font-sans">{error}</p>
      )}
    </div>
  );
}
