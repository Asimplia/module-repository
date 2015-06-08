DROP VIEW feed.v_masterproduct;

ALTER TABLE feed."ga_pageview"
ALTER "pagepath" TYPE character varying(4096),
ALTER "pagepath" DROP DEFAULT,
ALTER "pagepath" DROP NOT NULL,
ALTER "uri" TYPE character varying(4096),
ALTER "uri" DROP DEFAULT,
ALTER "uri" DROP NOT NULL;


-- fullfilling masterproduct
CREATE OR REPLACE VIEW feed.v_masterproduct AS
SELECT
	public.last(createdat) AS createdat,
	eshopid,
	uri,
	public.first(productname) AS productname,
	public.last(ean) AS ean,
	productid,
	public.last(heurekaid) AS heurekaid,
	public.last(sitemapid) AS sitemapid,
	public.last(zboziid) AS zboziid,
	public.last(priceapiid) AS priceapiid,
	public.last(revenuesid) AS revenuesid,
	public.last(turnoutid) AS turnoutid,
	public.last(imageurl) AS imageurl
FROM (
SELECT
	loadlog.period AS createdat,
	COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid, priceapi.eshopid, product.eshopid) AS eshopid,
	COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, product.uri)	AS uri,
	COALESCE(heureka.productname, zbozi.productname, product.productname, ga_revenue.productname, priceapi.name) AS productname,
	COALESCE(heureka.ean, zbozi.ean, priceapi.value) AS ean,
	product.productid AS productid,
	heureka.heurekaid AS heurekaid,
	sitemap.sitemapid AS sitemapid,
	zbozi.zboziid AS zboziid,
	priceapi.priceapiid AS priceapiid,
	ga_revenue.revenuesid AS revenuesid,
	ga_pageview.turnoutid AS turnoutid,
	COALESCE(heureka.imgurl, zbozi.imgurl, heureka.imgurl_alternative, priceapi.image_url) AS imageurl
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
AND ga_revenue.productname = COALESCE(heureka.productname, zbozi.productname)
-- priceapi
FULL OUTER JOIN feed.priceapi
ON priceapi.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid, ga_revenue.loadlogid)
AND priceapi.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid)
AND priceapi.value = COALESCE(heureka.ean, zbozi.ean)
-- product
FULL OUTER JOIN warehouse.product
ON product.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid, ga_revenue.eshopid, priceapi.eshopid)
AND product.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri)
-- masterproduct
LEFT JOIN feed.masterproduct
ON masterproduct.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, product.uri)
-- loadlog
JOIN warehouse.loadlog
ON loadlog.loadid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid, ga_revenue.loadlogid)
-- Only wit uri exists (because it's product main identifier)
WHERE COALESCE(sitemap.uri, heureka.uri, zbozi.uri, ga_pageview.uri, product.uri) IS NOT NULL
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
ORDER BY loadlog.loadid, productname
) masterproduct
GROUP BY
	eshopid,
	uri,
	productid
;
