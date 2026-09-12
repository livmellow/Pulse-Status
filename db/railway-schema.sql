-- Pulse Status multi-tenant PostgreSQL schema.
create table if not exists accounts (
  id uuid primary key,
  email text not null unique,
  password_hash text not null,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);
create table if not exists auth_identities (
  id uuid primary key, account_id uuid not null references accounts(id) on delete cascade,
  provider text not null, provider_account_id text not null, created_at timestamptz not null default now(),
  unique(provider, provider_account_id)
);
create table if not exists sessions (
  id uuid primary key, account_id uuid not null references accounts(id) on delete cascade,
  expires_at timestamptz not null, created_at timestamptz not null default now()
);
create table if not exists subscriptions (
  id uuid primary key, account_id uuid not null unique references accounts(id) on delete cascade,
  stripe_customer_id text unique, stripe_subscription_id text unique, status text not null default 'free',
  current_period_end timestamptz, updated_at timestamptz not null default now()
);

create table if not exists status_pages (
  id uuid primary key,
  account_id uuid not null references accounts(id) on delete cascade,
  slug text not null unique,
  display_name text not null,
  logo_url text,
  accent_color text not null default '#467c51',
  website_url text,
  custom_domain text unique,
  domain_verification_token text,
  domain_status text not null default 'not_configured',
  created_at timestamptz not null default now()
);

create table if not exists monitors (
  id uuid primary key,
  status_page_id uuid not null references status_pages(id) on delete cascade,
  name text not null,
  monitor_type text not null check (monitor_type in ('http','tcp','ping','discord_health')),
  target text not null,
  interval_seconds integer not null default 60,
  enabled boolean not null default true,
  current_status text not null default 'unknown',
  last_checked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists monitor_checks (
  id bigserial primary key,
  monitor_id uuid not null references monitors(id) on delete cascade,
  checked_at timestamptz not null default now(),
  is_up boolean not null,
  response_ms integer,
  failure_reason text
);
create index if not exists monitor_checks_monitor_time on monitor_checks(monitor_id, checked_at desc);

create table if not exists incidents (
  id uuid primary key,
  status_page_id uuid not null references status_pages(id) on delete cascade,
  monitor_id uuid references monitors(id) on delete set null,
  title text not null,
  message text not null,
  status text not null default 'investigating',
  started_at timestamptz not null default now(),
  resolved_at timestamptz
);
