'use client';
import { useState, useCallback } from 'react';
import type { Fixture } from '@/lib/types';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { formatKickoff } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface TippingBoardProps {
  nrlFixtures: Fixture[];
  aflFixtures: Fixture[];
}

type Tips = Record<string, string>;

export function TippingBoard({ nrlFixtures, aflFixtures }: TippingBoardProps) {
  const [sport, setSport] = useState<'NRL' | 'AFL'>('NRL');
  const [tips, setTips] = useState<Tips>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const fixtures = sport === 'NRL' ? nrlFixtures : aflFixtures;
  const total = nrlFixtures.length + aflFixtures.length;
  const tippedCount = Object.keys(tips).length;

  const selectTip = useCallback((fixtureId: string, teamId: string) => {
    setTips((prev) => ({ ...prev, [fixtureId]: teamId }));
    setSaved((prev) => ({ ...prev, [fixtureId]: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, [fixtureId]: false })), 2000);
  }, []);

  const handleSubmit = () => {
    if (tippedCount === 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      {/* Sport tabs */}
      <div className="flex gap-1 bg-[#141414] border border-[#2a2a2a] rounded-xl p-1 mb-5 max-w-[280px]">
        {(['NRL', 'AFL'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={`flex-1 py-2 rounded-lg text-[0.85rem] font-semibold transition-all duration-150 ${
              sport === s
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'text-[#6b7280] hover:text-[#9ca3af]'
            }`}
          >
            {s === 'NRL' ? '🏉' : '🏈'} {s}
          </button>
        ))}
      </div>

      {/* Tip rows */}
      <div className="flex flex-col gap-2">
        {fixtures.map((f) => {
          const tipped = tips[f.id];
          return (
            <div
              key={f.id}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden transition-colors hover:border-[#333]"
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-4">
                {/* Home */}
                <button
                  onClick={() => selectTip(f.id, f.home.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 ${
                    tipped === f.home.id
                      ? 'border-[#22c55e] bg-[rgba(34,197,94,.08)]'
                      : tipped && tipped !== f.home.id
                      ? 'border-transparent opacity-40'
                      : 'border-transparent hover:border-[#333] hover:bg-[#141414]'
                  }`}
                >
                  <TeamLogo team={f.home} size={40} />
                  <span
                    className={`text-[0.78rem] font-semibold text-center leading-tight ${
                      tipped === f.home.id ? 'text-[#22c55e]' : 'text-gray-200'
                    }`}
                  >
                    {f.home.name}
                  </span>
                </button>

                <div className="text-[0.68rem] font-bold text-[#6b7280] tracking-widest text-center">VS</div>

                {/* Away */}
                <button
                  onClick={() => selectTip(f.id, f.away.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 ${
                    tipped === f.away.id
                      ? 'border-[#22c55e] bg-[rgba(34,197,94,.08)]'
                      : tipped && tipped !== f.away.id
                      ? 'border-transparent opacity-40'
                      : 'border-transparent hover:border-[#333] hover:bg-[#141414]'
                  }`}
                >
                  <TeamLogo team={f.away} size={40} />
                  <span
                    className={`text-[0.78rem] font-semibold text-center leading-tight ${
                      tipped === f.away.id ? 'text-[#22c55e]' : 'text-gray-200'
                    }`}
                  >
                    {f.away.name}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#2a2a2a]">
                <span className="text-[0.72rem] text-[#6b7280]">
                  ⏰ {formatKickoff(f.kickoff)}
                </span>
                <span
                  className={`text-[0.72rem] font-semibold text-[#22c55e] flex items-center gap-1 transition-opacity duration-300 ${
                    saved[f.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  ✓ Saved
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div>
            <div className="text-[1.5rem] font-black text-[#22c55e]">{tippedCount}</div>
            <div className="text-[0.75rem] text-[#9ca3af]">of {total} tipped</div>
          </div>
          <div className="flex gap-1 flex-wrap max-w-[180px]">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i < tippedCount ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {submitted && (
            <div className="text-[0.8rem] font-semibold text-[#22c55e]">
              🎉 {tippedCount} tips submitted!
            </div>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={tippedCount === 0}
          >
            Submit Tips →
          </Button>
        </div>
      </div>
    </div>
  );
}
