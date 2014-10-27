
import _ = require('underscore');
import moment = require('moment');
var googleapis = require('googleapis');

export = GoogleLoader;
class GoogleLoader {

	private oauth2: any;
	private jwt: any;
	private webApplicationClientId: string;
	private webApplicationClientSecret: string;
	private serviceAccountEmailAddress: string;
	private serviceAccountClientId: string;
	private serviceAccountPrivateKeyPath: string;

	constructor() {
		this.webApplicationClientId = process.env.GOOGLE_API_WEB_APPLICATION_CLIENT_ID || '268122361426-93rub6mj0tjkvtjor4d4ifei4o65bhiq.apps.googleusercontent.com';
		this.webApplicationClientSecret = process.env.GOOGLE_API_CLIENT_SECRET || '6hRKl1NPzR_z40r47icIGKie';
		this.serviceAccountEmailAddress = process.env.GOOGLE_API_SERVICE_ACCOUNT_EMAIL_ADDRESS || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu@developer.gserviceaccount.com';
		this.serviceAccountClientId = process.env.GOOGLE_API_SERVICE_ACCOUNT_CLIENT_ID || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu.apps.googleusercontent.com';
		this.serviceAccountPrivateKeyPath = process.env.GOOGLE_API_SERVICE_ACCOUNT_PRIVATE_KEY_PATH || __dirname + '/../../../certs/privatekey.googleapi.pem';
		this.oauth2 = new googleapis.auth.OAuth2(this.serviceAccountClientId);
		googleapis.options({
			auth: this.oauth2
		});
		this.jwt = new googleapis.auth.JWT(
			this.serviceAccountEmailAddress, 
			this.serviceAccountPrivateKeyPath,
			null,
			['https://www.googleapis.com/auth/analytics.readonly']
		);
	}
	
	getClientId(callback: (e: Error, clientId?: string) => void) {
		callback(null, this.webApplicationClientId);
	}

	getAccessToken(code: string, permissionScopes: string[], callback: (e: Error, accessToken?: string) => void) {
		this.jwt.authorize((e: Error, result) => {
			callback(e, result.access_token);
		});
	}

	getData(
		accessToken: string, 
		profileId: string, 
		startDate: Date, 
		endDate: Date,
		metrics: string[],
		dimensions: string[],
		sort: string, 
		filters: string[], 
		segment: string,
		callback: (e: Error, data?: any[]) => void
	) {
		var analytics = googleapis.analytics({ version: 'v3' });
		this.oauth2.setCredentials({
			access_token: accessToken
		});
		analytics.data.ga.get({
			"ids": profileId,
			"start-date": moment(startDate).format('YYYY-MM-DD'),
			"end-date": moment(endDate).format('YYYY-MM-DD'),
			"metrics": metrics.join(','),
			"dimensions": dimensions.join(','),
			"sort": sort,
			"filters": filters.join(','),
			"segment": segment
		}, (e: Error, result?: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, result.rows);
		});
	}
}
