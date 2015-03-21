
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import IChecklistSourceSettingsObject = require('../../Entity/Application/Settings/IChecklistSourceSettingsObject');
import ChecklistSourceSettingsLoader = require('./ChecklistSourceSettingsLoader');
import ChecklistSourceTypeEnum = require('../../Entity/Application/Settings/ChecklistSourceTypeEnum');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.MongoDB.Manager;
import DateFactory = Util.DateTime.DateFactory;
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistSourceSettingsRecorder;
class ChecklistSourceSettingsRecorder {

	static $inject = [
		'connection.mongoose',
		DateFactory,
		ChecklistSourceSettingsLoader,
	];
	constructor(
		private connection: mongoose.Mongoose,
		private dateFactory: DateFactory,
		private checklistSourceSettingsLoader: ChecklistSourceSettingsLoader,
		private manager: Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject, List<ChecklistSourceSettings>>
			= new Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject, List<ChecklistSourceSettings>>(
				ChecklistSourceSettings, List, connection
			)
	) {}

	insertOrUpdateList(
		checklistSourceSettingsList: List<ChecklistSourceSettings>,
		callback: (e: Error, checklistSourceSettingsList?: List<ChecklistSourceSettings>) => void
	) {
		this.manager.insertOrUpdateList(checklistSourceSettingsList, callback);
	}

	insertOrUpdate(
		checklistSourceSettings: ChecklistSourceSettings, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void
	) {
		this.manager.insertOrUpdate(checklistSourceSettings, callback);
	}

	update(checklistSourceSettings: ChecklistSourceSettings, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.manager.update(checklistSourceSettings, callback);
	}

	setClosed(eShopId: number, closed: boolean, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.checklistSourceSettingsLoader.getByEShopId(eShopId, (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => {
			if (e) return callback(e);
			if (!checklistSourceSettings) {
				checklistSourceSettings = this.createChecklistSourceSettings(eShopId);
			}
			checklistSourceSettings.ClosedAt = closed ? this.dateFactory.now() : null;
			this.insertOrUpdate(checklistSourceSettings, (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => {
				if (e) return callback(e);
				callback(null, checklistSourceSettings);
			});
		});
	}

	setSourceUri(
		eShopId: number,
		sourceType: ChecklistSourceTypeEnum,
		uri: string,
		callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void
	) {
		this.checklistSourceSettingsLoader.getByEShopId(eShopId, (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => {
			if (e) return callback(e);
			if (!checklistSourceSettings) {
				checklistSourceSettings = this.createChecklistSourceSettings(eShopId);
			}
			checklistSourceSettings.setSource(sourceType, uri);
			this.insertOrUpdate(checklistSourceSettings, (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => {
				if (e) return callback(e);
				callback(null, checklistSourceSettings);
			});
		});
	}

	private createChecklistSourceSettings(eShopId: number) {
		return ChecklistSourceSettings.fromObject({
			id: null,
			eShopId: eShopId,
			sources: {
				heurekaXml: {
					uri: null,
					createdAt: null,
					processingStartedAt: null,
					processedAt: null,
					failedAt: null
				},
				zboziXml: {
					uri: null,
					createdAt: null,
					processingStartedAt: null,
					processedAt: null,
					failedAt: null
				}
			},
			closedAt: null
		});
	}
}
