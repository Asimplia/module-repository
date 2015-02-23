
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import IChecklistSourceSettingsObject = require('../../Entity/Application/Settings/IChecklistSourceSettingsObject');
import List = require('../../Entity/List');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;

export = ChecklistSourceSettingsRecorder;
class ChecklistSourceSettingsRecorder {
	
	private manager: Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject>;

	static $inject = [
		'connection.mongoose'
	];
	constructor(
		private connection: mongoose.Mongoose
	) {
		this.manager = new Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject>(ChecklistSourceSettings, connection);
	}

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
