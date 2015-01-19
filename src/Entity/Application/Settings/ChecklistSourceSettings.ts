
import IEntity = require('../../IEntity');
import IChecklistSourcesObject = require('./IChecklistSourcesObject');
import IChecklistSourceSettingsObject = require('./IChecklistSourceSettingsObject');
import EntityPreparer = require('../../EntityPreparer');

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

	static fromObject(object: IChecklistSourceSettingsObject) {
		return new ChecklistSourceSettings(
			EntityPreparer.id(object.id),
			EntityPreparer.int(object.eShopId),
			{
				heurekaXml: {
					uri: EntityPreparer.stringOrNull(object.sources.heurekaXml.uri),
					createdAt: EntityPreparer.dateOrNull(object.sources.heurekaXml.createdAt)
				},
				zboziXml: {
					uri: EntityPreparer.stringOrNull(object.sources.zboziXml.uri),
					createdAt: EntityPreparer.dateOrNull(object.sources.zboziXml.createdAt)
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
