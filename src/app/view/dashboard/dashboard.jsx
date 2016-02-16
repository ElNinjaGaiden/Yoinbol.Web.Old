import React from 'react';
import AuthenticatedComponent from '../base/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {

	render () {
		return (<div>Dashboard</div>)
	}
})