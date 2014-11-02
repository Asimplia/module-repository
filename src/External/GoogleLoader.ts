
import _ = require('underscore');
import moment = require('moment');
var googleapis = require('googleapis');

export = GoogleLoader;
class GoogleLoader {

	private webApplicationClientId: string;
	private webApplicationClientSecret: string;
	private webApplicationRedirectUri: string;
	private serviceAccountEmailAddress: string;
	private serviceAccountClientId: string;
	private serviceAccountPrivateKeyPath: string;

	constructor() {
		this.webApplicationClientId = process.env.GOOGLE_API_WEB_APPLICATION_CLIENT_ID || '268122361426-93rub6mj0tjkvtjor4d4ifei4o65bhiq.apps.googleusercontent.com';
		this.webApplicationClientSecret = process.env.GOOGLE_API_CLIENT_SECRET || '6hRKl1NPzR_z40r47icIGKie';
		this.serviceAccountEmailAddress = process.env.GOOGLE_API_SERVICE_ACCOUNT_EMAIL_ADDRESS || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu@developer.gserviceaccount.com';
		this.serviceAccountClientId = process.env.GOOGLE_API_SERVICE_ACCOUNT_CLIENT_ID || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu.apps.googleusercontent.com';
		this.serviceAccountPrivateKeyPath = process.env.GOOGLE_API_SERVICE_ACCOUNT_PRIVATE_KEY_PATH || __dirname + '/../../../certs/privatekey.googleapi.pem';
		this.webApplicationRedirectUri = process.env.GOOGLE_API_WEB_APPLICATION_REDIRECT_URI || 'https://localhost:8081/oauth2callback';
	}
	
	getClientId(callback: (e: Error, clientId?: string) => void) {
		callback(null, this.webApplicationClientId);
	}

	getAccessTokenByRefreshToken(refreshToken: string, callback: (e: Error, accessToken?: string) => void) {
		var oauth2 = this.createOAuth2();
		oauth2.setCredentials({ refresh_token: refreshToken })
		oauth2.refreshAccessToken((e: Error, credentials) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, credentials.access_token);
		});
	}

	getRefreshTokenByCode(code: string, callback: (e: Error, refreshToken?: string) => void) {
		var oauth2 = this.createOAuth2();
		oauth2.getToken(code, (e: Error, credentials) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, credentials.refresh_token);
		});
	}

	getAnalyticsProfiles(accessToken: string, callback: (e: Error, data?: any) => void) {
		var oauth2 = this.createOAuth2();
		oauth2.setCredentials({
			access_token: accessToken
		});
		googleapis.options({
			auth: oauth2
		});
		var analytics = googleapis.analytics({ version: 'v3' });
		var options = {
			accountId: '~all',
			webPropertyId: '~all'
		};
		analytics.management.profiles.list(options, (e: Error, result?: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, result);
		});
	}

	getAnalyticsData(
		accessToken: string, 
		profileId: string, 
		startDate: Date, 
		endDate: Date,
		metrics: string[],
		dimensions: string[],
		sort: string, 
		filters: string[], 
		segment: string,
		callback: (e: Error, data?: any) => void
	) {
		var oauth2 = this.createOAuth2();
		oauth2.setCredentials({
			access_token: accessToken
		});
		googleapis.options({
			auth: oauth2
		});
		var analytics = googleapis.analytics({ version: 'v3' });
		var options: any = {
			"ids": profileId,
			"start-date": moment(startDate).format('YYYY-MM-DD'),
			"end-date": moment(endDate).format('YYYY-MM-DD'),
			"metrics": metrics ? metrics.join(',') : '',
			"max-results": 10000 // TODO add paging
		};
		if (dimensions) {
			options['dimensions'] = dimensions.join(',');
		}
		if (sort) {
			options['sort'] = sort;
		}
		if (filters) {
			options['filters'] = filters.join(',');
		}
		if (segment) {
			options['segment'] = segment;
		}

		analytics.data.ga.get(options, (e: Error, result?: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, result);
		});
	}

	private createOAuth2() {
		return new googleapis.auth.OAuth2(this.webApplicationClientId, this.webApplicationClientSecret, this.webApplicationRedirectUri)
	}
}
