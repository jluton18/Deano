import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  variant?: 'default' | 'stacked' | 'icon';
}

export function LogoIcon({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TipLab"
    >
      <rect width="34" height="34" rx="8" fill="#22c55e" />
      <path
        d="M7 10h20M17 10v14"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M11 18l6 6 6-6"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, iconSize = 34, showText = true, variant = 'default' }: LogoProps) {
  if (variant === 'icon') {
    return <LogoIcon size={iconSize} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        <LogoIcon size={48} />
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: '#f1f1f1' }}>
          Tip<span style={{ color: '#22c55e' }}>Lab</span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoIcon size={iconSize} />
      {showText && (
        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: '#f1f1f1' }}>
          Tip<span style={{ color: '#22c55e' }}>Lab</span>
        </span>
      )}
    </div>
  );
}
