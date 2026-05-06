import { cn } from '@/lib/utils';
import type { Sport } from '@/lib/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'nrl' | 'afl' | 'live' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'green', className }: BadgeProps) {
  const styles: Record<string, string> = {
    green:
      'bg-[rgba(34,197,94,.12)] text-[#22c55e] border border-[rgba(34,197,94,.25)]',
    nrl:
      'bg-[rgba(59,130,246,.12)] text-[#60a5fa] border border-[rgba(59,130,246,.2)]',
    afl:
      'bg-[rgba(251,146,60,.12)] text-[#fb923c] border border-[rgba(251,146,60,.2)]',
    live:
      'bg-[rgba(239,68,68,.15)] text-[#f87171] border border-[rgba(239,68,68,.25)] badge-live-pulse',
    muted:
      'bg-[rgba(107,114,128,.12)] text-[#9ca3af] border border-[rgba(107,114,128,.2)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.68rem] font-semibold tracking-wide uppercase',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SportBadge({ sport }: { sport: Sport }) {
  return <Badge variant={sport === 'NRL' ? 'nrl' : 'afl'}>{sport}</Badge>;
}
