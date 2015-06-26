DROP VIEW analytical.v_situation;
DROP FUNCTION analytical.update_situation();

-- Situation fullfilling
CREATE OR REPLACE FUNCTION analytical.update_situation(
	v_loadlogid BIGINT
)
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
	FROM (
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
			AND matrix.loadid = v_loadlogid
		GROUP BY
			matrix.eshopid,
			matrix.productid,
			matrix.customerid,
			matrix.channelid,
			matrix.orderid,
			matrix.productcategoryid,
			matrix.loadid
	) situation
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
		WHERE matrix.loadid = v_loadlogid
	) AS source (situationid, matrixid)
	WHERE source.matrixid = signal.matrixid
		AND signal.situationid IS NULL
	;
	NOTIFY "analytical.update_situation.done";
END;
$$ LANGUAGE plpgsql;
