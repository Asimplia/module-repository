
/// <reference path="../../typings_local/stack-trace/stack-trace.d.ts" />

import TypeEnum = require('./TypeEnum');
import _ = require('underscore');
import stackTrace = require('stack-trace');

export = NotAllowedNull;
class NotAllowedNull implements Error {

	public name: string;
	public message: string;
	
	constructor(type: TypeEnum) {
		var backTrace = stackTrace.get();
		var backTraceMethods = _.map(_.first(backTrace, 5), (trace: any) => {
			return trace.getFunctionName()
		});
		this.name = 'NotAllowedNull';
		this.message = 'Try to set value as NULL, only not null '+TypeEnum[type]+' allowed in "'+backTraceMethods.join('" -> "')+'"';
	}
}
