import { NRL_FIXTURES, AFL_FIXTURES } from '@/lib/data';
import { TippingBoard } from '@/components/tipping/TippingBoard';
import { Badge } from '@/components/ui/Badge';

export default function TippingPage() {
  return (
    <div className="pt-[60px] max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-[1.3rem] font-black tracking-tight text-white">Tipping</h1>
          <Badge variant="green">Round 14</Badge>
        </div>
        <span className="text-[0.78rem] text-[#6b7280]">2025 Season</span>
      </div>

      <p className="text-[0.85rem] text-[#9ca3af] mb-6">
        Select your winner for each match. Tips lock at kickoff — no changes after the whistle.
      </p>

      {/* Auth prompt */}
      <div className="mb-6 p-4 bg-[rgba(34,197,94,.05)] border border-[rgba(34,197,94,.2)] rounded-xl flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[0.85rem] font-semibold text-white mb-0.5">
            🎯 Join the competition
          </div>
          <div className="text-[0.78rem] text-[#9ca3af]">
            Create a free account to save tips and compete on the leaderboard
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg text-[0.82rem] font-semibold bg-[#22c55e] text-black hover:bg-[#16a34a] transition-colors">
            Join Free
          </button>
          <button className="px-4 py-2 rounded-lg text-[0.82rem] font-semibold border border-[#2a2a2a] text-[#9ca3af] hover:border-[#22c55e] hover:text-[#22c55e] transition-colors">
            Sign In
          </button>
        </div>
      </div>

      <TippingBoard nrlFixtures={NRL_FIXTURES} aflFixtures={AFL_FIXTURES} />
    </div>
  );
}
