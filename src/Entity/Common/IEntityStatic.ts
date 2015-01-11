
import IEntity = require('../IEntity');

export = IEntityStatic;
interface IEntityStatic {
	toObject(entity: IEntity): any;
	fromObject(object: any): IEntity;
}
