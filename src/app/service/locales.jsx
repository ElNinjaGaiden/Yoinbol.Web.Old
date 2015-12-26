import BaseService from './base';
import SessionStore from '../store/session';

class LocalesService extends BaseService {

	constructor() {
		super();
		this._loading = false;
		this._promise = null;
	}

	load () {
		const me = this;
		if(!me._loading) {
			const currentLanguageId = SessionStore.currentLanguageId;
			const url = 'dist/assets/locales/' + currentLanguageId + '.json';
			me._loading = true;
			me._promise = me.apiRequest(url, {}, 'GET', me).always(function () {
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