/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     11.3.2015 16:58:21                           */
/*==============================================================*/


drop table if exists warehouse.address CASCADE;

drop table if exists warehouse.atributessku CASCADE;

drop table if exists warehouse.attribute CASCADE;

drop index if exists warehouse.inbasketkeys;

drop table if exists warehouse.basket CASCADE;

drop index if exists warehouse.inbasketproductskeys;

drop table if exists warehouse.basketproduct CASCADE;

drop table if exists warehouse.basketproductdiscountrel CASCADE;

drop table if exists warehouse.ccountry CASCADE;

drop table if exists warehouse.ccurrency CASCADE;

drop table if exists warehouse.cdiscount CASCADE;

drop table if exists warehouse.channel CASCADE;

drop table if exists warehouse.clanguage CASCADE;

drop table if exists analytical.cmatrix CASCADE;

drop table if exists warehouse.company CASCADE;

drop table if exists warehouse.cshipment CASCADE;

drop index if exists warehouse.incustomerkeys;

drop table if exists warehouse.customer CASCADE;

drop table if exists warehouse.customerpurchase CASCADE;

drop index if exists warehouse.incustomersegmentkeys;

drop table if exists warehouse.customersegment CASCADE;

drop table if exists warehouse.eshop CASCADE;

drop table if exists warehouse.eshopcurrency CASCADE;

drop table if exists warehouse.eshoplocalization CASCADE;

drop table if exists warehouse.eshopsettings CASCADE;

drop table if exists feed.feedcolumn CASCADE;

drop table if exists feed.feedload CASCADE;

drop table if exists feed.feedtype CASCADE;

drop table if exists feed.ga_pageview CASCADE;

drop table if exists feed.ga_revenue CASCADE;

drop table if exists warehouse.googleanalytics CASCADE;

drop table if exists warehouse.googleanalyticsbasket CASCADE;

drop table if exists warehouse.haddress CASCADE;

drop table if exists warehouse.hcustomer CASCADE;

drop table if exists warehouse.heshopsettings CASCADE;

drop table if exists feed.heureka CASCADE;

drop table if exists feed.heurekaaccessory CASCADE;

drop table if exists feed.heurekadelivery CASCADE;

drop table if exists feed.heurekaparam CASCADE;

drop table if exists warehouse.hproduct CASCADE;

drop table if exists warehouse.hproductspecialprice CASCADE;

drop table if exists warehouse.hstockkeepingunit CASCADE;

drop table if exists feed.loadcontrol CASCADE;

drop table if exists feed.masterproduct CASCADE;

drop index if exists analytical.inmatrixtype;

drop table if exists warehouse.loadlog CASCADE;

drop table if exists analytical.matrix CASCADE;

drop index if exists warehouse.inorderkeys;

drop table if exists warehouse."order" CASCADE;

drop table if exists warehouse.orderdiscountrelation CASCADE;

drop table if exists feed.priceapi CASCADE;

drop table if exists feed.priceapigtin CASCADE;

drop table if exists feed.priceapijob CASCADE;

drop table if exists feed.priceapioffer CASCADE;

drop index if exists warehouse.inproductkeys;

drop table if exists warehouse.product CASCADE;

drop table if exists warehouse.productcategory CASCADE;

drop table if exists warehouse.productcategoryrelation CASCADE;

drop table if exists warehouse.productfeed CASCADE;

drop table if exists feed.productpreference CASCADE;

drop index if exists warehouse.inproductspecialpricekeys;

drop table if exists warehouse.productspecialprice CASCADE;

drop table if exists warehouse.segment CASCADE;

drop table if exists analytical.signal CASCADE;

drop table if exists feed.sitemap CASCADE;

drop table if exists analytical.situation CASCADE;

drop index if exists warehouse.instockkeepingunitkeys;

drop table if exists warehouse.stockkeepingunit CASCADE;

drop table if exists feed.valuefailure CASCADE;

drop table if exists feed.zbozi CASCADE;

drop table if exists feed.zbozi_variant CASCADE;

DROP TABLE if exists feed.heurekacategories CASCADE;

drop schema if exists analytical CASCADE;

drop schema if exists feed CASCADE;

drop schema if exists warehouse CASCADE;

/*==============================================================*/
/* User: analytical                                             */
/*==============================================================*/
create schema analytical;

/*==============================================================*/
/* User: feed                                                   */
/*==============================================================*/
create schema feed;

/*==============================================================*/
/* User: warehouse                                              */
/*==============================================================*/
create schema warehouse;

/*==============================================================*/
/* Table: address                                               */
/*==============================================================*/
create table warehouse.address (
   addressid            SERIAL not null,
   originalid           VARCHAR(100)         not null,
   customerid           INT8                 not null,
   eshopid              INT8                 null,
   addresstype          VARCHAR(10)          not null,
   street               VARCHAR(250)         not null,
   city                 VARCHAR(250)         not null,
   postalcode           VARCHAR(10)          not null,
   country              VARCHAR(250)         not null,
   constraint PK_ADDRESS primary key (addressid),
   constraint AK_KEY_2_ADDRESS unique (originalid)
);

/*==============================================================*/
/* Table: atributessku                                          */
/*==============================================================*/
create table warehouse.atributessku (
   atributesskuid       SERIAL not null,
   attributeid          INT8                 null,
   skuid                INT8                 null,
   value                VARCHAR(100)         null,
   constraint PK_ATRIBUTESSKU primary key (atributesskuid)
);

/*==============================================================*/
/* Table: attribute                                             */
/*==============================================================*/
create table warehouse.attribute (
   attributeid          INT8                 not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   attributename        VARCHAR(50)          null,
   datechanged          timestamptz          not null,
   constraint PK_ATTRIBUTE primary key (attributeid),
   constraint AK_KEY_2_ATTRIBUT unique (originalid, eshopid)
);

/*==============================================================*/
/* Table: basket                                                */
/*==============================================================*/
create table warehouse.basket (
   basketid             SERIAL not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 null,
   customerid           INT8                 null,
   dateadded            timestamptz          not null,
   dateupdated          timestamptz          not null,
   flagbasketstatus     INT                  not null,
   totalprice           REAL                 null,
   constraint PK_BASKET primary key (basketid)
);

/*==============================================================*/
/* Index: inbasketkeys                                          */
/*==============================================================*/
create  index inbasketkeys on warehouse.basket (
basketid,
originalid,
eshopid,
customerid,
dateadded,
dateupdated
);

/*==============================================================*/
/* Table: basketproduct                                         */
/*==============================================================*/
create table warehouse.basketproduct (
   skuid                INT8                 not null,
   originalid           VARCHAR(100)         not null,
   basketid             INT8                 not null,
   productid            INT8                 null,
   productvoucherid     INT8                 null,
   eshopid              INT8                 null,
   price                REAL                 not null,
   quantity             INT                  not null,
   saleflag             REAL                 not null,
   datechanged          timestamptz          not null,
   constraint PK_BASKETPRODUCT primary key (skuid, basketid),
   constraint AK_KEY_2_BASKETPR unique (originalid)
);

/*==============================================================*/
/* Index: inbasketproductskeys                                  */
/*==============================================================*/
create  index inbasketproductskeys on warehouse.basketproduct (
skuid,
originalid,
basketid,
productid,
productvoucherid,
datechanged
);

