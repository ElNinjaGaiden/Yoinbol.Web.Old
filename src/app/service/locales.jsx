import BaseService from './base';
import SessionStore from '../store/session';

class LocalesService extends BaseService {

	constructor() {
		super();
		this._loading = false;
		this._promise = null;
	}

	load (languageId, scope) {
		const me = this;
		if(!me._loading) {
			const url = 'dist/assets/locales/' + languageId + '.json';
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