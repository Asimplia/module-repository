
import Matrix = require('./Matrix');
import MatrixProduct = require('./MatrixProduct');
import MatrixCustomer = require('./MatrixCustomer');
import MatrixChannel = require('./MatrixChannel');
import SectionProvider = require('../../Entity/Section/SectionProvider');

export = MatrixFactory;
class MatrixFactory {

	static createMatrixFromRow(row: any): Matrix {
		var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
		var matrix;
		if (SectionProvider.isProduct(section)) {
			matrix = MatrixProduct.fromRow(row);
		} else
		if (SectionProvider.isCustomer(section)) {
			matrix = MatrixCustomer.fromRow(row);
		} else
		if (SectionProvider.isChannel(section)) {
			matrix = MatrixChannel.fromRow(row);
		} else {
			throw new Error('Not implemented');
		}
		return matrix;
	}

}