/*==============================================================*/
/* Table: basketproductdiscountrel                              */
/*==============================================================*/
create table warehouse.basketproductdiscountrel (
   basketproductid      INT8                 not null,
   skuid                INT8                 not null,
   basketid             INT8                 not null,
   discountid           INT8                 not null,
   count                INT                  null,
   constraint PK_BASKETPRODUCTDISCOUNTREL primary key (basketproductid, skuid, basketid, discountid)
);

/*==============================================================*/
/* Table: ccountry                                              */
/*==============================================================*/
create table warehouse.ccountry (
   countryidiso         CHAR(2)              not null
      constraint CKC_COUNTRYIDISO_CCOUNTRY check (countryidiso = upper(countryidiso)),
   countrynameen        VARCHAR(100)         not null,
   constraint PK_CCOUNTRY primary key (countryidiso)
);

/*==============================================================*/
/* Table: ccurrency                                             */
/*==============================================================*/
create table warehouse.ccurrency (
   currencycode         CHAR(3)              not null
      constraint CKC_CURRENCYCODE_CCURRENC check (currencycode = upper(currencycode)),
   currencynameen       VARCHAR(40)          not null,
   constraint PK_CCURRENCY primary key (currencycode)
);

/*==============================================================*/
/* Table: cdiscount                                             */
/*==============================================================*/
create table warehouse.cdiscount (
   discountid           INT8                 not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   productid            INT8                 null,
   discounttype         INT                  not null,
   percentdiscount      REAL                 null,
   fixeddiscount        REAL                 null,
   constraint PK_CDISCOUNT primary key (discountid)
);

/*==============================================================*/
/* Table: channel                                               */
/*==============================================================*/
create table warehouse.channel (
   channelid            SERIAL not null,
   eshopid              INT8                 not null,
   customerid           INT8                 not null,
   channelname          VARCHAR(100)         not null,
   paidchannel          INT                  not null,
   flagrefferalorganic  INT                  not null,
   datecreated          TimestampTZ          not null,
   datechanged          TimestampTZ          null,
   constraint PK_CHANNEL primary key (channelid, eshopid)
);

/*==============================================================*/
/* Table: clanguage                                             */
/*==============================================================*/
create table warehouse.clanguage (
   languageidiso        CHAR(2)              not null,
   languagenameen       VARCHAR(60)          not null,
   constraint PK_CLANGUAGE primary key (languageidiso)
);

/*==============================================================*/
/* Table: cmatrix                                               */
/*==============================================================*/
create table analytical.cmatrix (
   matrixtype           VARCHAR(10)          not null,
   description          VARCHAR(250)         not null,
   inputvaluexthreshold REAL                 null,
   constraint PK_CMATRIX primary key (matrixtype)
);

/*==============================================================*/
/* Table: company                                               */
/*==============================================================*/
create table warehouse.company (
   companyid            SERIAL not null,
   name                 varchar(200)         null,
   vatnumber            varchar(100)         null,
   datechanged          timestamptz          null,
   constraint PK_COMPANY primary key (companyid)
);

/*==============================================================*/
/* Table: cshipment                                             */
/*==============================================================*/
create table warehouse.cshipment (
   shipmenttype         CHAR(5)              not null,
   shipmentprice        REAL                 not null,
   shipmentdescription  VARCHAR(250)         not null,
   constraint PK_CSHIPMENT primary key (shipmenttype)
);

/*==============================================================*/
/* Table: customer                                              */
/*==============================================================*/
create table warehouse.customer (
   customerid           SERIAL not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   firstname            VARCHAR(100)         null,
   lastname             VARCHAR(100)         null,
   email                VARCHAR(100)         null,
   gender               CHAR(1)              null,
   birthday             DATE                 null,
   flaganonymous        INT                  not null,
   datechanged          timestamptz          null,
   constraint PK_CUSTOMER primary key (customerid),
   constraint AK_KEY_2_CUSTOMER unique (originalid, eshopid)
);

/*==============================================================*/
/* Index: incustomerkeys                                        */
/*==============================================================*/
create  index incustomerkeys on warehouse.customer (
customerid,
originalid,
eshopid,
datechanged
);

/*==============================================================*/
/* Table: customerpurchase                                      */
/*==============================================================*/
create table warehouse.customerpurchase (
   customerid           INT8                 not null,
   eshopid              INT8                 not null,
   datevalid            timestamptz          not null,
   lastpurchasedate     timestamptz          null,
   yearpurchaseamount   REAL                 null,
   monthpurchaseamount  REAL                 null,
   totalpurchaseamount  REAL                 null,
   yearpurchasenumber   REAL                 null,
   monthpurchasenumber  REAL                 null,
   totalpurchasenumber  INT                  null,
   minpurchaseamount    REAL                 null,
   maxpurchaseamount    REAL                 null,
   yearsaleamount       REAL                 null,
   monthsaleamount      REAL                 null,
   totalsaleamount      INT                  null,
   yearnbrofvoucherused INT                  null,
   monthnumberofvoucherused REAL                 null,
   totalnumberofvoucherused INT                  null,
   salestotalamountshare REAL                 null,
   salesyearamountshare REAL                 null,
   salesmonthamountshare REAL                 null,
   constraint PK_CUSTOMERPURCHASE primary key (customerid, eshopid, datevalid)
);

/*==============================================================*/
/* Table: customersegment                                       */
/*==============================================================*/
create table warehouse.customersegment (
   customersegmentid    SERIAL not null,
   customerid           INT8                 not null,
   eshopid              INT8                 not null,
   segmentid            INT8                 not null,
   priority             INT8                 not null,
   constraint PK_CUSTOMERSEGMENT primary key (customersegmentid)
);

/*==============================================================*/
/* Index: incustomersegmentkeys                                 */
/*==============================================================*/
create unique index incustomersegmentkeys on warehouse.customersegment (
customersegmentid
);

/*==============================================================*/
/* Table: eshop                                                 */
/*==============================================================*/
create table warehouse.eshop (
   eshopid              INT8                 not null,
   countryidiso         CHAR(2)              null
      constraint CKC_COUNTRYIDISO_ESHOP check (countryidiso is null or (countryidiso = upper(countryidiso))),
   companyid            int8                 null,
   eshopurl             VARCHAR(100)         not null,
   eshopname            VARCHAR(200)         not null,
   datecreated          timestamptz          not null,
   constraint PK_ESHOP primary key (eshopid)
);

/*==============================================================*/
/* Table: eshopcurrency                                         */
/*==============================================================*/
create table warehouse.eshopcurrency (
   eshopid              INT8                 not null,
   currencycode         CHAR(3)              not null
      constraint CKC_CURRENCYCODE_ESHOPCUR check (currencycode = upper(currencycode)),
   constraint PK_ESHOPCURRENCY primary key (eshopid, currencycode)
);

/*==============================================================*/
/* Table: eshoplocalization                                     */
/*==============================================================*/
create table warehouse.eshoplocalization (
   languageidiso        CHAR(2)              not null,
   eshopid              INT8                 not null,
   constraint PK_ESHOPLOCALIZATION primary key (languageidiso, eshopid)
);

/*==============================================================*/
/* Table: eshopsettings                                         */
/*==============================================================*/
create table warehouse.eshopsettings (
   settingsid           SERIAL not null,
   eshopid              INT8                 not null,
   datarefreshperiod    VARCHAR(20)          not null,
   datestart            TIMESTAMPTZ          not null,
   datechanged          timestamptz          not null,
   constraint PK_ESHOPSETTINGS primary key (settingsid)
);

