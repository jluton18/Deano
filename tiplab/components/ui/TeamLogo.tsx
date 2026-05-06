import type { Team } from '@/lib/types';

interface TeamLogoProps {
  team: Team;
  size?: number;
}

export function TeamLogo({ team, size = 48 }: TeamLogoProps) {
  const fontSize = Math.round(size * 0.28);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: team.primaryColor,
        color: team.textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        flexShrink: 0,
        letterSpacing: '-0.02em',
      }}
      aria-label={team.name}
    >
      {team.code}
    </div>
  );
}
