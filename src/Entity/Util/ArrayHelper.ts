
import _ = require('underscore');

export = ArrayHelper;
class ArrayHelper {

	static mapFilterNulls(
		object: _.List<any>,
		iterator: _.ListIterator<any, any>
	) {
		var mappedArray = _.map(object, iterator);
		var filteredArray = _.filter(mappedArray, (value: any) => { return value !== null; });
		return filteredArray;
	}

	static mapFilterEmptys(
		object: _.List<any>,
		iterator: _.ListIterator<any, any>
	) {
		var mappedArray = _.map(object, iterator);
		var filteredArray = _.filter(mappedArray, (value: any) => { return value !== ''; });
		return filteredArray;
	}
}
