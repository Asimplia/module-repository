
import Util = require('asimplia-util');
import DependencyInjection = Util.DependencyInjection;
export import ConnectionDispatcher = require('./ConnectionDispatcher');
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
ConnectionDispatcher;
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

var services = () => {
	if (process.env.NODE_ENV === 'integration') {
		var services = require('./config/services.integration');
	} else {
		var services = require('./config/services');
	}
	return services;
};

var _di;
export function getDependencyInjection(): DependencyInjection {
	if (!_di) {
		_di = new DependencyInjection('asimplia-repository', services());
	}
	return _di;
}
