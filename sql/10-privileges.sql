
\c farfalia_prod

-- application
GRANT CONNECT ON DATABASE farfalia_prod TO application;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA analytical, feed, warehouse TO application;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA analytical, feed, warehouse TO application;
GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA analytical, feed, warehouse TO application;
GRANT USAGE ON SCHEMA analytical, feed, warehouse TO application;

-- manager
GRANT CONNECT ON DATABASE farfalia_prod TO manager;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA analytical, feed, warehouse TO manager;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA analytical, feed, warehouse TO manager;
GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA analytical, feed, warehouse TO manager;
GRANT USAGE ON SCHEMA analytical, feed, warehouse TO manager;

-- viewer
GRANT CONNECT ON DATABASE farfalia_prod TO viewer;
GRANT SELECT ON ALL TABLES IN SCHEMA analytical, feed, warehouse TO viewer;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA analytical, feed, warehouse TO viewer;
GRANT USAGE ON SCHEMA analytical, feed, warehouse TO viewer;




-- Create developer database
\c postgres
-- createdb -O developer -T farfalia_prod farfalia_dev
DROP DATABASE farfalia_dev;
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'farfalia_prod' AND pid <> pg_backend_pid();
CREATE DATABASE farfalia_dev WITH TEMPLATE farfalia_prod OWNER developer;
-- OR
-- DUMP_FILE=/home/farfalia/postgres/dump-farfalia_prod/`date +%Y-%m-%d_%H-%M-%S.dump` && pg_dump farfalia_prod > $DUMP_FILE && psql -c 'DROP DATABASE IF EXISTS farfalia_dev' && psql -c 'CREATE DATABASE farfalia_dev' && psql farfalia_dev < $DUMP_FILE && psql farfalia_dev < /home/farfalia/postgres/grant-farfalia_dev.sql

\c farfalia_dev

-- developer
GRANT CONNECT ON DATABASE farfalia_dev TO developer;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA analytical, feed, warehouse TO developer;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA analytical, feed, warehouse TO developer;
GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA analytical, feed, warehouse TO developer;
GRANT USAGE ON SCHEMA analytical, feed, warehouse TO developer;




-- Grant test database
\c farfalia
GRANT CONNECT ON DATABASE farfalia TO developer;
GRANT ALL ON ALL TABLES IN SCHEMA analytical, feed, warehouse TO developer;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA analytical, feed, warehouse TO developer;
GRANT ALL ON ALL SEQUENCES IN SCHEMA analytical, feed, warehouse TO developer;
GRANT ALL ON SCHEMA analytical, feed, warehouse TO developer;
