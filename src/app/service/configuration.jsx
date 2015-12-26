import BaseService from './base';

class ConfigurationService extends BaseService {

	get defaultLanguage() {
    	return 'es-CR';
	}
}

export default new ConfigurationService()