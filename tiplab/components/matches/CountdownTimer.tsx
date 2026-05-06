'use client';
import { useState, useEffect } from 'react';
import { getCountdown } from '@/lib/utils';

interface CountdownTimerProps {
  kickoff: Date;
  className?: string;
}

export function CountdownTimer({ kickoff, className }: CountdownTimerProps) {
  const [display, setDisplay] = useState(getCountdown(kickoff));

  useEffect(() => {
    const id = setInterval(() => setDisplay(getCountdown(kickoff)), 1000);
    return () => clearInterval(id);
  }, [kickoff]);

  const isLive = kickoff.getTime() <= Date.now();

  return (
    <span
      className={className}
      style={{ color: isLive ? '#f87171' : '#22c55e', fontWeight: 700, fontSize: '0.82rem' }}
    >
      {isLive ? '🔴 Live' : display}
    </span>
  );
}
