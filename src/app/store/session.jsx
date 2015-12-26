import BaseStore from './base';
import ConfigurationService from '../service/configuration';

class SessionStore extends BaseStore {

  constructor () {
		super();
		this._user = null;
		this._jwt = null;
	}

	get user() {
    return this._user;
	}

	get jwt() {
		return this._jwt;
	}

	isLoggedIn() {
  	return !!this._user;
	}

  get currentLanguage() {
    const me = this;
    if(me.isLoggedIn()) {
      const user = me.user;
      return user.Languaje;
    }
    else {
      return ConfigurationService.defaultLanguage;
    }
  }
}

export default new SessionStore()