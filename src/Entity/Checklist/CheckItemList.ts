
import List = require('../List');
import CheckItem = require('./CheckItem');
import CheckTypeEnum = require('./CheckTypeEnum');

export = CheckItemList;
class CheckItemList extends List<CheckItem> {

	getByTypeEan() {
		return this.findOneOnly((entity: CheckItem) => {
			return entity.CheckType == CheckTypeEnum.EAN;
		});
	}
	
	getByTypeDescription() {
		return this.findOneOnly((entity: CheckItem) => {
			return entity.CheckType == CheckTypeEnum.DESCRIPTION;
		});
	}
	
	getByTypePrice() {
		return this.findOneOnly((entity: CheckItem) => {
			return entity.CheckType == CheckTypeEnum.PRICE;
		});
	}
	
	getByTypeTrafic() {
		return this.findOneOnly((entity: CheckItem) => {
			return entity.CheckType == CheckTypeEnum.TRAFIC;
		});
	}

	getByTypeMainImage() {
		return this.findOneOnly((entity: CheckItem) => {
			return entity.CheckType == CheckTypeEnum.MAIN_IMAGE;
		});
	}
	
}
