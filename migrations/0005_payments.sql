-- Owner answers, a run token separate from the model name, and a payment ledger.
-- NEXUS records payments. It does not move money.

alter table missions add column if not exists answers text not null default '';

alter table assignments add column if not exists run_token text not null default '';

create table if not exists payments (
  id text primary key,
  organization_id text not null,
  mission_id text,
  payer text not null,
  amount_cents integer not null check (amount_cents > 0),
  method text not null,
  destination text not null,
  note text not null default '',
  created_by text not null,
  created_at timestamptz not null default now()
);

create index if not exists payments_org_idx on payments (organization_id, created_at desc);
