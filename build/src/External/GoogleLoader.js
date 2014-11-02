var moment = require('moment');
var googleapis = require('googleapis');

var GoogleLoader = (function () {
    function GoogleLoader() {
        this.webApplicationClientId = process.env.GOOGLE_API_WEB_APPLICATION_CLIENT_ID || '268122361426-93rub6mj0tjkvtjor4d4ifei4o65bhiq.apps.googleusercontent.com';
        this.webApplicationClientSecret = process.env.GOOGLE_API_CLIENT_SECRET || '6hRKl1NPzR_z40r47icIGKie';
        this.serviceAccountEmailAddress = process.env.GOOGLE_API_SERVICE_ACCOUNT_EMAIL_ADDRESS || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu@developer.gserviceaccount.com';
        this.serviceAccountClientId = process.env.GOOGLE_API_SERVICE_ACCOUNT_CLIENT_ID || '268122361426-v4qp2m1f2iqq1t5e8a923itm272korsu.apps.googleusercontent.com';
        this.serviceAccountPrivateKeyPath = process.env.GOOGLE_API_SERVICE_ACCOUNT_PRIVATE_KEY_PATH || __dirname + '/../../../certs/privatekey.googleapi.pem';
        this.webApplicationRedirectUri = process.env.GOOGLE_API_WEB_APPLICATION_REDIRECT_URI || 'https://localhost:8081/oauth2callback';
    }
    GoogleLoader.prototype.getClientId = function (callback) {
        callback(null, this.webApplicationClientId);
    };

    GoogleLoader.prototype.getAccessTokenByRefreshToken = function (refreshToken, callback) {
        var oauth2 = this.createOAuth2();
        oauth2.setCredentials({ refresh_token: refreshToken });
        oauth2.refreshAccessToken(function (e, credentials) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, credentials.access_token);
        });
    };

    GoogleLoader.prototype.getRefreshTokenByCode = function (code, callback) {
        var oauth2 = this.createOAuth2();
        oauth2.getToken(code, function (e, credentials) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, credentials.refresh_token);
        });
    };

    GoogleLoader.prototype.getAnalyticsData = function (accessToken, profileId, startDate, endDate, metrics, dimensions, sort, filters, segment, callback) {
        var oauth2 = this.createOAuth2();
        oauth2.setCredentials({
            access_token: accessToken
        });
        googleapis.options({
            auth: oauth2
        });
        var analytics = googleapis.analytics({ version: 'v3' });
        var options = {
            "ids": profileId,
            "start-date": moment(startDate).format('YYYY-MM-DD'),
            "end-date": moment(endDate).format('YYYY-MM-DD'),
            "metrics": metrics ? metrics.join(',') : '',
            "max-results": 10000
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

        analytics.data.ga.get(options, function (e, result) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, result);
        });
    };

    GoogleLoader.prototype.createOAuth2 = function () {
        return new googleapis.auth.OAuth2(this.webApplicationClientId, this.webApplicationClientSecret, this.webApplicationRedirectUri);
    };
    return GoogleLoader;
})();
module.exports = GoogleLoader;
