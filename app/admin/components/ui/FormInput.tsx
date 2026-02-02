// Reusable form input component
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-charcoal-light mb-2 font-sans">
        {label}
      </label>
      <input 
        className={cn(
          'w-full px-4 py-3 border-2 border-charcoal/10 rounded-xl font-sans',
          'focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all',
          'disabled:bg-charcoal/5 disabled:cursor-not-allowed',
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
