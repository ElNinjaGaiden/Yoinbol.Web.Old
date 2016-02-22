import BaseStore from './base';
import LoadingStore from './loading';
import ConfigurationService from '../service/configuration';
import AuthenticationService from '../service/authentication';
import cookie from 'react-cookie';
import FacebookService from '../service/facebook';

class SessionStore extends BaseStore {

    constructor () {
        super();
        this._data = null;
        this._accessToken = null;
        this._isDoingLoggin = false;
    }

    static get facebookAccountTypeId () {
        return 2;
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

    get accountType () {
        return cookie.load('accountType');
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

    login (userName, password, rememberMe, accountType) {
        const accessToken = cookie.load('accessToken');
        //Turn on the flag "isDoingLogin"
        this._isDoingLoggin = true;
        LoadingStore.show();
        return AuthenticationService.login(userName, password, rememberMe, accessToken, accountType, this)
        .done(response => {
            if(response.Result === 0) {
                this._data = response;
                //If rememberMe is set to true, we store userName and sessionToken locally to future use
                if(rememberMe) {
                    cookie.save('accessToken', response.SessionTicket.AccessToken);
                    cookie.save('userName', userName);
                    cookie.save('accountType', accountType);

                    this._accessToken = response.SessionTicket.AccessToken;
                }
                //Notify the change on session
                this.emitChange(response);
            }
        })
        .always(() => {
            //Turn off the flag "isDoingLogin"
            this._isDoingLoggin = false;
            LoadingStore.hide();
        });
    }

    loginWithFacebook () {

        this._isDoingLoggin = true;
        LoadingStore.show();

        //LoadingStore.show();
        FacebookService.getLoginStatus(loginStatusResponse => {
            
            //Validate the user login status response
            if(loginStatusResponse.success === true) {

                if(loginStatusResponse.data.status === 'connected') {

                    FacebookService.getUserData(userDataResponse => {

                        const accessToken = cookie.load('accessToken');

                        AuthenticationService.login(userDataResponse.data.email, 
                                                    loginStatusResponse.data.authResponse.accessToken, 
                                                    true, 
                                                    accessToken, 
                                                    SessionStore.facebookAccountTypeId, 
                                                    this)
                        .done(response => {
                            if(response.Result === 0) {
                                this._data = response;
                                cookie.save('accessToken', response.SessionTicket.AccessToken);
                                cookie.save('userName', userDataResponse.data.email);
                                cookie.save('accountType', this.facebookAccountTypeId);
                                this._accessToken = response.SessionTicket.AccessToken;
                                //Notify the change on session
                                this.emitChange(response);
                            }
                            else {
                                //Error authenticating user on yoinbol
                                console.error('Error authenticating user on yoinbol', response);
                            }

                            this._isDoingLoggin = false;
                            LoadingStore.hide();
                        })
                        .error(error => {
                            this._isDoingLoggin = false;
                            LoadingStore.hide();
                        });

                    }, this);
                }
                else {

                    FacebookService.login(loginResponse => {

                        FacebookService.getUserData(userDataResponse => {

                            const accessToken = cookie.load('accessToken');

                            AuthenticationService.login(userDataResponse.data.email, 
                                                        loginResponse.data.authResponse.accessToken, 
                                                        true, 
                                                        accessToken, 
                                                        this.facebookAccountTypeId, 
                                                        this)
                            .done(response => {
                                if(response.Result === 0) {
                                    this._data = response;
                                    cookie.save('accessToken', response.SessionTicket.AccessToken);
                                    cookie.save('userName', userDataResponse.data.email);
                                    cookie.save('accountType', this.facebookAccountTypeId);
                                    this._accessToken = response.SessionTicket.AccessToken;
                                    //Notify the change on session
                                    this.emitChange(response);
                                }
                                else {
                                    //Error authenticating user on yoinbol
                                    console.error('Error authenticating user on yoinbol', response);
                                }

                                this._isDoingLoggin = false;
                                LoadingStore.hide();
                            })
                            .error(error => {
                                this._isDoingLoggin = false;
                                LoadingStore.hide();
                            });

                        }, this);

                    });
                }
            }
            else {
                //Error getting the user login status
                this._isDoingLoggin = false;
                LoadingStore.hide();
                console.error('Error getting facebook login status', loginStatusResponse);
            }
        });
    }

    logout () {
        LoadingStore.show();
        return AuthenticationService.logout(this.sessionTicket, this)
        .done(response => {
            this._data = null;
            this._accessToken = null;
            cookie.remove('accessToken');
            cookie.remove('userName');
            this.emitChange(response);
        })
        .always(() => {
           LoadingStore.hide(); 
        });
    }
}

export default new SessionStore()