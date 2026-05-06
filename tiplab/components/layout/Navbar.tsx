'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/tipping', label: 'Tipping' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/admin', label: 'Admin' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a2a2a]"
        style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-[60px]">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Logo iconSize={32} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
                  pathname === l.href
                    ? 'text-[#22c55e] bg-[#1a1a1a]'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#1a1a1a]'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="primary" size="sm">Join Free</Button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg bg-[#1a1a1a]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'w-5 h-0.5 bg-gray-300 rounded transition-all duration-200',
                menuOpen && 'rotate-45 translate-y-[7px]'
              )}
            />
            <span
              className={cn(
                'w-5 h-0.5 bg-gray-300 rounded transition-all duration-200',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-5 h-0.5 bg-gray-300 rounded transition-all duration-200',
                menuOpen && '-rotate-45 -translate-y-[7px]'
              )}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#141414] border-b border-[#2a2a2a] px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-3.5 py-3 rounded-lg text-sm font-medium transition-all',
                  pathname === l.href
                    ? 'text-[#22c55e] bg-[rgba(34,197,94,.08)]'
                    : 'text-[#9ca3af] hover:text-[#22c55e]'
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-[#2a2a2a] mt-2">
              <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
              <Button variant="primary" size="sm" className="flex-1">Join Free</Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
