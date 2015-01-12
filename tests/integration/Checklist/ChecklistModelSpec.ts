
import Repository = require("../../../src/index");
import i = require('../../IntegrationPreparer');
import ChecklistLoader = Repository.Checklist.ChecklistLoader;
import ChecklistRecorder = Repository.Checklist.ChecklistRecorder;
import Checklist = Repository.Entity.Checklist.Checklist;
Repository;

describe('ChecklistModel', () => {
	beforeEach((done) => {
		i.startup(done);
	});
	var checklistRecorder = new ChecklistRecorder();
	var checklistLoader = new ChecklistLoader();

	describe("load recorded checklist", () => {
		beforeEach((done) => {
			i.setup(done);
		});

		it("should return same instance", (done) => {
			var checklist = Checklist.fromObject({
				id: '1',
				eShopId: 1,
				dateCreated: new Date(),
				section: 'MP1',
				name: { cs: 'a', en: 'b' },
				checkItems: [],
				mainImage: { id: '1' },
				dateResolved: null
			});
			checklistRecorder.insertOrUpdate(checklist, (e: Error, checklist?: Checklist) => {
				if (e) {
					expect(false).toBeTruthy();
					done();
					return;
				}
				expect(checklist.Id).toBe('1');
				checklistLoader.getById(1, '1', (e: Error, checklist?: Checklist) => {
					if (e) {
						expect(false).toBeTruthy();
						done();
						return;
					}
					expect(checklist.Id).toBe('1');
					done();
				});
			});
		});
	});
});
