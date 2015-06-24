DROP FUNCTION feed.update_product(loadlogid INT8);

-- product fullfilling
CREATE OR REPLACE FUNCTION feed.update_product(v_eshopid INT8)
RETURNS void AS $$
BEGIN
	NOTIFY "feed.update_product.start";
	INSERT INTO warehouse.product
	(
		eshopid,
		productname,
		baseprice,
		vat,
		datecreated,
		datechanged,
		flaginshop,
		inshopfrom,
		useinmatrices,
		uri,
		imageurl
	)
	(
		SELECT
			source.eshopid,
			source.productname,
			0,
			0,
			now(),
			now(),
			TRUE,
			now(),
			TRUE,
			source.uri,
			NULL
		FROM feed.masterproduct source
		LEFT JOIN warehouse.product
			ON product.eshopid = source.eshopid
			AND product.uri = source.uri
		WHERE product.productid IS NULL
			AND source.eshopid = v_eshopid
			AND (
				source.heurekaid IS NOT NULL
				OR source.zboziid IS NOT NULL
				OR source.revenuesid IS NOT NULL
			)
	);

	NOTIFY "feed.update_product.tick";
	UPDATE warehouse.product
	SET productname = source.productname,
		datechanged = now(),
		imageurl = COALESCE(zbozi.imgurl, heureka.imgurl, heureka.imgurl_alternative, priceapi.image_url)
	FROM (
		SELECT
			eshopid, productname, uri, zboziid, heurekaid, priceapiid
		FROM feed.masterproduct
		WHERE masterproduct.eshopid = v_eshopid
	) as source (
		eshopid, productname, uri
	)
	LEFT JOIN feed.zbozi
		ON zbozi.zboziid = source.zboziid
	LEFT JOIN feed.heureka
		ON heureka.heurekaid = source.heurekaid
	LEFT JOIN feed.priceapi
		ON priceapi.priceapiid = source.priceapiid
	WHERE product.eshopid = source.eshopid
		AND product.uri = source.uri;

	NOTIFY "feed.update_product.tick";
	UPDATE feed.masterproduct
	SET productid = product.productid
	FROM (
		SELECT
			productid, eshopid, uri
		FROM warehouse.product
		WHERE product.eshopid = v_eshopid
	) as product (
		productid, eshopid, uri
	)
	WHERE product.eshopid = masterproduct.eshopid
		AND product.uri = masterproduct.uri;

	NOTIFY "feed.update_product.done";
END;
$$ LANGUAGE plpgsql;
