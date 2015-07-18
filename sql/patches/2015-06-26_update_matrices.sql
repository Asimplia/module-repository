
DROP VIEW analytical.matrixmlc1;
DROP VIEW analytical.matrixmlc2;
DROP VIEW analytical.matrixmlc3;
DROP VIEW analytical.matrixmlc4;
DROP VIEW analytical.matrixmlc5;
DROP VIEW analytical.matrixmlc6;
DROP VIEW analytical.matrixmlc8;
DROP VIEW analytical.matrixmlc9;
DROP VIEW analytical.matrixmlc10;
DROP VIEW analytical.matrixmlc11;
DROP VIEW analytical.matrixmlc12;
DROP VIEW analytical.matrixmlc13;
DROP VIEW analytical.matrixmlc14;
DROP VIEW analytical.matrixmlc15;
DROP VIEW analytical.matrixmlc20;
DROP VIEW analytical.matrixmlc21;
DROP VIEW analytical.matrixmlc22;
DROP VIEW analytical.matrixmlc23;
DROP VIEW analytical.matrixmlc24;
DROP VIEW analytical.matrixmlc25;
DROP VIEW analytical.matrixmlc26;
DROP VIEW analytical.matrixmlc27;
DROP VIEW analytical.matrixmlc28;
DROP VIEW analytical.matrixmlc29;
DROP VIEW analytical.matrixmlc30;
DROP VIEW analytical.matrixmlc31;
DROP VIEW analytical.matrixmlc32;
DROP VIEW analytical.matrixmlc33;
DROP VIEW analytical.matrixmlc34;
DROP VIEW analytical.matrixmlc35;
DROP VIEW analytical.matrixmlc36;
DROP VIEW analytical.matrixmlc37;
DROP VIEW analytical.matrixmlc38;
DROP VIEW analytical.matrixmlc39;
DROP VIEW analytical.matrixmlc40;
DROP VIEW analytical.matrixmlc41;
DROP VIEW analytical.matrixmlc42;
DROP VIEW analytical.matrixmlc43;
DROP VIEW analytical.matrixmlc44;
DROP VIEW analytical.matrixmlc45;
DROP VIEW analytical.matrixmlc46;
DROP VIEW analytical.matrixmlc47;

ALTER TABLE analytical."matrix"
ALTER "scoreabs" TYPE real,
ALTER "scoreabs" DROP DEFAULT,
ALTER "scoreabs" DROP NOT NULL,
ALTER "scorerel" TYPE real,
ALTER "scorerel" DROP DEFAULT,
ALTER "scorerel" DROP NOT NULL,
ALTER "scorewei" TYPE real,
ALTER "scorewei" DROP DEFAULT,
ALTER "scorewei" DROP NOT NULL,
ALTER "changeabs" TYPE real,
ALTER "changeabs" DROP DEFAULT,
ALTER "changeabs" DROP NOT NULL,
ALTER "changerel" TYPE real,
ALTER "changerel" DROP DEFAULT,
ALTER "changerel" DROP NOT NULL,
ALTER "changewei" TYPE real,
ALTER "changewei" DROP DEFAULT,
ALTER "changewei" DROP NOT NULL;


DROP FUNCTION analytical.update_matrices();
-- Matrix fullfilling
CREATE OR REPLACE FUNCTION analytical.update_matrices(
	v_loadlogid BIGINT
)
RETURNS void AS $$
DECLARE
   matrixtype text;
BEGIN
	NOTIFY "analytical.update_matrices.start";
	FOR matrixtype IN SELECT cmatrix.matrixtype AS matrixtype FROM analytical.cmatrix
	LOOP
		EXECUTE 'INSERT INTO analytical.matrix
		 (eshopid, matrixtype, productid, loadid, quadrant, datevalid, inputvaluex)
		 SELECT eshopid, matrixtype, productid, ' || v_loadlogid || ', quadrant, datevalid, inputvaluex
		 FROM analytical.get_matrix' || matrixtype || '(' || v_loadlogid || ')';
		NOTIFY "analytical.update_matrices.tick";
	END LOOP;
	NOTIFY "analytical.update_matrices.done";
