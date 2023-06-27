--! Previous: sha1:109944eb6d8ea04d2ba232e56cc784dae1b0618d
--! Hash: sha1:fca3ee7b05405421a2bbc965ba38b73144552edf

-- Enter migration here
GRANT USAGE ON SCHEMA "app_public" TO client;
GRANT SELECT ON ALL TABLES IN SCHEMA "app_public" TO client;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA "app_public" TO client;

DROP POLICY IF EXISTS user_account_permission ON "app_public".activities;
DROP FUNCTION IF EXISTS "app_public".get_current_account_ids;
CREATE INDEX IF NOT EXISTS activities_account_id_idx ON "app_public".activities ("account_id");

ALTER TABLE "app_public".activities ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION "app_public".get_current_account_ids ()
    RETURNS SETOF text
AS $$

SELECT
    unnest(STRING_TO_ARRAY(CURRENT_SETTING('user.account_ids', TRUE), ','));
$$
    LANGUAGE sql
    STABLE;

CREATE POLICY user_account_permission ON "app_public".activities
    FOR SELECT
    USING ("account_id" IN (SELECT "app_public".get_current_account_ids ()));
