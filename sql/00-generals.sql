-- Create a function that always returns the first non-NULL item
CREATE OR REPLACE FUNCTION public.first_agg ( anyelement, anyelement )
RETURNS anyelement LANGUAGE sql IMMUTABLE STRICT AS $$
        SELECT $1;
$$;
 
-- And then wrap an aggregate around it
CREATE AGGREGATE public.first (
        sfunc    = public.first_agg,
        basetype = anyelement,
        stype    = anyelement
);
 
-- Create a function that always returns the last non-NULL item
CREATE OR REPLACE FUNCTION public.last_agg ( anyelement, anyelement )
RETURNS anyelement LANGUAGE sql IMMUTABLE STRICT AS $$
        SELECT $2;
$$;
 
-- And then wrap an aggregate around it
CREATE AGGREGATE public.last (
        sfunc    = public.last_agg,
        basetype = anyelement,
        stype    = anyelement
);




-- Function: replace_url(text, text[], text[], boolean, boolean)
CREATE OR REPLACE FUNCTION public.replace_url(
    v_text text,
    v_param_whitelist text[],
    v_hash_param_whitelist text[],
    dontclean boolean,
    dontcleanhash boolean)
  RETURNS text AS
$BODY$
--v_param_whitelist
--v_hash_param_whitelist
Declare 
output text;
param TEXT;
cnt int;
BEGIN
  output = regexp_replace(v_text::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text);
  output = regexp_replace(output::text, '([\#\?\&]+[0-9a-zA-Z\+\%@\/\[\];=_-]+)*'::text, ''::text, 'g');

  cnt = 0;
  if array_length(v_param_whitelist,1) > 0 then
    FOREACH param IN ARRAY v_param_whitelist
    LOOP
      if cnt = 0 then
        output = output || '?' || (regexp_matches(v_text::text,'[\?\&]+('||param||'[=]?[0-9a-zA-Z\+\%@\/\[\];=_-]+)+[#]?'))[1];
      else
        output = output || '&' || (regexp_matches(v_text::text,'[\?\&]+('||param||'[=]?[0-9a-zA-Z\+\%@\/\[\];=_-]+)+[#]?'))[1];
      end if;
      cnt = cnt + 1;
    END LOOP;
  end IF;

  cnt = 0;
  if array_length(v_hash_param_whitelist,1) > 0 then
    FOREACH param IN ARRAY v_hash_param_whitelist
    LOOP
      if cnt = 0 then
        output = output || '#' || (regexp_matches(v_text::text,'(\#|\#.*\&)+('||param||'[0-9a-zA-Z\+\%@\/\[\];=_-]*)+'))[2];
      else
        output = output || '&' || (regexp_matches(v_text::text,'(\#|\#.*\&)+('||param||'[0-9a-zA-Z\+\%@\/\[\];=_-]*)+'))[2];
      end if;
      cnt = cnt + 1;
    END LOOP;
  end IF;

  if dontClean AND v_text::text LIKE '%?%' then
    output = output || (regexp_matches(v_text::text,'(\?[0-9a-zA-Z\+\%\&@\/\[\];=_-]*)+'))[1];
  end if;

  if dontCleanHash AND v_text::text LIKE '%#%' then
    output = output || (regexp_matches(v_text::text,'(\#[0-9a-zA-Z\+\%\&@\/\[\];=_-]*)+'))[1];
  end if;

  REturn output;
END;
$BODY$
  LANGUAGE plpgsql;
