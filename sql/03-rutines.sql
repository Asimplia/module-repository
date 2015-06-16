-- getting masterproduct
CREATE OR REPLACE FUNCTION feed.get_masterproduct(loadlogid INT8)
RETURNS table (
	createdat timestamptz,
	eshopid bigint,
	uri varchar(2048),
	productname varchar(2048),
	ean varchar(14),
	productid integer,
	heurekaid integer,
	sitemapid integer,
	zboziid integer,
	priceapiid integer,
	revenuesid integer,
	turnoutid integer,
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




-- fulfilling loadlog
CREATE OR REPLACE FUNCTION warehouse.update_loadlog()
RETURNS void AS
$$
	NOTIFY "warehouse.update_loadlog.start";
	INSERT INTO warehouse.loadlog (eshopid,period)
	SELECT a.eshopid, a.period
	FROM warehouse.eshopmatrixloads a;
	NOTIFY "warehouse.update_loadlog.done";
$$ LANGUAGE sql;




-- fulling uri by url, loc etc.-- fulling uri by url, loc etc.
CREATE OR REPLACE FUNCTION feed.create_feeduri()
RETURNS void AS $$
BEGIN
	NOTIFY "feed.create_feeduri.start";
	UPDATE feed.sitemap s
	SET uri = public.replace_url(s.loc::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE s.uri IS NULL
	and se.eshopid = s.eshopid;

	UPDATE feed.ga_pageview p
	SET uri = public.replace_url(p.pagepath::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE p.uri IS NULL
	and p.eshopid = se.eshopid;

	UPDATE feed.heureka h
	SET uri = public.replace_url(h.url::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE h.uri IS NULL
	and h.eshopid = se.eshopid;


	UPDATE feed.zbozi z
	SET uri = public.replace_url(z.url::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE z.uri IS NULL
	and z.eshopid = se.eshopid;

	NOTIFY "feed.create_feeduri.done";
END;
$$ LANGUAGE plpgsql;




-- group feedload to one loadlog
CREATE OR REPLACE FUNCTION feed.create_loadlogid()
RETURNS void AS $$
DECLARE
   tablename text;
BEGIN
	NOTIFY "feed.create_loadlogid.start";
	UPDATE feed.feedload
	SET loadlogid = loadlog.loadid
	FROM warehouse.loadlog
	WHERE feedload.eshopid = loadlog.eshopid
		AND COALESCE((
			SELECT nextloadlog.period
			FROM warehouse.loadlog nextloadlog
			WHERE loadlog.eshopid = nextloadlog.eshopid
				AND loadlog.period < nextloadlog.period
			ORDER BY nextloadlog.period
			LIMIT 1
		) > feedload.loaddate, TRUE)
		AND loadlog.period < feedload.loaddate
	AND feedload.loadlogid IS NULL
	;

	FOR tablename IN SELECT regexp_split_to_table(
		'ga_pageview,ga_revenue,heureka,heurekaaccessory,heurekadelivery,heurekaparam,priceapi,priceapijob,sitemap,zbozi,zbozi_variant,valuefailure',
		','
	)
	LOOP
		EXECUTE 'UPDATE feed.' || tablename || '
		SET loadlogid = feedload.loadlogid
		FROM feed.feedload
		WHERE feedload.loadid = ' || tablename || '.loadid
		AND ' || tablename || '.loadlogid IS NULL';
		NOTIFY "feed.create_loadlogid.tick";
	END LOOP;
	NOTIFY "feed.create_loadlogid.done";
END;
$$ LANGUAGE plpgsql;




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




-- Matrix fullfilling
CREATE OR REPLACE FUNCTION analytical.update_matrices()
RETURNS void AS $$
DECLARE
   matrixtype text;
BEGIN
	NOTIFY "analytical.update_matrices.start";
	FOR matrixtype IN SELECT cmatrix.matrixtype AS matrixtype FROM analytical.cmatrix
	LOOP
		EXECUTE 'INSERT INTO analytical.matrix
		 (eshopid, matrixtype, productid, loadid, scoreabs, scorerel, scorewei, changeabs, changerel, changewei, quadrant, datevalid, inputvaluex)
		 SELECT eshopid, matrixtype, productid, loadid, scoreabs, scorerel, scorewei, changeabs, changerel, changewei, quadrant, datevalid, inputvaluex
		 FROM analytical.matrix' || matrixtype || '';
		NOTIFY "analytical.update_matrices.tick";
	END LOOP;
	NOTIFY "analytical.update_matrices.done";
END;
$$ LANGUAGE plpgsql;




-- Signal fullfilling
CREATE OR REPLACE FUNCTION analytical.update_signal()
RETURNS void AS $$
BEGIN
	NOTIFY "analytical.update_signal.start";
	INSERT INTO analytical.signal
	(matrixid, datecreated)
	SELECT matrixid, datecreated
	FROM analytical.v_signal
	;
	NOTIFY "analytical.update_signal.done";
END;
$$ LANGUAGE plpgsql;




-- Situation signal fullfilling
CREATE OR REPLACE FUNCTION analytical.update_situation_signal()
RETURNS void AS $$
BEGIN
	NOTIFY "analytical.update_situation_signal.start";
	INSERT INTO analytical.signal
	(matrixid, datecreated)
	SELECT matrixid, datecreated
	FROM analytical.v_situation_signal
	;
	NOTIFY "analytical.update_situation_signal.done";
END;
$$ LANGUAGE plpgsql;


-- Situation fullfilling
CREATE OR REPLACE FUNCTION analytical.update_situation()
RETURNS void AS $$
BEGIN
	NOTIFY "analytical.update_situation.start";
	INSERT INTO analytical.situation
	(
		eshopid,
		productid,
		customerid,
		channelid,
		orderid,
		productcategoryid,
		loadid,
		datecreated
	)
	SELECT
		eshopid,
		productid,
		customerid,
		channelid,
		orderid,
		productcategoryid,
		loadid,
		datecreated
	FROM analytical.v_situation
	;
	NOTIFY "analytical.update_situation.tick";

	UPDATE analytical.signal
	SET situationid = source.situationid
	FROM (
		SELECT situation.situationid, matrix.matrixid
		FROM analytical.situation
		JOIN analytical.matrix
			ON matrix.eshopid = situation.eshopid
			AND (matrix.productid = situation.productid OR situation.productid IS NULL)
			AND (matrix.customerid = situation.customerid OR situation.customerid IS NULL)
			AND (matrix.channelid = situation.channelid OR situation.channelid IS NULL)
			AND (matrix.orderid = situation.orderid OR situation.orderid IS NULL)
			AND (matrix.productcategoryid = situation.productcategoryid OR situation.productcategoryid IS NULL)
			AND matrix.loadid = situation.loadid
	) AS source (situationid, matrixid)
	WHERE source.matrixid = signal.matrixid
		AND signal.situationid IS NULL
	;
	NOTIFY "analytical.update_situation.done";
END;
$$ LANGUAGE plpgsql;

