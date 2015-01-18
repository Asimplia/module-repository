
import Repository = require("../../../../src/index");
import Value = Repository.Entity.Checklist.Value;
import ValueTypeEnum = Repository.Entity.Checklist.ValueTypeEnum;
Repository;

describe('Entity.Checklist.Value', () => {
	describe("fromObject", () => {
		it("should return instance", () => {
			var value = Value.fromObject({
				valueType: 'EAN',
				dateChecked: null
			});
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
