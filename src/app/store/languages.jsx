import BaseStore from './base';
import LanguagesService from '../service/languages';

class LanguagesStore extends BaseStore {

	constructor() {
		super();
		this._languages = [];
	}

	get languages () {
		return this._languages;
	}

	load () {
		var me = this;
		if(!me.initialized) {
			LanguagesService.load().done(function (response) {
				if(response.Result === 0) {
					me._languages = response.Data;
					me._initialized = true;
					me.emitChange(response.Data);
				}
			});
		}
	}
}

export default new LanguagesStore()