/*==============================================================*/
/* Table: feedcolumn                                            */
/*==============================================================*/
create table feed.feedcolumn (
   feedcolumnid         SERIAL               not null,
   feedcode             VARCHAR(25)          not null,
   entity               VARCHAR(50)          not null,
   property             VARCHAR(50)          not null,
   datatype             VARCHAR(25)          not null,
   maxlength            int                  null,
   constraint PK_FEEDCOLUMN primary key (feedcolumnid)
);

/*==============================================================*/
/* Table: feedload                                              */
/*==============================================================*/
create table feed.feedload (
   loadid               BIGSERIAL               not null,
   eshopid              INT8                 not null,
   feedtypeid           INT4                 null,
   loaddate             TIMESTAMPTZ          not null,
   feedcode             VARCHAR(25)          not null,
   querytype            TEXT                 null,
   startedat            TIMESTAMPTZ          null,
   finishedat           TIMESTAMPTZ          null,
   valid                boolean              null,
   loadlogid            INT8                 null,
   constraint PK_FEEDLOAD primary key (loadid)
);

/*==============================================================*/
/* Table: feedtype                                              */
/*==============================================================*/
create table feed.feedtype (
   feedtypeid           SERIAL not null,
   feedcode             Varchar(25)          not null,
   querytype            TEXT                 not null,
   mproductintegrationprocedure VARCHAR(500)         not null,
   constraint PK_FEEDTYPE primary key (feedtypeid)
);

/*==============================================================*/
/* Table: ga_pageview                                           */
/*==============================================================*/
create table feed.ga_pageview (
   turnoutid            serial               not null,
   loadid               INT8                 not null,
   eshopid              INT8                 not null,
   pagepath             varchar(2048)        null,
   pageviews            INT8                 null,
   entrances            INT8                 null,
   viewedat             Timestamptz          not null,
   uri                  VARCHAR(2048)        null,
   loadlogid            INT8                 null,
   constraint PK_GA_PAGEVIEW primary key (turnoutid)
);

/*==============================================================*/
/* Table: ga_revenue                                            */
/*==============================================================*/
create table feed.ga_revenue (
   revenuesid           serial               not null,
   loadid               INT8                 not null,
   eshopid              INT8                 not null,
   productname          VARCHAR(1000)        null,
   productsku           VARCHAR(100)         null,
   itemquantity         INT4                 null,
   itemrevenue          REAL                 null,
   receivedat           timestamptz          not null,
   loadlogid            INT8                 null,
   constraint PK_GA_REVENUE primary key (revenuesid)
);

/*==============================================================*/
/* Table: googleanalytics                                       */
/*==============================================================*/
create table warehouse.googleanalytics (
   gaid                 SERIAL not null,
   eshopid              INT8                 not null,
   gaquery              VARCHAR(50)          not null,
   datechanged          timestamptz          not null,
   source               VARCHAR(1000)        null,
   medium               VARCHAR(1000)        null,
   campaign             VARCHAR(1000)        null,
   adcontent            VARCHAR(1000)        null,
   keyword              VARCHAR(1000)        null,
   sessions             int                  null,
   transactions         REAL                 null,
   transactionrevenue   REAL                 null,
   itemquantity         int                  null,
   bounces              int                  null,
   newusers             int                  null,
   landingpagepath      VARCHAR(300)         null,
   country              VARCHAR(100)         null,
   constraint PK_GOOGLEANALYTICS primary key (gaid)
);

/*==============================================================*/
/* Table: googleanalyticsbasket                                 */
/*==============================================================*/
create table warehouse.googleanalyticsbasket (
   gaid                 SERIAL not null,
   eshopid              INT8                 not null,
   gaquery              VARCHAR(50)          not null,
   datechanged          timestamptz          not null,
   source               VARCHAR(1000)        null,
   medium               VARCHAR(1000)        null,
   campaign             VARCHAR(1000)        null,
   pagepath             VARCHAR(1000)        null,
   type                 VARCHAR(1000)        null,
   pageviews            int                  null,
   uniquepageviews      int                  null,
   browser              VARCHAR(100)         null,
   browserversion       VARCHAR(50)          null,
   operatingsystem      VARCHAR(100)         null,
   operatingsystemversion VARCHAR(50)          null,
   constraint PK_GOOGLEANALYTICSBASKET primary key (gaid)
);

/*==============================================================*/
/* Table: haddress                                              */
/*==============================================================*/
create table warehouse.haddress (
   addressid            INT8                 not null,
   customerid           INT8                 not null,
   originalid           VARCHAR(100)         not null,
   addresstype          VARCHAR(10)          not null,
   street               VARCHAR(250)         not null,
   city                 VARCHAR(250)         not null,
   postalcode           VARCHAR(10)          not null,
   country              VARCHAR(200)         not null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_HADDRESS primary key (addressid, validfrom)
);

/*==============================================================*/
/* Table: hcustomer                                             */
/*==============================================================*/
create table warehouse.hcustomer (
   customerid           INT8                 not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 null,
   firstname            VARCHAR(100)         null,
   lastname             VARCHAR(100)         null,
   email                VARCHAR(100)         null,
   gender               CHAR(1)              null,
   birthday             DATE                 null,
   flaganonymous        INT                  not null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_HCUSTOMER primary key (customerid, validfrom)
);

/*==============================================================*/
/* Table: heshopsettings                                        */
/*==============================================================*/
create table warehouse.heshopsettings (
   settingsid           SERIAL not null,
   eshopid              INT8                 not null,
   datarefreshperiod    VARCHAR(50)          not null,
   datestart            TIMESTAMPTZ          not null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_HESHOPSETTINGS primary key (settingsid, validfrom)
);

/*==============================================================*/
/* Table: heureka                                               */
/*==============================================================*/
create table feed.heureka (
   heurekaid            SERIAL               not null,
   loadid               INT8                 not null,
   eshopid              INT8                 not null,
   item_id              VARCHAR(36)          null,
   productname          VARCHAR(255)         null,
   product              VARCHAR(255)         null,
   description          VARCHAR(2048)        null,
   url                  VARCHAR(2048)        null,
   imgurl               VARCHAR(2048)        null,
   imgurl_alternative   VARCHAR(2048)        null,
   video_url            VARCHAR(2048)        null,
   price_vat            REAL                 null,
   item_type            VARCHAR(50)          null,
   manufacturer         VARCHAR(255)         null,
   categorytext         VARCHAR(255)         null,
   ean                  VARCHAR(13)          null,
   isbn                 VARCHAR(20)          null,
   heureka_cpc          REAL                 null,
   delivery_date        VARCHAR(20)          null,
   itemgroup_id         VARCHAR(36)          null,
   dues                 REAL                 null,
   uri                  VARCHAR(2048)        null,
   loadlogid            INT8                 null,
   constraint PK_HEUREKA primary key (heurekaid)
);

/*==============================================================*/
/* Table: heurekaaccessory                                      */
/*==============================================================*/
create table feed.heurekaaccessory (
   accessoryid          SERIAL               not null,
   heurekaid            INT8                 not null,
   loadid               INT8                 not null,
   accessory            varchar(36)          not null,
   loadlogid            INT8                 null,
   constraint PK_HEUREKAACCESSORY primary key (accessoryid)
);

