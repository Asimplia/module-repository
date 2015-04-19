
-- fulling uri by url, loc etc.-- fulling uri by url, loc etc.
CREATE OR REPLACE FUNCTION feed.create_feeduri()
RETURNS void AS $$
BEGIN
	UPDATE feed.sitemap s 
	SET uri = regexp_replace(s.loc::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text)
	WHERE s.uri IS NULL;

	UPDATE feed.ga_pageview p 
	SET uri = regexp_replace(
		regexp_replace(p.pagepath::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text),
		-- strip query params
		'\?.*$'::text, ''::text
	)
	WHERE p.uri IS NULL;

	UPDATE feed.ga_revenue r 
	SET uri = regexp_replace(
		regexp_replace(r.pagepath::text, '^(https?://)?.*\.?.{1,40}\.[a-z]{1,15}/'::text, '/'::text),
		-- strip query params
		'\?.*$'::text, ''::text
	)
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




-- product fullfilling
CREATE OR REPLACE FUNCTION feed.update_product()
RETURNS void AS $$
BEGIN
	UPDATE warehouse.product
	SET productname = source.productname,
		datechanged = now()
	FROM (
	SELECT
		eshopid, productname, uri
	FROM v_masterproduct
	) as source (
		eshopid, productname, uri
	)
	WHERE product.eshopid = source.eshopid
		AND product.uri = source.uri;

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
		uri
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
			source.uri
		FROM v_masterproduct source
		LEFT JOIN warehouse.product
			ON product.eshopid = source.eshopid
			AND product.uri = source.uri
		WHERE product.productid IS NULL
	);
END;
$$ LANGUAGE plpgsql;




-- masterproduct fullfilling
CREATE OR REPLACE FUNCTION feed.update_masterproduct()
RETURNS void AS $$
BEGIN
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
	FROM v_masterproduct
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
		FROM v_masterproduct source
		LEFT JOIN feed.masterproduct
			ON masterproduct.eshopid = source.eshopid
			AND masterproduct.uri = source.uri
		WHERE masterproduct.masterproductid IS NULL
	);
END;
$$ LANGUAGE plpgsql;




-- Matrix fullfilling
CREATE OR REPLACE FUNCTION analytical.update_matrices()
RETURNS void AS $$
DECLARE
   matrixtype text;
BEGIN
	FOR matrixtype IN SELECT cmatrix.matrixtype AS matrixtype FROM analytical.cmatrix
	LOOP
		EXECUTE 'INSERT INTO analytical.matrix
		 (eshopid, matrixtype, productid, loadid, scoreabs, scorerel, scorewei, changeabs, changerel, changewei, quadrant, datevalid, inputvaluex)
		 SELECT eshopid, matrixtype, productid, loadid, scoreabs, scorerel, scorewei, changeabs, changerel, changewei, quadrant, datevalid, inputvaluex
		 FROM analytical.matrix' || matrixtype || '';
	END LOOP;
END;
$$ LANGUAGE plpgsql;
