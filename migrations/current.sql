-- Enter migration here
GRANT USAGE ON SCHEMA "app_public" TO client;
GRANT SELECT ON ALL TABLES IN SCHEMA "app_public" TO client;

DROP POLICY IF EXISTS user_activities_permission ON "app_public".activities;
DROP FUNCTION IF EXISTS "app_public".get_current_account_ids;

CREATE OR REPLACE FUNCTION "app_public".get_current_account_ids ()
    RETURNS text[]
AS $$
SELECT
    STRING_TO_ARRAY(CURRENT_SETTING('user.account_ids', TRUE), ',');
$$
LANGUAGE sql
STABLE;

-- CREATE POLICY user_activities_permission ON "app_public".activities
--     FOR SELECT
--     USING ("account_id" = ANY("app_public".get_current_account_ids ()));


DROP FUNCTION IF exists "app_public".activities_by_account;
CREATE OR REPLACE FUNCTION activities_by_account(account_ids text[]) RETURNS SETOF "app_public".activities AS $$
    SELECT * FROM "app_public".activities WHERE account_id = ANY(account_ids);
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
