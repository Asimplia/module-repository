
import Repository = require('../index');
import List = require('../Entity/List');
import Channel = require('../Entity/EShop/Channel');
import Matrix = require('../Entity/Matrix/Matrix');
import EntityPreparer = require('../Entity/EntityPreparer');

export = ChannelLoader;
class ChannelLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopIdAndLoadIdInMatrixes(eShopId: number, loadId: number, callback: (e: Error, channelList?: List<Channel>) => void) {
		var sql = 'SELECT '+EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ')+' FROM '+Channel.TABLE_NAME+' '
			+' JOIN '+Matrix.TABLE_NAME+' '
			+' ON '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CHANNEL_ID+' = '+Channel.TABLE_NAME+'.'+Channel.COLUMN_CHANNEL_ID+' '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = '+Channel.TABLE_NAME+'.'+Channel.COLUMN_E_SHOP_ID+' '
			+' WHERE '+Channel.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' GROUP BY '+Channel.TABLE_NAME+'.'+Channel.COLUMN_E_SHOP_ID+', '+Channel.TABLE_NAME+'.'+Channel.COLUMN_CHANNEL_ID+' '
			+' ORDER BY '+Channel.TABLE_NAME+'.'+Channel.COLUMN_CHANNEL_ID+' ';
		this.connection.query(sql, 
			[eShopId, loadId], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Channel>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Channel>();
		result.rows.forEach((row) => {
			var record = Channel.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}
}
