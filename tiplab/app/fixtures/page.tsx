'use client';
import { useState } from 'react';
import { NRL_FIXTURES, AFL_FIXTURES } from '@/lib/data';
import { MatchCard } from '@/components/matches/MatchCard';
import { Badge } from '@/components/ui/Badge';
import type { Fixture } from '@/lib/types';

type Tips = Record<string, string>;

export default function FixturesPage() {
  const [sport, setSport] = useState<'NRL' | 'AFL'>('NRL');
  const [tips, setTips] = useState<Tips>({});

  const fixtures: Fixture[] = sport === 'NRL' ? NRL_FIXTURES : AFL_FIXTURES;

  const handleTip = (fixtureId: string, teamId: string) => {
    setTips((prev) => ({ ...prev, [fixtureId]: teamId }));
  };

  return (
    <div className="pt-[60px] max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[1.3rem] font-black tracking-tight text-white">Fixtures</h1>
          <Badge variant="green">Round 14</Badge>
        </div>
        <span className="text-[0.78rem] text-[#6b7280]">2025 Season</span>
      </div>

      {/* Sport tabs */}
      <div className="flex gap-1 bg-[#141414] border border-[#2a2a2a] rounded-xl p-1 mb-6 max-w-[280px]">
        {(['NRL', 'AFL'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={`flex-1 py-2.5 rounded-lg text-[0.875rem] font-semibold transition-all duration-150 ${
              sport === s
                ? s === 'NRL'
                  ? 'bg-[#1a1a1a] text-[#60a5fa] shadow-sm'
                  : 'bg-[#1a1a1a] text-[#fb923c] shadow-sm'
                : 'text-[#6b7280] hover:text-[#9ca3af]'
            }`}
          >
            {s === 'NRL' ? '🏉' : '🏈'} {s}
          </button>
        ))}
      </div>

      {/* Round info banner */}
      <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[0.75rem] font-bold uppercase tracking-widest text-[#6b7280] mb-1">
            {sport} Round 14
          </div>
          <div className="text-sm font-semibold text-white">
            {fixtures.length} matches · {Object.values(tips).length} tips submitted
          </div>
        </div>
        <div className="text-[0.78rem] text-[#6b7280]">
          All times AEST · Tips lock at kickoff
        </div>
      </div>

      {/* Match grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {fixtures.map((f) => (
          <MatchCard
            key={f.id}
            fixture={f}
            showTipButton
            tippedTeamId={tips[f.id]}
            onTip={handleTip}
          />
        ))}
      </div>
    </div>
  );
}
