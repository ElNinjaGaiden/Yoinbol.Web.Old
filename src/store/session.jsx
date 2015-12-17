import BaseStore from './base';

class SessionStore extends BaseStore {

	test() {
		console.log('Hola');
		return 10;
	}
}

export default new SessionStore()