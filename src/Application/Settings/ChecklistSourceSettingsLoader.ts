
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import IChecklistSourceSettingsObject = require('../../Entity/Application/Settings/IChecklistSourceSettingsObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;

export = ChecklistSourceSettingsLoader;
class ChecklistSourceSettingsLoader {

	private manager: Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject>;

	static $inject = [
		'connection.mongoose'
	];
	constructor(
		private connection: mongoose.Mongoose
	) {
		this.manager = new Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject>(ChecklistSourceSettings, connection);
	}

	getByEShopId(eShopId: number, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.manager.Model.findOne({ "eShopId": eShopId }, (e, doc: mongoose.Document) => {
			if (e) return callback(e);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

}
