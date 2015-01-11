
import IHashIdentificable = require('./IHashIdentificable');
import IEntity = require('../IEntity');

export = IHashIdentificableEntity;
interface IHashIdentificableEntity extends IEntity, IHashIdentificable {
	
}
