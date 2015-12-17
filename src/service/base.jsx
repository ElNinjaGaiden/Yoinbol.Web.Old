import jquery from 'jquery';

class BaseService {

	constructor() {
		var me = this;
		me.baseUrl = 'http://192.168.0.6/api';
		me.dataType = 'json';
		me.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        me.crossDomain = true;
	}

	getUrl(endpoint) {
		var me = this;
		return me.baseUrl + '/' + endpoint;
	}

	apiRequest (url, data, method, scope) {
		var me = this;

		return jquery.ajax({
            url:  url, //url
            type: method, //GET/POST/PUT/DELETE/OPTIONS
            dataType: me.dataType, //data type returned by the server
            contentType: me.contentType, //data type to send to the server
            data: data, //data
            context: scope || me, //callbacks execution context
            crossDomain: me.crossDomain // cross domain
        });
	}

}

export default BaseService