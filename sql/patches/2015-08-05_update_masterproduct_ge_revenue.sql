
DROP FUNCTION IF EXISTS feed.update_masterproduct_ga_revenue(v_loadlogid BIGINT);

CREATE OR REPLACE FUNCTION feed.update_masterproduct_ga_revenue(
	v_loadid INT8
) RETURNS void AS $BODY$
BEGIN
	UPDATE feed.masterproduct mp
	SET revenuesid = sub.revenuesid,
		productname = COALESCE(mp.productname, sub.productname)
	FROM (
		SELECT revenuesid,
			ga_revenue.eshopid,
			ga_revenue.productsku,
			ga_revenue.productname,
			heureka.heurekaid
		FROM feed.ga_revenue
		LEFT JOIN feed.heureka
			ON heureka.item_id = ga_revenue.productsku
			AND heureka.eshopid = ga_revenue.eshopid
			AND heureka.loadlogid = ga_revenue.loadlogid
		WHERE ga_revenue.loadlogid = v_loadid
	) sub
	WHERE sub.eshopid = mp.eshopid
		AND (
			sub.productname = mp.productname
			OR sub.heurekaid IS NOT NULL AND sub.heurekaid = mp.heurekaid
		);

	-- if inserting, then will miss uri which is NOT NULL
	/* INSERT INTO feed.masterproduct (
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
	GROUP BY ga_revenue.eshopid, ga_revenue.productname, ga_revenue.productsku; */
END;
$BODY$ LANGUAGE plpgsql;