/*==============================================================*/
/* Table: heurekadelivery                                       */
/*==============================================================*/
create table feed.heurekadelivery (
   heurekadeliveryid    SERIAL               not null,
   heurekaid            INT8                 not null,
   loadid               INT8                 not null,
   item_id              VARCHAR(36)          not null,
   deliveryid           VARCHAR(50)          not null,
   deliveryprice        REAL                 null,
   deliverypricecod     REAL                 null,
   loadlogid            INT8                 null,
   constraint PK_HEUREKADELIVERY primary key (heurekadeliveryid)
);

/*==============================================================*/
/* Table: heurekaparam                                          */
/*==============================================================*/
create table feed.heurekaparam (
   paramid              SERIAL               not null,
   heurekaid            INT8                 not null,
   loadid               INT8                 not null,
   item_id              VARCHAR(36)          not null,
   paramname            VARCHAR(50)          null,
   value                VARCHAR(50)          null,
   loadlogid            INT8                 null,
   constraint PK_HEUREKAPARAM primary key (paramid)
);

/*==============================================================*/
/* Table: hproduct                                              */
/*==============================================================*/
create table warehouse.hproduct (
   productid            INT8                 not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   productname          VARCHAR(100)         null,
   baseprice            REAL                 null,
   url                  VARCHAR(1000)        null,
   vat                  REAL                 not null,
   flaginshop           BOOL                 not null,
   inshopfrom           timestamptz          null,
   useinmatrices        BOOL                 not null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_HPRODUCT primary key (productid, validfrom),
   constraint AK_KEY_2_HPRODUCT unique (originalid, eshopid)
);

/*==============================================================*/
/* Table: hproductspecialprice                                  */
/*==============================================================*/
create table warehouse.hproductspecialprice (
   pspid                INT8                 not null,
   eshopid              INT8                 not null,
   skuid                INT8                 null,
   productid            INT8                 null,
   customerid           INT8                 null,
   segmentid            INT8                 null,
   productcategoryid    INT8                 null,
   baseprice            REAL                 null,
   saleprice            REAL                 null,
   percentsale          REAL                 not null,
   type                 INT8                 not null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null
);

/*==============================================================*/
/* Table: hstockkeepingunit                                     */
/*==============================================================*/
create table warehouse.hstockkeepingunit (
   skuid                INT8                 not null,
   eshopid              INT8                 null,
   originalid           VARCHAR(100)         not null,
   productid            INT8                 null,
   unitcount            INT                  null,
   ean                  VARCHAR(200)         null,
   purchaseprice        Real                 null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_HSTOCKKEEPINGUNIT primary key (skuid, validfrom)
);

/*==============================================================*/
/* Table: loadcontrol                                           */
/*==============================================================*/
create table feed.loadcontrol (
   loadcontrolid        SERIAL not null,
   eshopid              INT8                 not null,
   feedtypeid           INT4                 null,
   feedcode             VARCHAR(25)          not null,
   feedurl              VARCHAR(1000)        not null,
   querytype            TEXT                 null,
   loadperiod           VARCHAR(50)          not null,
   startdate            DATE                 not null,
   validfrom            TIMESTAMPTZ          not null,
   validto              TIMESTAMPTZ          not null,
   constraint PK_LOADCONTROL primary key (loadcontrolid)
);

/*==============================================================*/
/* Table: loadlog                                               */
/*==============================================================*/
create table warehouse.loadlog (
   loadid               BIGSERIAL            not null,
   eshopid              INT8                 not null,
   period               Timestamptz          not null,
   checklistprocessedat Timestamptz          null,
   constraint PK_LOADLOG primary key (loadid)
);

/*==============================================================*/
/* Table: masterproduct                                         */
/*==============================================================*/
create table feed.masterproduct (
   masterproductid      SERIAL not null,
   heurekaid            INT4                 null,
   sitemapid            INT4                 null,
   zboziid              INT4                 null,
   priceapiid           INT4                 null,
   eshopid              INT8                 null,
   revenuesid           INT4                 null,
   turnoutid            INT4                 null,
   createdat            TIMESTAMPTZ          not null,
   uri                  VARCHAR(2048)        not null,
   productname          VARCHAR(255)         null,
   ean                  VARCHAR(13)          null,
   productid            INT4                 null,
   constraint PK_MASTERPRODUCT primary key (masterproductid),
   CONSTRAINT "masterproduct_productid" UNIQUE ("productid"),
   CONSTRAINT "masterproduct_heurekaid" UNIQUE ("heurekaid"),
   CONSTRAINT "masterproduct_sitemapid" UNIQUE ("sitemapid"),
   CONSTRAINT "masterproduct_zboziid" UNIQUE ("zboziid"),
   CONSTRAINT "masterproduct_priceapiid" UNIQUE ("priceapiid"),
   CONSTRAINT "masterproduct_revenuesid" UNIQUE ("revenuesid"),
   CONSTRAINT "masterproduct_turnoutid" UNIQUE ("turnoutid"),
   CONSTRAINT "masterproduct_eshopid_uri" UNIQUE ("eshopid", "uri")
);

/*==============================================================*/
/* Table: eshopfeedsettings                                     */
/*==============================================================*/
create table feed.eshopfeedsettings (
   id                   SERIAL not null,
   eshopid              INT8                 null,
   paramwhitelist       text[]               null,
   hashparamwhitelist   text[]               null,
   dontcleanparams      boolean              null,
   dontcleanhashparams  boolean              null,
   validfrom            timestamptz          not null,
   validto              timestamptz          not null,
   constraint PK_ESHOPFEEDSETTINGS primary key (id)
);

/*==============================================================*/
/* Table: matrix                                                */
/*==============================================================*/
create table analytical.matrix (
   matrixid             SERIAL not null,
   eshopid              INT8                 null,
   matrixtype           VARCHAR(10)          not null,
   productid            INT8                 null,
   customerid           INT8                 null,
   channelid            INT8                 null,
   orderid              INT8                 null,
   productcategoryid    INT8                 null,
   loadid               INT8                 not null,
   scoreabs             REAL                 not null,
   scorerel             REAL                 not null,
   scorewei             REAL                 not null,
   changeabs            REAL                 not null,
   changerel            REAL                 not null,
   changewei            REAL                 not null,
   prediction           REAL                 null,
   quadrant             INT                  null,
   quadrantrel          INT                  null,
   datevalid            timestamptz          not null,
   inputvaluex          REAL                 null,
   inputvaluey          REAL                 null,
   changevaluex         REAL                 null,
   changevaluey         REAL                 null,
   tan                  REAL                 null,
   changetan            REAL                 null,
   constraint PK_MATRIX primary key (matrixid),
   CONSTRAINT "inmatrixkeys" UNIQUE ("eshopid", "matrixtype", "productid", "customerid", "channelid", "orderid", "productcategoryid", "loadid"),
   CONSTRAINT "matrix_eshopid_matrixtype_loadid_productid" UNIQUE ("eshopid", "matrixtype", "loadid", "productid"),
   CONSTRAINT "matrix_eshopid_matrixtype_loadid_customerid" UNIQUE ("eshopid", "matrixtype", "loadid", "customerid"),
   CONSTRAINT "matrix_eshopid_matrixtype_loadid_channelid" UNIQUE ("eshopid", "matrixtype", "loadid", "channelid"),
   CONSTRAINT "matrix_eshopid_matrixtype_loadid_orderid" UNIQUE ("eshopid", "matrixtype", "loadid", "orderid"),
   CONSTRAINT "matrix_eshopid_matrixtype_productid_productcategoryid" UNIQUE ("eshopid", "matrixtype", "productid", "productcategoryid")
);

