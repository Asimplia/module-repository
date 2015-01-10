
import IEntity = require('../IEntity');
import IIdentificable = require('./IIdentificable');

export = IIdentificableEntity;
interface IIdentificableEntity extends IIdentificable, IEntity {
	
}
