-- ============================================================
-- TipLab Seed Data
-- ============================================================

-- ============================================================
-- TEAMS — NRL
-- ============================================================
insert into teams (code, name, sport, city, primary_color, text_color) values
  ('BRI', 'Brisbane Broncos',        'NRL', 'Brisbane',   '#6b21a8', '#c084fc'),
  ('CBR', 'Canberra Raiders',         'NRL', 'Canberra',   '#166534', '#4ade80'),
  ('CBY', 'Canterbury Bulldogs',      'NRL', 'Canterbury', '#1e3a5f', '#60a5fa'),
  ('CRO', 'Cronulla Sharks',          'NRL', 'Cronulla',   '#0c4a6e', '#38bdf8'),
  ('GLD', 'Gold Coast Titans',        'NRL', 'Gold Coast', '#78350f', '#fbbf24'),
  ('MAN', 'Manly Sea Eagles',         'NRL', 'Manly',      '#1e1b4b', '#a5b4fc'),
  ('MEL', 'Melbourne Storm',          'NRL', 'Melbourne',  '#4a044e', '#d946ef'),
  ('NEW', 'Newcastle Knights',        'NRL', 'Newcastle',  '#1c1917', '#a8a29e'),
  ('NZW', 'NZ Warriors',              'NRL', 'Auckland',   '#1e3a5f', '#93c5fd'),
  ('NQC', 'North QLD Cowboys',        'NRL', 'Townsville', '#1c2951', '#fbbf24'),
  ('PAR', 'Parramatta Eels',          'NRL', 'Parramatta', '#1e3a5f', '#fbbf24'),
  ('PEN', 'Penrith Panthers',         'NRL', 'Penrith',    '#1a1a2e', '#818cf8'),
  ('SSY', 'South Sydney Rabbitohs',   'NRL', 'Sydney',     '#14532d', '#f87171'),
  ('SGI', 'St George Illawarra',      'NRL', 'Wollongong', '#7f1d1d', '#fca5a5'),
  ('SYD', 'Sydney Roosters',          'NRL', 'Sydney',     '#7f1d1d', '#f87171'),
  ('WST', 'Wests Tigers',             'NRL', 'Sydney',     '#78350f', '#fb923c');

-- ============================================================
-- TEAMS — AFL
-- ============================================================
insert into teams (code, name, sport, city, primary_color, text_color) values
  ('ADE', 'Adelaide Crows',      'AFL', 'Adelaide',   '#831843', '#f9a8d4'),
  ('BRL', 'Brisbane Lions',      'AFL', 'Brisbane',   '#7c2d12', '#fdba74'),
  ('CAR', 'Carlton Blues',       'AFL', 'Melbourne',  '#1e3a5f', '#93c5fd'),
  ('COL', 'Collingwood Magpies', 'AFL', 'Melbourne',  '#1c1917', '#e7e5e4'),
  ('ESS', 'Essendon Bombers',    'AFL', 'Melbourne',  '#450a0a', '#f87171'),
  ('FRE', 'Fremantle Dockers',   'AFL', 'Fremantle',  '#4c1d95', '#c4b5fd'),
  ('GEE', 'Geelong Cats',        'AFL', 'Geelong',    '#1e3a5f', '#fbbf24'),
  ('GCS', 'Gold Coast Suns',     'AFL', 'Gold Coast', '#7c2d12', '#fbbf24'),
  ('GWS', 'GWS Giants',          'AFL', 'Sydney',     '#7f1d1d', '#fb923c'),
  ('HAW', 'Hawthorn Hawks',      'AFL', 'Melbourne',  '#713f12', '#fbbf24'),
  ('MEL', 'Melbourne Demons',    'AFL', 'Melbourne',  '#7f1d1d', '#f9a8d4'),
  ('NME', 'North Melbourne',     'AFL', 'Melbourne',  '#1e3a5f', '#f1f5f9'),
  ('POR', 'Port Adelaide Power', 'AFL', 'Adelaide',   '#0c4a6e', '#38bdf8'),
  ('RIC', 'Richmond Tigers',     'AFL', 'Melbourne',  '#1c1917', '#fbbf24'),
  ('STK', 'St Kilda Saints',     'AFL', 'Melbourne',  '#1c1917', '#f87171'),
  ('SWN', 'Sydney Swans',        'AFL', 'Sydney',     '#7f1d1d', '#f9a8d4'),
  ('WCE', 'West Coast Eagles',   'AFL', 'Perth',      '#1e3a5f', '#fbbf24'),
  ('WBD', 'Western Bulldogs',    'AFL', 'Melbourne',  '#1e3a5f', '#f87171');

-- ============================================================
-- COMPETITIONS
-- ============================================================
insert into competitions (name, sport, season, current_round, total_rounds, starts_at, ends_at) values
  ('NRL Premiership 2025', 'NRL', 2025, 14, 27, '2025-03-06', '2025-10-05'),
  ('AFL Premiership 2025', 'AFL', 2025, 14, 23, '2025-03-13', '2025-09-27');

