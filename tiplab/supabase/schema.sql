-- ============================================================
-- TipLab Database Schema
-- PostgreSQL / Supabase
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for fuzzy username search

-- ============================================================
-- ENUM TYPES
-- ============================================================
create type sport_type as enum ('NRL', 'AFL');
create type fixture_status as enum ('upcoming', 'live', 'completed', 'postponed');
create type winner_type as enum ('home', 'away', 'draw');

-- ============================================================
-- TEAMS
-- ============================================================
create table teams (
  id            uuid primary key default uuid_generate_v4(),
  code          varchar(4) not null,
  name          varchar(100) not null,
  sport         sport_type not null,
  city          varchar(80),
  primary_color varchar(7) not null default '#1a1a1a',
  text_color    varchar(7) not null default '#ffffff',
  logo_url      text,
  created_at    timestamptz not null default now(),

  unique(code, sport)
);

create index idx_teams_sport on teams(sport);

-- ============================================================
-- COMPETITIONS
-- ============================================================
create table competitions (
  id          uuid primary key default uuid_generate_v4(),
  name        varchar(100) not null,        -- "NRL Premiership 2025"
  sport       sport_type not null,
  season      integer not null,             -- 2025
  current_round integer,
  total_rounds  integer,
  starts_at   date,
  ends_at     date,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- FIXTURES
-- ============================================================
create table fixtures (
  id             uuid primary key default uuid_generate_v4(),
  competition_id uuid not null references competitions(id) on delete cascade,
  round          integer not null,
  home_team_id   uuid not null references teams(id),
  away_team_id   uuid not null references teams(id),
  venue          varchar(150),
  kickoff_at     timestamptz not null,
  status         fixture_status not null default 'upcoming',

  -- Result (populated after match)
  home_score     integer,
  away_score     integer,
  winner         winner_type,

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  check(home_team_id != away_team_id)
);

create index idx_fixtures_kickoff    on fixtures(kickoff_at);
create index idx_fixtures_status     on fixtures(status);
create index idx_fixtures_competition on fixtures(competition_id, round);
create index idx_fixtures_home       on fixtures(home_team_id);
create index idx_fixtures_away       on fixtures(away_team_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger fixtures_updated_at
  before update on fixtures
  for each row execute procedure update_updated_at();

-- ============================================================
-- COMMENTARY
-- ============================================================
create table commentary (
  id               uuid primary key default uuid_generate_v4(),
  fixture_id       uuid not null references fixtures(id) on delete cascade,
  headline         text not null,
  summary          text,
  form_notes       text,
  key_players      text[],              -- array of player names
  tactics          text,
  prediction       text,
  predicted_winner winner_type,
  confidence       integer check(confidence between 0 and 100),
  things_to_watch  text[],
  author_id        uuid,               -- references users (optional)
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  unique(fixture_id)
);

create trigger commentary_updated_at
  before update on commentary
  for each row execute procedure update_updated_at();

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     varchar(30) not null unique,
  avatar_color varchar(7) not null default '#22c55e',
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint username_format check(username ~ '^[a-zA-Z0-9_]{3,30}$')
);

create index idx_profiles_username on profiles using gin(username gin_trgm_ops);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure update_updated_at();

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- TIPS
-- ============================================================
create table tips (
  id              uuid primary key default uuid_generate_v4(),
  fixture_id      uuid not null references fixtures(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  selected_team_id uuid not null references teams(id),
  is_correct      boolean,             -- null until result confirmed
  submitted_at    timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique(fixture_id, user_id)          -- one tip per user per fixture
);

create index idx_tips_user    on tips(user_id);
create index idx_tips_fixture on tips(fixture_id);
create index idx_tips_correct on tips(is_correct);

create trigger tips_updated_at
  before update on tips
  for each row execute procedure update_updated_at();

-- Prevent tipping after kickoff
create or replace function prevent_late_tip()
returns trigger language plpgsql as $$
declare
  kickoff timestamptz;
begin
  select kickoff_at into kickoff from fixtures where id = new.fixture_id;
  if kickoff <= now() then
    raise exception 'Cannot tip after kickoff';
  end if;
  return new;
end;
$$;

create trigger tip_before_kickoff
  before insert or update on tips
  for each row execute procedure prevent_late_tip();

-- ============================================================
-- RESULTS
-- ============================================================
create table results (
  id          uuid primary key default uuid_generate_v4(),
  fixture_id  uuid not null references fixtures(id) on delete cascade unique,
  home_score  integer not null,
  away_score  integer not null,
  winner      winner_type not null,
  confirmed_at timestamptz not null default now(),
  confirmed_by uuid references public.profiles(id)
);

-- Auto-score tips when result confirmed
create or replace function score_tips_on_result()
returns trigger language plpgsql as $$
declare
  winning_team_id uuid;
begin
  -- Find the winning team id
  if new.winner = 'home' then
    select home_team_id into winning_team_id from fixtures where id = new.fixture_id;
  elsif new.winner = 'away' then
    select away_team_id into winning_team_id from fixtures where id = new.fixture_id;
  end if;

  -- Update tips
  if winning_team_id is not null then
    update tips
    set is_correct = (selected_team_id = winning_team_id),
        updated_at = now()
    where fixture_id = new.fixture_id;
  else
    -- Draw — all tips incorrect
    update tips set is_correct = false where fixture_id = new.fixture_id;
  end if;

  -- Update fixture status and scores
  update fixtures
  set status = 'completed',
      home_score = new.home_score,
      away_score = new.away_score,
      winner = new.winner
  where id = new.fixture_id;

  return new;
end;
$$;

create trigger result_score_tips
  after insert on results
  for each row execute procedure score_tips_on_result();

-- ============================================================
-- LEADERBOARD VIEW
-- ============================================================
create or replace view leaderboard_season as
select
  p.id as user_id,
  p.username,
  p.avatar_color,
  count(t.id) filter (where t.is_correct is not null) as games_played,
  count(t.id) filter (where t.is_correct = true)  as correct_tips,
  count(t.id) filter (where t.is_correct = false) as wrong_tips,
  round(
    100.0 * count(t.id) filter (where t.is_correct = true) /
    nullif(count(t.id) filter (where t.is_correct is not null), 0),
    1
  ) as accuracy_pct,
  count(t.id) filter (where t.is_correct = true) as total_score
from public.profiles p
left join tips t on t.user_id = p.id
group by p.id, p.username, p.avatar_color
order by total_score desc, accuracy_pct desc;

-- Round leaderboard (parameterised via function)
create or replace function leaderboard_round(p_competition_id uuid, p_round integer)
returns table (
  user_id      uuid,
  username     varchar,
  avatar_color varchar,
  round_score  bigint,
  total_score  bigint,
  accuracy_pct numeric
) language sql stable as $$
  select
    p.id,
    p.username,
    p.avatar_color,
    count(t.id) filter (
      where t.is_correct = true
        and f.competition_id = p_competition_id
        and f.round = p_round
    ) as round_score,
    count(t.id) filter (where t.is_correct = true) as total_score,
    round(
      100.0 * count(t.id) filter (where t.is_correct = true) /
      nullif(count(t.id) filter (where t.is_correct is not null), 0),
      1
    ) as accuracy_pct
  from public.profiles p
  left join tips t on t.user_id = p.id
  left join fixtures f on f.id = t.fixture_id
  group by p.id, p.username, p.avatar_color
  order by round_score desc, total_score desc;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table tips enable row level security;
alter table commentary enable row level security;
alter table fixtures enable row level security;
alter table teams enable row level security;
alter table results enable row level security;

-- Profiles: users can read all, update only own
create policy "Profiles are public"
  on public.profiles for select using (true);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Tips: users can read all, insert/update own
create policy "Tips are public"
  on tips for select using (true);

create policy "Users manage own tips"
  on tips for insert
  with check (auth.uid() = user_id);

create policy "Users update own tips"
  on tips for update
  using (auth.uid() = user_id);

-- Fixtures/Teams/Commentary: public read
create policy "Fixtures public read"  on fixtures   for select using (true);
create policy "Teams public read"     on teams      for select using (true);
create policy "Commentary public read" on commentary for select using (true);
create policy "Results public read"   on results    for select using (true);

-- Admin write policies (using is_admin flag)
create policy "Admins manage fixtures"
  on fixtures for all
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "Admins manage teams"
  on teams for all
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "Admins manage commentary"
  on commentary for all
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "Admins manage results"
  on results for all
  using ((select is_admin from public.profiles where id = auth.uid()));
