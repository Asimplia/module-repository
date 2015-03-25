
DEClare
  v_mp_count int4;

  c_lastFeedLoad CURSOR(v_eshopId bigint) is
    SELECT loadid
          ,eshopid
          ,loaddate
          ,feedcode
          ,mproductintegrationprocedure
          ,querytype 
          ,ordering
    FROM feed.v_lastfeedloads 
    WHERE eshopid = v_eshopId
    order by ordering;
  r_lastFeedLoad record;
begin 

  select count(*) into v_mp_count
  from feed.masterproduct mp
  where mp.eshopid = v_eshopId;

  if v_mp_count > 0 then
    delete from feed.masterproduct mp
    where mp.eshopid = v_eshopId;
  end if;
    
  -- Update uri in last feed loads for eshopId
  PERFORM feed.create_feeduri(v_eshopId);

  -- loop through loads and execute feed data matching with master product table
  FOR r_lastFeedLoad IN c_lastFeedLoad(v_eshopId) LOOP
      RAISE NOTICE ' %, %, %', r_lastFeedLoad.mproductintegrationprocedure,r_lastFeedLoad.loadid,r_lastFeedLoad.eshopid;
      --PERFORM r_lastFeedLoad.mproductintegrationprocedure;
      BEGIN 
        EXECUTE 'SELECT ' || r_lastFeedLoad.mproductintegrationprocedure || '(' || r_lastFeedLoad.eshopid || ',' || r_lastFeedLoad.loadid || ')';

        exception when others then 
          raise NOTICE  '% % %', r_lastFeedLoad.mproductintegrationprocedure, r_lastFeedLoad.eshopid, r_lastFeedLoad.loadid; 
          raise NOTICE  '% %', SQLERRM, SQLSTATE;
          PERFORM applog('feed.generatemastertable'::TEXT, SQLERRM, SQLSTATE, v_eshopid::TEXT, r_lastFeedLoad.mproductintegrationprocedure::TEXT, r_lastFeedLoad.eshopid::TEXT, r_lastFeedLoad.loadid::TEXT);
      END;
  END LOOP;

end;
