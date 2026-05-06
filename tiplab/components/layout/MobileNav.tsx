'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/fixtures', label: 'Fixtures', icon: '📅' },
  { href: '/tipping', label: 'Tipping', icon: '✅' },
  { href: '/leaderboard', label: 'Board', icon: '🏆' },
  { href: '/admin', label: 'Admin', icon: '⚙️' },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border-t border-[#2a2a2a]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-5">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-1 text-[0.58rem] font-semibold transition-colors',
              pathname === item.href ? 'text-[#22c55e]' : 'text-[#6b7280]'
            )}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
