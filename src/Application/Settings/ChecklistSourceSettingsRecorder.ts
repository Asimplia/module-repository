
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import IChecklistSourceSettingsObject = require('../../Entity/Application/Settings/IChecklistSourceSettingsObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.MongoDB.Manager;

export = ChecklistSourceSettingsRecorder;
class ChecklistSourceSettingsRecorder {
	
	static $inject = [
		'connection.mongoose'
	];
	constructor(
		private connection: mongoose.Mongoose,
		private manager = new Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject, List<ChecklistSourceSettings>>(ChecklistSourceSettings, List, connection)
	) {}

	insertOrUpdateList(checklistSourceSettingsList: List<ChecklistSourceSettings>, callback: (e: Error, checklistSourceSettingsList?: List<ChecklistSourceSettings>) => void) {
		this.manager.insertOrUpdateList(checklistSourceSettingsList, callback);
	}

	insertOrUpdate(checklistSourceSettings: ChecklistSourceSettings, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.manager.insertOrUpdate(checklistSourceSettings, callback);
	}

	update(checklistSourceSettings: ChecklistSourceSettings, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.manager.update(checklistSourceSettings, callback);
	}
}
