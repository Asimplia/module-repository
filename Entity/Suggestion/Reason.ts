
import IEntity = require('../IEntity');
import ReasonTypeEnum = require('./ReasonTypeEnum');
import LocalizedString = require('../Locale/LocalizedString');

export = Reason;
class Reason implements IEntity {

	get Label() { return this.label; }
	get ReasonType() { return this.reasonType; }

	constructor(
		private label: LocalizedString,
		private reasonType: ReasonTypeEnum
	) { }

	static fromObject(o: any) {
		return new Reason(new LocalizedString(o.label), Reason.createReasonTypeEnum(o.reasonType));
	}

	static toObject(e: Reason) {
		return {
			label: e.label,
			reasonType: ReasonTypeEnum[e.reasonType]
		};
	}

	toObject() {
		return Reason.toObject(this);
	}

	static createReasonTypeEnum(type: string) {
		switch (type) {
			case ReasonTypeEnum[ReasonTypeEnum.FALL]:
				return ReasonTypeEnum.FALL;
			case ReasonTypeEnum[ReasonTypeEnum.RISE]:
				return ReasonTypeEnum.RISE;
			case ReasonTypeEnum[ReasonTypeEnum.STAY]:
				return ReasonTypeEnum.STAY;
			default:
				return null;
		}
	}
}
