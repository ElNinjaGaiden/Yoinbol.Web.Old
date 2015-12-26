import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/app';

export default class BaseStore extends EventEmitter {

  constructor() {
    super();
    this._initialized = false;
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispatcher.register(actionSubscribe());
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  get initialized () {
    return this._initialized;
  }

  emitChange() {
    this.emit('CHANGE', arguments && arguments[0]);
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}