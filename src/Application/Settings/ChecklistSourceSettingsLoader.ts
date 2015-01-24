
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import DocumentExecutor = require('../../Util/DocumentExecutor');
import ChecklistSourceSettingsModel = require('../../Definition/Application/Settings/ChecklistSourceSettingsModel');

export = ChecklistSourceSettingsLoader;
class ChecklistSourceSettingsLoader {

	private documentExecutor: DocumentExecutor;
	
	static $inject = [
		'Definition.Application.Settings.ChecklistSourceSettingsModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, ChecklistSourceSettings);
	}

	getByEShopId(eShopId: number, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.model.findOne({ "eShopId": eShopId }, (e, object: mongoose.Document) => {
			this.documentExecutor.createByObject(e, object, callback);
		});
	}

}
