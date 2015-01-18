
import Repository = require("../../../src/index");
import i = require('../../IntegrationPreparer');
import ChecklistLoader = Repository.Checklist.ChecklistLoader;
import ChecklistRecorder = Repository.Checklist.ChecklistRecorder;
import Checklist = Repository.Entity.Checklist.Checklist;
import List = Repository.Entity.List;
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
				id: null,
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

		it("should return same instance by insert or update list", (done) => {
			var checklistList = new List<Checklist>([
				Checklist.fromObject({
					id: null,
					eShopId: 1,
					dateCreated: new Date(),
					section: 'MP1',
					name: { cs: 'a', en: 'b' },
					checkItems: [],
					mainImage: { id: '1' },
					dateResolved: null
				}),
				Checklist.fromObject({
					id: null,
					eShopId: 1,
					dateCreated: new Date(),
					section: 'MP2',
					name: { cs: 'c', en: 'b' },
					checkItems: [],
					mainImage: { id: '1' },
					dateResolved: null
				})
			]);
			checklistRecorder.insertOrUpdateList(checklistList, (e: Error, checklistList?: List<Checklist>) => {
				if (e) {
					expect(false).toBeTruthy();
					done();
					return;
				}
				var checklist = checklistList.first();
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
				checklist = checklistList.last();
				expect(checklist.Id).toBe('2');
				checklistLoader.getById(1, '2', (e: Error, checklist?: Checklist) => {
					if (e) {
						expect(false).toBeTruthy();
						done();
						return;
					}
					expect(checklist.Id).toBe('2');
					done();
				});
			});
		});
	});
});
