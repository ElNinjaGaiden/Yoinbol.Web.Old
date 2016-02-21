import BaseStore from './base';
import LocalesService from '../service/locales';
import SessionStore from './session';

class LocalesStore extends BaseStore {

	constructor() {
		super();
		this._languageId = null;
		this._locales = {};
	}

	get languageId () {
		return this._languageId;
	}

	get locales () {
		return this._locales;
	}

	load (languageId) {
		const _languageId = languageId || SessionStore.currentLanguageId;
		LocalesService.load(_languageId, this).done(function (response) {
			this._languageId = _languageId;
			this._locales = response;
			this._initialized = true;
			this.emitChange(response);
		});
	}

	get (key) {
		return this._locales[key];
	}

}

export default new LocalesStore()