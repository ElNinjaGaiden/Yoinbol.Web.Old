import BaseStore from './base';
import LoadingStore from './loading';
import ConfigurationService from '../service/configuration';
import AuthenticationService from '../service/authentication';
import cookie from 'react-cookie';

class SessionStore extends BaseStore {

    constructor () {
        super();
        this._data = null;
        this._accessToken = null;
        this._isDoingLoggin = false;
    }

    // Region "Public Properties"

    get data () {
        return this._data;
    }

    get user () {
        return this._data ? this._data.UserInfo.User : null;
    }

    get accessToken () {
        return this._accessToken || cookie.load('accessToken');
    }

    get sessionTicket () {
        return this._data ? this._data.SessionTicket : null;
    }

    get UserName () {
        return cookie.load('userName');
    }

    get currentLanguageId () {
        return localStorage.getItem('languageId') || ConfigurationService.defaultLanguage;
    }

    set currentLanguageId (languageId) {
        localStorage.setItem('languageId', languageId);
    }

    // End "Public Properties"

    isLoggedIn() {
        return !!this._data;
    }

    hasAccessToken () {
        return !!this.accessToken;
    }

    isDoingLoggin () {
        return this._isDoingLoggin;
    }

    login (userName, password, rememberMe) {
        const me = this;
        const accessToken = cookie.load('accessToken');
        //Turn on the flag "isDoingLogin"
        this._isDoingLoggin = true;
        LoadingStore.show();
        return AuthenticationService.login(userName, password, rememberMe, accessToken, me)
        .done(response => {
            if(response.Result === 0) {
                me._data = response;
                //If rememberMe is set to true, we store userName and sessionToken locally to future use
                if(rememberMe) {
                    cookie.save('accessToken', response.SessionTicket.AccessToken);
                    cookie.save('userName', userName);

                    this._accessToken = response.SessionTicket.AccessToken;
                }
                //Notify the change on session
                me.emitChange(response);
            }
        })
        .always(() => {
            //Turn off the flag "isDoingLogin"
            this._isDoingLoggin = false;
            LoadingStore.hide();
        });
    }

    logout () {
        const me = this;
        LoadingStore.show();
        return AuthenticationService.logout(this.sessionTicket, this)
        .done(response => {
            this._data = null;
            this._accessToken = null;
            cookie.remove('accessToken');
            cookie.remove('userName');
            me.emitChange(response);
        })
        .always(() => {
           LoadingStore.hide(); 
        });
    }
}

export default new SessionStore()