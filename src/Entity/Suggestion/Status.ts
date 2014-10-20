﻿
/// <reference path="../../../typings/moment/moment.d.ts" />

import IEntity = require('../IEntity');
import ResultStateEnum = require('./ResultStateEnum');
import moment = require('moment');
import EntityPreparer = require('../EntityPreparer');

export = Status;
class Status implements IEntity {

	get DateCreated() { return this.dateCreated; }
	set DateCreated(value: Date) { this.dateCreated = value; }
	get DateValidTo() { return this.dateValidTo; }
	set DateValidTo(value: Date) { this.dateValidTo = value; }
	get State() { return this.state; }
	set State(value: ResultStateEnum) { this.state = value; }
	get DateNextRemind() { return this.dateNextRemind; }
	set DateNextRemind(value: Date) { this.dateNextRemind = value; }
	get PriorityValue() { return this.priorityValue; }
	set PriorityValue(value: number) { this.priorityValue = value; }
	get PriorityType() { return this.priorityType; }
	set PriorityType(value: string) { this.priorityType = value; }

	constructor(
		private dateCreated: Date,
		private dateValidTo: Date,
		private state: ResultStateEnum,
		private dateNextRemind: Date,
		private priorityValue: number, // define number of coins 1-5
		private priorityType: string // define color of coins - green/red
	) { }

	static fromObject(o: any): Status {
		return new Status(
			EntityPreparer.date(o.dateCreated),
			EntityPreparer.dateOrNull(o.dateValidTo),
			Status.createResultStateEnum(o.state),
			EntityPreparer.dateOrNull(o.dateNextRemind),
			EntityPreparer.float(o.priorityValue),
			EntityPreparer.string(o.priorityType)
		);
	}

	static toObject(entity: Status) {
		return {
			dateCreated: entity.dateCreated ? moment(entity.dateCreated).format() : null,
			dateValidTo: entity.dateValidTo ? moment(entity.dateValidTo).format() : null,
			state: ResultStateEnum[entity.state],
			dateNextRemind: entity.dateNextRemind ? moment(entity.dateNextRemind).format() : null,
			priorityValue: entity.priorityValue,
			priorityType: entity.priorityType
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
}