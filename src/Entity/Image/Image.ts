
import IEntity = require('../IEntity');
import IImageObject = require('./IImageObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = Image;
class Image implements IEntity {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		url: new Type.String(2048, true)
	};
	private static converter = new Converter<Image, IImageObject>(Image);

	constructor(
		private object: IImageObject
	) {}

	get Id() { return this.object.id; }
	get Url() { return this.object.url; }

	static fromObject(object: IImageObject) {
		return Image.converter.fromObject(object);
	}

	static toObject(entity: Image): IImageObject {
		return Image.converter.toObject(entity);
	}

	toObject() {
		return Image.toObject(this);
	}
}
