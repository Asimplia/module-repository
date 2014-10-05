
import Matrix = require('./Matrix');
import MatrixProduct = require('./MatrixProduct');
import MatrixCustomer = require('./MatrixCustomer');
import MatrixChannel = require('./MatrixChannel');
import MatrixCategory = require('./MatrixCategory');
import SectionFactory = require('../Section/SectionFactory');

export = MatrixFactory;
class MatrixFactory {

	static createMatrixFromRow(row: any): Matrix {
		var section = SectionFactory.createSectionEnum(row[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]);
		var matrix;
		if (SectionFactory.isProduct(section)) {
			matrix = MatrixProduct.fromRow(row);
		} else
		if (SectionFactory.isCustomer(section)) {
			matrix = MatrixCustomer.fromRow(row);
		} else
		if (SectionFactory.isChannel(section)) {
			matrix = MatrixChannel.fromRow(row);
		} else
		if (SectionFactory.isCategory(section)) {
			matrix = MatrixCategory.fromRow(row);
		} else {
			throw new Error('Not implemented section "' + row[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION] + '"');
		}
		return matrix;
	}

}
