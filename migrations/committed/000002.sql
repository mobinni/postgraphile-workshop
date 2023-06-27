--! Previous: sha1:dac91a09ad9977583f4541b014872ea4ca5ec4a6
--! Hash: sha1:109944eb6d8ea04d2ba232e56cc784dae1b0618d

-- Enter migration here
DROP TABLE IF EXISTS app_public.activities;
CREATE TABLE IF NOT EXISTS app_public.activities
(
    canonical_id   text PRIMARY KEY,
    account_id     text                     NOT NULL,
    amount         text,
    currency       text,
    type           text                     NOT NULL,
    sub_type       text,
    status         text,
    visible        boolean                  NOT NULL DEFAULT TRUE,
    occurred_at    timestamp with time zone NOT NULL,
    created_at     timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at     timestamp with time zone NOT NULL DEFAULT NOW(),
    spend_merchant text,
    fx_rate        decimal,
    p2p_handle     text
);

comment on table app_public.activities is $$
  @interface mode:single type:type
  @type prepaid name:SpendActivityDetails attributes:spend_merchant,fx_rate
  @type p2p_payment name:P2PActivityDetails attributes:p2p_handle
$$;
