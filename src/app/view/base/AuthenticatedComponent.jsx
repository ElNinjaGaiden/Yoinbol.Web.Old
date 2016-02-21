import React from 'react';
import { Router } from 'react-router';
import SessionStore from '../../store/session';
//import Unauthorized from '../common/unauthorized';
import Home from '../home/home';

export default (ComposedComponent) => {

	return class AuthenticatedComponent extends React.Component {

    	constructor() {
    		super();
      		this.state = this._getLoginState();
    	}

	    componentDidMount() {

	    	this.sessionStoreListener = this._onChange.bind(this);
	    	SessionStore.addChangeListener(this.sessionStoreListener);

	    	// if(!this.state.userLoggedIn && this.state.hasAccessToken) {
	    	// 	SessionStore.login(SessionStore.UserName, '', true);
	    	// }
	    }

	    componentWillUnmount() {
	    	this.sessionStoreListener && SessionStore.removeChangeListener(this.sessionStoreListener);
	    }

	    _getLoginState() {
      		return {
        		userLoggedIn: SessionStore.isLoggedIn(),
        		isDoingLoggin: SessionStore.isDoingLoggin(),
        		hasAccessToken: SessionStore.hasAccessToken(),
        		user: SessionStore.user
      		};
    	}

	    _onChange() {
	      	this.setState(this._getLoginState());
	    }

	    render() {
	    	if(this.state.userLoggedIn || this.state.isDoingLoggin) {
	    		return (
		      		<ComposedComponent
		        		{...this.props}
		        		user={this.state.user}
		        		userLoggedIn={this.state.userLoggedIn} 
		        		isDoingLoggin={this.state.isDoingLoggin} />
		      	)
	    	}
	    	else {
	    		return <Home />
	    	}
	    }
  	}
};