import React from 'react';
import { Link } from 'react-router';
import LanguagesShortcut from '../languagesShortcut/languagesShortcut';
import SessionStore from '../../store/session';

export default class Header extends React.Component {

	static get contextTypes () {
		return {
    		router: React.PropTypes.object
		};
	}

	onLogoutClick () {
		SessionStore.logout().always(() => {
			this.context.router.push('/');
		});
	}

	render() {

		const rightContent = SessionStore.isLoggedIn() ? 
			<ul className="nav navbar-nav navbar-right">
			    <li className="dropdown">
			        <a className="dropdown-toggle" data-toggle="dropdown" onClick={this.onLogoutClick.bind(this)}>
			        	Logout <i className="fa fa-sign-out i-xs"></i>
			        </a>
			    </li>
			</ul> : 
			<LanguagesShortcut />;

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
						{rightContent}
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