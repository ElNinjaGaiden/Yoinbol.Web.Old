import React from 'react';
import Header from '../../core/header';
import AuthenticatedComponent from '../base/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {

	componentDidUpdate() {
		console.log('Update', arguments);
	}

	render () {
		return (
			<div>
				<Header />
				<div className="container">
					Dashboard
				</div>
			</div>
		)
	}
})