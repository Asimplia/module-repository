
import IEntity = require('../../IEntity');
import IChecklistSourceSettingsObject = require('./IChecklistSourceSettingsObject');
import EntityPreparer = require('../../EntityPreparer');
import ChecklistSourceTypeEnum = require('./ChecklistSourceTypeEnum');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = ChecklistSourceSettings;
class ChecklistSourceSettings implements IEntity {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		eShopId: Type.Integer,
		sources: {
			heurekaXml: {
				createdAt: new Type.Date(true, true),
				uri: new Type.String(2048, true),
				processingStartedAt: new Type.Date(true, true),
				processedAt: new Type.Date(true, true),
				failedAt: new Type.Date(true, true)
			},
			zboziXml: {
				createdAt: new Type.Date(true, true),
				uri: new Type.String(2048, true),
				processingStartedAt: new Type.Date(true, true),
				processedAt: new Type.Date(true, true),
				failedAt: new Type.Date(true, true)
			}
		},
		closedAt: new Type.Date(true, true)
	};
	private static converter = new Converter<ChecklistSourceSettings, IChecklistSourceSettingsObject>(ChecklistSourceSettings);

	get Id() { return this.object.id; }
	get EShopId() { return this.object.eShopId; }
	get Sources() { return this.object.sources; }
	get ClosedAt() { return this.object.closedAt; }
	set ClosedAt(value) { this.object.closedAt = value; }

	constructor(
		private object: IChecklistSourceSettingsObject
	) {}

	isClosed() {
		return this.object.closedAt !== null;
	}

	toggleClosed() {
		this.object.closedAt = this.isClosed() ? null : EntityPreparer.now();
		return this;
	}

	setSource(type: ChecklistSourceTypeEnum, uri: string) {
		var typeString = ChecklistSourceSettings.getTypeString(type);
		this.object.sources[typeString] = {
			uri: uri,
			createdAt: EntityPreparer.now()
		};
	}

	static getTypeString(type: ChecklistSourceTypeEnum) {
		switch (type) {
			case ChecklistSourceTypeEnum.HEUREKA_XML:
				return 'heurekaXml';
			case ChecklistSourceTypeEnum.ZBOZI_XML:
				return 'zboziXml';
		}
		throw new Error('Not implemented');
	}

	static fromObject(object: IChecklistSourceSettingsObject) {
		return ChecklistSourceSettings.converter.fromObject(object);
	}

	static toObject(entity: ChecklistSourceSettings): IChecklistSourceSettingsObject {
		return ChecklistSourceSettings.converter.toObject(entity);
	}

	toObject() {
		return ChecklistSourceSettings.toObject(this);
	}
}
