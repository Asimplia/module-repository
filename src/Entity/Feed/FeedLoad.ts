
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IFeedLoadObject = require('./IFeedLoadObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = FeedLoad;
class FeedLoad implements IIdentificableEntity {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.feedload',
		id: { $name: 'loadid', $type: new Type.Id(new Type.Integer(4)) },
		eShopId: { $name: 'eshopid', $type: Type.Integer },
		dateLoad: { $name: 'loaddate', $type: Type.Date },
		feedCode: { $name: 'feedcode', $type: new Type.String(25) }
	};
	private static converter = new Converter<FeedLoad, IFeedLoadObject>(FeedLoad);

	get Id() { return this.object.id; }

	constructor(private object: IFeedLoadObject) {}

	toObject(): IFeedLoadObject {
		return FeedLoad.toObject(this);
	}

	static fromRow(row: any): FeedLoad {
		return FeedLoad.converter.fromRow(row);
	}

	static toObject(entity: FeedLoad): IFeedLoadObject {
		return FeedLoad.converter.toObject(entity);
	}

	static fromObject(object: IFeedLoadObject): FeedLoad {
		return FeedLoad.converter.fromObject(object);
	}
}
