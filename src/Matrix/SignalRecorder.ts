﻿
import moment = require('moment');
import Signal = require('../Entity/Matrix/Signal');
import Matrix = require('../Entity/Matrix/Matrix');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import SqlExecutor = require('../Util/SqlExecutor');
/* tslint:disable */
Util;
/* tslint:enable */

export = SignalRecorder;
class SignalRecorder {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Signal, Signal.COLUMN_SIGNAL_ID, 'id');
	}

	insertList(signalList: List<Signal>, callback: (e: Error, signalList?: List<Signal>) => void): void {
		signalList.createEach().on('item', (signal: Signal, i: number, next: (e?: Error) => void) => {
			this.insert(signal, next);
		}).on('error', (e: Error) => {
			callback(e);
		}).on('end', () => {
			callback(null, signalList);
		}).parallel(10);
	}

	insert(signal: Signal, callback: (e: Error, signal?: Signal) => void) {
		this.connection.query('INSERT INTO ' + Signal.TABLE_NAME + ' (' + Signal.COLUMN_MATRIX_ID + ', '
			+ Signal.COLUMN_DATE_CREATED + ', ' + Signal.COLUMN_SITUATION_ID + ')'
			+ ' VALUES ($1, $2::timestamp, $3) RETURNING ' + Signal.COLUMN_SIGNAL_ID, [
			signal.Matrix.Id,
			moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			signal.SituationId
		], (e: Error, res: any) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			signal.Id = res.rows[0][Signal.COLUMN_SIGNAL_ID];
			callback(null, signal);
		});
	}

	update(signal: Signal, callback: (e: Error, signal?: Signal) => void) {
		this.connection.query('UPDATE ' + Signal.TABLE_NAME
			+ ' SET ' + Signal.COLUMN_MATRIX_ID + ' = $1'
			+ ', ' + Signal.COLUMN_DATE_CREATED + ' = $2::timestamp'
			+ ', ' + Signal.COLUMN_SITUATION_ID + ' = $3'
			+ ' WHERE ' + Signal.COLUMN_SIGNAL_ID + ' = $4', [
			signal.Matrix.Id,
			moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			signal.SituationId,
			signal.Id
		], (e: Error, res: any) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			callback(null, signal);
		});
	}

	removeByEShopIdAndLoadId(eShopId: number, loadId: number, callback: (e: Error) => void) {
		var sql = 'DELETE FROM ' + Signal.TABLE_NAME + ' '
			+ ' USING ' + Matrix.TABLE_NAME + ' '
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 ';
		this.connection.query(sql, [
			eShopId, loadId
		], (e: Error, result: any) => {
			callback(e);
		});
	}
}
