
import Matrix = require('../Entity/Matrix/Matrix');
import SqlExecutor = require('../Util/SqlExecutor');
import SectionEnum = require('../Entity/Section/SectionEnum');

export = MatrixRecorder;
class MatrixRecorder {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Matrix, Matrix.COLUMN_MATRIX_ID, 'id');
	}

	removeByEShopIdAndLoadId(eShopId: number, loadId: number, callback: (e: Error) => void) {
		var sql = 'DELETE FROM ' + Matrix.TABLE_NAME + ' '
			+ ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ';
		this.connection.query(sql, [
			eShopId, loadId
		], (e: Error, result: any) => {
			callback(e);
		});
	}

	insert(matrix: Matrix, callback: (e: Error, matrix?: Matrix) => void) {
		this.connection.query('INSERT INTO ' + Matrix.TABLE_NAME + ' ('
			+ Matrix.COLUMN_MATRIX_ID + ', '
			+ Matrix.COLUMN_E_SHOP_ID + ', '
			+ Matrix.COLUMN_LOAD_ID + ', '
			+ Matrix.COLUMN_SECTION + ', '
			+ Matrix.COLUMN_SCORE_ABSOLUTE + ', '
			+ Matrix.COLUMN_SCORE_RELATIVE + ', '
			+ Matrix.COLUMN_SCORE_WEIGHT + ', '
			+ Matrix.COLUMN_CHANGE_ABSOLUTE + ', '
			+ Matrix.COLUMN_CHANGE_RELATIVE + ', '
			+ Matrix.COLUMN_CHANGE_WEIGHT + ', '
			+ Matrix.COLUMN_PRODUCT_ID + ', '
			+ ')'
			+ ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING ' + Matrix.COLUMN_MATRIX_ID, [
			matrix.Id,
			matrix.EShopId,
			matrix.LoadId,
			SectionEnum[matrix.Section],
			matrix.ScoreAbsolute,
			matrix.ScoreRelative,
			matrix.ScoreWeight,
			matrix.ChangeAbsolute,
			matrix.ChangeRelative,
			matrix.ChangeWeight,
			matrix.ProductId,
		], (e: Error, res: any) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			matrix.Id = res.rows[0][Matrix.COLUMN_MATRIX_ID];
			callback(null, matrix);
		});
	}
}
