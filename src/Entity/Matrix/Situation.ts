
import IEntity = require('../IEntity');
import ISituationObject = require('./ISituationObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import Converter = Util.ODBM.Entity.Converter;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
/* tslint:disable */
Util;
/* tslint:enable */

export = Situation;
class Situation implements IEntity {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'analytical.situation',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'situationid' },
		eShopId: { $type: new Type.Integer, $name: 'eshopid' },
		productId: { $type: new Type.Integer(8, true), $name: 'productid' },
		customerId: { $type: new Type.Integer(8, true), $name: 'customerid' },
		channelId: { $type: new Type.Integer(8, true), $name: 'channelid' },
		orderId: { $type: new Type.Integer(8, true), $name: 'orderid' },
		categoryId: { $type: new Type.Integer(8, true), $name: 'productcategoryid' },
		loadLogId: { $type: new Type.Integer(8, true), $name: 'loadid' },
		dateCreated: { $type: new Type.Date(), $name: 'datecreated' },
		dateSuggestionResultCreated: { $type: new Type.Date(true, true), $name: 'datesuggestionresultcreated' },
		dateSuggestionResultProcessed: { $type: new Type.Date(true, true), $name: 'datesuggestionresultprocessed' },
		dateChecklistCreated: { $type: new Type.Date(true, true), $name: 'datechecklistcreated' },
		dateChecklistProcessed: { $type: new Type.Date(true, true), $name: 'datechecklistprocessed' }
	};
	private static converter = new Converter<Situation, ISituationObject>(Situation);

	get Id(): number { return this.object.id; }
	set Id(id: number) { this.object.id = id; }
	get DateCreated() { return this.object.dateCreated; }
	get DateSuggestionResultCreated() { return this.object.dateSuggestionResultCreated; }
	set DateSuggestionResultCreated(value: Date) { this.object.dateSuggestionResultCreated = value; }
	get DateSuggestionResultProcessed() { return this.object.dateSuggestionResultProcessed; }
	set DateSuggestionResultProcessed(value: Date) { this.object.dateSuggestionResultProcessed = value; }
	get DateChecklistCreated() { return this.object.dateChecklistCreated; }
	set DateChecklistCreated(value: Date) { this.object.dateChecklistCreated = value; }
	get DateChecklistProcessed() { return this.object.dateChecklistProcessed; }
	set DateChecklistProcessed(value: Date) { this.object.dateChecklistProcessed = value; }
	get LoadId() {
		return this.object.loadLogId;
	}
	get EShopId() {
		return this.object.eShopId;
	}
	get ProductId() {
		return this.object.productId;
	}
	get CategoryId() {
		return this.object.categoryId;
	}
	get ChannelId() {
		return this.object.channelId;
	}
	get CustomerId() {
		return this.object.customerId;
	}
	get OrderId(): number {
		return this.object.orderId;
	}

	constructor(
		private object: ISituationObject
	) {}

	static toObject(entity: Situation) {
		return Situation.converter.toObject(entity);
	}

	toObject() {
		return Situation.toObject(this);
	}

	static fromRow(row: any) {
		return Situation.converter.fromRow(row);
	}

	static fromObject(object: any) {
		return Situation.fromObject(object);
	}

	/* getMatrixProductBySection(section: SectionEnum) {
		var signal = this.signalList.find((signal: Signal) => {
			return signal.Matrix.Section == section;
		});
		return signal ? <MatrixProduct> signal.Matrix : null;
	}*/
}
