var moment = require('moment');
var googleapis = require('googleapis');

var GoogleLoader = (function () {
    function GoogleLoader() {
        this.webApplicationClientId = process.env.GOOGLE_API_WEB_APPLICATION_CLIENT_ID || '268122361426-93rub6mj0tjkvtjor4d4ifei4o65bhiq.apps.googleusercontent.com';
        this.webApplicationClientSecret = process.env.GOOGLE_API_CLIENT_SECRET || '6hRKl1NPzR_z40r47icIGKie';
        this.serviceAccountEmailAddress = process.env.GOOGLE_API_SERVICE_ACCOUNT_EMAIL_ADDRESS || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu@developer.gserviceaccount.com';
        this.serviceAccountClientId = process.env.GOOGLE_API_SERVICE_ACCOUNT_CLIENT_ID || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu.apps.googleusercontent.com';
        this.serviceAccountPrivateKeyPath = process.env.GOOGLE_API_SERVICE_ACCOUNT_PRIVATE_KEY_PATH || __dirname + '/../../../certs/privatekey.googleapi.pem';
        this.oauth2 = new googleapis.auth.OAuth2(this.serviceAccountClientId);
        googleapis.options({
            auth: this.oauth2
        });
        this.jwt = new googleapis.auth.JWT(this.serviceAccountEmailAddress, this.serviceAccountPrivateKeyPath, null, ['https://www.googleapis.com/auth/analytics.readonly']);
    }
    GoogleLoader.prototype.getClientId = function (callback) {
        callback(null, this.webApplicationClientId);
    };

    GoogleLoader.prototype.getAccessToken = function (code, permissionScopes, callback) {
        this.jwt.authorize(function (e, result) {
            callback(e, result.access_token);
        });
    };

    GoogleLoader.prototype.getData = function (accessToken, profileId, startDate, endDate, metrics, dimensions, sort, filters, segment, callback) {
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
        }, function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, result.rows);
        });
    };
    return GoogleLoader;
})();
module.exports = GoogleLoader;
