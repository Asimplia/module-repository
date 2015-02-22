
import each = require('each');
import _ = require('underscore');
import IEntity = require('./IEntity');
import Util = require('asimplia-util');
import EntityList = Util.ODBM.Entity.List;

export = List;
class List<Entity extends IEntity> extends EntityList<Entity> {

}
