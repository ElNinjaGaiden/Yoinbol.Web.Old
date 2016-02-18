import BaseStore from './base';

class LoadingStore extends BaseStore {
	
	constructor() {
		super();
		this._loading = false;
	}

	get loading () {
		return this._loading;
	}

	set loading (value) {
		this._loading = value;
		this.emitChange(value);
	}
}

export default new LoadingStore()