
import services = require('./services');
import _ = require('underscore');

export = servicesIntegration;
var servicesIntegration: { [name: string]: any } = {
	'tests.IntegrationPreparer': require('../../tests/IntegrationPreparer'),
};
_.extend(servicesIntegration, services);
