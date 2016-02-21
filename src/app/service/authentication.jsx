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
}

export default new AuthenticationService()