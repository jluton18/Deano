'use client';
import { useState } from 'react';
import type { Fixture } from '@/lib/types';
import { TeamLogo } from '@/components/ui/TeamLogo';
import { SportBadge } from '@/components/ui/Badge';
import { CountdownTimer } from './CountdownTimer';
import { FormStrip } from './FormStrip';
import { formatKickoff } from '@/lib/utils';

interface MatchCardProps {
  fixture: Fixture;
  showTipButton?: boolean;
  onTip?: (fixtureId: string, teamId: string) => void;
  tippedTeamId?: string;
}

const HOME_FORM: Array<'W' | 'L' | 'D'> = ['W', 'W', 'L', 'W', 'W'];
const AWAY_FORM: Array<'W' | 'L' | 'D'> = ['W', 'L', 'W', 'L', 'W'];

export function MatchCard({ fixture, showTipButton, onTip, tippedTeamId }: MatchCardProps) {
  const [commOpen, setCommOpen] = useState(false);
  const comm = fixture.commentary;
  const accentClass = fixture.sport === 'NRL' ? 'card-accent-nrl' : 'card-accent-afl';

  return (
    <div
      className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#333] hover:shadow-[0_4px_24px_rgba(0,0,0,.6)] ${accentClass}`}
    >
      {/* Top meta */}
      <div className="flex items-center justify-between px-4 pt-3.5">
        <div className="flex items-center gap-2 text-[0.72rem] text-[#6b7280]">
          <SportBadge sport={fixture.sport} />
          <span>Round {fixture.round}</span>
        </div>
        <span className="text-[0.72rem] text-[#6b7280] truncate max-w-[140px]">{fixture.venue}</span>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={fixture.home} size={48} />
          <span className="text-[0.8rem] font-semibold text-gray-100 leading-tight">{fixture.home.name}</span>
          <FormStrip results={HOME_FORM} />
        </div>

        {/* VS + countdown */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.65rem] font-bold text-[#6b7280] tracking-widest">VS</span>
          <CountdownTimer kickoff={fixture.kickoff} />
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 text-center">
          <TeamLogo team={fixture.away} size={48} />
          <span className="text-[0.8rem] font-semibold text-gray-100 leading-tight">{fixture.away.name}</span>
          <FormStrip results={AWAY_FORM} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-[#2a2a2a]">
        <span className="text-[0.75rem] text-[#9ca3af]">
          ⏰ <strong className="text-gray-200 font-medium">{formatKickoff(fixture.kickoff)}</strong>
        </span>
        {showTipButton && (
          <div className="flex gap-1.5">
            <button
              onClick={() => onTip?.(fixture.id, fixture.home.id)}
              className={`px-2.5 py-1 rounded-md text-[0.72rem] font-semibold border transition-all duration-150 ${
                tippedTeamId === fixture.home.id
                  ? 'bg-[#22c55e] text-black border-[#22c55e]'
                  : 'border-[#2a2a2a] text-[#9ca3af] hover:border-[#22c55e] hover:text-[#22c55e]'
              }`}
            >
              {tippedTeamId === fixture.home.id ? '✓' : ''} {fixture.home.code}
            </button>
            <button
              onClick={() => onTip?.(fixture.id, fixture.away.id)}
              className={`px-2.5 py-1 rounded-md text-[0.72rem] font-semibold border transition-all duration-150 ${
                tippedTeamId === fixture.away.id
                  ? 'bg-[#22c55e] text-black border-[#22c55e]'
                  : 'border-[#2a2a2a] text-[#9ca3af] hover:border-[#22c55e] hover:text-[#22c55e]'
              }`}
            >
              {tippedTeamId === fixture.away.id ? '✓' : ''} {fixture.away.code}
            </button>
          </div>
        )}
      </div>

      {/* Commentary toggle */}
      {comm && (
        <>
          <button
            onClick={() => setCommOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-[0.75rem] font-medium text-[#6b7280] border-t border-[#2a2a2a] hover:text-[#22c55e] hover:bg-[rgba(34,197,94,.04)] transition-all duration-150"
          >
            <span className="flex items-center gap-1.5">📋 Match Preview &amp; Analysis</span>
            <span
              className="transition-transform duration-300"
              style={{ transform: commOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▾
            </span>
          </button>

          <div className={`commentary-panel ${commOpen ? 'open' : ''}`}>
            <div className="px-4 py-4 border-t border-[#2a2a2a]">
              <h3 className="text-[0.95rem] font-bold text-white mb-2 leading-snug">{comm.headline}</h3>
              <p className="text-[0.82rem] text-[#9ca3af] mb-4 leading-relaxed">{comm.summary}</p>

              <CommentarySection title="Form Guide">{comm.formNotes}</CommentarySection>

              <div className="mb-3">
                <CommentarySectionTitle>Key Players</CommentarySectionTitle>
                <div className="flex gap-2 flex-wrap mt-1.5">
                  {comm.keyPlayers.map((p) => (
                    <span key={p} className="px-2.5 py-1 bg-[#141414] border border-[#2a2a2a] rounded-full text-[0.72rem] font-medium text-gray-200">
                      ⭐ {p}
                    </span>
                  ))}
                </div>
              </div>

              <CommentarySection title="Tactical Analysis">{comm.tactics}</CommentarySection>

              <div className="mb-3">
                <CommentarySectionTitle>Things to Watch</CommentarySectionTitle>
                <ul className="mt-1.5 flex flex-col gap-1.5">
                  {comm.thingsToWatch.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-[0.82rem] text-[#9ca3af]">
                      <span className="text-[#22c55e] font-bold mt-px">→</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <CommentarySectionTitle>Confidence</CommentarySectionTitle>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full confidence-fill"
                      style={{
                        width: `${comm.confidence}%`,
                        background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                      }}
                    />
                  </div>
                  <span className="text-[0.75rem] font-semibold text-[#22c55e] whitespace-nowrap">
                    {comm.confidence}%
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[rgba(34,197,94,.05)] border border-[rgba(34,197,94,.2)] rounded-lg">
                <div className="text-[0.68rem] font-bold uppercase tracking-widest text-[#22c55e] mb-1">
                  🎯 TipLab Prediction
                </div>
                <div className="text-[0.9rem] font-semibold text-white">{comm.prediction}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CommentarySectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-widest text-[#22c55e]">
      <span className="w-2.5 h-0.5 bg-[#22c55e] rounded" />
      {children}
    </div>
  );
}

function CommentarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <CommentarySectionTitle>{title}</CommentarySectionTitle>
      <p className="mt-1.5 text-[0.82rem] text-[#9ca3af] leading-relaxed">{children}</p>
    </div>
  );
}
