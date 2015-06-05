-- fulfilling loadlog
CREATE OR REPLACE FUNCTION warehouse.update_loadlog()
RETURNS void AS
$$
	INSERT INTO warehouse.loadlog (eshopid,period)
	SELECT a.eshopid, a.period
	FROM warehouse.eshopmatrixloads a;
	NOTIFY "warehouse.update_loadlog.done";
$$ LANGUAGE sql;




-- fulling uri by url, loc etc.-- fulling uri by url, loc etc.
CREATE OR REPLACE FUNCTION feed.create_feeduri()
RETURNS void AS $$
BEGIN
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
	END LOOP;
	NOTIFY "feed.create_loadlogid.done";
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
		FROM feed.v_masterproduct source
		LEFT JOIN warehouse.product
			ON product.eshopid = source.eshopid
			AND product.uri = source.uri
		WHERE product.productid IS NULL
	);
	NOTIFY "feed.update_product.done";
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
	NOTIFY "feed.update_masterproduct.done";
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
		NOTIFY "analytical.update_matrices.tick";
	END LOOP;
	NOTIFY "analytical.update_matrices.done";
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
	NOTIFY "analytical.update_signal.done";
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
	NOTIFY "analytical.update_situation_signal.done";
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

