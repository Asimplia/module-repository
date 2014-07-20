﻿import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');
import MatrixProduct = require('../Entity/Matrix/MatrixProduct');
import Factor = require('../Entity/Factor/Factor');
import SectionProvider = require('../Entity/Section/SectionProvider');

export = MatrixLoader;
class MatrixLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId:number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' LEFT JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
				+'WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 AND '+Signal.COLUMN_SIGNAL_ID+' IS NULL', [
			eShopId
		], (e, result) => {
			if (e) {
				console.log(e);
				return callback(e);
			}
			var list = new List<Matrix>();
			result.rows.forEach((row) => {
				var record = MatrixLoader.createMatrixFromRow(row);
				list.push(record);
			});
			callback(null, list);
		});
	}

	static createMatrixFromRow(row: any): Matrix {
		var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
		var matrix;
		if (SectionProvider.isProduct(section)) {
			matrix = MatrixProduct.fromRow(row);
		} else
		if (SectionProvider.isCustomer(section)) {
			matrix = MatrixProduct.fromRow(row); // TODO
		} else
		if (SectionProvider.isChannel(section)) {
			matrix = MatrixProduct.fromRow(row); // TODO
		} else {
			throw new Error('Not implemented "'+row[Matrix.COLUMN_TYPE]+'"');
		}
		return matrix;
	}
}
