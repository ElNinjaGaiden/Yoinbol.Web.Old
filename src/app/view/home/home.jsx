import React from 'react';
import LanguagesStore from '../../store/languages';
import LocalesStore from '../../store/locales';
import jquery from 'jquery';
import SessionStore from '../../store/session';
import Header from '../../core/header';
import LoginForm from '../../components/loginForm/loginForm';
import RegisterForm from '../../components/registerForm/registerForm';

class Home extends React.Component {

	static get contextTypes () {
		return {
    		router: React.PropTypes.object,
    		location: React.PropTypes.object
		};
	}

	constructor() {
		super();
  		this.state = this._getLoginState();
	}

	componentWillMount() {
		const me = this;
		me.setState({
			locales: {
				slogan: '',
				loginTabLabel: '',
				registerTabLabel: ''
			}
		});
	}

	componentDidMount () {
		const me = this;

		if(!LocalesStore.initialized) {
			LocalesStore.addChangeListener(me.onLocalesLoad.bind(me));
		}
		else {
			me.onLocalesLoad();
		}

		if(!this.state.userLoggedIn && this.state.hasAccessToken) {
			SessionStore.addChangeListener(this.onLoginCallback.bind(this));
    		SessionStore.login(SessionStore.UserName, '', true);
    	}

		//???
		setTimeout(function () {
			jquery('#yb-home-carousel').carousel();	
		}, 100);
	}

	onLoginCallback (response) {
  		if(response.Result === 0) {
  			this.context.router.push('/dashboard');
  		}
  	}

	componentWillUnmount () {
		const me = this;
		LocalesStore.removeChangeListener(me.onLocalesLoad.bind(me));
	}

	_getLoginState() {
  		return {
    		userLoggedIn: SessionStore.isLoggedIn(),
    		isDoingLoggin: SessionStore.isDoingLoggin(),
    		hasAccessToken: SessionStore.hasAccessToken(),
    		user: SessionStore.user
  		};
	}

	onLocalesLoad() {
		this.setState(this.getLocalesState());
	}

	getLocalesState () {
		return {
			locales: LocalesStore.locales.views.home
		};
	}

	render () {
		const me = this;
		return (
			<div>
				<Header />
				<div className="container yb-home">
					<div className="row">
						<div className="col-sm-8 yb-carousel-area animated fadeInDownBig col-margin-top">
							<div className="carousel slide" id="yb-home-carousel">
								<ol className="carousel-indicators">
				                    <li data-target="#carousel" data-slide-to="0" className="active"></li>
				                    <li data-target="#carousel" data-slide-to="1"></li>
				                    <li data-target="#carousel" data-slide-to="2"></li>
				                </ol>
				                <div className="carousel-inner">
				                    <div className="item active">
				                        <div className="jumbotron">
				                            <h1>yoinbol</h1>
			                            <p className="lead">{me.state.locales.slogan}</p>
				                        </div>
				                    </div>
				                    <div className="item">
				                        <div className="jumbotron">
				                            <h1>yoinbol</h1>
				                            <p className="lead">{me.state.locales.slogan}</p>
				                        </div>
				                    </div>
				                    <div className="item">
				                        <div className="jumbotron">
				                            <h1>yoinbol</h1>
				                            <p className="lead">{me.state.locales.slogan}</p>
				                        </div>
				                    </div>
				                </div>
							</div>
						</div>
						<div className="col-sm-4 col-margin-top">
							<div className="animated fadeInDownBig">
				                <div className="box-info full">
				                    <ul className="nav nav-tabs nav-justified">
				                        <li className="active">
				                        	<a href="#loginformtab" data-toggle="tab">{me.state.locales.loginTabLabel}</a>
			                        	</li>
				                        <li>
				                        	<a href="#registerformtab" data-toggle="tab">{me.state.locales.registerTabLabel}</a>
				                        </li>
				                    </ul>
				                    <div className="tab-content">
				                        <div className="tab-pane active animated fadeInRight" id="loginformtab">
				                            <LoginForm></LoginForm>
				                        </div>
				                        <div className="tab-pane animated fadeInRight" id="registerformtab">
				                            <RegisterForm></RegisterForm>
				                        </div>
				                    </div>
				                </div>
				            </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;