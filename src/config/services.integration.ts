
import services = require('./services');
import _ = require('underscore');

var servicesIntegration: { [name: string]: any } = {
	'tests.IntegrationPreparer': require('../../tests/IntegrationPreparer')
};
_.extend(servicesIntegration, services);

export = servicesIntegration;
