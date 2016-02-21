import BaseService from './base';
import SessionStore from '../store/session';

class LocalesService extends BaseService {

	constructor() {
		super();
		this._loading = false;
		this._promise = null;
		this._languageId = null;
	}

	get languageId () {
		return this._languageId;
	}

	refresh(languageId) {
		this._languageId = languageId;
		this.load();
	}

	load (languageId, scope) {
		const me = this;
		if(!me._loading) {
			const url = 'dist/assets/locales/' + (languageId || this._languageId) + '.json';
			me._loading = true;
			me._promise = me.apiRequest(url, {}, 'GET', scope || this).always(function () {
				me._loading = false;
			});
			return me._promise;
		}
		else {
			return me._promise;
		}
	}
}

export default new LocalesService()