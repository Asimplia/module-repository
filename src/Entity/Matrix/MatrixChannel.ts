
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import Channel = require('../EShop/Channel');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import EntityPreparer = require('../EntityPreparer');

export = MatrixChannel;
class MatrixChannel extends Matrix {

	get Channel(): Channel { return this.channel; }

	constructor(
		id: number,
		eShopId: number,
		section: SectionEnum,
		loadId: number,
		scoreAbsolute: number,
		scoreRelative: number,
		scoreWeight: number,
		changeAbsolute: number,
		changeRelative: number,
		changeWeight: number,
		prediction: number,
		quadrant: QuadrantValueEnum,
		dateValid: Date,
		inputValueX: number,
		inputValueY: number,
		changeValueX: number,
		changeValueY: number,
		tangens: number,
		changeTangens: number,
		private channel: Channel
	) {
		super(
			id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight,
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens,
			null, null, channel.Id, null
		);
	}

	static toObject(e: MatrixChannel): any {
		var o = Matrix.toObject(e);
		o.channel = e.channel.toObject();
		return o;
	}

	toObject() {
		return MatrixChannel.toObject(this);
	}

	static fromRow(o: any): MatrixChannel {
		return new MatrixChannel(
			EntityPreparer.intOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_MATRIX_ID]),
			EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID]),
			SectionFactory.createSectionEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]),
			EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_RELATIVE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_WEIGHT]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_RELATIVE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_WEIGHT]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PREDICTION]),
			QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_QUADRANT]),
			EntityPreparer.date(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_TANGENS]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_TANGENS]),
			Channel.fromRow(o)
		);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixChannel) {
			return this.Channel.Id == (<MatrixChannel> matrix).Channel.Id;
		}
		return false;
	}

}
