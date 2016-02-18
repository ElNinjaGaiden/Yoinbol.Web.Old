import React from 'react';
import SessionStore from '../../store/session';
import { Router } from 'react-router';
import Unauthorized from '../common/unauthorized';
import DoLoggin from '../common/doLoggin';

export default (ComposedComponent) => {

	return class AuthenticatedComponent extends React.Component {

    	constructor() {
    		super();
      		this.state = this._getLoginState();
    	}

    	_getLoginState() {
      		return {
        		userLoggedIn: SessionStore.isLoggedIn(),
        		isDoingLoggin: SessionStore.isDoingLoggin(),
        		hasAccessToken: SessionStore.hasAccessToken(),
        		user: SessionStore.user
      		};
    	}

	    // Here, we’re subscribing to changes in the SessionStore we created before. Remember that the SessionStore is an EventEmmiter.
	    componentDidMount() {
	    	SessionStore.addChangeListener(this._onChange.bind(this));

	    	if(!this.state.userLoggedIn && this.state.hasAccessToken) {
	    		SessionStore.login(SessionStore.UserName, '', true);
	    	}
	    }

	    // After any change, we update the component’s state so that it’s rendered again.
	    _onChange() {
	      	this.setState(this._getLoginState());
	    }

	    componentWillUnmount() {
	    	SessionStore.removeChangeListener(this._onChange.bind(this));
	    }

	    render() {
	    	if(this.state.userLoggedIn || this.state.isDoingLoggin) {
	    		return (
		      		<ComposedComponent
		        		{...this.props}
		        		user={this.state.user}
		        		userLoggedIn={this.state.userLoggedIn} 
		        		isDoingLoggin={this.state.isDoingLoggin} >
	        		</ComposedComponent>
		      	)
	    	}
	    	else {
	    		return <Unauthorized />
	    	}
	    }
  	}
};