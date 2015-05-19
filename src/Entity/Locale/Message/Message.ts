
import moment = require('moment');
import IMessageObject = require('./IMessageObject');
import LocalizedString = require('../LocalizedString');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = Message;
class Message {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		source: new Type.Id(new Type.String(2048), true),
		text: {
			cs: new Type.String(2048, true),
			en: new Type.String(2048, true)
		},
		missingCount: {
			cs: new Type.Integer(8, true),
			en: new Type.Integer(8, true)
		},
		lastChangedAt: new Type.Date()
	};

	get Source() { return this.object.source; }
	get LastChangedAt() { return moment(this.object.lastChangedAt).toDate(); }
	get Text() { return new LocalizedString(this.object.text); }
	get MissingCount() { return this.object.missingCount; }
	set MissingCount(missingCount: any) { this.object.missingCount = missingCount; }

	constructor(
		private object: IMessageObject
	) {}

}
