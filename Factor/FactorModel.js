/// <reference path="../../typings/mongoose/mongoose.d.ts" />
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Factor/Factor');


var schema = new Schema(Definition);
var FactorModel = mongoose.model('Factor', schema);
module.exports = FactorModel;
//# sourceMappingURL=FactorModel.js.map
