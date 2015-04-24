
DROP SCHEMA if exists public_test CASCADE;
CREATE SCHEMA public_test;

CREATE OR REPLACE FUNCTION public_test.test_function_replace_url()
RETURNS TABLE( passing boolean, description varchar) AS $$
	SELECT public.replace_url('http://www.foo.com/blah_blah/blah_blah/?a=12313&kacer=kachna&zaba=123#asdasd&kacer=43&zaba=tresne', '{"kacer","zaba","a"}', '{"kacer","zaba"}', FALSE, FALSE)
		= '/blah_blah/blah_blah/?kacer=kachna&zaba=123&a=12313#kacer=43&zaba=tresne' AS passing,
		'Url is striped from schema & host & keep only whitelisted query params & hash params' AS description
	UNION
	SELECT public.replace_url('http://www.foo.com/blah_blah/blah_blah/?kacer=kachna&a=12313&zaba=123#asdasd&kacer=43&zaba=tresne', '{"kacer","zaba","a"}', '{"kacer","zaba"}', FALSE, FALSE)
		= '/blah_blah/blah_blah/?kacer=kachna&zaba=123&a=12313#kacer=43&zaba=tresne' AS passing,
		'Query params & hash params are sorted by input whitelist' AS description
	UNION
	SELECT public.replace_url('http://www.foo.com/blah_blah/blah_blah/?kacer=kachna&noValue&zaba=123#asdasd&kacer&zaba=tresne', '{"kacer","zaba","a"}', '{"kacer","zaba"}', FALSE, FALSE)
		= '/blah_blah/blah_blah/?kacer=kachna&zaba=123&noValue#kacer&zaba=tresne' AS passing,
		'Query params & hash params are kept if no value' AS description
	UNION
	SELECT public.replace_url('http://www.foo.com/blah_blah/blah_blah/?kacer=kachna&a=&zaba=123#asdasd&kacer=&zaba=tresne', '{"kacer","zaba","a"}', '{"kacer","zaba"}', FALSE, FALSE)
		= '/blah_blah/blah_blah/?kacer=kachna&zaba=123&a#kacer&zaba=tresne' AS passing,
		'Query params & hash params strip = sign if no value' AS description
	UNION
	SELECT public.replace_url('http://www.foo.com/blah_blah/blah_blah/', '{"kacer","zaba","a"}', '{"kacer","zaba"}', FALSE, FALSE)
		= '/blah_blah/blah_blah/' AS passing,
		'No stripping without input params' AS description
	;
$$ LANGUAGE sql;
