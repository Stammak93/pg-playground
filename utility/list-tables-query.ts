export const LIST_TABLES_QUERY_MIN = `SELECT table_name, column_name, data_type, character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public'
GROUP BY table_name, column_name, data_type, character_maximum_length;`

export const LIST_TABLES_QUERY_FULL = `SELECT *
FROM information_schema.columns 
WHERE table_schema = 'public';`

export const REMOVE_FAKE_TABLES = `DO 
$do$
DECLARE
  _tb text;
BEGIN 
  FOR _tb IN
    SELECT table_name
    FROM information_schema.columns
    WHERE table_name LIKE 'fake_%' AND table_schema = 'public'
    GROUP BY table_name
LOOP
    EXECUTE 'DROP TABLE ' || _tb;
END LOOP;
END
$do$;`

export const CLEAR_ALL_TABLES = `-- WARNING: this will clear all user created tables!!!
DO 
$do$
DECLARE
  _tb text;
BEGIN 
  FOR _tb IN
    SELECT table_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    GROUP BY table_name
LOOP
    EXECUTE 'DROP TABLE ' || _tb;
END LOOP;
END
$do$;`