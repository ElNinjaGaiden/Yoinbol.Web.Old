import BaseService from './base';

class LanguagesService extends BaseService {

	load () {
		const me = this;
		const url = me.getUrl('languajes/GetActive');
		return me.apiRequest(url, {}, 'GET', me);
	}
}

export default new LanguagesService()