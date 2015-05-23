
import Situation = require('../Entity/Matrix/Situation');
import ISituationObject = require('../Entity/Matrix/ISituationObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = SituationLoader;
class SituationLoader {

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<Situation, ISituationObject, List<Situation>>
			= new Manager<Situation, ISituationObject, List<Situation>>(Situation, List, connection)
	) {}

	getListNotProcessedSuggestionResult(eShopId: number, loadLogId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.manager.fetchListBy({
			eShopId: eShopId,
			loadLogId: loadLogId,
			dateSuggestionResultProcessed: { $ne: null }
		}, callback);
	}

	getListNotProcessedChecklist(eShopId: number, loadLogId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.manager.fetchListBy({
			eShopId: eShopId,
			loadLogId: loadLogId,
			dateChecklistProcessed: { $ne: null }
		}, callback);
	}

	getListByEShopIdAndLoadIdLimited(
		eShopId: number,
		loadLogId: number,
		limit: number,
		offset: number,
		filter: { productIds?: number[]; customerIds?: number[]; channelIds?: number[] },
		callback: (e: Error, recordList?: List<Situation>) => void
	) {
		var conditions: any = {
			eShopId: eShopId,
			loadLogId: loadLogId,
			$limit: limit,
			$offset: offset
		};
		if (filter.productIds && filter.productIds.length > 0) {
			conditions.productId = { $in: filter.productIds };
		}
		if (filter.customerIds && filter.customerIds.length > 0) {
			conditions.customerId = { $in: filter.customerIds };
		}
		if (filter.channelIds && filter.channelIds.length > 0) {
			conditions.channelId = { $in: filter.channelIds };
		}
		this.manager.fetchListBy(conditions, callback);
	}
}