CREATE INDEX "matrix_eshopid" ON analytical."matrix" ("eshopid");
CREATE INDEX "matrix_productid" ON analytical."matrix" ("productid");
CREATE INDEX "matrix_customerid" ON analytical."matrix" ("customerid");
CREATE INDEX "matrix_channelid" ON analytical."matrix" ("channelid");
CREATE INDEX "matrix_orderid" ON analytical."matrix" ("orderid");
CREATE INDEX "matrix_productcategoryid" ON analytical."matrix" ("productcategoryid");
CREATE INDEX "matrix_loadid" ON analytical."matrix" ("loadid");
CREATE INDEX "matrix_eshopid_productid_customerid_channelid_orderid_productcategoryid_loadid" ON analytical."matrix" ("eshopid", "productid", "customerid", "channelid", "orderid", "productcategoryid", "loadid");

/*==============================================================*/
/* Index: inmatrixtype                                          */
/*==============================================================*/
create  index inmatrixtype on analytical.matrix (
matrixtype
);

/*==============================================================*/
/* Table: "order"                                               */
/*==============================================================*/
create table warehouse."order" (
   orderid              SERIAL not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   basketid             INT8                 not null,
   billingaddressid     INT8                 null,
   shippingaddressid    INT8                 null,
   orderplaceddatetime  timestamptz          not null,
   totalproductnumber   INT                  not null,
   flagordercompleted   INT                  not null,
   ordercompleteddatetime timestamptz          not null,
   flagfreeshipping     INT                  not null,
   shipmenttype         CHAR(5)              not null,
   shipmentprice        REAL                 not null,
   totalprice           REAL                 not null,
   totalsale            REAL                 not null,
   paymenttype          CHAR(5)              null,
   datechanged          timestamptz          not null,
   constraint PK_ORDER primary key (orderid),
   constraint AK_KEY_2_ORDER unique (originalid, eshopid)
);

/*==============================================================*/
/* Index: inorderkeys                                           */
/*==============================================================*/
create  index inorderkeys on warehouse."order" (
orderid,
originalid,
eshopid,
basketid,
datechanged
);

/*==============================================================*/
/* Table: orderdiscountrelation                                 */
/*==============================================================*/
create table warehouse.orderdiscountrelation (
   orderid              INT8                 not null,
   discountid           INT8                 not null,
   count                INT                  null,
   constraint PK_ORDERDISCOUNTRELATION primary key (discountid, orderid)
);

/*==============================================================*/
/* Table: priceapi                                              */
/*==============================================================*/
create table feed.priceapi (
   priceapiid           SERIAL               not null,
   loadid               INT8                 not null,
   eshopid              INT8                 not null,
   priceapijobid        INT8                 null,
   job_id               VARCHAR(50)          not null,
   source               VARCHAR(50)          null,
   country              VARCHAR(50)          null,
   key                  VARCHAR(50)          null,
   value                VARCHAR(50)          null,
   has_offers           boolean              null,
   updated              TIMESTAMPTZ          null,
   id                   VARCHAR(50)          null,
   name                 VARCHAR(255)         null,
   brandname            VARCHAR(255)         null,
   categoryname         VARCHAR(255)         null,
   reviewcount          INT8                 null,
   reviewrating         INT8                 null,
   url                  VARCHAR(2048)        null,
   image_url            VARCHAR(2048)        null,
   description          text                 null,
   loadlogid            INT8                 null,
   constraint PK_PRICEAPI primary key (priceapiid)
);

/*==============================================================*/
/* Table: priceapigtin                                          */
/*==============================================================*/
create table feed.priceapigtin (
   gtinid               SERIAL               not null,
   priceapiid           INT8                 null,
   gtin                 VARCHAR(14)          not null,
   constraint PK_PRICEAPIGTIN primary key (gtinid)
);

/*==============================================================*/
/* Table: priceapijob                                           */
/*==============================================================*/
create table feed.priceapijob (
   priceapijobid        serial               not null,
   eshopid              INT8                 not null,
   loadid               INT8                 not null,
   job_id               VARCHAR(30)          not null,
   loadlogid            INT8                 null,
   constraint PK_PRICEAPIJOB primary key (priceapijobid)
);

/*==============================================================*/
/* Table: priceapioffer                                         */
/*==============================================================*/
create table feed.priceapioffer (
   offerid              SERIAL               not null,
   priceapiid           INT8                 null,
   shopid               VARCHAR(500)         null,
   shopname             VARCHAR(500)         null,
   shopurl              VARCHAR(1024)        null,
   price                REAL                 null,
   pricewithshipping    REAL                 null,
   shippingcosts        REAL                 null,
   currency             VARCHAR(10)          null,
   details              text                 null,
   url                  VARCHAR(2048)        null,
   constraint PK_PRICEAPIOFFER primary key (offerid)
);

/*==============================================================*/
/* Table: product                                               */
/*==============================================================*/
create table warehouse.product (
   productid            SERIAL not null,
   originalid           VARCHAR(100)         null,
   eshopid              INT8                 not null,
   productname          VARCHAR(2048)        null,
   baseprice            REAL                 not null,
   uri                  VARCHAR(1000)        null,
   vat                  REAL                 not null,
   datecreated          timestamptz          null,
   datechanged          timestamptz          not null,
   flaginshop           BOOL                 not null,
   inshopfrom           timestamptz          null,
   useinmatrices        BOOL                 not null,
   imageurl             VARCHAR(2048)        null,
   constraint PK_PRODUCT primary key (productid),
   constraint AK_KEY_2_PRODUCT unique (originalid, eshopid)
);

/*==============================================================*/
/* Index: inproductkeys                                         */
/*==============================================================*/
create  index inproductkeys on warehouse.product (
productid,
originalid,
eshopid,
datechanged
);

/*==============================================================*/
/* Table: productcategory                                       */
/*==============================================================*/
create table warehouse.productcategory (
   productcategoryid    SERIAL not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 not null,
   parentcategory       INT8                 null,
   categoryname         VARCHAR(100)         not null,
   datecreated          TimeStampTz          null,
   constraint PK_PRODUCTCATEGORY primary key (productcategoryid),
   constraint AK_KEY_2_PRODUCTC unique (originalid, eshopid)
);

/*==============================================================*/
/* Table: productcategoryrelation                               */
/*==============================================================*/
create table warehouse.productcategoryrelation (
   productid            INT8                 not null,
   productcategoryid    INT8                 not null,
   constraint PK_PRODUCTCATEGORYRELATION primary key (productid, productcategoryid)
);

/*==============================================================*/
/* Table: productfeed                                           */
/*==============================================================*/
create table warehouse.productfeed (
   productfeedid        SERIAL not null,
   constraint PK_PRODUCTFEED primary key (productfeedid)
);

/*==============================================================*/
/* Table: productpreference                                     */
/*==============================================================*/
create table feed.productpreference (
   preferenceid         SERIAL not null,
   eshopid              INT8                 null,
   ean                  varchar(13)          null,
   uri                  varchar(2048)        null,
   getprice             boolean              null,
   importancelevel      int                  null,
   created              timestamptz          null,
   valid_from           timestamptz          null,
   valid_to             timestamptz          null,
   constraint PK_PRODUCTPREFERENCE primary key (preferenceid)
);

