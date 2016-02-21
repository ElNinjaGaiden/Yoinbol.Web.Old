import React from 'react';
import Unauthorized from '../common/unauthorized';

export default (ComposedComponent) => {

	return class AuthorizedComponent extends React.Component {

		constructor() {
    		super();
      		this.state = this._getLoginState();
    	}

    	render () {
    		//TODO: implement
    		if(true) {
    			return <ComposedComponent />
    		}
    		else {
    			return <Unauthorized />
    		}
    	}
	}
}