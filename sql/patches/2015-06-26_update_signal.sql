DROP FUNCTION analytical.update_signal();

-- Signal fullfilling
CREATE OR REPLACE FUNCTION analytical.update_signal(
	v_loadlogid BIGINT
)
RETURNS void AS $$
BEGIN
	NOTIFY "analytical.update_signal.start";
	INSERT INTO analytical.signal
	(matrixid, datecreated)
	SELECT matrix.matrixid AS matrixid, now() AS datecreated
	FROM (
		SELECT matrix.matrixid, matrix.matrixtype, matrix.inputvaluex
		FROM analytical.matrix
		WHERE matrix.loadid = v_loadlogid
	) matrix
	JOIN analytical.cmatrix
		ON cmatrix.matrixtype = matrix.matrixtype
	LEFT JOIN analytical.signal
		ON signal.matrixid = matrix.matrixid
	WHERE signal.signalid IS NULL
		AND cmatrix.inputvaluexthreshold IS NOT NULL
		AND matrix.inputvaluex >= cmatrix.inputvaluexthreshold
	;
	NOTIFY "analytical.update_signal.done";
END;
$$ LANGUAGE plpgsql;