/*==============================================================*/
/* Table: productspecialprice                                   */
/*==============================================================*/
create table warehouse.productspecialprice (
   pspid                SERIAL not null,
   eshopid              INT8                 not null,
   skuid                INT8                 null,
   productid            INT8                 null,
   customerid           INT8                 null,
   segmentid            INT8                 null,
   productcategoryid    INT8                 null,
   baseprice            REAL                 not null,
   saleprice            REAL                 null,
   percentsale          REAL                 null,
   type                 INT8                 not null,
   datechanged          timestamptz          not null,
   constraint PK_PRODUCTSPECIALPRICE primary key (pspid)
);

/*==============================================================*/
/* Index: inproductspecialpricekeys                             */
/*==============================================================*/
create  index inproductspecialpricekeys on warehouse.productspecialprice (
pspid,
eshopid,
skuid,
productid,
customerid,
segmentid,
productcategoryid,
datechanged
);

/*==============================================================*/
/* Table: segment                                               */
/*==============================================================*/
create table warehouse.segment (
   segmentid            SERIAL not null,
   originalid           VARCHAR(100)         not null,
   eshopid              INT8                 null,
   priority             INT8                 not null,
   constraint PK_SEGMENT primary key (segmentid)
);

/*==============================================================*/
/* Table: signal                                                */
/*==============================================================*/
create table analytical.signal (
   signalid             SERIAL not null,
   matrixid             INT8                 not null,
   datecreated          timestamptz          not null,
   situationid          INT8                 null,
   constraint PK_SIGNAL primary key (signalid),
   CONSTRAINT "signal_matrixid" UNIQUE ("matrixid")
);

CREATE INDEX "signal_situationid" ON analytical."signal" ("situationid");

/*==============================================================*/
/* Table: sitemap                                               */
/*==============================================================*/
create table feed.sitemap (
   sitemapid            SERIAL               not null,
   eshopid              INT8                 not null,
   loadid               INT8                 not null,
   loc                  VARCHAR(2048)        null,
   lastmod              TIMESTAMPTZ          null,
   changefreq           VARCHAR(20)          null,
   priority             REAL                 null,
   uri                  VARCHAR(2048)        null,
   loadlogid            INT8                 null,
   constraint PK_SITEMAP primary key (sitemapid)
);

/*==============================================================*/
/* Table: situation                                             */
/*==============================================================*/
create table analytical.situation (
   situationid          SERIAL not null,
   eshopid              INT8                 null,
   productid            INT8                 null,
   customerid           INT8                 null,
   channelid            INT8                 null,
   orderid              INT8                 null,
   productcategoryid    INT8                 null,
   loadid               INT8                 not null,
   datecreated          timestamptz          not null,
   datesuggestionresultcreated timestamptz          null,
   datesuggestionresultprocessed timestamptz          null,
   datechecklistcreated timestamptz          null,
   datechecklistprocessed timestamptz          null,
   constraint PK_SITUATION primary key (situationid),
   CONSTRAINT "situation_eshopid_productid_customerid_channelid_orderid_productcategoryid_loadid" UNIQUE ("eshopid", "productid", "customerid", "channelid", "orderid", "productcategoryid", "loadid"),
   CONSTRAINT "situation_eshopid_loadid_productid" UNIQUE ("eshopid", "loadid", "productid"),
   CONSTRAINT "situation_eshopid_loadid_customerid" UNIQUE ("eshopid", "loadid", "customerid"),
   CONSTRAINT "situation_eshopid_loadid_channelid" UNIQUE ("eshopid", "loadid", "channelid"),
   CONSTRAINT "situation_eshopid_loadid_orderid" UNIQUE ("eshopid", "loadid", "orderid"),
   CONSTRAINT "situation_eshopid_productid_productcategoryid" UNIQUE ("eshopid", "productid", "productcategoryid")
);

CREATE INDEX "situation_eshopid" ON analytical."situation" ("eshopid");
CREATE INDEX "situation_productid" ON analytical."situation" ("productid");
CREATE INDEX "situation_customerid" ON analytical."situation" ("customerid");
CREATE INDEX "situation_channelid" ON analytical."situation" ("channelid");
CREATE INDEX "situation_orderid" ON analytical."situation" ("orderid");
CREATE INDEX "situation_productcategoryid" ON analytical."situation" ("productcategoryid");
CREATE INDEX "situation_loadid" ON analytical."situation" ("loadid");

/*==============================================================*/
/* Table: stockkeepingunit                                      */
/*==============================================================*/
create table warehouse.stockkeepingunit (
   skuid                SERIAL not null,
   originalid           VARCHAR(100)         not null,
   productid            INT8                 null,
   eshopid              INT8                 null,
   unitcount            INT                  null,
   ean                  VARCHAR(200)         null,
   purchaseprice        Real                 null,
   datechanged          timestamptz          not null,
   constraint PK_STOCKKEEPINGUNIT primary key (skuid)
);

/*==============================================================*/
/* Index: instockkeepingunitkeys                                */
/*==============================================================*/
create  index instockkeepingunitkeys on warehouse.stockkeepingunit (
skuid,
originalid,
productid,
eshopid,
datechanged
);

/*==============================================================*/
/* Table: valuefailure                                          */
/*==============================================================*/
create table feed.valuefailure (
   valuefailureid       SERIAL not null,
   loadid               INT8                 not null,
   feedcolumnid         INT8                 not null,
   eshopid              INT8                 not null,
   zboziid              INT4                 null,
   heurekaid            INT4                 null,
   sitemapid            INT4                 null,
   paramid              INT4                 null,
   heurekadeliveryid    INT4                 null,
   accessoryid          INT4                 null,
   variantid            INT4                 null,
   formervalue          text                 not null,
   lengthfailedat       timestamptz          null,
   datatypefailedat     timestamptz          null,
   loadlogid            INT8                 null,
   constraint PK_VALUEFAILURE primary key (valuefailureid)
);

/*==============================================================*/
/* Table: zbozi                                                 */
/*==============================================================*/
create table feed.zbozi (
   zboziid              SERIAL               not null,
   loadid               INT8                 not null,
   eshopid              INT8                 null,
   product              VARCHAR(255)         null,
   productname          VARCHAR(255)         null,
   description          VARCHAR(2048)        null,
   url                  VARCHAR(2048)        null,
   imgurl               VARCHAR(2048)        null,
   price                REAL                 null,
   vat                  REAL                 null,
   price_vat            REAL                 null,
   max_cpc              REAL                 null,
   max_cpc_search       REAL                 null,
   dues                 REAL                 null,
   delivery_date        VARCHAR(50)          null,
   shop_depots          VARCHAR(50)          null,
   unfeatured           Boolean              null,
   item_type            VARCHAR(50)          null,
   extra_message        VARCHAR(50)          null,
   manufacturer         VARCHAR(255)         null,
   categorytext         VARCHAR(255)         null,
   ean                  VARCHAR(13)          null,
   productno            VARCHAR(50)          null,
   productnameext       VARCHAR(255)         null,
   uri                  VARCHAR(2048)        null,
   loadlogid            INT8                 null,
   constraint PK_ZBOZI primary key (zboziid)
);

/*==============================================================*/
/* Table: zbozi_variant                                         */
/*==============================================================*/
create table feed.zbozi_variant (
   variantid            SERIAL               not null,
   loadid               INT8                 not null,
   zboziid              INT8                 not null,
   variantzboziid       INT8                 not null,
   loadlogid            INT8                 null,
   constraint PK_ZBOZI_VARIANT primary key (variantid)
);

CREATE TABLE feed.heurekacategories
(
  id bigint,
  parent_id bigint,
  cat_name character varying(1000),
  cat_full_name character varying(1000)
);

