
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = Category;
class Category implements IEntity {

	public static TABLE_NAME = 'warehouse.productcategory';
	public static COLUMN_CATEGORY_ID = 'productcategoryid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_PARENT_CATEGORY_ID = 'parentcategory';
	public static COLUMN_NAME = 'categoryname';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Id(): number { return this.id; }

	constructor(
		private id: number,
		private eShopId: number,
		private parentCategoryId: number,
		private name: string,
		private dateCreated: Date
	) { }

	static fromRow(r: any) {
		return new Category(
			EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_CATEGORY_ID]),
			EntityPreparer.int(r[Category.TABLE_NAME + '.' + Category.COLUMN_E_SHOP_ID]),
			EntityPreparer.intOrNull(r[Category.TABLE_NAME + '.' + Category.COLUMN_PARENT_CATEGORY_ID]),
			EntityPreparer.string(r[Category.TABLE_NAME + '.' + Category.COLUMN_NAME]),
			EntityPreparer.date(r[Category.TABLE_NAME + '.' + Category.COLUMN_DATE_CREATED])
		);
	}

	static toObject(entity: Category) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			parentCategoryId: entity.parentCategoryId,
			name: entity.name,
			dateCreated: entity.dateCreated
		};
	}

	toObject() {
		return Category.toObject(this);
	}

	static fromObject(object: any) {
		return new Category(
			EntityPreparer.int(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.intOrNull(object.productcategoryid),
			EntityPreparer.string(object.name),
			EntityPreparer.date(object.dateCreated)
		);
	}

}
