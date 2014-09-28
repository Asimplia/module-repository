
/// <reference path="../../typings_local/stack-trace/stack-trace.d.ts" />

import ScriptTypeEnum = require('./ScriptTypeEnum');
import _ = require('underscore');
import stackTrace = require('stack-trace');

export = NotAllowedNull;
class NotAllowedNull implements Error {

	public name: string;
	public message: string;
	
	constructor(type: ScriptTypeEnum) {
		var backTrace = stackTrace.get();
		var backTraceMethods = _.map(_.first(backTrace, 15), (trace: any) => {
			return trace.getFunctionName() + ':L' + trace.getLineNumber() + ':C' + trace.getColumnNumber();
		});
		this.name = 'NotAllowedNull';
		this.message = 'Try to set value as NULL, only not null '+ScriptTypeEnum[type]+' allowed in "'+backTraceMethods.join('" -> "')+'"';
	}
}
