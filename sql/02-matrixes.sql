
-- heureka feeds
CREATE OR REPLACE VIEW analytical.matrixmlc1 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC1' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.productname IS NULL) OR ((heureka.productname)::text = ''::text)) THEN 1
			ELSE 0
		END AS inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC1'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc2 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC2' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.item_id IS NULL) OR ((heureka.item_id)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC2'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc3 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC3' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.product IS NULL) OR ((heureka.product)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC3'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc4 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC4' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.description IS NULL) OR ((heureka.description)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC4'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc5 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC5' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.url IS NULL) OR ((heureka.url)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC5'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc6 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC6' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.imgurl IS NULL) OR ((heureka.imgurl)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC6'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

-- TODO matrixmlc7 missing

CREATE OR REPLACE VIEW analytical.matrixmlc8 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC8' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.imgurl_alternative	 IS NULL) OR ((heureka.imgurl_alternative	)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC8'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc9 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC9' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.video_url IS NULL) OR ((heureka.video_url)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC9'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc10 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC10' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.price_vat IS NULL) OR ((heureka.price_vat)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC10'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc11 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC11' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.heureka_cpc IS NULL) OR ((heureka.heureka_cpc)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC11'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc12 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC12' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.manufacturer IS NULL) OR ((heureka.manufacturer)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC12'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc13 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC13' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.categorytext IS NULL) OR ((heureka.categorytext)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC13'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc14 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC14' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.ean IS NULL) OR ((heureka.ean)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC14'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc15 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC15' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.delivery_date IS NULL) OR ((heureka.delivery_date)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
		AND heureka.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC15'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;

-- TODO matrixmlc16-19 missing


-- zbozi feeds
CREATE OR REPLACE VIEW analytical.matrixmlc20 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC20' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.product IS NULL) OR ((zbozi.product)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC20'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc21 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC21' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.productname IS NULL) OR ((zbozi.productname)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC21'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc22 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC22' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.description IS NULL) OR ((zbozi.description)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC22'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc23 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC23' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.url IS NULL) OR ((zbozi.url)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC23'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc24 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC24' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.imgurl IS NULL) OR ((zbozi.imgurl)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC24'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc25 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC25' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.price IS NULL) OR ((zbozi.price)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC25'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc26 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC26' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.vat IS NULL) OR ((zbozi.vat)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC26'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc27 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC27' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.price_vat IS NULL) OR ((zbozi.price_vat)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC27'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc28 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC28' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.delivery_date IS NULL) OR ((zbozi.delivery_date)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC28'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc29 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC29' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.shop_depots IS NULL) OR ((zbozi.shop_depots)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC29'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc30 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC30' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.item_type IS NULL) OR ((zbozi.item_type)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC30'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc31 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC31' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.manufacturer IS NULL) OR ((zbozi.manufacturer)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC31'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc32 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC32' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.categorytext IS NULL) OR ((zbozi.categorytext)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC32'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc33 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC33' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.ean IS NULL) OR ((zbozi.ean)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC33'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc34 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC34' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.productno IS NULL) OR ((zbozi.productno)::text = ''::text)) THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
		AND zbozi.loadlogid = loadlog.loadid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC34'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;

-- feed existing
CREATE OR REPLACE VIEW analytical.matrixmlc35 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC35' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN masterproduct.heurekaid IS NULL THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC35'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc36 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC36' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
	  CASE
	    WHEN masterproduct.zboziid IS NULL THEN 1
	    ELSE 0
	  END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC36'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;

CREATE OR REPLACE VIEW analytical.matrixmlc37 AS
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC37' AS matrixtype,
		masterproduct.productid::bigint AS productid,
		loadlog.loadid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN masterproduct.sitemapid IS NULL THEN 1
			ELSE 0
		END as inputvaluex
	FROM feed.masterproduct
	FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
		ON loadlog.eshopid = masterproduct.eshopid
	LEFT JOIN analytical.matrix
		ON matrix.matrixtype = 'MLC37'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.loadid = loadlog.loadid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;


-- GA feeds
CREATE OR REPLACE VIEW analytical.matrixmlc38 AS
	SELECT
		source.eshopid AS eshopid,
		'MLC38' AS matrixtype,
		source.productid::bigint AS productid,
		source.loadlogid AS loadid,
		0::real AS scoreabs,
		0::real AS scorerel,
		0::real AS scorewei,
		0::real AS changeabs,
		0::real AS changerel,
		0::real AS changewei,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN (source.pageviews::integer <= 10) THEN 1
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
		FULL OUTER JOIN warehouse.eshopmatrixloads loadlog
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
		ON matrix.matrixtype = 'MLC38'
		AND matrix.eshopid = source.eshopid
		AND matrix.loadid = source.loadlogid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid is null;

