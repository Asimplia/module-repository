
import PriorityTypeEnum = require('./PriorityTypeEnum');

export = PriorityTypeFactory;
class PriorityTypeFactory {
	
	static createPriorityTypeEnum(priorityType: string) {
		switch (priorityType) {
			case PriorityTypeEnum[PriorityTypeEnum.RED]:
				return PriorityTypeEnum.RED;
			case PriorityTypeEnum[PriorityTypeEnum.GREEN]:
				return PriorityTypeEnum.GREEN;
		}
		return PriorityTypeEnum.UNKNOWN;
	}
}