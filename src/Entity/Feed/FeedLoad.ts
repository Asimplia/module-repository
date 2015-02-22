
import IIdentificableEntity = require('../Common/IIdentificableEntity');
import IFeedLoadObject = require('./IFeedLoadObject');
import EntityPreparer = require('../EntityPreparer');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.DBS.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = FeedLoad;
class FeedLoad implements IIdentificableEntity {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.feedload',
		$object: 'object',
		id: { $name: 'loadid', $type: new Type.Id(Type.Integer) },
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
