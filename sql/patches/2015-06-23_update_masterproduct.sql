DROP FUNCTION IF EXISTS feed.update_masterproduct(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_sitemap(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_heureka(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_zbozi(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_ga_pageview(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_ga_revenue(v_loadlogid BIGINT);
DROP FUNCTION IF EXISTS feed.update_masterproduct_priceapi(v_loadlogid BIGINT);




-- masterproduct fullfilling
CREATE OR REPLACE FUNCTION feed.update_masterproduct_sitemap(
	v_loadid INT8
) RETURNS void AS
$BODY$
BEGIN
	INSERT INTO feed.masterproduct (
		sitemapid, eshopid, createdat, uri
	)
	SELECT public.last(sitemap.sitemapid), sitemap.eshopid, current_timestamp, sitemap.uri
	FROM feed.sitemap
	WHERE sitemap.loadlogid = v_loadid
		AND sitemap.uri IS NOT NULL
	GROUP BY sitemap.eshopid, sitemap.uri;
END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_heureka(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN
	UPDATE feed.masterproduct mp
	SET heurekaid = sub.heurekaid,
		productname = COALESCE(sub.productname, sub.product, mp.productname)
	FROM (
		SELECT heurekaid, eshopid, current_timestamp, uri, productname, product
		FROM feed.heureka
		WHERE heureka.loadlogid = v_loadid
	) sub
	WHERE sub.eshopid = mp.eshopid
	AND sub.uri = mp.uri;

	INSERT INTO feed.masterproduct (
		heurekaid, eshopid, createdat, uri
	)
	SELECT public.last(heureka.heurekaid), heureka.eshopid, current_timestamp, heureka.uri
	FROM feed.heureka
	LEFT JOIN feed.masterproduct mp
		ON heureka.eshopid = mp.eshopid
		AND heureka.uri = mp.uri
		AND heureka.uri IS NOT NULL
	WHERE heureka.loadlogid = v_loadid
		AND mp.masterproductid IS NULL
	GROUP BY heureka.eshopid, heureka.uri;
END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_zbozi(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN
	UPDATE feed.masterproduct mp
	SET zboziid = sub.zboziid,
		productname = COALESCE(sub.productname, sub.product, mp.productname)
	FROM (
		SELECT zboziid, eshopid, current_timestamp, uri, productname, product
		FROM feed.zbozi
		WHERE zbozi.loadlogid = v_loadid
	) sub
	WHERE sub.eshopid = mp.eshopid
	AND sub.uri = mp.uri;

	INSERT INTO feed.masterproduct (
		zboziid, eshopid, createdat, uri
	)
	SELECT public.last(zbozi.zboziid), zbozi.eshopid, current_timestamp, zbozi.uri
	FROM feed.zbozi
	LEFT JOIN feed.masterproduct mp
		ON zbozi.eshopid = mp.eshopid
		AND zbozi.uri = mp.uri
		AND zbozi.uri IS NOT NULL
	WHERE zbozi.loadlogid = v_loadid
		AND mp.masterproductid IS NULL
	GROUP BY zbozi.eshopid, zbozi.uri;
END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_ga_pageview(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN
	UPDATE feed.masterproduct mp
	SET turnoutid = sub.turnoutid
	FROM (
		SELECT turnoutid, eshopid, uri
		FROM feed.ga_pageview
		WHERE ga_pageview.loadlogid = v_loadid
	) sub
	WHERE sub.eshopid = mp.eshopid
	AND sub.uri = mp.uri;

	INSERT INTO feed.masterproduct (
		turnoutid, eshopid, createdat, uri
	)
	SELECT public.last(ga_pageview.turnoutid), ga_pageview.eshopid, current_timestamp, ga_pageview.uri
	FROM feed.ga_pageview
	LEFT JOIN feed.masterproduct mp
		ON ga_pageview.eshopid = mp.eshopid
		AND ga_pageview.uri = mp.uri
		AND ga_pageview.uri IS NOT NULL
	WHERE ga_pageview.loadlogid = v_loadid
		AND mp.masterproductid IS NULL
	GROUP BY ga_pageview.eshopid, ga_pageview.uri;
END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_ga_revenue(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN
	UPDATE feed.masterproduct mp
	SET revenuesid = sub.revenuesid,
		productname = COALESCE(mp.productname, sub.productname)
	FROM (
		SELECT revenuesid, eshopid, productsku, productname
		FROM feed.ga_revenue
		WHERE ga_revenue.loadlogid = v_loadid
	) sub
	LEFT JOIN feed.heureka
		ON heureka.item_id = sub.productsku
		AND heureka.eshopid = sub.eshopid
	WHERE sub.eshopid = mp.eshopid
		AND (sub.productname = mp.productname OR heureka.heurekaid IS NOT NULL);

	-- if inserting, then will miss uri which is NOT NULL
	INSERT INTO feed.masterproduct (
		revenuesid, eshopid, createdat, productname
	)
	SELECT public.last(ga_revenue.revenuesid), ga_revenue.eshopid, current_timestamp, ga_revenue.productname
	FROM feed.ga_revenue
	LEFT JOIN feed.heureka
		ON heureka.item_id = ga_revenue.productsku
		AND heureka.eshopid = ga_revenue.eshopid
	LEFT JOIN feed.masterproduct mp
		ON ga_revenue.eshopid = mp.eshopid
		AND (ga_revenue.productname = mp.productname OR heureka.heurekaid IS NOT NULL)
	WHERE ga_revenue.loadlogid = v_loadid
		AND mp.masterproductid IS NULL
	GROUP BY ga_revenue.eshopid, ga_revenue.productname, ga_revenue.productsku;
END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_priceapi(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN

END;
$BODY$ LANGUAGE plpgsql;




CREATE OR replace FUNCTION feed.update_masterproduct(
    v_loadlogid BIGINT
) returns void AS $$
BEGIN
	NOTIFY "feed.update_masterproduct.start";

	DELETE FROM feed.masterproduct WHERE eshopid = (SELECT eshopid FROM warehouse.loadlog WHERE loadid = v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_sitemap(v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_heureka(v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_zbozi(v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_ga_pageview(v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_ga_revenue(v_loadlogid);
	NOTIFY "feed.update_masterproduct.tick";
	PERFORM feed.update_masterproduct_priceapi(v_loadlogid);

	NOTIFY "feed.update_masterproduct.done";
END;
$$ LANGUAGE plpgsql;
