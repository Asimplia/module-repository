
-- warehouse loadLog view
CREATE OR REPLACE VIEW warehouse.eshopmatrixloads AS
 SELECT a.eshopid,
    rank() OVER (PARTITION BY a.eshopid ORDER BY a.period) AS loadid,
    a.period
   FROM ( SELECT s.eshopid,
            t.period
           FROM eshopsettings s,
            LATERAL generate_series(s.datestart, now(), (s.datarefreshperiod)::interval) t(period)) a;




-- fullfilling masterproduct
CREATE OR REPLACE VIEW feed.v_masterproduct AS
SELECT
	createdat,
	eshopid,
	uri,
	productname,
	ean,
	productid,
	public.last(heurekaid) AS heurekaid,
	public.last(sitemapid) AS sitemapid,
	public.last(zboziid) AS zboziid,
	public.last(priceapiid) AS priceapiid,
	public.last(revenuesid) AS revenuesid,
	public.last(turnoutid) AS turnoutid
FROM (
SELECT
	loadlog.period AS createdat,
	COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid, priceapi.eshopid, product.eshopid) AS eshopid,
	COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri)	AS uri,
	COALESCE(heureka.productname, zbozi.productname, product.productname, priceapi.name) AS productname,
	COALESCE(heureka.ean, zbozi.ean, priceapi.value) AS ean,
	product.productid AS productid,
	heureka.heurekaid AS heurekaid,
	sitemap.sitemapid AS sitemapid,
	zbozi.zboziid AS zboziid,
	priceapi.priceapiid AS priceapiid,
	ga_revenue.revenuesid AS revenuesid,
	ga_pageview.turnoutid AS turnoutid
FROM feed.sitemap
-- heureka
FULL OUTER JOIN feed.heureka
ON heureka.loadlogid = sitemap.loadlogid
AND heureka.eshopid = sitemap.eshopid
AND heureka.uri = sitemap.uri
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
AND priceapi.value = COALESCE(heureka.ean, zbozi.ean)
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
-- Only wit uri exists (because it's product main identifier)
WHERE COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, ga_revenue.uri, product.uri) IS NOT NULL
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
ORDER BY loadlog.loadid
) masterproduct
GROUP BY
	createdat,
	eshopid,
	uri,
	productname,
	ean,
	productid
;


