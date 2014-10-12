
import ColumnEnum = require('./ColumnEnum');
import Matrix = require('./Matrix');

export = ColumnFactory;
class ColumnFactory {

	static createColumnEnum(column: string) {
		switch (column) {
			case ColumnEnum[ColumnEnum.SCORE_ABSOLUTE]:
				return ColumnEnum.SCORE_ABSOLUTE;
			case ColumnEnum[ColumnEnum.SCORE_RELATIVE]:
				return ColumnEnum.SCORE_RELATIVE;
			case ColumnEnum[ColumnEnum.SCORE_WEIGHT]:
				return ColumnEnum.SCORE_WEIGHT;
			case ColumnEnum[ColumnEnum.CHANGE_ABSOLUTE]:
				return ColumnEnum.CHANGE_ABSOLUTE;
			case ColumnEnum[ColumnEnum.CHANGE_RELATIVE]:
				return ColumnEnum.CHANGE_RELATIVE;
			case ColumnEnum[ColumnEnum.CHANGE_WEIGHT]:
				return ColumnEnum.CHANGE_WEIGHT;
			case ColumnEnum[ColumnEnum.PREDICTION]:
				return ColumnEnum.PREDICTION;
			case ColumnEnum[ColumnEnum.INPUT_VALUE_X]:
				return ColumnEnum.INPUT_VALUE_X;
			case ColumnEnum[ColumnEnum.INPUT_VALUE_Y]:
				return ColumnEnum.INPUT_VALUE_Y;
			case ColumnEnum[ColumnEnum.CHANGE_VALUE_X]:
				return ColumnEnum.CHANGE_VALUE_X;
			case ColumnEnum[ColumnEnum.CHANGE_VALUE_Y]:
				return ColumnEnum.CHANGE_VALUE_Y;
			case ColumnEnum[ColumnEnum.TANGENS]:
				return ColumnEnum.TANGENS;
			case ColumnEnum[ColumnEnum.CHANGE_TANGENS]:
				return ColumnEnum.CHANGE_TANGENS;
		}
		return ColumnEnum.UNKNOWN;
	}

	static getMatrixColumnValue(matrix: Matrix, column: ColumnEnum) {
		var columnValue = null;
		switch (column) {
			case ColumnEnum.CHANGE_ABSOLUTE:
				columnValue = matrix.ChangeAbsolute;
				break;
			case ColumnEnum.CHANGE_RELATIVE:
				columnValue = matrix.ChangeRelative;
				break;
			case ColumnEnum.CHANGE_WEIGHT:
				columnValue = matrix.ChangeWeight;
				break;
			case ColumnEnum.SCORE_ABSOLUTE:
				columnValue = matrix.ScoreAbsolute;
				break;
			case ColumnEnum.SCORE_RELATIVE:
				columnValue = matrix.ScoreRelative;
				break;
			case ColumnEnum.SCORE_WEIGHT:
				columnValue = matrix.ScoreWeight;
				break;
			case ColumnEnum.PREDICTION:
				columnValue = matrix.Prediction;
				break;
			case ColumnEnum.INPUT_VALUE_X:
				columnValue = matrix.InputValueX;
				break;
			case ColumnEnum.INPUT_VALUE_Y:
				columnValue = matrix.InputValueY;
				break;
			case ColumnEnum.CHANGE_VALUE_X:
				columnValue = matrix.ChangeValueX;
				break;
			case ColumnEnum.CHANGE_VALUE_Y:
				columnValue = matrix.ChangeValueY;
				break;
			case ColumnEnum.TANGENS:
				columnValue = matrix.Tangens;
				break;
			case ColumnEnum.CHANGE_TANGENS:
				columnValue = matrix.ChangeTangens;
				break;
		}
		return columnValue;
	}
}
