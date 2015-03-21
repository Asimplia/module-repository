
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Todo = require('./Todo');
import ITodoObject = require('./ITodoObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = TodoConverter;
class TodoConverter extends Converter<Todo, ITodoObject> {

	static $service = 'Entity.Suggestion.Todo.TodoConverter';
	constructor() {
		super(Todo);
	}
}
