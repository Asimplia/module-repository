DROP FUNCTION feed.create_feeduri();
CREATE OR REPLACE FUNCTION feed.create_feeduri(v_loadlogid INT8)
RETURNS void AS $$
BEGIN
	NOTIFY "feed.create_feeduri.start";
	UPDATE feed.sitemap s
	SET uri = public.replace_url(s.loc::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE s.uri IS NULL
	and se.eshopid = s.eshopid
	AND s.loadlogid = v_loadlogid;
	NOTIFY "feed.create_feeduri.tick";

	UPDATE feed.ga_pageview p
	SET uri = public.replace_url(p.pagepath::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE p.uri IS NULL
	and p.eshopid = se.eshopid
	AND p.loadlogid = v_loadlogid;
	NOTIFY "feed.create_feeduri.tick";

	UPDATE feed.heureka h
	SET uri = public.replace_url(h.url::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE h.uri IS NULL
	and h.eshopid = se.eshopid
	AND h.loadlogid = v_loadlogid;
	NOTIFY "feed.create_feeduri.tick";

	UPDATE feed.zbozi z
	SET uri = public.replace_url(z.url::text, se.paramwhitelist, se.hashparamwhitelist, se.dontcleanparams, se.dontcleanhashparams)
	from (Select eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams
        from feed.eshopfeedsettings s
        where 1=1
        and s.validfrom <= now()
        and s.validto > now())
          as se(eshopid, paramwhitelist, hashparamwhitelist, dontcleanparams, dontcleanhashparams)
	WHERE z.uri IS NULL
	and z.eshopid = se.eshopid
	AND z.loadlogid = v_loadlogid;

	NOTIFY "feed.create_feeduri.done";
END;
$$ LANGUAGE plpgsql;
