import React from 'react';
import SessionStore from '../../store/session';
import { Router } from 'react-router';
import Unauthorized from '../common/unauthorized';

export default (ComposedComponent) => {

	return class AuthenticatedComponent extends React.Component {

    	constructor() {
    		super();
      		this.state = this._getLoginState();
    	}

    	_getLoginState() {
      		return {
        		userLoggedIn: SessionStore.isLoggedIn(),
        		user: SessionStore.user,
        		jwt: SessionStore.jwt
      		};
    	}

	    // Here, we’re subscribing to changes in the SessionStore we created before. Remember that the SessionStore is an EventEmmiter.
	    componentDidMount() {
	      	SessionStore.addChangeListener(this._onChange.bind(this));
	    }

	    // After any change, we update the component’s state so that it’s rendered again.
	    _onChange() {
	      	this.setState(this._getLoginState());
	    }

	    componentWillUnmount() {
	        SessionStore.removeChangeListener(this._onChange.bind(this));
	    }

	    render() {
	    	if(this.state.userLoggedIn && true) {
	    		return (
		      		<ComposedComponent
		        		{...this.props}
		        		user={this.state.user}
		        		jwt={this.state.jwt}
		        		userLoggedIn={this.state.userLoggedIn} />
		      	);
	    	}
	    	else {
	    		return <Unauthorized />
	    	}
	    }
  	}
};