END;
$$ LANGUAGE plpgsql;



-- heureka feeds
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc1(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC1'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.productname IS NULL) OR ((heureka.productname)::text = ''::text)) THEN 1
			ELSE 0
		END::real AS inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC1'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc2(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC2'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.item_id IS NULL) OR ((heureka.item_id)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC2'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc3(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC3'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.product IS NULL) OR ((heureka.product)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC3'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc4(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC4'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.description IS NULL) OR ((heureka.description)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC4'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid IS NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc5(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC5'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.url IS NULL) OR ((heureka.url)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC5'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc6(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC6'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.imgurl IS NULL) OR ((heureka.imgurl)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC6'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

-- TODO matrixmlc7 missing

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc8(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC8'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.imgurl_alternative IS NULL) OR ((heureka.imgurl_alternative)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC8'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc9(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC9'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.video_url IS NULL) OR ((heureka.video_url)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC9'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc10(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC10'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.price_vat IS NULL) OR ((heureka.price_vat)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC10'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc11(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC11'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.heureka_cpc IS NULL) OR ((heureka.heureka_cpc)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC11'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc12(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC12'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.manufacturer IS NULL) OR ((heureka.manufacturer)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC12'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc13(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC13'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.categorytext IS NULL) OR ((heureka.categorytext)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC13'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc14(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC14'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.ean IS NULL) OR ((heureka.ean)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC14'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc15(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC15'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((heureka.delivery_date IS NULL) OR ((heureka.delivery_date)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = masterproduct.heurekaid
		AND heureka.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC15'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND heureka.heurekaid IS NOT NULL;
$$ LANGUAGE sql;

-- TODO matrixmlc16-19 missing


-- zbozi feeds
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc20(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC20'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.product IS NULL) OR ((zbozi.product)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC20'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc21(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC21'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.productname IS NULL) OR ((zbozi.productname)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC21'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc22(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC22'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.description IS NULL) OR ((zbozi.description)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC22'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc23(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC23'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.url IS NULL) OR ((zbozi.url)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC23'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc24(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC24'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.imgurl IS NULL) OR ((zbozi.imgurl)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC24'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc25(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC25'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.price IS NULL) OR ((zbozi.price)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC25'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc26(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC26'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.vat IS NULL) OR ((zbozi.vat)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC26'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc27(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC27'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.price_vat IS NULL) OR ((zbozi.price_vat)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC27'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc28(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC28'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.delivery_date IS NULL) OR ((zbozi.delivery_date)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC28'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc29(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC29'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.shop_depots IS NULL) OR ((zbozi.shop_depots)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC29'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc30(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC30'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.item_type IS NULL) OR ((zbozi.item_type)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC30'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc31(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC31'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.manufacturer IS NULL) OR ((zbozi.manufacturer)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC31'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc32(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC32'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.categorytext IS NULL) OR ((zbozi.categorytext)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC32'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc33(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC33'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.ean IS NULL) OR ((zbozi.ean)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC33'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc34(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC34'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((zbozi.productno IS NULL) OR ((zbozi.productno)::text = ''::text)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = masterproduct.zboziid
		AND zbozi.eshopid = masterproduct.eshopid
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC34'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL
		AND zbozi.zboziid IS NOT NULL;
$$ LANGUAGE sql;

-- feed existing
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc35(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC35'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN masterproduct.heurekaid IS NULL THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC35'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc36(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC36'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
	  CASE
	    WHEN masterproduct.zboziid IS NULL THEN 1
	    ELSE 0
	  END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC36'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION analytical.get_matrixmlc37(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		masterproduct.eshopid AS eshopid,
		'MLC37'::VARCHAR(10) AS matrixtype,
		masterproduct.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN masterproduct.sitemapid IS NULL THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM feed.masterproduct
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC37'
		AND matrix.eshopid = masterproduct.eshopid
		AND matrix.productid = masterproduct.productid
	WHERE matrix.matrixid is NULL
		AND masterproduct.productid IS NOT NULL;
$$ LANGUAGE sql;

-- GA feeds
-- TRAFFIC_CRITICAL
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc38(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC38'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN (source.pageviews::integer <= 10) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC38'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- TRAFFIC_BAD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc39(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC39'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances)::numeric < (0.2 * (source.pageviews)::numeric))) THEN 0
			ELSE 1
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC39'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- TRAFFIC_GOOD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc40(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC40'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN (((source.pageviews >= 100) AND ((source.entrances)::numeric >= (0.2 * (source.pageviews)::numeric))) AND ((source.entrances)::numeric < (0.8 * (source.pageviews)::numeric))) THEN 0
			ELSE 1
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC40'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- TRAFFIC_EXTERNAL_ONLY
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc41(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC41'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances)::numeric >= (0.9 * (source.pageviews)::numeric))) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC41'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- TRAFFIC_EXTERNAL_BAD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc42(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC42'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 10) AND ((source.entrances)::numeric < (0.2 * (source.pageviews)::numeric))) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC42'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- REVENUE_BAD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc43(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC43'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews < 10) AND ((source.entrances  < 10)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		LEFT JOIN feed.ga_revenue
			ON ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			)
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC43'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- REVENUE_GOOD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc44(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC44'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews < 10) AND ((source.entrances  < 10)) and (source.itemquantity >= 10) and (source.itemrevenue >= 500)) THEN 0
			ELSE 1
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC44'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- SELL_EXTERNAL_BAD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc45(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC45'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) and (source.itemquantity >= 100) and (source.itemrevenue >= 1000)) THEN 0
			ELSE 1
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC45'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- SELL_BAD
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc46(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC46'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances::numeric  >= 0.9*(source.pageviews)::numeric)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC46'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;

-- SELL_CRITICAL
CREATE OR REPLACE FUNCTION analytical.get_matrixmlc47(
	v_loadlogid INT8
) RETURNS table (eshopid bigint, matrixtype VARCHAR(10), productid bigint, quadrant integer, datevalid timestamptz, inputvaluex real) AS
$$
	SELECT
		source.eshopid AS eshopid,
		'MLC47'::VARCHAR(10) AS matrixtype,
		source.productid::bigint AS productid,
		1::integer AS quadrant,
		now() AS datevalid,
		CASE
			WHEN ((source.pageviews >= 100) AND ((source.entrances::numeric  < 0.9*(source.pageviews)::numeric)) and (source.itemquantity < 10) and (source.itemrevenue < 500)) THEN 1
			ELSE 0
		END::real as inputvaluex
	FROM (
		SELECT masterproduct.eshopid,
			sum(ga_pageview.pageviews)::bigint AS pageviews,
			sum(ga_pageview.entrances)::bigint AS entrances,
			sum(ga_revenue.itemquantity)::bigint AS itemquantity,  
			sum(ga_revenue.itemrevenue)::bigint AS itemrevenue,
			masterproduct.uri,
			masterproduct.productid
		FROM feed.masterproduct
		LEFT JOIN feed.ga_pageview
			ON ga_pageview.turnoutid = masterproduct.turnoutid
			AND ga_pageview.eshopid = masterproduct.eshopid
		left join feed.ga_revenue
			on ((ga_revenue.productsku = CAST (masterproduct.productid AS text) or ga_revenue.productname = masterproduct.productname)
			and ga_revenue.eshopid = masterproduct.eshopid
			)	
		WHERE masterproduct.masterproductid IS NOT NULL
		GROUP BY
			masterproduct.eshopid,
			masterproduct.uri,
			masterproduct.productid
	) source
	LEFT JOIN (SELECT * FROM analytical.matrix WHERE matrix.loadid = v_loadlogid) matrix
		ON matrix.matrixtype = 'MLC47'
		AND matrix.eshopid = source.eshopid
		AND matrix.productid = source.productid
	WHERE matrix.matrixid IS NULL;
$$ LANGUAGE sql;
