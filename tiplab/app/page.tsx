import Link from 'next/link';
import { ALL_FIXTURES, NRL_FIXTURES, AFL_FIXTURES, LEADERBOARD, TRENDING, HERO_STATS } from '@/lib/data';
import { MatchCard } from '@/components/matches/MatchCard';
import { SportBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { formatKickoff } from '@/lib/utils';

export default function HomePage() {
  const nextFixture = ALL_FIXTURES[0];
  const featuredNRL = NRL_FIXTURES.slice(0, 2);
  const featuredAFL = AFL_FIXTURES.slice(0, 2);

  return (
    <div className="pt-[60px]">
      {/* ===== HERO ===== */}
      <section
        className="px-4 py-12 md:py-20"
        style={{ background: 'linear-gradient(180deg, rgba(34,197,94,.04) 0%, transparent 60%)' }}
      >
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[rgba(34,197,94,.1)] border border-[rgba(34,197,94,.25)] rounded-full px-3 py-1 text-[0.72rem] font-semibold text-[#22c55e] uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
              2025 Season — Live
            </div>

            <h1
              className="text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-[1.1] tracking-tight mb-4"
              style={{ color: '#f1f1f1' }}
            >
              Your <span className="text-[#22c55e]">premium</span>
              <br />
              sports tipping
              <br />
              hub.
            </h1>

            <p className="text-[#9ca3af] text-[0.95rem] leading-relaxed mb-7 max-w-[420px]">
              NRL and AFL previews, match analysis, tipping competitions, and live community
              leaderboards — all in one polished platform.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link href="/tipping">
                <Button variant="primary" size="lg">Start Tipping →</Button>
              </Link>
              <Link href="/fixtures">
                <Button variant="ghost" size="lg">View Fixtures</Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-[1.6rem] font-black text-white">{s.value}</div>
                  <div className="text-[0.72rem] text-[#6b7280] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Next kickoff card */}
          <div>
            <div
              className="relative bg-[#1a1a1a] border border-[rgba(34,197,94,.25)] rounded-[14px] p-5 overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(34,197,94,.06)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(34,197,94,.06), transparent 60%)' }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-widest text-[#22c55e] mb-3">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
                  Next Kickoff
                </div>

                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[0.72rem] font-black"
                      style={{
                        background: nextFixture.home.primaryColor,
                        color: nextFixture.home.textColor,
                      }}
                    >
                      {nextFixture.home.code}
                    </div>
                    <span className="font-bold text-[0.9rem] text-white">{nextFixture.home.name}</span>
                  </div>
                  <span className="text-[0.8rem] font-bold text-[#6b7280]">vs</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[0.72rem] font-black"
                      style={{
                        background: nextFixture.away.primaryColor,
                        color: nextFixture.away.textColor,
                      }}
                    >
                      {nextFixture.away.code}
                    </div>
                    <span className="font-bold text-[0.9rem] text-white">{nextFixture.away.name}</span>
                  </div>
                </div>

                <div className="text-[0.78rem] text-[#6b7280] mb-4">
                  📍 {nextFixture.venue} · {formatKickoff(nextFixture.kickoff)} ·{' '}
                  <SportBadge sport={nextFixture.sport} />
                </div>

                <div className="flex gap-2">
                  <Link href="/tipping" className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Tip {nextFixture.home.name}
                    </Button>
                  </Link>
                  <Link href="/tipping" className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full">
                      Tip {nextFixture.away.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '📊', title: 'Match Previews', desc: 'Deep analysis on every game this round' },
            { icon: '✅', title: 'Tipping Comps', desc: 'Compete in round and season competitions' },
            { icon: '🏆', title: 'Live Leaderboards', desc: 'Track rankings and accuracy in real time' },
            { icon: '📱', title: 'Mobile First', desc: 'Optimised tipping on any device' },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 hover:border-[rgba(34,197,94,.3)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-[0.875rem] font-semibold mb-1 text-gray-100">{f.title}</div>
              <div className="text-[0.75rem] text-[#6b7280]">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRENDING ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Trending Discussions</SectionTitle>
          <Button variant="ghost" size="sm">See All</Button>
        </div>
        <div className="flex flex-col gap-2">
          {TRENDING.map((t, i) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#333] hover:translate-x-0.5 transition-all duration-150 cursor-pointer"
            >
              <div className="text-[0.75rem] font-bold text-[#6b7280] w-5 text-center">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.875rem] font-semibold text-gray-100 truncate">{t.title}</div>
                <div className="text-[0.72rem] text-[#6b7280] mt-0.5">{t.meta}</div>
              </div>
              <SportBadge sport={t.sport} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED NRL MATCHES ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>NRL — Round 14 Featured</SectionTitle>
          <Link href="/fixtures">
            <Button variant="ghost" size="sm">All Fixtures →</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredNRL.map((f) => (
            <MatchCard key={f.id} fixture={f} showTipButton={false} />
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>AFL — Round 14 Featured</SectionTitle>
          <Link href="/fixtures">
            <Button variant="ghost" size="sm">All Fixtures →</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredAFL.map((f) => (
            <MatchCard key={f.id} fixture={f} showTipButton={false} />
          ))}
        </div>
      </section>

      {/* ===== LEADERBOARD PREVIEW ===== */}
      <section className="max-w-[1200px] mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-5">
          <SectionTitle>Top Tippers — Round 14</SectionTitle>
          <Link href="/leaderboard">
            <Button variant="ghost" size="sm">Full Board →</Button>
          </Link>
        </div>
        <LeaderboardTable data={LEADERBOARD.slice(0, 5)} />
      </section>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-[1.05rem] font-bold text-gray-100">
      <span className="w-[3px] h-[18px] bg-[#22c55e] rounded" />
      {children}
    </h2>
  );
}
