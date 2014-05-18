
function connect(dsn: string) {
	require('mongoose').connect(dsn);
}

import Suggestion = require('./Suggestion/index');
import Factor = require('./Factor/index');
import Entity = require('./Entity/index');
import IEntity = Entity.IEntity;
import List = Entity.List;

export = AsimpliaRepository;
var AsimpliaRepository = {
	connect: connect,
	Suggestion: Suggestion,
	Factor: Factor,
	Entity: Entity
};
