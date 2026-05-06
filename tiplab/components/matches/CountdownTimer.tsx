'use client';
import { useState, useEffect } from 'react';
import { getCountdown } from '@/lib/utils';

interface CountdownTimerProps {
  kickoff: Date;
  className?: string;
}

export function CountdownTimer({ kickoff, className }: CountdownTimerProps) {
  // Start with null so SSR renders nothing — avoids hydration mismatch between
  // build-time server render and client load time.
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    setDisplay(getCountdown(kickoff));
    const id = setInterval(() => setDisplay(getCountdown(kickoff)), 1000);
    return () => clearInterval(id);
  }, [kickoff]);

  const isLive = kickoff.getTime() <= Date.now();

  if (display === null) {
    // Skeleton placeholder — matches the rendered size so layout doesn't shift
    return (
      <span
        className={className}
        style={{
          display: 'inline-block',
          width: '52px',
          height: '14px',
          borderRadius: '4px',
          background: '#2a2a2a',
        }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ color: isLive ? '#f87171' : '#22c55e', fontWeight: 700, fontSize: '0.82rem' }}
    >
      {isLive ? '🔴 Live' : display}
    </span>
  );
}
