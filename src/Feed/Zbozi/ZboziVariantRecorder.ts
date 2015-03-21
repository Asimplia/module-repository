
import IZboziVariantObject = require('../../Entity/Feed/Zbozi/IZboziVariantObject');
import ZboziVariant = require('../../Entity/Feed/Zbozi/ZboziVariant');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ZboziVariantRecorder;
class ZboziVariantRecorder {

	static $service = 'Feed.Zbozi.ZboziVariantRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<ZboziVariant, IZboziVariantObject, List<ZboziVariant>>
			= new Manager<ZboziVariant, IZboziVariantObject, List<ZboziVariant>>(ZboziVariant, List, connection)
	) {}

	insertList(zboziVariantList: List<ZboziVariant>, callback: (e: Error, zboziVariantList?: List<ZboziVariant>) => void) {
		this.manager.insertList(zboziVariantList, callback);
	}

	insert(zboziVariant: ZboziVariant, callback: (e: Error, zboziVariant?: ZboziVariant) => void) {
		this.manager.insert(zboziVariant, callback);
	}
}
