
import Todo = require('./Todo');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;

export = TodoList;
class TodoList extends List<Todo> {
	
}
