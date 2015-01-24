
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import DocumentExecutor = require('../../Util/DocumentExecutor');
import ChecklistSourceSettingsModel = require('../../Definition/Application/Settings/ChecklistSourceSettingsModel');
import List = require('../../Entity/List');

export = ChecklistSourceSettingsRecorder;
class ChecklistSourceSettingsRecorder {
	
	private documentExecutor: DocumentExecutor;
	static $inject = [
		'Definition.Application.Settings.ChecklistSourceSettingsModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, ChecklistSourceSettings);
	}

	insertOrUpdateList(checklistSourceSettingsList: List<ChecklistSourceSettings>, callback: (e: Error, checklistSourceSettingsList?: List<ChecklistSourceSettings>) => void) {
		this.documentExecutor.insertOrUpdateList(checklistSourceSettingsList, callback);
	}

	insertOrUpdate(checklistSourceSettings: ChecklistSourceSettings, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.documentExecutor.insertOrUpdate(checklistSourceSettings, callback);
	}
}
