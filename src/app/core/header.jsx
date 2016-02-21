import React from 'react';
import { Link } from 'react-router';
import LanguagesShortcut from '../components/languagesShortcut/languagesShortcut';

export default class Header extends React.Component {

	render() {
		return (
			<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			            </button>
			            <div className="logo-brand header sidebar rows">
						    <div className="logo">
						        <h1>
						        	<Link to="/">
						        		<img src="/dist/assets/img/soccer_ball_pin.png" alt="Logo" /> yoinbol
						        	</Link>
					        	</h1>
						    </div>
						</div>
					</div>
					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
						</ul>
						<LanguagesShortcut />
					</div>
				</div>
			</div>
		)
		// return (<div>
		// 			<Link to='/users/10'>Dele aqui</Link>
		// 			<Link to='/sportscenters'>Dele otra</Link>
		// 			<Link to='/sportscenter/110'>Otra mas</Link>
		// 			<Link to='/friends'>friends</Link>
		// 		</div>)
	}

} 