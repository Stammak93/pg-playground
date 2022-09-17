export const LIST_TABLES_QUERY_MIN = `SELECT table_name, column_name, data_type, character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public'
GROUP BY table_name, column_name, data_type, character_maximum_length;`

export const LIST_TABLES_QUERY_FULL = `SELECT *
FROM information_schema.columns 
WHERE table_schema = 'public';`