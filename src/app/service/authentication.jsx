import BaseService from './base';
import ConfigurationService from './configuration';

class AuthenticationService extends BaseService {

	login (username, password, rememberMe, accessToken, accountType, scope) {

		const 	me 		= this,
				data 	= {
					login           : username,
		            password        : password,
		            frontEndId      : ConfigurationService.frontEndId,
		            accountType     : accountType,
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