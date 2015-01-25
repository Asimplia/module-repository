
import IEntity = require('../../IEntity');
import IChecklistSourcesObject = require('./IChecklistSourcesObject');
import IChecklistSourceSettingsObject = require('./IChecklistSourceSettingsObject');
import EntityPreparer = require('../../EntityPreparer');
import ChecklistSourceTypeEnum = require('./ChecklistSourceTypeEnum');

export = ChecklistSourceSettings;
class ChecklistSourceSettings implements IEntity {

	get Id() { return this.id; }
	get EShopId() { return this.eShopId; }
	get Sources() { return this.sources; }
	get ClosedAt() { return this.closedAt; }
	set ClosedAt(value) { this.closedAt = value; }

	constructor(
		private id: string,
		private eShopId: number,
		private sources: IChecklistSourcesObject,
		private closedAt: Date
	) {}

	isClosed() {
		return this.closedAt !== null;
	}

	toggleClosed() {
		this.closedAt = this.isClosed() ? null : EntityPreparer.now();
		return this;
	}

	setSource(type: ChecklistSourceTypeEnum, uri: string) {
		var typeString = ChecklistSourceSettings.getTypeString(type);
		this.sources[typeString] = {
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
		return new ChecklistSourceSettings(
			EntityPreparer.id(object.id),
			EntityPreparer.int(object.eShopId),
			{
				heurekaXml: {
					uri: EntityPreparer.stringOrNull(object.sources.heurekaXml.uri),
					createdAt: EntityPreparer.dateOrNull(object.sources.heurekaXml.createdAt),
					processingStartedAt: EntityPreparer.dateOrNull(object.sources.heurekaXml.processingStartedAt),
					processedAt: EntityPreparer.dateOrNull(object.sources.heurekaXml.processedAt),
					failedAt: EntityPreparer.dateOrNull(object.sources.heurekaXml.failedAt)
				},
				zboziXml: {
					uri: EntityPreparer.stringOrNull(object.sources.zboziXml.uri),
					createdAt: EntityPreparer.dateOrNull(object.sources.zboziXml.createdAt),
					processingStartedAt: EntityPreparer.dateOrNull(object.sources.zboziXml.processingStartedAt),
					processedAt: EntityPreparer.dateOrNull(object.sources.zboziXml.processedAt),
					failedAt: EntityPreparer.dateOrNull(object.sources.zboziXml.failedAt)
				}
			},
			EntityPreparer.dateOrNull(object.closedAt)
		);
	}

	static toObject(entity: ChecklistSourceSettings): IChecklistSourceSettingsObject {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			sources: entity.sources,
			closedAt: entity.closedAt
		};
	}

	toObject() {
		return ChecklistSourceSettings.toObject(this);
	}
}
