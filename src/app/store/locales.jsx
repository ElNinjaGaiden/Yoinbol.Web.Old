import BaseStore from './base';
import LocalesService from '../service/locales';

class LocalesStore extends BaseStore {

	constructor() {
		super();
		this._locales = {};
	}

	get locales () {
		return this._locales;
	}

	refresh (languageId) {
		LocalesService.load(languageId, this).done(function (response) {
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