alter table warehouse.address
   add constraint FK_ADDRESS_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.address
   add constraint FK_ADDRESS_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.atributessku
   add constraint FK_ATRIBUTE_REFERENCE_STOCKKEE foreign key (skuid)
      references  warehouse.stockkeepingunit (skuid)
      on delete restrict on update restrict;

alter table warehouse.atributessku
   add constraint FK_ATRIBUTE_REFERENCE_ATTRIBUT foreign key (attributeid)
      references  warehouse.attribute (attributeid)
      on delete restrict on update restrict;

alter table warehouse.attribute
   add constraint FK_ATTRIBUT_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.basket
   add constraint FK_BASKET_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.basket
   add constraint FK_BASKET_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.basketproduct
   add constraint FK_BASKETPR_REFERENCE_CDISCOUN foreign key (productvoucherid)
      references  warehouse.cdiscount (discountid);

alter table warehouse.basketproduct
   add constraint FK_BASKETPR_REFERENCE_BASKET foreign key (basketid)
      references  warehouse.basket (basketid)
      on delete restrict on update restrict;

alter table warehouse.basketproduct
   add constraint FK_BASKETPR_REFERENCE_STOCKKEE foreign key (skuid)
      references  warehouse.stockkeepingunit (skuid)
      on delete restrict on update restrict;

alter table warehouse.basketproduct
   add constraint FK_BASKETPR_REFERENCE_PRODUCT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table warehouse.basketproduct
   add constraint FK_BASKETPR_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.basketproductdiscountrel
   add constraint FK_BASKETPR_REFERENCE_BASKETPR foreign key (skuid, basketid)
      references  warehouse.basketproduct (skuid, basketid)
      on delete restrict on update restrict;

alter table warehouse.basketproductdiscountrel
   add constraint FK_BASKETPR_REFERENCE_CDISCOUN foreign key (discountid)
      references  warehouse.cdiscount (discountid)
      on delete restrict on update restrict;

alter table warehouse.cdiscount
   add constraint FK_CDISCOUN_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.channel
   add constraint FK_CHANNEL_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.customer
   add constraint FK_CUSTOMER_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.customerpurchase
   add constraint FK_CUSTOMER_REFERENCE_CUSTOMER2 foreign key (customerid)
      references  warehouse.customer (customerid);

alter table warehouse.customersegment
   add constraint FK_CUSTOMER_REFERENCE_SEGMENT foreign key (segmentid)
      references  warehouse.segment (segmentid)
      on delete restrict on update restrict;

alter table warehouse.customersegment
   add constraint FK_CUSTOMER_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.customersegment
   add constraint FK_CUSTOMER_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.eshop
   add constraint FK_ESHOP_REFERENCE_CCOUNTRY foreign key (countryidiso)
      references  warehouse.ccountry (countryidiso);

alter table warehouse.eshop
   add constraint FK_ESHOP_REFERENCE_COMPANY foreign key (companyid)
      references  warehouse.company (companyid)
      on delete restrict on update restrict;

alter table warehouse.eshopcurrency
   add constraint FK_ESHOPCUR_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.eshopcurrency
   add constraint FK_ESHOPCUR_REFERENCE_CCURRENC foreign key (currencycode)
      references  warehouse.ccurrency (currencycode);

alter table warehouse.eshoplocalization
   add constraint FK_ESHOPLOC_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.eshoplocalization
   add constraint FK_ESHOPLOC_REFERENCE_CLANGUAG foreign key (languageidiso)
      references  warehouse.clanguage (languageidiso);

alter table warehouse.eshopsettings
   add constraint FK_ESHOPSET_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.feedload
   add constraint FK_FEEDLOAD_REFERENCE_FEEDTYPE foreign key (feedtypeid)
      references  feed.feedtype (feedtypeid)
      on delete restrict on update restrict;

alter table feed.feedload
   add constraint FK_FEEDLOAD_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.ga_pageview
   add constraint FK_GA_PAGEV_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.ga_pageview
   add constraint FK_GA_PAGEV_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.ga_revenue
   add constraint FK_GA_REVEN_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.ga_revenue
   add constraint FK_GA_REVEN_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.googleanalytics
   add constraint FK_GOOGLEAN_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.googleanalyticsbasket
   add constraint FK_GOOGLEAN_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.haddress
   add constraint FK_HADDRESS_REFERENCE_ADDRESS foreign key (addressid)
      references  warehouse.address (addressid)
      on delete restrict on update restrict;

alter table warehouse.haddress
   add constraint FK_HADDRESS_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.hcustomer
   add constraint FK_HCUSTOME_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.hcustomer
   add constraint FK_HCUSTOME_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.heureka
   add constraint FK_HEUREKA_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.heureka
   add constraint FK_HEUREKA_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.heurekaaccessory
   add constraint FK_HEUREKAA_REFERENCE_HEUREKA foreign key (heurekaid)
      references  feed.heureka (heurekaid)
      on delete restrict on update restrict;

alter table feed.heurekaaccessory
   add constraint FK_HEUREKAA_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.heurekadelivery
   add constraint FK_HEUREKAD_REFERENCE_HEUREKA foreign key (heurekaid)
      references  feed.heureka (heurekaid)
      on delete restrict on update restrict;

alter table feed.heurekadelivery
   add constraint FK_HEUREKAD_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.heurekaparam
   add constraint FK_HEUREKAP_REFERENCE_HEUREKA foreign key (heurekaid)
      references  feed.heureka (heurekaid)
      on delete restrict on update restrict;

alter table feed.heurekaparam
   add constraint FK_HEUREKAP_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.loadcontrol
   add constraint FK_LOADCONT_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.loadcontrol
   add constraint FK_LOADCONT_REFERENCE_FEEDTYPE foreign key (feedtypeid)
      references  feed.feedtype (feedtypeid)
      on delete restrict on update restrict;

