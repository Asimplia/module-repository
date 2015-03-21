
import ZboziProduct = require('../../Entity/Feed/Zbozi/ZboziProduct');
import IZboziProductObject = require('../../Entity/Feed/Zbozi/IZboziProductObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ZboziProductRecorder;
class ZboziProductRecorder {

	static $service = 'Feed.Zbozi.ZboziProductRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<ZboziProduct, IZboziProductObject, List<ZboziProduct>>
			= new Manager<ZboziProduct, IZboziProductObject, List<ZboziProduct>>(ZboziProduct, List, connection)
	) {}

	insertList(zboziProductList: List<ZboziProduct>, callback: (e: Error, zboziProductList?: List<ZboziProduct>) => void) {
		this.manager.insertList(zboziProductList, callback);
	}

	insert(zboziProduct: ZboziProduct, callback: (e: Error, zboziProduct?: ZboziProduct) => void) {
		this.manager.insert(zboziProduct, callback);
	}
}
