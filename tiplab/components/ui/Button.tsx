import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-1.5 font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[#22c55e] text-black hover:bg-[#16a34a] shadow-[0_0_20px_rgba(34,197,94,.2)] hover:shadow-[0_0_30px_rgba(34,197,94,.35)] hover:-translate-y-px active:translate-y-0',
    ghost:
      'bg-transparent text-[#9ca3af] border border-[#2a2a2a] hover:border-[#22c55e] hover:text-[#22c55e]',
    outline:
      'bg-transparent text-[#f1f1f1] border border-[#333] hover:border-[#22c55e] hover:text-[#22c55e]',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-[0.8rem]',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
