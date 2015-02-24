
import Column = require('./Column');
import Util = require('asimplia-util');
import List = Util.Collection.List;

export = ColumnList;
class ColumnList extends List<Column, List<Column, any>> {
	
}
