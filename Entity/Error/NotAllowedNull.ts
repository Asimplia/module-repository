
/// <reference path="../../typings_local/traceback/traceback.d.ts" />

import ScriptTypeEnum = require('./ScriptTypeEnum');
import _ = require('underscore');
import traceback = require('traceback');

export = NotAllowedNull;
class NotAllowedNull implements Error {

	public name: string;
	public message: string;
	
	constructor(type: ScriptTypeEnum) {
		var stack = traceback();
		var backTraceMethods = _.map(_.first(stack, 15), (trace: any) => {
			return trace.name + ':L' + trace.line + ':C' + trace.col;
		});
		this.name = 'NotAllowedNull';
		this.message = 'Try to set value as NULL, only not null '+ScriptTypeEnum[type]+' allowed in "'+backTraceMethods.join('" -> "')+'"';
	}
}
