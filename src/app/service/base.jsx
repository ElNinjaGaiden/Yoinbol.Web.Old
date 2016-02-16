import jquery from 'jquery';
import ConfigurationService from './configuration';

class BaseService {

	constructor() {
		var me = this;
	}

	getUrl(endpoint) {
		var me = this;
		return ConfigurationService.proxyConfiguration.baseUrl + '/' + endpoint;
	}

	apiRequest (url, data, method, scope) {
		var me = this;

		return jquery.ajax({
            url:  url, //url
            type: method, //GET/POST/PUT/DELETE/OPTIONS
            dataType: ConfigurationService.proxyConfiguration.dataType, //data type returned by the server
            contentType: ConfigurationService.proxyConfiguration.contentType, //data type to send to the server
            data: data, //data
            context: scope || me, //callbacks execution context
            crossDomain: ConfigurationService.proxyConfiguration.crossDomain // cross domain
        });
	}

}

export default BaseService