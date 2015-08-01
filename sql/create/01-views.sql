-- warehouse loadLog view
CREATE OR REPLACE VIEW warehouse.eshopmatrixloads AS
	SELECT NULL AS loadid, eshopid, now() AS period
	FROM warehouse.eshopsettings
	WHERE COALESCE((
		SELECT loadlog.period
		FROM warehouse.loadlog
		WHERE loadlog.eshopid = eshopsettings.eshopid
		AND loadlog.checklistfailedat IS NULL
		ORDER BY loadlog.period DESC
		LIMIT 1
	) + datarefreshperiod::interval, now()) <= now()
		AND eshopsettings.datestart < now();




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
