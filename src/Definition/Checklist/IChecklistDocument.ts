
import mongoose = require('mongoose');
import IChecklistObject = require('../../Entity/Checklist/IChecklistObject');

export = IChecklistDocument;
interface IChecklistDocument extends IChecklistObject, mongoose.Document {

}
