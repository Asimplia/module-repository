
CREATE INDEX "masterproduct_uri" ON feed."masterproduct" ("uri");
CREATE INDEX "masterproduct_productname" ON feed."masterproduct" ("productname");
CREATE INDEX "masterproduct_ean" ON feed."masterproduct" ("ean");

alter table feed.feedload
   add constraint FK_FEEDLOAD_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

# ---fdfsfsf
CREATE INDEX "ga_pageview_uri" ON feed."ga_pageview" ("uri");

alter table feed.ga_pageview
   add constraint FK_PAGEVIEW_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "ga_revenue_productname" ON feed."ga_revenue" ("productname");

alter table feed.ga_revenue
   add constraint FK_REVENUE_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "heureka_uri" ON feed."heureka" ("uri");
CREATE INDEX "heureka_productname" ON feed."heureka" ("productname");

alter table feed.heureka
   add constraint FK_HEUREKA_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

alter table feed.heurekaaccessory
   add constraint FK_HEUREKAACCESSORY_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

ALTER TABLE feed."heurekacategories"
ADD CONSTRAINT "heurekacategories_id" PRIMARY KEY ("id");

CREATE INDEX "heurekacategories_parent_id" ON feed."heurekacategories" ("parent_id");

ALTER TABLE feed."heurekacategories"
ADD FOREIGN KEY ("parent_id") REFERENCES feed."heurekacategories" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

alter table feed.heurekadelivery
   add constraint FK_heurekadelivery_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

alter table feed.heurekaparam
   add constraint FK_heurekaparam_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "priceapi_name" ON feed."priceapi" ("name");
CREATE INDEX "priceapi_url" ON feed."priceapi" ("url");

alter table feed.priceapi
   add constraint FK_priceapi_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

alter table feed.priceapijob
   add constraint FK_priceapijob_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "sitemap_uri" ON feed."sitemap" ("uri");

alter table feed.sitemap
   add constraint FK_sitemap_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "valuefailure_loadid" ON feed."valuefailure" ("loadid");

alter table feed.valuefailure
   add constraint FK_valuefailure_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

CREATE INDEX "zbozi_uri" ON feed."zbozi" ("uri");
CREATE INDEX "zbozi_productname" ON feed."zbozi" ("productname");

alter table feed.zbozi
   add constraint FK_zbozi_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

alter table feed.zbozi_variant
   add constraint FK_zbozi_variant_REFERENCE_LOADLOG foreign key (loadlogid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

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
