class FacebookService {

	constructor () {
	}

	getLoginStatus (callback, scope) {
		console.log('jsdhfjsd');
		var callbackScope   = scope || this,
            response        = {
                success : true,
                data    : null
            };

        FB.getLoginStatus(session => {
            
            response.data = session;
            callback && callback.call(callbackScope, response);
        }, error => {

        	//Error getting the facebook login status
            console.error('Error getting user login status', error);
            response.success = false;
            callback && callback.call(callbackScope, response);
        });
	}

	login (callback, scope) {
		var fbPermissions   = { scope: 'public_profile,email,user_friends', return_scopes: true },
            callbackScope   = scope || this,
            response        = {
                success : true,
                data    : null
            };

        //Try to login the user on facebook
        FB.login(loginResponse => {

            response.data = loginResponse;
            callback && callback.call(callbackScope, response);

        }, fbPermissions);
	}

	getUserData (callback, scope) {
		var callbackScope   = scope || this,
            response        = {
                success : true,
                data    : null
            };

		FB.api('/me?fields=id,name,email', userDataresponse => {

			response.data = userDataresponse;
			callback && callback.call(callbackScope, response);
    	});
	}
}

export default new FacebookService()