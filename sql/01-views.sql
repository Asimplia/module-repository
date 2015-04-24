
-- warehouse loadLog view
CREATE OR REPLACE VIEW warehouse.eshopmatrixloads AS
	SELECT
		a.eshopid,
		(rank() OVER (PARTITION BY a.eshopid ORDER BY a.period))::INT8 AS loadid,
		a.period
	FROM (
		SELECT s.eshopid, t.period
		FROM warehouse.eshopsettings s,
		LATERAL generate_series(s.datestart, now(), s.datarefreshperiod::interval) t(period)
	) a
	LEFT join warehouse.loadlog l
		ON a.eshopid = l.eshopid
		AND a.period = l.period
	WHERE l.loadid is NULL;




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
	public.last(turnoutid) AS turnoutid
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




-- fullfilling signal
CREATE OR REPLACE VIEW analytical.v_signal AS
SELECT matrix.matrixid AS matrixid, now() AS datecreated
FROM analytical.matrix
JOIN analytical.cmatrix ON cmatrix.matrixtype = matrix.matrixtype
LEFT JOIN analytical.signal ON signal.matrixid = matrix.matrixid
WHERE signal.signalid IS NULL
	AND cmatrix.inputvaluexthreshold IS NOT NULL
	AND matrix.inputvaluex >= cmatrix.inputvaluexthreshold
;




-- fullfilling situation signals
CREATE OR REPLACE VIEW analytical.v_situation_signal AS
SELECT entity_matrix.matrixid AS matrixid, now() AS datecreated
FROM analytical.matrix
JOIN analytical.signal
	ON signal.matrixid = matrix.matrixid
RIGHT JOIN analytical.matrix entity_matrix
	ON entity_matrix.loadid = matrix.loadid
	AND entity_matrix.matrixid != signal.matrixid -- no join if signal already exists
	AND (entity_matrix.productid IS NULL OR entity_matrix.productid IS NOT NULL AND entity_matrix.productid = matrix.productid)
	AND (entity_matrix.customerid IS NULL OR entity_matrix.customerid IS NOT NULL AND entity_matrix.customerid = matrix.customerid)
	AND (entity_matrix.channelid IS NULL OR entity_matrix.channelid IS NOT NULL AND entity_matrix.channelid = matrix.channelid)
	AND (entity_matrix.orderid IS NULL OR entity_matrix.orderid IS NOT NULL AND entity_matrix.orderid = matrix.orderid)
	AND (entity_matrix.productcategoryid IS NULL OR entity_matrix.productcategoryid IS NOT NULL AND entity_matrix.productcategoryid = matrix.productcategoryid)
	AND (
		( -- is not eshop
			entity_matrix.productid IS NOT NULL
			OR entity_matrix.customerid IS NOT NULL
			OR entity_matrix.channelid IS NOT NULL
			OR entity_matrix.orderid IS NOT NULL
			OR entity_matrix.productcategoryid IS NOT NULL
		)
		OR ( -- is eshop only
			entity_matrix.productid IS NULL
			AND entity_matrix.customerid IS NULL
			AND entity_matrix.channelid IS NULL
			AND entity_matrix.orderid IS NULL
			AND entity_matrix.productcategoryid IS NULL
		) AND entity_matrix.eshopid = matrix.eshopid
	)
LEFT JOIN analytical.signal entity_signal
	ON entity_signal.matrixid = entity_matrix.matrixid
WHERE entity_signal.signalid IS NULL
	AND signal.signalid IS NOT NULL -- only signal existing create situation signals
GROUP BY entity_matrix.matrixid
;




-- fullfilling situation
CREATE OR REPLACE VIEW analytical.v_situation AS
SELECT
	matrix.eshopid,
	matrix.productid,
	matrix.customerid,
	matrix.channelid,
	matrix.orderid,
	matrix.productcategoryid,
	matrix.loadid,
	now() AS datecreated
FROM analytical.signal
JOIN analytical.matrix
	ON matrix.matrixid = signal.matrixid
LEFT JOIN analytical.situation
	ON matrix.eshopid = situation.eshopid
	AND (situation.productid IS NULL OR matrix.productid = situation.productid)
	AND (situation.customerid IS NULL OR matrix.customerid = situation.customerid)
	AND (situation.channelid IS NULL OR matrix.channelid = situation.channelid)
	AND (situation.orderid IS NULL OR matrix.orderid = situation.orderid)
	AND (situation.productcategoryid IS NULL OR matrix.productcategoryid = situation.productcategoryid)
	AND matrix.loadid = situation.loadid
WHERE situation.situationid IS NULL
	AND signal.signalid IS NOT NULL
GROUP BY
	matrix.eshopid,
	matrix.productid,
	matrix.customerid,
	matrix.channelid,
	matrix.orderid,
	matrix.productcategoryid,
	matrix.loadid
;
