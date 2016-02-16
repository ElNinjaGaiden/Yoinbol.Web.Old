import BaseStore from './base';
import ConfigurationService from '../service/configuration';
import AuthenticationService from '../service/authentication';
import cookie from 'react-cookie';

class SessionStore extends BaseStore {

    constructor () {
        super();
        this._data = null;
    }

    get data () {
        return this._data;
    }

    get user () {
        return this._data ? this._data.UserInfo.User : null;
    }

    get accessToken () {
        return cookie.load('sessionId');
    }

    get UserName () {
        return cookie.load('userName');
    }

    isLoggedIn() {
        return !!this._data;
    }

    hasAccessToken () {
        return !!this.accessToken;
    }

    get currentLanguageId () {
        const languageId = localStorage.getItem('languageId') || ConfigurationService.defaultLanguage;
        return  languageId;
    }

    set currentLanguageId (languageId) {
        localStorage.setItem('languageId', languageId);
    }

    login (userName, password, rememberMe) {
        const me = this;
        const accessToken = cookie.load('sessionId');
        AuthenticationService.login(userName, password, rememberMe, accessToken, me).done(function (response) {
            if(response.Result === 0) {
                me._data = response;
                //If rememberMe is set to true, we store userName and sessionToken locally to future use
                if(rememberMe) {
                    cookie.save('sessionId', response.SessionTicket.AccessToken);
                    cookie.save('userName', userName);
                }
                //Notify the change on session
                me.emitChange(response);
            }
        });
    }
}

export default new SessionStore()