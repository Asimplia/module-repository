
import mongoose = require('mongoose');

export = IMatrixDocument;
interface IMatrixDocument extends mongoose.Document {
	id?: string; // id: number;
	eShopId: number;
	section: string;
	loadId: number;
	scoreAbsolute: number;
	scoreRelative: number;
	scoreWeight: number;
	changeAbsolute: number;
	changeRelative: number;
	changeWeight: number;
	prediction: number;
	quadrant: string;
	dateValid: Date;
	inputValueX: number;
	inputValueY: number;
	changeValueX: number;
	changeValueY: number;
	tangens: number;
	changeTangens: number;
	productId: number;
	customerId: number;
	channelId: number;
	categoryId: number;
}
