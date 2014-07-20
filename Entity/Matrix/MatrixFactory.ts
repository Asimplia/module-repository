
import Matrix = require('./Matrix');
import MatrixProduct = require('./MatrixProduct');
import MatrixCustomer = require('./MatrixCustomer');
import MatrixChannel = require('./MatrixChannel');
import SectionFactory = require('../../Entity/Section/SectionFactory');

export = MatrixFactory;
class MatrixFactory {

	static createMatrixFromRow(row: any): Matrix {
		var section = SectionFactory.createSectionEnum(row[Matrix.COLUMN_TYPE]);
		var matrix;
		if (SectionFactory.isProduct(section)) {
			matrix = MatrixProduct.fromRow(row);
		} else
		if (SectionFactory.isCustomer(section)) {
			matrix = MatrixCustomer.fromRow(row);
		} else
		if (SectionFactory.isChannel(section)) {
			matrix = MatrixChannel.fromRow(row);
		} else {
			throw new Error('Not implemented');
		}
		return matrix;
	}

}
