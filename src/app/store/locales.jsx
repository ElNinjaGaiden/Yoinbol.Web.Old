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

	load () {
		var me = this;
		if(!me.initialized) {
			LocalesService.load().done(function (response) {
				me._locales = response;
				me._initialized = true;
				me.emitChange(response);
			});
		}
	}

	get (key) {
		const me = this;
		const locales = me._locales;
		return locales[key];
	}

}

export default new LocalesStore()