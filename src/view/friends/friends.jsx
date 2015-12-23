import React from 'react';
import AuthenticatedComponent from '../base/AuthenticatedComponent';

export default AuthenticatedComponent(class Friends extends React.Component {
  	render() {
     	// Here, we display the user information
    	return (<h1>Friends</h1>);
  	}
});