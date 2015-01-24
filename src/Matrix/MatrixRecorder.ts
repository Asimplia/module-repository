
import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');
import Factor = require('../Entity/Factor/Factor');
import MatrixFactory = require('../Entity/Matrix/MatrixFactory');
import SqlExecutor = require('../Util/SqlExecutor');

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
		var sql = 'DELETE FROM '+Matrix.TABLE_NAME+' '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 ';
		this.connection.query(sql, [
			eShopId, loadId
		], (e, result) => {
			callback(e);
		});
	}

}
