import BaseStore from './base';
import ConfigurationService from '../service/configuration';

class SessionStore extends BaseStore {

    constructor () {
        super();
        this._user = null;
        //this._jwt = null;
    }

    get user() {
        return this._user;
    }

    // get jwt() {
    //     return this._jwt;
    // }

    isLoggedIn() {
        return !!this._user;
    }

    get currentLanguageId () {
        const languageId = localStorage.getItem('languageId') || ConfigurationService.defaultLanguage;
        return  languageId;
    }

    set currentLanguageId (languageId) {
        localStorage.setItem('languageId', languageId);
    }
}

export default new SessionStore()