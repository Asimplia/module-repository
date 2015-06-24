
CREATE OR REPLACE FUNCTION feed.optimize_masterproduct(v_eshopid INT8)
RETURNS void AS $$
BEGIN
	DELETE FROM feed.masterproduct
	WHERE masterproduct.productid IS NULL
		AND masterproduct.eshopid = v_eshopid;
END;
$$ LANGUAGE plpgsql;
