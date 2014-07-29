
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import Channel = require('../EShop/Channel');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');

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
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens
		);
	}

	static fromRow(o: any): MatrixChannel {
		return new MatrixChannel(
			o[Matrix.COLUMN_MATRIX_ID],
			o[Matrix.COLUMN_E_SHOP_ID],
			SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]),
			o[Matrix.COLUMN_LOAD_ID],
			o[Matrix.COLUMN_SCORE_ABSOLUTE],
			o[Matrix.COLUMN_SCORE_RELATIVE],
			o[Matrix.COLUMN_SCORE_WEIGHT],
			o[Matrix.COLUMN_CHANGE_ABSOLUTE],
			o[Matrix.COLUMN_CHANGE_RELATIVE],
			o[Matrix.COLUMN_CHANGE_WEIGHT],
			o[Matrix.COLUMN_PREDICTION],
			QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]),
			moment(o[Matrix.COLUMN_DATE_VALID]).toDate(),
			o[Matrix.COLUMN_INPUT_VALUE_X],
			o[Matrix.COLUMN_INPUT_VALUE_Y],
			o[Matrix.COLUMN_CHANGE_VALUE_X],
			o[Matrix.COLUMN_CHANGE_VALUE_Y],
			o[Matrix.COLUMN_TANGENS],
			o[Matrix.COLUMN_CHANGE_TANGENS],
			new Channel(o[Matrix.COLUMN_CHANNEL_ID], o[Matrix.COLUMN_E_SHOP_ID])
		);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixChannel) {
			return this.Channel.Id == (<MatrixChannel> matrix).Channel.Id;
		}
		return false;
	}

}
