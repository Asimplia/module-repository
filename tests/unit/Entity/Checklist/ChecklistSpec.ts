
import Repository = require("../../../../src/index");
import Checklist = Repository.Entity.Checklist.Checklist;
import SectionEnum = Repository.Entity.Section.SectionEnum;
Repository;

describe('Checklist', () => {
	describe("fromObject", () => {
		it("should return instance with section enum like integer", () => {
			var checklist = Checklist.fromObject({
				id: '1',
				dateCreated: new Date(),
				section: 'MP1',
				name: { cs: 'a', en: 'b' },
				checkItems: [],
				mainImage: { id: '1' },
				dateResolved: null
			});
			expect(checklist.Section).toBe(2);
			expect(checklist.toObject().section).toBe('MP1');
			switch (checklist.Section) {
				case SectionEnum.MP1:
					expect(true).toBeTruthy();
					break;
				default:
					expect(false).toBeTruthy();
			}
		});
	});
});
