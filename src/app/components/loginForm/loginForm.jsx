import React from 'react';
import { render } from 'react-dom';
import LocalesStore from '../../store/locales';
import SessionStore from '../../store/session';
import cookie from 'react-cookie';
import LocalizedComponent from '../../view/base/LocalizedComponent';

export default class LoginForm extends LocalizedComponent {

	static get contextTypes () {
		return {
    		router: React.PropTypes.object
		};
	}

	get authenthicationToken () {
		return SessionStore.accessToken;
	}
  	

	componentWillMount() {
		super.componentWillMount();
		this.setState({
			userName: '',
			password: '',
			rememberMe: true
		});
	}

	componentDidMount () {
		super.componentDidMount();
		this._onSessionStoreChangedListener = this.onLoginCallback.bind(this);
		SessionStore.addChangeListener(this._onSessionStoreChangedListener);
	}

	componentWillUnmount() {
		super.componentWillUnmount();
        SessionStore.removeChangeListener(this._onSessionStoreChangedListener);
    }

	onLocalesLoad() {
		this.setState(this.getLocalesState());

		//const loginInput = document.getElementById('yb-login-username-input');
		//const passwordInput = document.getElementById('yb-login-password-input');
		//loginInput && loginInput.setCustomValidity(LocalesStore.locales.common.invalidFieldMessage);
		//passwordInput && passwordInput.setCustomValidity(LocalesStore.locales.common.invalidFieldMessage);
	}

	getLocalesState () {
		if(LocalesStore.initialized) {
			let locales = LocalesStore.locales.components.loginForm;
			locales.or = LocalesStore.locales.common.or
			return {
				locales: locales
			};
		}
		else {
			return { locales : {} };
		}
	}

	onLoginClick () {
		SessionStore.login(this.state.userName, this.state.password, this.state.rememberMe, 1);
	}

	onLoginWithFacebookClick () {
		SessionStore.loginWithFacebook();
	}

	onUserNameChange(e) {
    	this.setState({ userName: e.target.value });
  	}

  	onPasswordChange(e) {
    	this.setState({ password: e.target.value });
  	}

  	onLoginCallback (response) {
  		if(response.Result === 0) {
  			this.context.router.push('/dashboard');
  		}
  	}

  	onRememberMeChange (e) {
  		this.setState({rememberMe: e.target.checked});
  	}

	render () {
		return (
			<div className="form-wrap">
				<div className="form-group login-input">
		            <i className="fa fa-sign-in overlay"></i>
		            <input type="email" id="yb-login-username-input" className="form-control text-input" name="username" 
		            	placeholder={this.state.locales.userNameInput} required value={this.state.userName} onChange={this.onUserNameChange.bind(this)} />
		        </div>
		        <div className="form-group login-input">
		            <i className="fa fa-key overlay"></i>
		            <input type="password" id="yb-login-password-input" className="form-control text-input" name="password" 
		            placeholder={this.state.locales.passwordInput} required value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
		        </div>
		        <div className="checkbox">
		            <label>
		                <input type="checkbox" checked={this.state.rememberMe} onChange={this.onRememberMeChange.bind(this)} />{this.state.locales.rememberMeInput}
		            </label>
		        </div>
		        <div className="row">
		            <div className="col-sm-12">
		                <button type="submit" className="btn btn-success btn-block" onClick={this.onLoginClick.bind(this)}>
		                	<i className="fa fa-unlock"></i>
		                	{this.state.locales.loginButton}
		                </button>
		            </div>
		        </div>
				<p className="text-center"><strong>- {this.state.locales.or} -</strong></p>
				<button type="button" className="btn btn-primary btn-block btn-facebook" onClick={this.onLoginWithFacebookClick.bind(this)}>
					<i className="fa fa-facebook"></i>
					{this.state.locales.loginWithFacebook}
				</button>
				<p className="text-center yb-forgot-password">
			        <a>
			            <i className="fa fa-lock"></i>
			            {this.state.locales.forgotPassword}
			        </a>
			    </p>
			</div>
		)
	}
}