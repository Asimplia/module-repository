DROP VIEW feed.v_masterproduct;

-- getting masterproduct
CREATE OR REPLACE FUNCTION feed.get_masterproduct(loadlogid INT8)
RETURNS table (
	createdat TIMESTAMPTZ,
	eshopid INT8,
	uri VARCHAR(2048),
	productname VARCHAR(255),
	ean VARCHAR(14),
	productid INT4,
	heurekaid INT4,
	sitemapid INT4,
	zboziid INT4,
	priceapiid INT4,
	revenuesid INT4,
	turnoutid INT4,
	imageurl VARCHAR(2048)
) AS
$$
	WITH loadlog as
	(
		SELECT *
		FROM warehouse.loadlog
		WHERE loadlog.loadid = loadlogid
	)
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
	LEFT JOIN feed.ga_pageview
	ON ga_pageview.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid)
	AND ga_pageview.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid)
	AND ga_pageview.uri = COALESCE(sitemap.uri, heureka.uri, zbozi.uri)
	-- ga_revenue
	LEFT JOIN feed.ga_revenue
	ON ga_revenue.loadlogid = COALESCE(sitemap.loadlogid, heureka.loadlogid, zbozi.loadlogid, ga_pageview.loadlogid)
	AND ga_revenue.eshopid = COALESCE(sitemap.eshopid, heureka.eshopid, zbozi.eshopid, ga_pageview.eshopid)
	AND ga_revenue.productname = COALESCE(heureka.productname, zbozi.productname)
	-- priceapi
	LEFT JOIN feed.priceapi
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
		productid;
$$ LANGUAGE sql;


DROP FUNCTION feed.update_product();
-- product fullfilling
CREATE OR REPLACE FUNCTION feed.update_product(loadlogid INT8)
RETURNS void AS $$
BEGIN
	NOTIFY "feed.update_product.start";
	UPDATE warehouse.product
	SET productname = source.productname,
		datechanged = now()
	FROM (
	SELECT
		eshopid, productname, uri
	FROM feed.get_masterproduct(loadlogid)
	) as source (
		eshopid, productname, uri
	)
	WHERE product.eshopid = source.eshopid
		AND product.uri = source.uri;
	NOTIFY "feed.update_product.tick";

	INSERT INTO warehouse.product
	(
		eshopid,
		productname,
		baseprice,
		vat,
		datecreated,
		datechanged,
		flaginshop,
		inshopfrom,
		useinmatrices,
		uri,
		imageurl
	)
	(
		SELECT
			source.eshopid,
			source.productname,
			0,
			0,
			now(),
			now(),
			TRUE,
			now(),
			TRUE,
			source.uri,
			source.imageurl
		FROM feed.get_masterproduct(loadlogid) source
		LEFT JOIN warehouse.product
			ON product.eshopid = source.eshopid
			AND product.uri = source.uri
		WHERE product.productid IS NULL
	);
	NOTIFY "feed.update_product.done";
END;
$$ LANGUAGE plpgsql;




DROP FUNCTION feed.update_masterproduct();
-- masterproduct fullfilling
CREATE OR REPLACE FUNCTION feed.update_masterproduct(loadlogid INT8)
RETURNS void AS $$
BEGIN
	NOTIFY "feed.update_masterproduct.start";
	UPDATE feed.masterproduct
	SET createdat = source.createdat,
		eshopid = source.eshopid,
		uri = source.uri,
		productname = source.productname,
		ean = source.ean,
		productid = source.productid,
		heurekaid = source.heurekaid,
		sitemapid = source.sitemapid,
		zboziid = source.zboziid,
		priceapiid = source.priceapiid,
		revenuesid = source.revenuesid,
		turnoutid = source.turnoutid
	FROM (
	SELECT
		createdat,
		eshopid,
		uri,
		productname,
		ean,
		productid,
		heurekaid,
		sitemapid,
		zboziid,
		priceapiid,
		revenuesid,
		turnoutid
	FROM feed.get_masterproduct(loadlogid)
	) as source (
		createdat,
		eshopid,
		uri,
		productname,
		ean,
		productid,
		heurekaid,
		sitemapid,
		zboziid,
		priceapiid,
		revenuesid,
		turnoutid
	)
	WHERE masterproduct.eshopid = source.eshopid
		AND masterproduct.uri = source.uri;
	NOTIFY "feed.update_masterproduct.tick";

	INSERT INTO feed.masterproduct
	(
		createdat,
		eshopid,
		uri,
		productname,
		ean,
		productid,
		heurekaid,
		sitemapid,
		zboziid,
		priceapiid,
		revenuesid,
		turnoutid
	)
	(
		SELECT
			source.createdat,
			source.eshopid,
			source.uri,
			source.productname,
			source.ean,
			source.productid,
			source.heurekaid,
			source.sitemapid,
			source.zboziid,
			source.priceapiid,
			source.revenuesid,
			source.turnoutid
		FROM feed.get_masterproduct(loadlogid) source
		LEFT JOIN feed.masterproduct
			ON masterproduct.eshopid = source.eshopid
			AND masterproduct.uri = source.uri
		WHERE masterproduct.masterproductid IS NULL
	);
	NOTIFY "feed.update_masterproduct.done";
END;
$$ LANGUAGE plpgsql;
