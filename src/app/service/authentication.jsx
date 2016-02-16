import BaseService from './base';

class AuthenticationService extends BaseService {

	login (username, password, rememberMe, accessToken, scope) {

		const 	me 		= this,
				data 	= {
					login           : username,
		            password        : password,
		            frontEndId      : 2,
		            accountType     : 1,
		            rememberMe		: rememberMe,
		            accessToken		: accessToken
				},
				url 	= me.getUrl('authentication/initsession');

		return me.apiRequest(url, data, 'POST', scope || me);
	}
}

export default new AuthenticationService()