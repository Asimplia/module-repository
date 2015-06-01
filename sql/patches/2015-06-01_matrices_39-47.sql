
-- TRAFFIC_BAD
CREATE OR REPLACE VIEW analytical.matrixmlc39 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC39' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances)::numeric < (0.2 * (source.pageviews)::numeric))) THEN 0
			ELSE 1
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		WHERE masterproduct.masterproductid IS NOT NuLL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC39'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- TRAFFIC_GOOD
CREATE OR REPLACE VIEW analytical.matrixmlc40 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC40' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN (((source.pageviews >= 100) AND ((source.entrances)::numeric >= (0.2 * (source.pageviews)::numeric))) AND ((source.entrances)::numeric < (0.8 * (source.pageviews)::numeric))) THEN 0
			ELSE 1
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		WHERE masterproduct.masterproductid IS NOT NuLL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC40'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- TRAFFIC_EXTERNAL_ONLY
CREATE OR REPLACE VIEW analytical.matrixmlc41 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC41' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances)::numeric >= (0.9 * (source.pageviews)::numeric))) THEN 1
			ELSE 0
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		WHERE masterproduct.masterproductid IS NOT NuLL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC41'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- TRAFFIC_EXTERNAL_BAD
CREATE OR REPLACE VIEW analytical.matrixmlc42 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC42' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 10) AND ((source.entrances)::numeric < (0.2 * (source.pageviews)::numeric))) THEN 1
			ELSE 0
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		WHERE masterproduct.masterproductid IS NOT NuLL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC42'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- REVENUE_BAD
CREATE OR REPLACE VIEW analytical.matrixmlc43 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC43' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews < 10) AND ((source.entrances  < 10)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			AND ga_revenue.loadlogid = loadlog.loadid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC43'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- REVENUE_GOOD
CREATE OR REPLACE VIEW analytical.matrixmlc44 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC44' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews < 10) AND ((source.entrances  < 10)) and (source.itemquantity >= 10) and (source.itemrevenue >= 500)) THEN 0
			ELSE 1
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			AND ga_revenue.loadlogid = loadlog.loadid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC44'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- SELL_EXTERNAL_BAD
CREATE OR REPLACE VIEW analytical.matrixmlc45 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC45' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) and (source.itemquantity >= 100) and (source.itemrevenue >= 1000)) THEN 0
			ELSE 1
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			AND ga_revenue.loadlogid = loadlog.loadid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC45'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- SELL_BAD
CREATE OR REPLACE VIEW analytical.matrixmlc46 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC46' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances::numeric  >= 0.9*(source.pageviews)::numeric)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			AND ga_revenue.loadlogid = loadlog.loadid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC46'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

-- SELL_CRITICAL
CREATE OR REPLACE VIEW analytical.matrixmlc47 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC47' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid::bigint AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances::numeric  < 0.9*(source.pageviews)::numeric)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid AS loadlogid
		FROM feed.masterproduct
		FULL OUTER JOIN warehouse.loadlog
			ON loadlog.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
			AND ga_pageview.loadlogid = loadlog.loadid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			AND ga_revenue.loadlogid = loadlog.loadid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid,
			loadlog.loadid
	) source
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC47'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;


INSERT INTO "cmatrix" ("matrixtype", "description", "inputvaluexthreshold") VALUES
('MLC39',	'',	'0.5'),
('MLC40',	'',	'0.5'),
('MLC41',	'',	'0.5'),
('MLC42',	'',	'0.5'),
('MLC43',	'',	'0.5'),
('MLC44',	'',	'0.5'),
('MLC45',	'',	'0.5'),
('MLC46',	'',	'0.5'),
('MLC47',	'',	'0.5');
