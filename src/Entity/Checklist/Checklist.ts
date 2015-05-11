
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import IChecklistObject = require('./IChecklistObject');
import LocalizedString = require('../Locale/LocalizedString');
import IStatistics = require('./IStatistics');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = Checklist;
class Checklist {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		eShopId: Type.Integer,
		dateCreated: Type.Date,
		section: Type.String,
		name: {
			cs: new Type.String(2048, true),
			en: new Type.String(2048, true)
		},
		dateResolved: new Type.Date(true, true),
		statistics: {
			$nullable: true,
			doneIndex: new Type.Float(8, true),
			totalCost: new Type.Integer(4, true),
			worstCategory: new Type.String(2048, true),
			totalCount: new Type.Integer(4, true),
			valueNames: new Type.Array(new Type.String(), true)
		}
	};
	private static converter = new Converter<Checklist, IChecklistObject>(Checklist);

	get Id() { return this.object.id; }
	get Section() { return SectionEnum[this.object.section]; }
	get Name() { return new LocalizedString(this.object.name); }
	get DateCreated() { return this.object.dateCreated; }
	get TotalCount() { return this.object.statistics ? this.object.statistics.totalCount : null; }
	get Statistics(): IStatistics { return this.object.statistics; }

	set Name(name: LocalizedString) { this.object.name = name.toObject(); }
	set Statistics(statistics: IStatistics) { this.object.statistics = statistics; }

	constructor(
		private object: IChecklistObject
	) {}

	getSectionName() {
		return SectionFactory.getLabel(this.Section);
	}

	getDoneIndex() {
		return this.object.statistics ? this.object.statistics.doneIndex : null;
	}

	static fromObject(object: IChecklistObject) {
		return Checklist.converter.fromObject(object);
	}

	static toObject(entity: Checklist): IChecklistObject {
		return Checklist.converter.toObject(entity);
	}

	toObject() {
		return Checklist.toObject(this);
	}
}
