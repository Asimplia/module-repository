


CREATE VIEW warehouse.eshopmatrixloads AS
 SELECT a.eshopid,
    rank() OVER (PARTITION BY a.eshopid ORDER BY a.period) AS loadid,
    a.period
   FROM ( SELECT s.eshopid,
            t.period
           FROM eshopsettings s,
            LATERAL generate_series(s.datestart, now(), (s.datarefreshperiod)::interval) t(period)) a;


CREATE VIEW analytical.matrixmlc1 AS
    select
	  feedload.eshopid as eshopid,
	  'MLC1' as matrixtype,
	  product.productid::bigint as productid,
	  loadlog.loadid as loadid,
	  0::real as scoreabs,
	  0::real as scorerel,
	  0::real as scorewei,
	  0::real as changeabs,
	  0::real as changerel,
	  0::real as changewei,
	  1::integer as quadrant,
	  now() as datevalid,
	  CASE
	    WHEN ((heureka.productname IS NULL) OR ((heureka.productname)::text = ''::text)) THEN 1
	    ELSE 0
	  END  as inputvaluex

	from feed.heureka
        join warehouse.product on product.originalid = heureka.item_id
	join feed.feedload on feedload.loadid = heureka.loadid
	join warehouse.eshopmatrixloads loadlog
	  on feedload.eshopid = loadlog.eshopid
	  and loadlog.period + (select datarefreshperiod from warehouse.eshopsettings where eshopid = feedload.eshopid limit 1)::interval > feedload.loaddate
	  and loadlog.period < feedload.loaddate
	left join analytical.matrix
	  on matrix.matrixtype = 'MLC1'
	  and matrix.loadid = loadlog.loadid
	  and matrix.productid = product.productid
	where matrix.matrixid is null
	;

