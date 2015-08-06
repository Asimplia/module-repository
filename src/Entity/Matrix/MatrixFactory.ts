
import Matrix = require('./Matrix');
import MatrixProduct = require('./MatrixProduct');
import MatrixCustomer = require('./MatrixCustomer');
import MatrixChannel = require('./MatrixChannel');
import MatrixCategory = require('./MatrixCategory');
import MatrixEShop = require('./MatrixEShop');
import MatrixChecklist = require('./MatrixChecklist');
import SectionFactory = require('../Section/SectionFactory');
import EntityPreparer = require('../EntityPreparer');
import Product = require('../EShop/Product');
import QuadrantValueFactory = require('./QuadrantValueFactory');

export = MatrixFactory;
class MatrixFactory {

	static createMatrixFromRow(row: any): Matrix {
		var column: Function = EntityPreparer.getTableColumnByKey;
		var sectionColumn = column(Matrix, 'section');
		var section = SectionFactory.createSectionEnum(row[sectionColumn]);
		var matrix;
		if (SectionFactory.isProduct(section)) {
			matrix = new MatrixProduct(
				EntityPreparer.intOrNull(row[column(Matrix, 'id')]),
				EntityPreparer.int(row[column(Matrix, 'eShopId')]),
				SectionFactory.createSectionEnum(row[column(Matrix, 'section')]),
				EntityPreparer.int(row[column(Matrix, 'loadId')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreAbsolute')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreRelative')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreWeight')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeAbsolute')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeRelative')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeWeight')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'prediction')]),
				QuadrantValueFactory.createQuadrantValueEnum(row[column(Matrix, 'quadrant')]),
				EntityPreparer.date(row[column(Matrix, 'dateValid')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'inputValueX')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'inputValueY')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeValueX')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeValueY')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'tangens')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeTangens')]),
				Product.fromRow(row)
			);
		} else
		if (SectionFactory.isCustomer(section)) {
			matrix = MatrixCustomer.fromRow(row);
		} else
		if (SectionFactory.isChannel(section)) {
			matrix = MatrixChannel.fromRow(row);
		} else
		if (SectionFactory.isCategory(section)) {
			matrix = MatrixCategory.fromRow(row);
		} else
		if (SectionFactory.isEShop(section)) {
			matrix = MatrixEShop.fromRow(row);
		} else
		if (SectionFactory.isChecklist(section)) {
			matrix = new MatrixChecklist(
				EntityPreparer.intOrNull(row[column(Matrix, 'id')]),
				EntityPreparer.int(row[column(Matrix, 'eShopId')]),
				SectionFactory.createSectionEnum(row[column(Matrix, 'section')]),
				EntityPreparer.int(row[column(Matrix, 'loadId')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreAbsolute')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreRelative')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'scoreWeight')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeAbsolute')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeRelative')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeWeight')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'prediction')]),
				QuadrantValueFactory.createQuadrantValueEnum(row[column(Matrix, 'quadrant')]),
				EntityPreparer.date(row[column(Matrix, 'dateValid')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'inputValueX')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'inputValueY')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeValueX')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeValueY')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'tangens')]),
				EntityPreparer.floatOrNull(row[column(Matrix, 'changeTangens')]),
				Product.fromRow(row)
			);
		} else {
			throw new Error('Not implemented section "' + row[sectionColumn] + '"');
		}
		return matrix;
	}

}
