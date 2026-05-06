import { LEADERBOARD } from '@/lib/data';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { Badge } from '@/components/ui/Badge';

export default function LeaderboardPage() {
  return (
    <div className="pt-[60px] max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-[1.3rem] font-black tracking-tight text-white">Leaderboard</h1>
          <Badge variant="green">Round 14</Badge>
        </div>
        <span className="text-[0.78rem] text-[#6b7280]">2025 Season</span>
      </div>

      <p className="text-[0.85rem] text-[#9ca3af] mb-6">
        Rankings update after each confirmed result. Accuracy calculated over all tips submitted this season.
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Round Leader', value: 'CoachMate99', sub: '7/8 correct' },
          { label: 'Season Leader', value: 'CoachMate99', sub: '82 points' },
          { label: 'Top Accuracy', value: 'CoachMate99', sub: '74%' },
          { label: 'Total Tippers', value: '2,841', sub: 'registered' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4"
          >
            <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#6b7280] mb-1">
              {s.label}
            </div>
            <div className="text-[0.95rem] font-bold text-white">{s.value}</div>
            <div className="text-[0.72rem] text-[#22c55e] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <LeaderboardTable data={LEADERBOARD} />
    </div>
  );
}
