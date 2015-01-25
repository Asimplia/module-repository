
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = ChecklistSourceSettingsModel;
var Definition = {
	id: Number,
	eShopId: Number,
	sources: {
		heurekaXml: {
			createdAt: { type: Date, default: null },
			uri: { type: String, default: null },
			processingStartedAt: { type: Date, default: null },
			processedAt: { type: Date, default: null },
			failedAt: { type: Date, default: null }
		},
		zboziXml: {
			createdAt: { type: Date, default: null },
			uri: { type: String, default: null },
			processingStartedAt: { type: Date, default: null },
			processedAt: { type: Date, default: null },
			failedAt: { type: Date, default: null }
		}
	},
	closedAt: { type: Date, default: null }
};
var schema = new Schema(Definition);
var ChecklistSourceSettingsModel = mongoose.model('ChecklistSourceSettings', schema);