alter table warehouse.loadlog
   add constraint FK_LOADLOG_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_HEUREKA foreign key (heurekaid)
      references  feed.heureka (heurekaid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_SITEMAP foreign key (sitemapid)
      references  feed.sitemap (sitemapid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_ZBOZI foreign key (zboziid)
      references  feed.zbozi (zboziid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_PRICEAPI foreign key (priceapiid)
      references  feed.priceapi (priceapiid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_GA_REVEN foreign key (revenuesid)
      references  feed.ga_revenue (revenuesid)
      on delete SET NULL on update SET NULL;

alter table feed.masterproduct
   add constraint FK_MASTERPR_REFERENCE_GA_PAGEV foreign key (turnoutid)
      references  feed.ga_pageview (turnoutid)
      on delete SET NULL on update SET NULL;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_PRODUCT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_CHANNEL foreign key (channelid, eshopid)
      references  warehouse.channel (channelid, eshopid)
      on delete restrict on update restrict;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_ORDER foreign key (orderid)
      references  warehouse."order" (orderid)
      on delete restrict on update restrict;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_CMATRIX foreign key (matrixtype)
      references  analytical.cmatrix (matrixtype)
      on delete restrict on update restrict;

alter table analytical.matrix
   add constraint FK_MATRIX_REFERENCE_PRODUCTC foreign key (productcategoryid)
      references  warehouse.productcategory (productcategoryid)
      on delete restrict on update restrict;

alter table warehouse."order"
   add constraint FK_ORDER_REFERENCE_ADDRESS foreign key (billingaddressid)
      references  warehouse.address (addressid)
      on delete restrict on update restrict;

alter table warehouse."order"
   add constraint FK_ORDER_REFERENCE_CSHIPMEN foreign key (shipmenttype)
      references  warehouse.cshipment (shipmenttype)
      on delete restrict on update restrict;

alter table warehouse."order"
   add constraint FK_ORDER_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse."order"
   add constraint FK_ORDER_REFERENCE_ADDRESS2 foreign key (shippingaddressid)
      references  warehouse.address (addressid);

alter table warehouse."order"
   add constraint FK_ORDER_REFERENCE_BASKET foreign key (basketid)
      references  warehouse.basket (basketid)
      on delete restrict on update restrict;

alter table warehouse.orderdiscountrelation
   add constraint FK_ORDERDIS_REFERENCE_CDISCOUN foreign key (discountid)
      references  warehouse.cdiscount (discountid);

alter table warehouse.orderdiscountrelation
   add constraint FK_ORDERDIS_REFERENCE_ORDER foreign key (orderid)
      references  warehouse."order" (orderid);

alter table feed.priceapi
   add constraint FK_PRICEAPI_REFERENCE_PRICEAPI foreign key (priceapijobid)
      references  feed.priceapijob (priceapijobid)
      on delete restrict on update restrict;

alter table feed.priceapi
   add constraint FK_PRICEAPI_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.priceapi
   add constraint FK_PRICEAPI_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.priceapigtin
   add constraint FK_PRICEAPI_REFERENCE_PRICEAPI foreign key (priceapiid)
      references  feed.priceapi (priceapiid)
      on delete restrict on update restrict;

alter table feed.priceapijob
   add constraint FK_PRICEAPI_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.priceapijob
   add constraint FK_PRICEAPI_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.priceapioffer
   add constraint FK_PRICEAPI_REFERENCE_PRICEAPI foreign key (priceapiid)
      references  feed.priceapi (priceapiid)
      on delete restrict on update restrict;

alter table warehouse.product
   add constraint FK_PRODUCT_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.productcategory
   add constraint FK_PRODUCTC_REFERENCE_PRODUCTC foreign key (parentcategory)
      references  warehouse.productcategory (productcategoryid);

alter table warehouse.productcategory
   add constraint FK_PRODUCTC_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid);

alter table warehouse.productcategoryrelation
   add constraint FK_PRODUCT_CAT_REF_PROD_REL foreign key (productcategoryid)
      references  warehouse.productcategory (productcategoryid)
      on delete restrict on update restrict;

alter table warehouse.productcategoryrelation
   add constraint FK_PRODUCT_REF_PROD_CAT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table feed.productpreference
   add constraint FK_PRODUCTP_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_STOCKKEE foreign key (skuid)
      references  warehouse.stockkeepingunit (skuid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_PRODUCT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_SEGMENT foreign key (segmentid)
      references  warehouse.segment (segmentid)
      on delete restrict on update restrict;

alter table warehouse.productspecialprice
   add constraint FK_PRODUCTS_REFERENCE_PRODUCTC foreign key (productcategoryid)
      references  warehouse.productcategory (productcategoryid)
      on delete restrict on update restrict;

alter table warehouse.segment
   add constraint FK_SEGMENT_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table analytical.signal
   add constraint FK_SIGNAL_REFERENCE_MATRIX foreign key (matrixid)
      references  analytical.matrix (matrixid)
      on delete restrict on update restrict;

alter table analytical.signal
   add constraint FK_SIGNAL_REFERENCE_SITUATIO foreign key (situationid)
      references  analytical.situation (situationid)
      ON DELETE SET NULL ON UPDATE SET NULL;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_PRODUCTC foreign key (productcategoryid)
      references  warehouse.productcategory (productcategoryid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_CUSTOMER foreign key (customerid)
      references  warehouse.customer (customerid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_PRODUCT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_ORDER foreign key (orderid)
      references  warehouse."order" (orderid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_CHANNEL foreign key (channelid, eshopid)
      references  warehouse.channel (channelid, eshopid)
      on delete restrict on update restrict;

alter table analytical.situation
   add constraint FK_SITUATIO_REFERENCE_LOADLOG foreign key (loadid)
      references  warehouse.loadlog (loadid)
      on delete restrict on update restrict;

alter table feed.sitemap
   add constraint FK_SITEMAP_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.sitemap
   add constraint FK_SITEMAP_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table warehouse.stockkeepingunit
   add constraint FK_STOCKKEE_REFERENCE_PRODUCT foreign key (productid)
      references  warehouse.product (productid)
      on delete restrict on update restrict;

alter table warehouse.stockkeepingunit
   add constraint FK_STOCKKEE_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_FEEDCOLU foreign key (feedcolumnid)
      references  feed.feedcolumn (feedcolumnid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_ZBOZI foreign key (zboziid)
      references  feed.zbozi (zboziid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_HEUREKA foreign key (heurekaid)
      references  feed.heureka (heurekaid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_SITEMAP foreign key (sitemapid)
      references  feed.sitemap (sitemapid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_HEUREKAP foreign key (paramid)
      references  feed.heurekaparam (paramid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_HEUREKAD foreign key (heurekadeliveryid)
      references  feed.heurekadelivery (heurekadeliveryid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_HEUREKAA foreign key (accessoryid)
      references  feed.heurekaaccessory (accessoryid)
      on delete restrict on update restrict;

alter table feed.valuefailure
   add constraint FK_VALUEFAI_REFERENCE_ZBOZI_VA foreign key (variantid)
      references  feed.zbozi_variant (variantid)
      on delete restrict on update restrict;

alter table feed.zbozi
   add constraint FK_ZBOZI_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

alter table feed.zbozi
   add constraint FK_ZBOZI_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.zbozi_variant
   add constraint FK_ZBOZI_VA_REFERENCE_ZBOZI foreign key (zboziid)
      references  feed.zbozi (zboziid)
      on delete restrict on update restrict;

alter table feed.zbozi_variant
   add constraint FK_ZBOZI_VA_REFERENCE_ZBOZI2 foreign key (variantzboziid)
      references  feed.zbozi (zboziid)
      on delete restrict on update restrict;

alter table feed.zbozi_variant
   add constraint FK_ZBOZI_VA_REFERENCE_FEEDLOAD foreign key (loadid)
      references  feed.feedload (loadid)
      on delete restrict on update restrict;

alter table feed.eshopfeedsettings
   add constraint FK_ESHOPFEE_REFERENCE_ESHOP foreign key (eshopid)
      references  warehouse.eshop (eshopid)
      on delete restrict on update restrict;

ALTER TABLE analytical.matrix
   ADD FOREIGN KEY ("eshopid") REFERENCES warehouse."eshop" ("eshopid") ON DELETE RESTRICT ON UPDATE RESTRICT,
   ADD FOREIGN KEY ("loadid") REFERENCES warehouse."loadlog" ("loadid") ON DELETE RESTRICT ON UPDATE restrict;

ALTER TABLE analytical."matrix"
   ADD FOREIGN KEY ("eshopid", "productid", "customerid", "channelid", "orderid", "productcategoryid", "loadid")
   REFERENCES analytical."situation" ("eshopid", "productid", "customerid", "channelid", "orderid", "productcategoryid", "loadid")
   ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE analytical.signal
   ADD FOREIGN KEY ("situationid") REFERENCES analytical."situation" ("situationid") ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE feed."masterproduct"
   ADD FOREIGN KEY ("productid") REFERENCES warehouse."product" ("productid") ON DELETE RESTRICT ON UPDATE RESTRICT;
