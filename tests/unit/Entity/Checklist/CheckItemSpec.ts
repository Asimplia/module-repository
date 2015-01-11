
import Repository = require("../../../../src/index");
import CheckItem = Repository.Entity.Checklist.CheckItem;
import CheckTypeEnum = Repository.Entity.Checklist.CheckTypeEnum;
Repository;

describe('CheckItem', () => {
	describe("fromObject", () => {
		it("should return instance with checkType enum like integer", () => {
			var checklist = CheckItem.fromObject({
				dateChecked: new Date(),
				checkType: 'EAN',
			});
			expect(checklist.CheckType).toBe(0);
			expect(checklist.toObject().checkType).toBe('EAN');
			switch (checklist.CheckType) {
				case CheckTypeEnum.EAN:
					expect(true).toBeTruthy();
					break;
				default:
					expect(false).toBeTruthy();
			}
		});
	});
});
