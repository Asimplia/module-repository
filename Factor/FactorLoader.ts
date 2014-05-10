﻿/// <refernce path="../../typings/mongoose/mongoose.d.ts" />

import Factor = require('../Entity/Factor/Factor');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = FactorLoader;
class FactorLoader {

	private FactorModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.FactorModel = require('./FactorModel');
	}

	getList(callback: (e: Error, factorList?: List<Factor>) => void) {
		this.FactorModel.find({}, null, { sort: 'id' }, (e, factors: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<Factor>();
			list.pushArray(factors, Factor.fromObject);
			callback(e, list);
		});
	}
}