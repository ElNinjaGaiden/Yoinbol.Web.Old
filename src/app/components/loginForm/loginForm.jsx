import React from 'react';
import { render } from 'react-dom';
import LocalesStore from '../../store/locales';
import SessionStore from '../../store/session';
import cookie from 'react-cookie';

class LoginForm extends React.Component {

	static get contextTypes () {
		return {
    		history: React.PropTypes.object,
    		location: React.PropTypes.object
		};
	}

	get authenthicationToken () {
		return cookie.load('sessionId');
	}
  	

	componentWillMount() {
		const me = this;
		me.setState({
			userName: '',
			password: '',
			rememberMe: true,
			locales: {
				userNameInput: '',
				passwordInput: '',
				rememberMeInput: '',
				loginButton: '',
				forgotPassword: '',
				loginWithFacebook: '',
				or: ''
			}
		});
	}

	componentDidMount () {
		const me = this;
		me.init();
	}

	init () {
		const me = this;

		if(!LocalesStore.initialized) {
			LocalesStore.addChangeListener(me.onLocalesLoad.bind(me));
		}
		else {
			me.onLocalesLoad();
		}

		SessionStore.addChangeListener(me.onLoginCallback.bind(me));
	}

	componentWillUnmount() {
        SessionStore.removeChangeListener(this.onLoginCallback.bind(this));
    }

	onLocalesLoad() {
		this.setState(this.getLocalesState());

		//const loginInput = document.getElementById('yb-login-username-input');
		//const passwordInput = document.getElementById('yb-login-password-input');
		//loginInput && loginInput.setCustomValidity(LocalesStore.locales.common.invalidFieldMessage);
		//passwordInput && passwordInput.setCustomValidity(LocalesStore.locales.common.invalidFieldMessage);
	}

	getLocalesState () {
		let locales = LocalesStore.locales.components.loginForm;
		locales.or = LocalesStore.locales.common.or
		return {
			locales: locales
		};
	}

	onLoginClick () {
		const me = this;
		SessionStore.login(me.state.userName, me.state.password, me.state.rememberMe);
		return false;
	}

	onUserNameChange(e) {
    	this.setState({ userName: e.target.value });
  	}

  	onPasswordChange(e) {
    	this.setState({ password: e.target.value });
  	}

  	onLoginCallback (response) {
  		if(response.Result === 0) {
  			this.context.history.push('/dashboard');
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
				<button type="button" className="btn btn-primary btn-block btn-facebook">
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

export default LoginForm