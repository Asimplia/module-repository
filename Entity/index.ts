
import IEntity = require('./IEntity');
import List = require('./List');
import Factor = require('./Factor/index');
import Locale = require('./Locale/index');
import Matrix = require('./Matrix/index');
import Section = require('./Section/index');
import Suggestion = require('./Suggestion/index');

export = Entity;
var Entity = {
	IEntity: IEntity,
	List: List,
	Factor: Factor,
	Locale: Locale,
	Matrix: Matrix,
	Section: Section,
	Suggestion: Suggestion
};
