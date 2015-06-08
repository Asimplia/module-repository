
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
	WHERE a.period > (
			SELECT l.period
			FROM warehouse.loadlog l
			WHERE a.eshopid = l.eshopid
			ORDER BY l.period DESC
			LIMIT 1
		);




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
