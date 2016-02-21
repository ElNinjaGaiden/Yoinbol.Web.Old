import BaseService from './base';

class ConfigurationService {

	get frontEndId () {
		return 2;
	}

	get defaultLanguage() {
    	return 'es-CR';
	}

	get proxyConfiguration() {
		return {
			baseUrl : 'http://192.168.0.5/api',
			//baseUrl : 'http://10.184.154.119/api',
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        	crossDomain : true
		};
	}
}

export default new ConfigurationService()