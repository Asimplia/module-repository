
import IEntity = require('./IEntity');

export = IEntityStatic;
interface IEntityStatic {
	TABLE_NAME: string;
	toObject(entity: IEntity): any;
	fromObject(object: any): IEntity;
	fromRow(row: any): IEntity;
}
