-- A void keeps the row. It is not a refund, and it drops the amount from the total.

alter table payments add column if not exists voided_at timestamptz;
