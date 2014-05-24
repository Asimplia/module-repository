
export function connect(dsn: string) {
	require('mongoose').connect(dsn);
}
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
