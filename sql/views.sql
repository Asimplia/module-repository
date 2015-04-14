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

	UPDATE feed.ga_pageview p 
	SET uri = regexp_replace(p.pagepath::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE p.uri IS NULL;

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
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		WHEN ga_revenue.uri IS NOT NULL THEN ga_revenue.uri
		WHEN product.uri IS NOT NULL THEN product.uri
		ELSE NULL
	END
	AS uri,
	CASE
		WHEN heureka.productname IS NOT NULL THEN heureka.productname
		WHEN zbozi.productname IS NOT NULL THEN zbozi.productname
		WHEN product.productname IS NOT NULL THEN product.productname
		WHEN priceapi.name IS NOT NULL THEN priceapi.name
		ELSE NULL
	END
	AS productname,
	CASE
		WHEN heureka.ean IS NOT NULL THEN heureka.ean
		WHEN zbozi.ean IS NOT NULL THEN zbozi.ean
		WHEN priceapi.value IS NOT NULL THEN priceapi.value
		ELSE NULL
	END
	AS ean,
	public.last(heureka.heurekaid) AS heurekaid,
	public.last(sitemap.sitemapid) AS sitemapid,
	public.last(zbozi.zboziid) AS zboziid,
	public.last(product.productid) AS productid,
	public.last(ga_revenue.revenuesid) AS revenuesid,
	public.last(ga_pageview.turnoutid) AS turnoutid
FROM feed.sitemap
-- heureka
FULL OUTER JOIN feed.heureka ON heureka.loadlogid = sitemap.loadlogid AND heureka.eshopid = sitemap.eshopid AND heureka.uri =
	sitemap.uri
-- zbozi
FULL OUTER JOIN feed.zbozi
ON zbozi.loadlogid = 
	CASE
		WHEN sitemap.loadlogid IS NOT NULL THEN sitemap.loadlogid
		WHEN heureka.loadlogid IS NOT NULL THEN heureka.loadlogid
		ELSE NULL
	END
AND zbozi.eshopid = 
	CASE
		WHEN sitemap.eshopid IS NOT NULL THEN sitemap.eshopid
		WHEN heureka.eshopid IS NOT NULL THEN heureka.eshopid
		ELSE NULL
	END
AND zbozi.uri = 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		ELSE NULL
	END
-- ga_pageview
FULL OUTER JOIN feed.ga_pageview
ON ga_pageview.loadid = 
	CASE
		WHEN sitemap.loadlogid IS NOT NULL THEN sitemap.loadlogid
		WHEN heureka.loadlogid IS NOT NULL THEN heureka.loadlogid
		WHEN zbozi.loadlogid IS NOT NULL THEN zbozi.loadlogid
		ELSE NULL
	END
AND ga_pageview.eshopid = 
	CASE
		WHEN sitemap.eshopid IS NOT NULL THEN sitemap.eshopid
		WHEN heureka.eshopid IS NOT NULL THEN heureka.eshopid
		WHEN zbozi.eshopid IS NOT NULL THEN zbozi.eshopid
		ELSE NULL
	END
AND ga_pageview.uri = 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		ELSE NULL
	END
-- ga_revenue
FULL OUTER JOIN feed.ga_revenue
ON ga_revenue.loadid =
	CASE
		WHEN sitemap.loadlogid IS NOT NULL THEN sitemap.loadlogid
		WHEN heureka.loadlogid IS NOT NULL THEN heureka.loadlogid
		WHEN zbozi.loadlogid IS NOT NULL THEN zbozi.loadlogid
		WHEN ga_pageview.loadlogid IS NOT NULL THEN ga_pageview.loadlogid
		ELSE NULL
	END
AND ga_revenue.eshopid = 
	CASE
		WHEN sitemap.eshopid IS NOT NULL THEN sitemap.eshopid
		WHEN heureka.eshopid IS NOT NULL THEN heureka.eshopid
		WHEN zbozi.eshopid IS NOT NULL THEN zbozi.eshopid
		WHEN ga_pageview.eshopid IS NOT NULL THEN ga_pageview.eshopid
		ELSE NULL
	END
AND ga_revenue.uri = 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		ELSE NULL
	END
-- priceapi
FULL OUTER JOIN feed.priceapi
ON priceapi.loadid = 
	CASE
		WHEN sitemap.loadlogid IS NOT NULL THEN sitemap.loadlogid
		WHEN heureka.loadlogid IS NOT NULL THEN heureka.loadlogid
		WHEN zbozi.loadlogid IS NOT NULL THEN zbozi.loadlogid
		WHEN ga_pageview.loadlogid IS NOT NULL THEN ga_pageview.loadlogid
		WHEN ga_revenue.loadlogid IS NOT NULL THEN ga_revenue.loadlogid
		ELSE NULL
	END
AND priceapi.eshopid = 
	CASE
		WHEN sitemap.eshopid IS NOT NULL THEN sitemap.eshopid
		WHEN heureka.eshopid IS NOT NULL THEN heureka.eshopid
		WHEN zbozi.eshopid IS NOT NULL THEN zbozi.eshopid
		WHEN ga_pageview.eshopid IS NOT NULL THEN ga_pageview.eshopid
		WHEN ga_revenue.eshopid IS NOT NULL THEN ga_revenue.eshopid
		ELSE NULL
	END
AND priceapi.value = 
	CASE
		WHEN heureka.ean IS NOT NULL THEN heureka.ean
		WHEN zbozi.ean IS NOT NULL THEN zbozi.ean
		WHEN priceapi.value IS NOT NULL THEN priceapi.value
		ELSE NULL
	END
-- product
FULL OUTER JOIN warehouse.product
ON product.eshopid = 
	CASE
		WHEN sitemap.eshopid IS NOT NULL THEN sitemap.eshopid
		WHEN heureka.eshopid IS NOT NULL THEN heureka.eshopid
		WHEN zbozi.eshopid IS NOT NULL THEN zbozi.eshopid
		WHEN ga_pageview.eshopid IS NOT NULL THEN ga_pageview.eshopid
		WHEN ga_revenue.eshopid IS NOT NULL THEN ga_revenue.eshopid
		WHEN priceapi.eshopid IS NOT NULL THEN priceapi.eshopid
		ELSE NULL
	END
AND product.uri = 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		WHEN ga_revenue.uri IS NOT NULL THEN ga_revenue.uri
		ELSE NULL
	END
-- masterproduct
LEFT JOIN feed.masterproduct ON masterproduct.uri = 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		WHEN ga_revenue.uri IS NOT NULL THEN ga_revenue.uri
		WHEN product.uri IS NOT NULL THEN product.uri
		ELSE NULL
	END
-- loadlog
JOIN warehouse.eshopmatrixloads loadlog ON loadlog.loadid = 
	CASE
		WHEN sitemap.loadlogid IS NOT NULL THEN sitemap.loadlogid
		WHEN heureka.loadlogid IS NOT NULL THEN heureka.loadlogid
		WHEN zbozi.loadlogid IS NOT NULL THEN zbozi.loadlogid
		WHEN ga_pageview.loadlogid IS NOT NULL THEN ga_pageview.loadlogid
		WHEN ga_revenue.loadlogid IS NOT NULL THEN ga_revenue.loadlogid
		ELSE NULL
	END

-- Only not exists in masterproduct
WHERE masterproduct.masterproductid IS NULL
-- Only wit uri exists (because it's product main identifier)
AND 
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		WHEN ga_revenue.uri IS NOT NULL THEN ga_revenue.uri
		WHEN product.uri IS NOT NULL THEN product.uri
		ELSE NULL
	END
	IS NOT NULL
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
	CASE
		WHEN sitemap.uri IS NOT NULL THEN sitemap.uri
		WHEN heureka.uri IS NOT NULL THEN heureka.uri
		WHEN zbozi.uri IS NOT NULL THEN zbozi.uri
		WHEN ga_pageview.uri IS NOT NULL THEN ga_pageview.uri
		WHEN ga_revenue.uri IS NOT NULL THEN ga_revenue.uri
		WHEN product.uri IS NOT NULL THEN product.uri
		ELSE NULL
	END,
	-- productname
	CASE
		WHEN heureka.productname IS NOT NULL THEN heureka.productname
		WHEN zbozi.productname IS NOT NULL THEN zbozi.productname
		WHEN product.productname IS NOT NULL THEN product.productname
		WHEN priceapi.name IS NOT NULL THEN priceapi.name
		ELSE NULL
	END,
	-- ean
	CASE
		WHEN heureka.ean IS NOT NULL THEN heureka.ean
		WHEN zbozi.ean IS NOT NULL THEN zbozi.ean
		WHEN priceapi.value IS NOT NULL THEN priceapi.value
		ELSE NULL
	END
;


-- Matrix fullfilling views

CREATE OR REPLACE VIEW analytical.matrixmlc1 AS
    select
	  feedload.eshopid as eshopid,
	  'MLC1' as matrixtype,
	  product.productid::bigint as productid,
	  loadlog.loadid as loadid,
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
	join feed.feedload on feedload.loadid = heureka.loadid
	join warehouse.eshopmatrixloads loadlog
	  on feedload.eshopid = loadlog.eshopid
	  and loadlog.period + (select datarefreshperiod from warehouse.eshopsettings where eshopid = feedload.eshopid limit 1)::interval > feedload.loaddate
	  and loadlog.period < feedload.loaddate
	left join analytical.matrix
	  on matrix.matrixtype = 'MLC1'
	  and matrix.loadid = loadlog.loadid
	  and matrix.productid = product.productid
	where matrix.matrixid is null
	;


CREATE OR REPLACE VIEW analytical.matrixmlc38 AS
    select
	  feedload.eshopid as eshopid,
	  'MLC38' as matrixtype,
	  product.productid::bigint as productid,
	  loadlog.loadid as loadid,
	  0::real as scoreabs,
	  0::real as scorerel,
	  0::real as scorewei,
	  0::real as changeabs,
	  0::real as changerel,
	  0::real as changewei,
	  1::integer as quadrant,
	  now() as datevalid,
		CASE
			WHEN (s.pageviews::integer <= 10) THEN (1)
			WHEN (s.pageviews::integer > 10) THEN (0)
		END as inputvaluex
	FROM (SELECT ga_pageview.eshopid,
		ga_pageview.loadid,
		ga_pageview.pagepath,
		(sum(ga_pageview.pageviews))::bigint AS pageviews,
		(sum(ga_pageview.entrances))::bigint AS entrances,
		ga_pageview.uri,
                productid
		FROM ga_pageview
		join feed.masterproduct on masterproduct.turnoutid = ga_pageview.turnoutid
		GROUP BY ga_pageview.loadid, ga_pageview.eshopid, ga_pageview.uri, ga_pageview.pagepath, productid) s
    join warehouse.product on product.productid = s.productid
	join feed.feedload on feedload.loadid = s.loadid
	join warehouse.eshopmatrixloads loadlog
	  on feedload.eshopid = loadlog.eshopid
	  and loadlog.period + (select datarefreshperiod from warehouse.eshopsettings where eshopid = feedload.eshopid limit 1)::interval > feedload.loaddate
	  and loadlog.period < feedload.loaddate
	left join analytical.matrix
	  on matrix.matrixtype = 'MLC38'
	  and matrix.loadid = loadlog.loadid
	  and matrix.productid = product.productid
	where matrix.matrixid is null;

