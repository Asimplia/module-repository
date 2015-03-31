
import Repository = require('../../../../src/index');
import CheckItem = Repository.Entity.Checklist.CheckItem;
import ValueTypeEnum = Repository.Entity.Checklist.ValueTypeEnum;
/* tslint:disable */
Repository;
/* tslint:enable */

describe('Entity.Checklist.CheckItem', () => {
	describe('fromObject', () => {
		it('should return instance with valueType enum like integer', () => {
			var checkItem = CheckItem.fromObject({
				label: { cs: 'Produkt peněženka', en: 'Product wallet' },
				values: [{
					valueType: 'EAN',
					dateChecked: null,
					priorityType: 'GREEN'
				}]
			});
			expect(checkItem.Label.Cs).toBe('Produkt peněženka');
			expect(checkItem.Label.En).toBe('Product wallet');
			expect(checkItem.ValueList.count()).toBe(1);
			var value = checkItem.ValueList.first();
			expect(value.toObject().valueType).toBe('EAN');
			switch (value.ValueType) {
				case ValueTypeEnum.EAN:
					expect(true).toBeTruthy();
					break;
				default:
					expect(false).toBeTruthy();
			}
		});
	});
});
