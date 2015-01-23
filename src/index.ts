
import services = require('./config/services');
import Util = require('asimplia-util');
import DependencyInjection = Util.DependencyInjection;
import ConnectionDispatcher = require('./ConnectionDispatcher');

var di = getDependencyInjection();
var connectionDispatcher: ConnectionDispatcher = di.service('ConnectionDispatcher');

/** @deprecated Use ConnectionDispatcher */
export var connectMongoDB = (...args: any[]) => connectionDispatcher.connectMongoDB.apply(connectionDispatcher, args);
/** @deprecated Use ConnectionDispatcher */
export var connectPostgres = (...args: any[]) => connectionDispatcher.connectPostgres.apply(connectionDispatcher, args);
/** @deprecated Use ConnectionDispatcher */
export var connectNeo4j = (...args: any[]) => connectionDispatcher.connectNeo4j.apply(connectionDispatcher, args);
/** @deprecated Use ConnectionDispatcher */
export var getConnection = (...args: any[]) => connectionDispatcher.getConnection.apply(connectionDispatcher, args);
/** @deprecated Use ConnectionDispatcher */
export var getGraphDatabase = (...args: any[]) => connectionDispatcher.getGraphDatabase.apply(connectionDispatcher, args);
var _di;
export function getDependencyInjection(): DependencyInjection {
	if (!_di) {
		_di = new DependencyInjection('asimplia-repository', services);
	}
	return _di;
}
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
export import Section = require('./Section/index');
export import Placeholder = require('./Placeholder/index');
export import Application = require('./Application/index');
export import EShop = require('./EShop/index');
export import Error = require('./Error/index');
export import Load = require('./Load/index');
export import External = require('./External/index');
export import Site = require('./Site/index');
export import Checklist = require('./Checklist/index');
Suggestion;
Factor;
Entity;
Matrix;
Section;
Placeholder;
Application;
EShop;
Error;
Load;
External;
Site;
Checklist;
