import BaseService from './base';

class LanguagesService extends BaseService {

	load () {
		const url = this.getUrl('languajes/GetActive');
		return this.apiRequest(url, {}, 'GET', this);
	}
}

export default new LanguagesService()