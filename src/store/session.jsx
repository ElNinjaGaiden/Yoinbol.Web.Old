import BaseStore from './base';

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
}

export default new SessionStore()