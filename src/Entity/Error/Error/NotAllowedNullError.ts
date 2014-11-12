
import ScriptTypeEnum = require('../ScriptTypeEnum');
import _ = require('underscore');
import traceback = require('traceback');

export = NotAllowedNullError;
class NotAllowedNullError implements Error {

	public name: string;
	public message: string;
	
	constructor(type: ScriptTypeEnum) {
		var stack = traceback();
		var backTraceMethods = _.map(_.first(stack, 15), (trace: any) => {
			return trace.name + ':L' + trace.line + ':C' + trace.col;
		});
		this.name = 'NotAllowedNullError';
		this.message = 'Try to set value as NULL, only not null '+ScriptTypeEnum[type]+' allowed in "'+backTraceMethods.join('" -> "')+'"';
	}
}
