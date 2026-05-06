export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatKickoff(date: Date): string {
  return date.toLocaleString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Australia/Sydney',
  }) + ' AEST';
}

export function formatKickoffShort(date: Date): string {
  return date.toLocaleString('en-AU', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Australia/Sydney',
  });
}

export function getCountdown(date: Date): string {
  const diff = date.getTime() - Date.now();
  if (diff <= 0) return 'Live';
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  if (h > 24) {
    const days = Math.floor(h / 24);
    return `${days}d ${h % 24}h`;
  }
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

export function accuracyColor(acc: number): string {
  if (acc >= 70) return '#22c55e';
  if (acc >= 60) return '#fbbf24';
  return '#f87171';
}
