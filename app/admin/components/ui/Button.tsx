// Reusable button component
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  loading = false, 
  children, 
  className,
  disabled,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
    secondary: 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10 border border-charcoal/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
  };

  return (
    <button
      className={cn(
        'px-8 py-3 rounded-xl font-medium font-sans transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          Loading...
        </span>
      ) : children}
    </button>
  );
}
