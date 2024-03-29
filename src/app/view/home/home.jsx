import React from 'react';
import LocalizedComponent from '../base/LocalizedComponent';
import LanguagesStore from '../../store/languages';
import LocalesStore from '../../store/locales';
import jquery from 'jquery';
import SessionStore from '../../store/session';
import Header from '../../components/header/header';
import LoginForm from '../../components/loginForm/loginForm';
import RegisterForm from '../../components/registerForm/registerForm';

export default class Home extends LocalizedComponent {

	static get contextTypes () {
		return {
    		router: React.PropTypes.object
		};
	}

	constructor() {
		super();
  		this.state = this._getLoginState();
	}

	componentWillMount() {
		super.componentWillMount();
	}

	componentDidMount () {
		super.componentDidMount();

		if(!this.state.userLoggedIn && this.state.hasAccessToken) {
			this.sessionStoreListener = this.onLoginCallback.bind(this);
			SessionStore.addChangeListener(this.sessionStoreListener);

    		SessionStore.login(SessionStore.UserName, '', true, SessionStore.accountType);
    	}

		//???
		setTimeout(function () {
			jquery('#yb-home-carousel').carousel();	
		}, 100);
	}

	componentWillUnmount () {
		super.componentWillUnmount();
		this.sessionStoreListener && SessionStore.removeChangeListener(this.sessionStoreListener);
	}

	onLoginCallback (response) {
  		if(response.Result === 0) {
  			this.context.router.push('/dashboard');
  		}
  	}

	_getLoginState() {
  		return {
    		userLoggedIn: SessionStore.isLoggedIn(),
    		isDoingLoggin: SessionStore.isDoingLoggin(),
    		hasAccessToken: SessionStore.hasAccessToken(),
    		user: SessionStore.user
  		};
	}

	getLocalesState () {
		return { locales : LocalesStore.initialized ? LocalesStore.locales.views.home : {} };
	}

	render () {
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
			                            <p className="lead">{this.state.locales.slogan}</p>
				                        </div>
				                    </div>
				                    <div className="item">
				                        <div className="jumbotron">
				                            <h1>yoinbol</h1>
				                            <p className="lead">{this.state.locales.slogan}</p>
				                        </div>
				                    </div>
				                    <div className="item">
				                        <div className="jumbotron">
				                            <h1>yoinbol</h1>
				                            <p className="lead">{this.state.locales.slogan}</p>
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
				                        	<a href="#loginformtab" data-toggle="tab">{this.state.locales.loginTabLabel}</a>
			                        	</li>
				                        <li>
				                        	<a href="#registerformtab" data-toggle="tab">{this.state.locales.registerTabLabel}</a>
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