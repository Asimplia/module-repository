
import Todo = require('./Todo');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
/* tslint:disable */
Util;
/* tslint:enable */

export = TodoList;
class TodoList extends List<Todo> {

}
