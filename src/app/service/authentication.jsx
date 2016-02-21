import BaseService from './base';
import ConfigurationService from './configuration';

class AuthenticationService extends BaseService {

	login (username, password, rememberMe, accessToken, scope) {

		const 	me 		= this,
				data 	= {
					login           : username,
		            password        : password,
		            frontEndId      : ConfigurationService.frontEndId,
		            accountType     : 1,
		            rememberMe		: rememberMe,
		            accessToken		: accessToken
				},
				url 	= me.getUrl('authentication/initsession');

		return me.apiRequest(url, data, 'POST', scope || me);
	}

	logout (sessionTicket, scope) {
		const url = this.getUrl('authentication/endSession');
		const data = { sessionTicket: sessionTicket };
		return this.apiRequest(url, data, 'POST', scope || this);
	}
}

export default new AuthenticationService()