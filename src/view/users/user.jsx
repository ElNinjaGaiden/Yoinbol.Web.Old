import React from 'react';
import { Link } from 'react-router';

class User extends React.Component {
	render() {
		return (<div>
					<div>{this.props.params.userId}</div>
					<Link to='/'>Go to Home</Link>
				</div>)
	}
}

export default User;