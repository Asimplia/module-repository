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

END;
$BODY$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION feed.update_masterproduct_ga_revenue(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN

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
