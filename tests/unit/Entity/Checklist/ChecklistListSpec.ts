
import Repository = require('../../../../src/index');
import ChecklistList = Repository.Entity.Checklist.ChecklistList;
import Checklist = Repository.Entity.Checklist.Checklist;
/* tslint:disable */
Repository;
/* tslint:enable */

describe('Entity.Checklist.ChecklistList', () => {

	describe('areAllDone', () => {

		it('should check truthy if all check item values are done (checked or green)', () => {
			var checklistList = new ChecklistList([
				Checklist.fromObject({
					id: '1',
					name: {
						cs: 'Co?',
						en: 'What?'
					},
					dateCreated: new Date(),
					dateResolved: null,
					eShopId: 1,
					section: 'PRODUCT',
					mainImage: {
						id: '1'
					},
					statistics: {
						doneIndex: 1
					}
				}),
			]);
			expect(checklistList.areAllDone()).toBeTruthy();
		});
	});
});
