import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

	render() {
		return (<div>
					<Link to='/users/10'>Dele aqui</Link>
					<Link to='/sportscenters'>Dele otra</Link>
					<Link to='/sportscenter/110'>Otra mas</Link>
					<Link to='/friends'>friends</Link>
				</div>)
	}

} 

export default Header;