'use client';
import { useState } from 'react';
import { NRL_FIXTURES, AFL_FIXTURES } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const ADMIN_CARDS = [
  { icon: '📅', stat: '16', title: 'Fixtures This Round', desc: 'Manage upcoming NRL & AFL games' },
  { icon: '✏️', stat: '12', title: 'Commentary Entries', desc: 'Edit match previews and analysis' },
  { icon: '🏆', stat: '2,841', title: 'Registered Users', desc: 'View and manage accounts' },
  { icon: '✅', stat: '19,204', title: 'Tips Submitted', desc: 'Round 14 tips submitted so far' },
  { icon: '⚽', stat: '34', title: 'Teams Registered', desc: 'NRL + AFL team management' },
  { icon: '🔁', stat: '—', title: 'Recalculate Scores', desc: 'Trigger leaderboard recalculation', action: true },
];

export default function AdminPage() {
  const [toast, setToast] = useState('');
  const [results, setResults] = useState<Record<string, string>>({});
  const allFixtures = [...NRL_FIXTURES.slice(0, 4), ...AFL_FIXTURES.slice(0, 4)];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="pt-[60px] max-w-[1200px] mx-auto px-4 py-8">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#22c55e] text-black px-5 py-2.5 rounded-lg font-semibold text-sm z-50 shadow-lg animate-bounce-in">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-[1.3rem] font-black tracking-tight text-white">⚙️ Admin Panel</h1>
          <Badge variant="green">TipLab v1.0</Badge>
        </div>
        <span className="text-[0.78rem] text-[#6b7280]">Restricted access</span>
      </div>

      {/* Admin grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {ADMIN_CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 hover:border-[rgba(34,197,94,.25)] transition-colors"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-[1.4rem] font-black text-[#22c55e] mb-0.5">{card.stat}</div>
            <div className="text-[0.875rem] font-semibold text-white mb-1">{card.title}</div>
            <div className="text-[0.75rem] text-[#6b7280] mb-3">{card.desc}</div>
            {card.action ? (
              <Button variant="primary" size="sm" className="w-full" onClick={() => showToast('✓ Leaderboard recalculated')}>
                Run Now
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="w-full" onClick={() => showToast('Opening ' + card.title + '…')}>
                Manage
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="h-px bg-[#2a2a2a] mb-8" />

      {/* Results entry */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-[1.05rem] font-bold text-gray-100 mb-4">
          <span className="w-[3px] h-[18px] bg-[#22c55e] rounded" />
          Results Entry
        </h2>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
          <div
            className="grid gap-2 px-4 py-2.5 bg-[#141414] border-b border-[#2a2a2a] text-[0.7rem] font-semibold uppercase tracking-widest text-[#6b7280]"
            style={{ gridTemplateColumns: '1fr 1fr auto' }}
          >
            <div>Match</div>
            <div>Winner</div>
            <div>Action</div>
          </div>
          {allFixtures.map((f) => (
            <div
              key={f.id}
              className="grid gap-2 items-center px-4 py-3 border-b border-[#2a2a2a] last:border-0"
              style={{ gridTemplateColumns: '1fr 1fr auto' }}
            >
              <div className="text-[0.82rem] font-medium text-gray-200 truncate">
                {f.home.name} vs {f.away.name}
              </div>
              <select
                value={results[f.id] || ''}
                onChange={(e) => setResults((r) => ({ ...r, [f.id]: e.target.value }))}
                className="bg-[#141414] border border-[#2a2a2a] text-[#f1f1f1] rounded-lg px-2 py-1.5 text-[0.8rem] w-full focus:outline-none focus:border-[#22c55e]"
              >
                <option value="">Select winner…</option>
                <option value={f.home.id}>{f.home.name}</option>
                <option value={f.away.id}>{f.away.name}</option>
                <option value="draw">Draw</option>
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={() => showToast(`✓ Result saved for ${f.home.name} vs ${f.away.name}`)}
                disabled={!results[f.id]}
              >
                Save
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Commentary editor preview */}
      <div>
        <h2 className="flex items-center gap-2 text-[1.05rem] font-bold text-gray-100 mb-4">
          <span className="w-[3px] h-[18px] bg-[#22c55e] rounded" />
          Commentary Editor
        </h2>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">
                Match
              </label>
              <select className="w-full bg-[#141414] border border-[#2a2a2a] text-[#f1f1f1] rounded-lg px-3 py-2 text-[0.85rem] focus:outline-none focus:border-[#22c55e]">
                {NRL_FIXTURES.slice(0, 4).map((f) => (
                  <option key={f.id}>{f.home.name} vs {f.away.name} (NRL)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">
                Prediction
              </label>
              <input
                type="text"
                placeholder="e.g. Brisbane Broncos by 8"
                className="w-full bg-[#141414] border border-[#2a2a2a] text-[#f1f1f1] rounded-lg px-3 py-2 text-[0.85rem] focus:outline-none focus:border-[#22c55e]"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[0.72rem] font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">
              Headline
            </label>
            <input
              type="text"
              placeholder="Match preview headline…"
              className="w-full bg-[#141414] border border-[#2a2a2a] text-[#f1f1f1] rounded-lg px-3 py-2 text-[0.85rem] focus:outline-none focus:border-[#22c55e]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[0.72rem] font-semibold text-[#6b7280] uppercase tracking-widest mb-1.5">
              Summary
            </label>
            <textarea
              rows={3}
              placeholder="Match summary and analysis…"
              className="w-full bg-[#141414] border border-[#2a2a2a] text-[#f1f1f1] rounded-lg px-3 py-2 text-[0.85rem] focus:outline-none focus:border-[#22c55e] resize-none"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => showToast('✓ Commentary saved')}>
              Save Commentary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
