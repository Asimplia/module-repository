
/// <reference path="../../../typings/moment/moment.d.ts" />

import IEntity = require('../IEntity');
import ResultStateEnum = require('./ResultStateEnum');
import moment = require('moment');
import EntityPreparer = require('../EntityPreparer');

export = Status;
class Status implements IEntity {

	get DateCreated() { return this.dateCreated; }
	get State() { return this.state; }

	constructor(
		private dateCreated: Date,
		private state: ResultStateEnum
	) { }

	static fromObject(o: any): Status {
		return new Status(
			EntityPreparer.date(o.dateCreated),
			Status.createResultStateEnum(o.state)
		);
	}

	static toObject(entity: Status) {
		return {
			dateCreated: entity.dateCreated ? moment(entity.dateCreated).format() : null,
			state: ResultStateEnum[entity.state]
		};
	}

	toObject() {
		return Status.toObject(this);
	}

	static createResultStateEnum(state: string) {
		switch (state) {
			case ResultStateEnum[ResultStateEnum.CREATED]:
				return ResultStateEnum.CREATED;
			case ResultStateEnum[ResultStateEnum.DECLINED]:
				return ResultStateEnum.DECLINED;
			case ResultStateEnum[ResultStateEnum.READY_TO_APPLY]:
				return ResultStateEnum.READY_TO_APPLY;
			case ResultStateEnum[ResultStateEnum.REMIND_LATER]:
				return ResultStateEnum.REMIND_LATER;
			case ResultStateEnum[ResultStateEnum.USED]:
				return ResultStateEnum.USED;
			case ResultStateEnum[ResultStateEnum.EXPIRED]:
				return ResultStateEnum.EXPIRED;
		}
		return ResultStateEnum.UNKNOWN;
	}

	isStateUsed() {
		return this.state == ResultStateEnum.USED;
	}

	isStateDeclined() {
		return this.state == ResultStateEnum.DECLINED;
	}

	isStateRemindLater() {
		return this.state == ResultStateEnum.REMIND_LATER;
	}

	isStateReadyToApply() {
		return this.state == ResultStateEnum.READY_TO_APPLY;
	}

	isStateCreated() {
		return this.state == ResultStateEnum.CREATED;
	}

	isStateExpired() {
		return this.state == ResultStateEnum.EXPIRED;
	}
}
