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




-- warehouse loadLog view
CREATE OR REPLACE VIEW warehouse.eshopmatrixloads AS
 SELECT a.eshopid,
    rank() OVER (PARTITION BY a.eshopid ORDER BY a.period) AS loadid,
    a.period
   FROM ( SELECT s.eshopid,
            t.period
           FROM eshopsettings s,
            LATERAL generate_series(s.datestart, now(), (s.datarefreshperiod)::interval) t(period)) a;




-- fulling uri by url, loc etc.-- fulling uri by url, loc etc.
CREATE OR REPLACE FUNCTION feed.create_feeduri()
RETURNS void AS $$
BEGIN
	UPDATE feed.sitemap s 
	SET uri = regexp_replace(s.loc::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE s.uri IS NULL;

-- TODO strip query params
	UPDATE feed.ga_pageview p 
	SET uri = regexp_replace(p.pagepath::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE p.uri IS NULL;

	UPDATE feed.ga_revenue r 
	SET uri = regexp_replace(r.pagepath::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE r.uri IS NULL;

	UPDATE feed.heureka h 
	SET uri = regexp_replace(h.url::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE h.uri IS NULL;

	UPDATE feed.zbozi z 
	SET uri = regexp_replace(z.url::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE z.uri IS NULL;
END;
$$ LANGUAGE plpgsql;




-- group feedload to one loadlog
CREATE OR REPLACE FUNCTION feed.create_loadlogid()
RETURNS void AS $$
DECLARE
   tablename text;
BEGIN
	UPDATE feed.feedload
	SET loadlogid = loadlog.loadid
	FROM warehouse.eshopmatrixloads loadlog
	WHERE feedload.eshopid = loadlog.eshopid
		AND loadlog.period + (SELECT datarefreshperiod FROM warehouse.eshopsettings WHERE eshopid = feedload.eshopid LIMIT 1)::interval > feedload.loaddate
		AND loadlog.period < feedload.loaddate
	AND feedload.loadlogid IS NULL
	;

	FOR tablename IN SELECT regexp_split_to_table(
		'ga_pageview,ga_revenue,heureka,heurekaaccessory,heurekadelivery,heurekaparam,priceapi,priceapijob,sitemap,zbozi,zbozi_variant',
		','
	)
	LOOP
		EXECUTE 'UPDATE feed.' || tablename || '
		SET loadlogid = feedload.loadlogid
		FROM feedload
		WHERE feedload.loadid = ' || tablename || '.loadid
		AND ' || tablename || '.loadlogid IS NULL';
	END LOOP;
END;
$$ LANGUAGE plpgsql;



-- fullfilling masterproduct
CREATE OR REPLACE VIEW feed.notpairedmasterproduct AS
SELECT
	loadlog.period AS createdat,
	sitemap.eshopid AS eshopid,
	COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri)	AS uri,
	COALESCE(heureka.productname, zbozi.productname, product.productname, priceapi.name) AS productname,
	COALESCE(heureka.ean, zbozi.ean, priceapi.value) AS ean,
	public.last(heureka.heurekaid) AS heurekaid,
	public.last(sitemap.sitemapid) AS sitemapid,
	public.last(zbozi.zboziid) AS zboziid,
	public.last(product.productid) AS productid,
	public.last(priceapi.priceapiid) AS priceapiid,
	public.last(ga_revenue.revenuesid) AS revenuesid,
	public.last(ga_pageview.turnoutid) AS turnoutid
FROM feed.sitemap
-- heureka
FULL OUTER JOIN feed.heureka ON heureka.loadlogid = sitemap.loadlogid AND heureka.eshopid = sitemap.eshopid AND heureka.uri =
	sitemap.uri
-- zbozi
FULL OUTER JOIN feed.zbozi
ON zbozi.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid)
AND zbozi.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid)
AND zbozi.uri = COALESCE(sitemap.uri, heureka.uri)
-- ga_pageview
FULL OUTER JOIN feed.ga_pageview
ON ga_pageview.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid)
AND ga_pageview.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid)
AND ga_pageview.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri)
-- ga_revenue
FULL OUTER JOIN feed.ga_revenue
ON ga_revenue.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid)
AND ga_revenue.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid)
AND ga_revenue.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri)
-- priceapi
FULL OUTER JOIN feed.priceapi
ON priceapi.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid, ga_revenue.loadlogid)
AND priceapi.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid)
AND priceapi.value = COALESCE(heureka.ean, zbozi.ean, priceapi.value)
-- product
FULL OUTER JOIN warehouse.product
ON product.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid, priceapi.eshopid)
AND product.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri)
-- masterproduct
LEFT JOIN feed.masterproduct
ON masterproduct.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri)
-- loadlog
JOIN warehouse.eshopmatrixloads loadlog
ON loadlog.loadid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid, ga_revenue.loadlogid)
-- Only not exists in masterproduct
WHERE masterproduct.masterproductid IS NULL
-- Only wit uri exists (because it's product main identifier)
AND COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri) IS NOT NULL
-- Products are only ga paths, which have self product from other feed
AND (
	ga_pageview.turnoutid IS NOT NULL AND (
		zbozi.zboziid IS NOT NULL
		OR heureka.heurekaid IS NOT NULL
		OR sitemap.sitemapid IS NOT NULL
		OR product.productid IS NOT NULL
	)
	OR ga_pageview.turnoutid IS NULL
)
GROUP BY
	-- createdat
	loadlog.period,
	-- eshopid
	sitemap.eshopid,
	-- productid
	product.productid,
	-- uri
	COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri),
	-- productname
	COALESCE(heureka.productname, zbozi.productname, product.productname, priceapi.name),
	-- ean
	COALESCE(heureka.ean, zbozi.ean, priceapi.value)
