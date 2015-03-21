
import Util = require('asimplia-util');
import DependencyInjection = Util.DI.DependencyInjection;
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
export import Feed = require('./Feed/index');
export import IntegrationPreparer = require('../tests/IntegrationPreparer');
/* tslint:disable */
Util;
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
Feed;
IntegrationPreparer;
/* tslint:enable */

var getServices = () => {
	var services: any;
	if (process.env.NODE_ENV === 'integration') {
		services = require('./config/services.integration');
	} else {
		services = require('./config/services');
	}
	return services;
};

var di: any;
export function getDependencyInjection(): DependencyInjection {
	'use strict';
	if (!di) {
		di = new DependencyInjection('asimplia-repository', getServices());
	}
	return di;
}
