
import IEntity = require('../IEntity');
import IEntityStatic = require('./IEntityStatic');

export = ITableEntityStatic;
interface ITableEntityStatic extends IEntityStatic {
	TABLE_NAME: string;
	fromRow(row: any): IEntity;
}
