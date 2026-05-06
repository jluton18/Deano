'use client';
import { useState } from 'react';
import type { LeaderboardEntry } from '@/lib/types';
import { accuracyColor } from '@/lib/utils';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

type Tab = 'round' | 'season' | 'nrl' | 'afl';

const TABS: { id: Tab; label: string }[] = [
  { id: 'round', label: 'Round' },
  { id: 'season', label: 'Season' },
  { id: 'nrl', label: 'NRL' },
  { id: 'afl', label: 'AFL' },
];

const RANK_MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = ['#fbbf24', '#94a3b8', '#b45309'];

function MovementBadge({ mv }: { mv: number }) {
  if (mv > 0)
    return (
      <span className="flex items-center gap-0.5 text-[0.72rem] font-semibold text-[#22c55e]">
        ▲{mv}
      </span>
    );
  if (mv < 0)
    return (
      <span className="flex items-center gap-0.5 text-[0.72rem] font-semibold text-[#f87171]">
        ▼{Math.abs(mv)}
      </span>
    );
  return <span className="text-[0.72rem] font-semibold text-[#6b7280]">—</span>;
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const [activeTab, setActiveTab] = useState<Tab>('round');

  // For demo, shuffle slightly by tab
  const sorted = [...data].sort((a, b) => {
    if (activeTab === 'round') return b.roundScore - a.roundScore || b.totalScore - a.totalScore;
    if (activeTab === 'season') return b.totalScore - a.totalScore;
    if (activeTab === 'nrl') return b.accuracy - a.accuracy;
    return b.gamesPlayed - a.gamesPlayed;
  });

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-[0.82rem] font-semibold border transition-all duration-150 ${
              activeTab === t.id
                ? 'bg-[#1a1a1a] text-[#22c55e] border-[rgba(34,197,94,.3)]'
                : 'bg-[#141414] text-[#6b7280] border-[#2a2a2a] hover:text-[#9ca3af]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] overflow-hidden">
        {/* Header */}
        <div
          className="grid items-center gap-2 px-4 py-2.5 bg-[#141414] border-b border-[#2a2a2a]"
          style={{ gridTemplateColumns: '36px 1fr 52px 64px 60px 36px' }}
        >
          {['#', 'Tipper', 'Pts', 'Total', 'Acc%', '↕'].map((h) => (
            <div
              key={h}
              className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#6b7280] text-center first:text-left"
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {sorted.map((entry, i) => (
          <div
            key={entry.user.id}
            className={`grid items-center gap-2 px-4 py-3.5 border-b border-[#2a2a2a] last:border-0 transition-colors hover:bg-[rgba(255,255,255,.02)] ${
              i < 3 ? 'bg-[rgba(34,197,94,.02)]' : ''
            }`}
            style={{ gridTemplateColumns: '36px 1fr 52px 64px 60px 36px' }}
          >
            {/* Rank */}
            <div className="text-center">
              {i < 3 ? (
                <span className="text-base">{RANK_MEDALS[i]}</span>
              ) : (
                <span
                  className="text-[0.85rem] font-bold"
                  style={{ color: RANK_COLORS[i] || '#6b7280' }}
                >
                  {i + 1}
                </span>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-white flex-shrink-0"
                style={{ background: entry.user.avatarColor }}
              >
                {entry.user.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-[0.875rem] font-semibold text-gray-100">{entry.user.username}</div>
                <div className="text-[0.68rem] text-[#6b7280]">{entry.gamesPlayed} games</div>
              </div>
            </div>

            {/* Round score */}
            <div className="text-center text-[0.9rem] font-bold text-white">{entry.roundScore}</div>

            {/* Total */}
            <div className="text-center text-[0.85rem] font-semibold text-[#9ca3af]">{entry.totalScore}</div>

            {/* Accuracy */}
            <div
              className="text-center text-[0.82rem] font-semibold"
              style={{ color: accuracyColor(entry.accuracy) }}
            >
              {entry.accuracy}%
            </div>

            {/* Movement */}
            <div className="flex justify-center">
              <MovementBadge mv={entry.movement} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[0.72rem] text-[#6b7280] mt-3 text-center">
        Scores update after each match result is confirmed. All times AEST.
      </p>
    </div>
  );
}
