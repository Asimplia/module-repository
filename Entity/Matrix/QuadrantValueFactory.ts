
import QuadrantValueEnum = require('./QuadrantValueEnum');

export = QuadrantValueFactory;
class QuadrantValueFactory {

	public static createQuadrantValueEnum(quadrant: any) {
		switch (quadrant) {
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_TOP]:
			case QuadrantValueEnum.RIGHT_TOP:
				return QuadrantValueEnum.RIGHT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_TOP]:
			case QuadrantValueEnum.LEFT_TOP:
				return QuadrantValueEnum.LEFT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_BOTTOM]:
			case QuadrantValueEnum.RIGHT_BOTTOM:
				return QuadrantValueEnum.RIGHT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_BOTTOM]:
			case QuadrantValueEnum.LEFT_BOTTOM:
				return QuadrantValueEnum.LEFT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT]:
			case QuadrantValueEnum.RIGHT:
				return QuadrantValueEnum.RIGHT;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT]:
			case QuadrantValueEnum.LEFT:
				return QuadrantValueEnum.LEFT;
			case QuadrantValueEnum[QuadrantValueEnum.BOTTOM]:
			case QuadrantValueEnum.BOTTOM:
				return QuadrantValueEnum.BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.TOP]:
			case QuadrantValueEnum.TOP:
				return QuadrantValueEnum.TOP;
		}
		return QuadrantValueEnum.UNKNOWN;
	}

}
