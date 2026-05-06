import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TipLab — NRL & AFL Tipping',
  description:
    'Premium NRL and AFL tipping competitions, match previews, commentary, and live leaderboards.',
  keywords: ['NRL tipping', 'AFL tipping', 'sports predictions', 'footy tipping', 'rugby league'],
  openGraph: {
    title: 'TipLab',
    description: 'Your premium sports tipping hub.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <MobileNav />
        <footer className="border-t border-[#2a2a2a] py-8 mt-12">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
                <rect width="34" height="34" rx="8" fill="#22c55e" />
                <path d="M7 10h20M17 10v14" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M11 18l6 6 6-6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold text-sm">TipLab</span>
            </div>
            <span className="text-[0.78rem] text-[#6b7280]">
              © 2025 TipLab. For entertainment purposes only.
            </span>
            <div className="flex gap-4">
              {['Privacy', 'Terms', 'Contact'].map((l) => (
                <a key={l} href="#" className="text-[0.78rem] text-[#6b7280] hover:text-[#22c55e] transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
