
import mongoose = require('mongoose');
import ChecklistSourceSettings = require('../../Entity/Application/Settings/ChecklistSourceSettings');
import IChecklistSourceSettingsObject = require('../../Entity/Application/Settings/IChecklistSourceSettingsObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;
import List = Util.ODBM.Entity.List;
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistSourceSettingsLoader;
class ChecklistSourceSettingsLoader {

	static $inject = [
		'connection.mongoose'
	];
	constructor(
		private connection: mongoose.Mongoose,
		private manager: Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject, List<ChecklistSourceSettings>>
			= new Manager<ChecklistSourceSettings, IChecklistSourceSettingsObject, List<ChecklistSourceSettings>>(
				ChecklistSourceSettings, List, connection
			)
	) {}

	getByEShopId(eShopId: number, callback: (e: Error, checklistSourceSettings?: ChecklistSourceSettings) => void) {
		this.manager.Model.findOne({ eShopId: eShopId }, (e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

}
