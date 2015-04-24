-- fulfilling loadlog
CREATE OR REPLACE FUNCTION warehouse.update_loadlog()
RETURNS void AS
$$
	INSERT INTO warehouse.loadlog (eshopid,period)
	SELECT a.eshopid, a.period
	FROM warehouse.eshopmatrixloads a;
$$ LANGUAGE sql;




-- fulling uri by url, loc etc.-- fulling uri by url, loc etc.
CREATE OR REPLACE FUNCTION feed.create_feeduri()
RETURNS void AS $$
BEGIN
	UPDATE feed.sitemap s
	SET uri = public.replace_url(s.loc::text, '{}'::text[], '{}'::text[], FALSE, FALSE)
	WHERE s.uri IS NULL;

	UPDATE feed.ga_pageview p
	SET uri = public.replace_url(p.pagepath::text, '{}'::text[], '{}'::text[], FALSE, FALSE)
	WHERE p.uri IS NULL;

	UPDATE feed.heureka h
	SET uri = public.replace_url(h.url::text, '{}'::text[], '{}'::text[], FALSE, FALSE)
	WHERE h.uri IS NULL;

	UPDATE feed.zbozi z
	SET uri = public.replace_url(z.url::text, '{}'::text[], '{}'::text[], FALSE, FALSE)
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
	FROM warehouse.loadlog
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
		FROM feed.feedload
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
	FROM feed.v_masterproduct
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
		FROM feed.v_masterproduct source
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
	FROM feed.v_masterproduct
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
		FROM feed.v_masterproduct source
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




-- Signal fullfilling
CREATE OR REPLACE FUNCTION analytical.update_signal()
RETURNS void AS $$
BEGIN
	INSERT INTO analytical.signal
	(matrixid, datecreated)
	SELECT matrixid, datecreated
	FROM analytical.v_signal
	;
END;
$$ LANGUAGE plpgsql;




-- Situation signal fullfilling
CREATE OR REPLACE FUNCTION analytical.update_situation_signal()
RETURNS void AS $$
BEGIN
	INSERT INTO analytical.signal
	(matrixid, datecreated)
	SELECT matrixid, datecreated
	FROM analytical.v_situation_signal
	;
END;
$$ LANGUAGE plpgsql;


-- Situation fullfilling
CREATE OR REPLACE FUNCTION analytical.update_situation()
RETURNS void AS $$
BEGIN
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

	UPDATE signal
	SET situationid = source.situationid
	FROM (
		SELECT situation.situationid, matrix.matrixid
		FROM situation
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
END;
$$ LANGUAGE plpgsql;

