
create index priceapi_priceapijobid_idx on feed.priceapi (priceapijobid);
create index valuefailure_paramid_idx on feed.valuefailure (paramid);
create index basketproduct_productid_idx on warehouse.basketproduct (productid);
create index customer_eshopid_idx on warehouse.customer (eshopid);
create index zbozi_variant_loadid_idx on feed.zbozi_variant (loadid);
create index matrix_channelid_productcategoryid_eshopid_customerid_loadid_orderid_productid_idx on analytical.matrix (channelid,productcategoryid,eshopid,customerid,loadid,orderid,productid);
create index orderdiscountrelation_orderid_idx on warehouse.orderdiscountrelation (orderid);
create index order_eshopid_idx on warehouse."order" (eshopid);
create index basketproductdiscountrel_skuid_basketid_idx on warehouse.basketproductdiscountrel (skuid,basketid);
create index basketproduct_productvoucherid_idx on warehouse.basketproduct (productvoucherid);
create index matrix_matrixtype_loadid_channelid_eshopid_idx on analytical.matrix (matrixtype,loadid,channelid,eshopid);
create index heureka_eshopid_idx on feed.heureka (eshopid);
create index order_shippingaddressid_idx on warehouse."order" (shippingaddressid);
create index eshopcurrency_currencycode_eshopid_idx on warehouse.eshopcurrency (currencycode,eshopid);
create index situation_loadid_eshopid_productid_idx on analytical.situation (loadid,eshopid,productid);
create index priceapi_loadid_idx on feed.priceapi (loadid);
create index hcustomer_eshopid_idx on warehouse.hcustomer (eshopid);
create index loadcontrol_feedtypeid_idx on feed.loadcontrol (feedtypeid);
create index stockkeepingunit_eshopid_idx on warehouse.stockkeepingunit (eshopid);
create index basketproduct_eshopid_idx on warehouse.basketproduct (eshopid);
create index eshopsettings_eshopid_idx on warehouse.eshopsettings (eshopid);
create index channel_customerid_idx on warehouse.channel (customerid);
create index googleanalyticsbasket_eshopid_idx on warehouse.googleanalyticsbasket (eshopid);
create index priceapi_eshopid_idx on feed.priceapi (eshopid);
create index matrix_eshopid_matrixtype_customerid_loadid_idx on analytical.matrix (eshopid,matrixtype,customerid,loadid);
create index valuefailure_loadid_idx on feed.valuefailure (loadid);
create index hcustomer_customerid_idx on warehouse.hcustomer (customerid);
create index heureka_loadid_idx on feed.heureka (loadid);
create index productspecialprice_productid_idx on warehouse.productspecialprice (productid);
create index haddress_validfrom_addressid_idx on warehouse.haddress (validfrom,addressid);
create index priceapigtin_priceapiid_idx on feed.priceapigtin (priceapiid);
create index order_billingaddressid_idx on warehouse."order" (billingaddressid);
create index atributessku_attributeid_idx on warehouse.atributessku (attributeid);
create index situation_eshopid_channelid_loadid_idx on analytical.situation (eshopid,channelid,loadid);
create index haddress_customerid_idx on warehouse.haddress (customerid);
create index productspecialprice_customerid_idx on warehouse.productspecialprice (customerid);
create index situation_eshopid_productcategoryid_productid_idx on analytical.situation (eshopid,productcategoryid,productid);
create index heurekadelivery_loadid_idx on feed.heurekadelivery (loadid);
create index orderdiscountrelation_discountid_idx on warehouse.orderdiscountrelation (discountid);
create index valuefailure_zboziid_idx on feed.valuefailure (zboziid);
create index basketproductdiscountrel_discountid_idx on warehouse.basketproductdiscountrel (discountid);
create index stockkeepingunit_productid_idx on warehouse.stockkeepingunit (productid);
create index customerpurchase_customerid_idx on warehouse.customerpurchase (customerid);
create index basket_customerid_idx on warehouse.basket (customerid);
create index basketproductdiscountrel_discountid_basketproductid_skuid_basketid_idx on warehouse.basketproductdiscountrel (discountid,basketproductid,skuid,basketid);
create index matrix_loadid_matrixtype_eshopid_productid_idx on analytical.matrix (loadid,matrixtype,eshopid,productid);
create index order_shipmenttype_idx on warehouse."order" (shipmenttype);
create index attribute_eshopid_idx on warehouse.attribute (eshopid);
create index loadlog_eshopid_idx on warehouse.loadlog (eshopid);
create index heshopsettings_validfrom_settingsid_idx on warehouse.heshopsettings (validfrom,settingsid);
create index heurekaparam_heurekaid_idx on feed.heurekaparam (heurekaid);
create index heurekaaccessory_loadid_idx on feed.heurekaaccessory (loadid);
create index productspecialprice_eshopid_idx on warehouse.productspecialprice (eshopid);
create index basket_eshopid_idx on warehouse.basket (eshopid);
create index valuefailure_eshopid_idx on feed.valuefailure (eshopid);
create index haddress_addressid_idx on warehouse.haddress (addressid);
create index zbozi_variant_zboziid_idx on feed.zbozi_variant (zboziid);
create index feedload_eshopid_idx on feed.feedload (eshopid);
create index customer_eshopid_originalid_idx on warehouse.customer (eshopid,originalid);
create index customersegment_segmentid_idx on warehouse.customersegment (segmentid);
create index cdiscount_eshopid_idx on warehouse.cdiscount (eshopid);
create index address_eshopid_idx on warehouse.address (eshopid);
create index loadcontrol_eshopid_idx on feed.loadcontrol (eshopid);
create index valuefailure_accessoryid_idx on feed.valuefailure (accessoryid);
create index address_customerid_idx on warehouse.address (customerid);
create index zbozi_eshopid_idx on feed.zbozi (eshopid);
create index situation_eshopid_channelid_idx on analytical.situation (eshopid,channelid);
create index googleanalytics_eshopid_idx on warehouse.googleanalytics (eshopid);
create index productcategoryrelation_productcategoryid_idx on warehouse.productcategoryrelation (productcategoryid);
create index zbozi_variant_variantzboziid_idx on feed.zbozi_variant (variantzboziid);
create index eshop_countryidiso_idx on warehouse.eshop (countryidiso);
create index eshoplocalization_eshopid_idx on warehouse.eshoplocalization (eshopid);
create index productpreference_eshopid_idx on feed.productpreference (eshopid);
create index eshopcurrency_currencycode_idx on warehouse.eshopcurrency (currencycode);
create index eshopcurrency_eshopid_idx on warehouse.eshopcurrency (eshopid);
create index channel_eshopid_channelid_idx on warehouse.channel (eshopid,channelid);
create index order_basketid_idx on warehouse."order" (basketid);
create index segment_eshopid_idx on warehouse.segment (eshopid);
create index eshop_companyid_idx on warehouse.eshop (companyid);
create index zbozi_loadid_idx on feed.zbozi (loadid);
create index valuefailure_sitemapid_idx on feed.valuefailure (sitemapid);
create index matrix_matrixtype_eshopid_productid_productcategoryid_idx on analytical.matrix (matrixtype,eshopid,productid,productcategoryid);
create index basketproduct_basketid_idx on warehouse.basketproduct (basketid);
create index productcategory_eshopid_idx on warehouse.productcategory (eshopid);
create index productspecialprice_segmentid_idx on warehouse.productspecialprice (segmentid);
create index product_eshopid_originalid_idx on warehouse.product (eshopid,originalid);
create index masterproduct_eshopid_idx on feed.masterproduct (eshopid);
create index productspecialprice_productcategoryid_idx on warehouse.productspecialprice (productcategoryid);
create index situation_loadid_orderid_eshopid_idx on analytical.situation (loadid,orderid,eshopid);
create index priceapijob_loadid_idx on feed.priceapijob (loadid);
create index eshoplocalization_languageidiso_idx on warehouse.eshoplocalization (languageidiso);
create index product_eshopid_idx on warehouse.product (eshopid);
create index hcustomer_validfrom_customerid_idx on warehouse.hcustomer (validfrom,customerid);
create index valuefailure_feedcolumnid_idx on feed.valuefailure (feedcolumnid);
create index heurekaaccessory_heurekaid_idx on feed.heurekaaccessory (heurekaid);
create index situation_orderid_productcategoryid_channelid_customerid_productid_eshopid_loadid_idx on analytical.situation (orderid,productcategoryid,channelid,customerid,productid,eshopid,loadid);
create index ga_revenue_loadid_idx on feed.ga_revenue (loadid);
create index heurekaparam_loadid_idx on feed.heurekaparam (loadid);
create index feedload_feedtypeid_idx on feed.feedload (feedtypeid);
create index customersegment_eshopid_idx on warehouse.customersegment (eshopid);
create index productspecialprice_skuid_idx on warehouse.productspecialprice (skuid);
create index priceapioffer_priceapiid_idx on feed.priceapioffer (priceapiid);
create index valuefailure_heurekaid_idx on feed.valuefailure (heurekaid);
create index ga_pageview_eshopid_idx on feed.ga_pageview (eshopid);
create index sitemap_loadid_idx on feed.sitemap (loadid);
create index productcategory_parentcategory_idx on warehouse.productcategory (parentcategory);
create index heurekadelivery_heurekaid_idx on feed.heurekadelivery (heurekaid);
create index matrix_channelid_eshopid_idx on analytical.matrix (channelid,eshopid);
create index situation_loadid_customerid_eshopid_idx on analytical.situation (loadid,customerid,eshopid);
create index priceapijob_eshopid_idx on feed.priceapijob (eshopid);
create index matrix_orderid_eshopid_loadid_matrixtype_idx on analytical.matrix (orderid,eshopid,loadid,matrixtype);
create index atributessku_skuid_idx on warehouse.atributessku (skuid);
create index sitemap_eshopid_idx on feed.sitemap (eshopid);
create index ga_pageview_loadid_idx on feed.ga_pageview (loadid);
create index matrix_productcategoryid_loadid_customerid_eshopid_orderid_matrixtype_channelid_productid_idx on analytical.matrix (productcategoryid,loadid,customerid,eshopid,orderid,matrixtype,channelid,productid);
create index customersegment_customerid_idx on warehouse.customersegment (customerid);
create index valuefailure_variantid_idx on feed.valuefailure (variantid);
create index valuefailure_heurekadeliveryid_idx on feed.valuefailure (heurekadeliveryid);
create index basketproduct_skuid_idx on warehouse.basketproduct (skuid);
create index eshopfeedsettings_eshopid_idx on feed.eshopfeedsettings (eshopid);
create index productcategoryrelation_productid_idx on warehouse.productcategoryrelation (productid);
create index ga_revenue_eshopid_idx on feed.ga_revenue (eshopid);
create index matrix_productid_matrixtype_eshopid_productcategoryid_idx on analytical.matrix (productid,matrixtype,eshopid,productcategoryid);
create index situation_productcategoryid_productid_eshopid_idx on analytical.situation (productcategoryid,productid,eshopid);
create index matrix_matrixtype_eshopid_channelid_loadid_idx on analytical.matrix (matrixtype,eshopid,channelid,loadid);
create index heurekaparam_loadlogid_idx on feed.heurekaparam (loadlogid);
create index ga_revenue_loadlogid_idx on feed.ga_revenue (loadlogid);
create index productcategory_eshopid_originalid_idx on warehouse.productcategory (eshopid,originalid);
create index situation_loadid_eshopid_customerid_idx on analytical.situation (loadid,eshopid,customerid);
create index valuefailure_loadlogid_idx on feed.valuefailure (loadlogid);
create index heurekaaccessory_loadlogid_idx on feed.heurekaaccessory (loadlogid);
create index situation_orderid_eshopid_productid_customerid_channelid_productcategoryid_loadid_idx on analytical.situation (orderid,eshopid,productid,customerid,channelid,productcategoryid,loadid);
create index zbozi_variant_loadlogid_idx on feed.zbozi_variant (loadlogid);
create index matrix_orderid_eshopid_channelid_productcategoryid_loadid_customerid_matrixtype_productid_idx on analytical.matrix (orderid,eshopid,channelid,productcategoryid,loadid,customerid,matrixtype,productid);
create index sitemap_loadlogid_idx on feed.sitemap (loadlogid);
create index matrix_eshopid_channelid_idx on analytical.matrix (eshopid,channelid);
create index situation_loadid_eshopid_channelid_idx on analytical.situation (loadid,eshopid,channelid);
create index basketproductdiscountrel_skuid_basketid_discountid_basketproductid_idx on warehouse.basketproductdiscountrel (skuid,basketid,discountid,basketproductid);
create index zbozi_loadlogid_idx on feed.zbozi (loadlogid);
create index priceapijob_loadlogid_idx on feed.priceapijob (loadlogid);
create index matrix_eshopid_productid_loadid_matrixtype_idx on analytical.matrix (eshopid,productid,loadid,matrixtype);
create index situation_productid_loadid_eshopid_idx on analytical.situation (productid,loadid,eshopid);
create index masterproduct_uri_eshopid_idx on feed.masterproduct (uri,eshopid);
create index heureka_loadlogid_idx on feed.heureka (loadlogid);
create index heurekadelivery_loadlogid_idx on feed.heurekadelivery (loadlogid);
create index basketproductdiscountrel_basketid_skuid_idx on warehouse.basketproductdiscountrel (basketid,skuid);
create index ga_pageview_loadlogid_idx on feed.ga_pageview (loadlogid);
create index feedload_loadlogid_idx on feed.feedload (loadlogid);
create index matrix_orderid_eshopid_matrixtype_loadid_idx on analytical.matrix (orderid,eshopid,matrixtype,loadid);
create index priceapi_loadlogid_idx on feed.priceapi (loadlogid);
create index eshoplocalization_eshopid_languageidiso_idx on warehouse.eshoplocalization (eshopid,languageidiso);
create index matrix_loadid_matrixtype_customerid_eshopid_idx on analytical.matrix (loadid,matrixtype,customerid,eshopid);
create index attribute_eshopid_originalid_idx on warehouse.attribute (eshopid,originalid);

/*
select 'create index ' || relname || '_' ||
array_to_string(column_name_list, '_') || '_idx on ' || conrelid ||
' (' || array_to_string(column_name_list, ',') || ');'
from (select distinct
conrelid,
array_agg(attname) column_name_list,
array_agg(attnum) as column_list
from pg_attribute
join (select conrelid::regclass,
conname,
unnest(conkey) as column_index
from (select distinct
conrelid, conname, conkey
from pg_constraint
join pg_class on pg_class.oid = pg_constraint.conrelid
                 join pg_namespace on pg_namespace.oid = pg_class.relnamespace
                      where nspname !~ '^pg_' and nspname <> 'information_schema'
                      ) fkey
               ) fkey
               on fkey.conrelid = pg_attribute.attrelid
                  and fkey.column_index = pg_attribute.attnum
     group by conrelid, conname
     ) candidate_index
join pg_class on pg_class.oid = candidate_index.conrelid
left join pg_index on pg_index.indrelid = conrelid
                      and indkey::text = array_to_string(column_list, ' ')
where indexrelid is null;
*/
