-- warehouse loadLog view
DROP VIEW warehouse.eshopmatrixloads;
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
	) + datarefreshperiod::interval, now()) <= now();