-- ============================================================
-- FIXTURES (Round 14 sample — 8 NRL, 9 AFL)
-- Timestamps in Sydney time (AEST = UTC+10)
-- ============================================================
-- NRL Round 14
insert into fixtures (competition_id, round, home_team_id, away_team_id, venue, kickoff_at, status)
select
  (select id from competitions where sport = 'NRL' and season = 2025),
  14,
  h.id, a.id, venue, kickoff::timestamptz, 'upcoming'
from (values
  ('SYD','PEN','Allianz Stadium, Sydney',       '2025-06-06 19:50:00+10'),
  ('BRI','MEL','Suncorp Stadium, Brisbane',      '2025-06-07 17:30:00+10'),
  ('MAN','CRO','4 Pines Park, Brookvale',        '2025-06-07 19:35:00+10'),
  ('NEW','CBR','McDonald Jones Stadium, Newcastle','2025-06-08 14:00:00+10'),
  ('SSY','SGI','Accor Stadium, Sydney',           '2025-06-08 16:00:00+10'),
  ('PAR','NZW','CommBank Stadium, Parramatta',    '2025-06-08 18:05:00+10'),
  ('NQC','GLD','Qld Country Bank Stadium, Townsville','2025-06-09 14:00:00+10'),
  ('CBY','WST','Accor Stadium, Sydney',           '2025-06-09 16:00:00+10')
) as v(hcode, acode, venue, kickoff)
join teams h on h.code = v.hcode and h.sport = 'NRL'
join teams a on a.code = v.acode and a.sport = 'NRL';

-- AFL Round 14
insert into fixtures (competition_id, round, home_team_id, away_team_id, venue, kickoff_at, status)
select
  (select id from competitions where sport = 'AFL' and season = 2025),
  14,
  h.id, a.id, venue, kickoff::timestamptz, 'upcoming'
from (values
  ('COL','RIC','MCG, Melbourne',                  '2025-06-06 19:30:00+10'),
  ('GEE','ESS','GMHBA Stadium, Geelong',           '2025-06-07 13:45:00+10'),
  ('CAR','SWN','Marvel Stadium, Melbourne',        '2025-06-07 16:35:00+10'),
  ('BRL','HAW','Gabba, Brisbane',                  '2025-06-07 19:40:00+10'),
  ('POR','ADE','Adelaide Oval, Adelaide',          '2025-06-08 14:10:00+10'),
  ('WCE','FRE','Optus Stadium, Perth',             '2025-06-08 16:20:00+10'),
  ('GCS','NME','People First Stadium, Gold Coast', '2025-06-08 19:35:00+10'),
  ('STK','MEL','Marvel Stadium, Melbourne',        '2025-06-09 13:10:00+10'),
  ('GWS','WBD','ENGIE Stadium, Sydney',            '2025-06-09 16:35:00+10')
) as v(hcode, acode, venue, kickoff)
join teams h on h.code = v.hcode and h.sport = 'AFL'
join teams a on a.code = v.acode and a.sport = 'AFL';

-- ============================================================
-- COMMENTARY (sample entries)
-- ============================================================
insert into commentary (fixture_id, headline, summary, form_notes, key_players, tactics,
                         prediction, predicted_winner, confidence, things_to_watch)
select
  f.id,
  'Roosters vs Panthers: The clash that defines the top four',
  'Two of the competition''s most consistent sides meet in a crucial top-four battle. Sydney Roosters enjoy home advantage at Allianz Stadium while Penrith travel with confidence from three straight wins.',
  'Sydney have won 4 of their last 5 at home. Penrith are on a 3-game winning streak and have not lost away from home since Round 7.',
  array['James Tedesco','Nathan Cleary','Dylan Edwards','Angus Crichton'],
  'The Panthers will look to control field position through Cleary''s kicking game and exploit the Roosters'' right-edge defence. Sydney will counter through Tedesco''s run-and-link play.',
  'Sydney Roosters by 6',
  'home',
  68,
  array['Cleary''s kicking game under pressure','First-set completion rates','Impact of bench players after the 50-minute mark']
from fixtures f
join teams h on h.id = f.home_team_id and h.code = 'SYD' and h.sport = 'NRL'
where f.round = 14;

-- ============================================================
-- MOCK USERS (for local dev — Supabase auth handles real signup)
-- ============================================================
-- NOTE: In production, users are created via auth.users → profiles trigger.
-- The following inserts directly into profiles for seeding purposes only
-- and requires disabling RLS or using a service role key.

-- insert into public.profiles (id, username, avatar_color) values
--   (gen_random_uuid(), 'CoachMate99', '#7c3aed'),
--   (gen_random_uuid(), 'TipsterKing', '#0891b2'),
--   (gen_random_uuid(), 'GreenMachine', '#16a34a'),
--   (gen_random_uuid(), 'NRLExpert',   '#dc2626'),
--   (gen_random_uuid(), 'FootyFanatic','#d97706');
