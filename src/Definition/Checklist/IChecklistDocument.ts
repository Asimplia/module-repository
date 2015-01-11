
import mongoose = require('mongoose');
import IChecklistObject = require('./IChecklistObject');

export = IChecklistDocument;
interface IChecklistDocument extends IChecklistObject, mongoose.Document {

}