;


-- Matrix fullfilling views

CREATE OR REPLACE VIEW analytical.matrixmlc1 AS
    select
	  heureka.eshopid as eshopid,
	  'MLC1' as matrixtype,
	  product.productid::bigint as productid,
	  heureka.loadlogid as loadid,
	  0::real as scoreabs,
	  0::real as scorerel,
	  0::real as scorewei,
	  0::real as changeabs,
	  0::real as changerel,
	  0::real as changewei,
	  1::integer as quadrant,
	  now() as datevalid,
	  CASE
	    WHEN ((heureka.productname IS NULL) OR ((heureka.productname)::text = ''::text)) THEN 1
	    ELSE 0
	  END as inputvaluex

	from feed.heureka
	join feed.masterproduct on masterproduct.heurekaid = heureka.heurekaid
    join warehouse.product on product.productid = masterproduct.productid
	left join analytical.matrix
	  on matrix.matrixtype = 'MLC1'
	  and matrix.loadid = heureka.loadlogid
	  and matrix.productid = product.productid
	where matrix.matrixid is null
	;


CREATE OR REPLACE VIEW analytical.matrixmlc38 AS
    select
	  ga_pageview.eshopid as eshopid,
	  'MLC38' as matrixtype,
	  product.productid::bigint as productid,
	  ga_pageview.loadlogid as loadid,
	  0::real as scoreabs,
	  0::real as scorerel,
	  0::real as scorewei,
	  0::real as changeabs,
	  0::real as changerel,
	  0::real as changewei,
	  1::integer as quadrant,
	  now() as datevalid,
		CASE
			WHEN (ga_pageview.pageviews::integer <= 10) THEN (1)
			WHEN (ga_pageview.pageviews::integer > 10) THEN (0)
		END as inputvaluex
	FROM (
		SELECT ga_pageview.eshopid,
			ga_pageview.loadid,
			ga_pageview.pagepath,
			(sum(ga_pageview.pageviews))::bigint AS pageviews,
			(sum(ga_pageview.entrances))::bigint AS entrances,
			ga_pageview.uri,
	        masterproduct.productid,
	        ga_pageview.loadlogid
		FROM feed.ga_pageview
		JOIN feed.masterproduct on masterproduct.turnoutid = ga_pageview.turnoutid
		GROUP BY ga_pageview.loadid, ga_pageview.eshopid, ga_pageview.uri, ga_pageview.pagepath, masterproduct.productid, ga_pageview.loadlogid
	) ga_pageview
    join warehouse.product on product.productid = ga_pageview.productid
	left join analytical.matrix
	  on matrix.matrixtype = 'MLC38'
	  and matrix.loadid = ga_pageview.loadlogid
	  and matrix.productid = product.productid
	where matrix.matrixid is null;

