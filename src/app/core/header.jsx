import React from 'react';
import { Link } from 'react-router';
import arrayFind from 'array-find';
import arrayFilter from 'array-filter';
import LanguagesStore from '../store/languages';
import SessionStore from '../store/session';
import LocalesStore from '../store/locales';
import LocalizedComponent from '../view/base/LocalizedComponent';

class LanguagesShortcut extends LocalizedComponent {

	componentWillMount() {
		super.componentWillMount();
	}

	componentDidMount () {
		super.componentDidMount();
		this.setState(this.getLanguagesState());

		this._onLanguagesChangedListener = this.onLanguagesLoad.bind(this);
		LanguagesStore.addChangeListener(this._onLanguagesChangedListener);
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		LanguagesStore.removeChangeListener(this._onLanguagesChangedListener);
		this._onLanguagesChangedListener && LocalesStore.removeChangeListener(this._onLanguagesChangedListener);
	}

	getLanguagesState () {
		return {
			languages: LanguagesStore.languages
		};
	}

	getLocalesState () {
		return LocalesStore.initialized ? { locales: LocalesStore.locales.app.header } : { locales: {} };
	}

	onLanguagesLoad () {
		this.setState(this.getLanguagesState());
	}

	onLocalesLoad() {
		this.setState(this.getLocalesState());
	}

	changeLanguage(languageId) {
		SessionStore.currentLanguageId = languageId;
		LocalesStore.refresh(SessionStore.currentLanguageId);
	}

	render () {
		const me = this;
		const options = [];
		const languages = me.state.languages || [];
		const currentLanguageId = SessionStore.currentLanguageId;
		const currentLanguage = arrayFind(languages, function (language) {
			return language.LanguajeId === currentLanguageId;
		});
		const currentLanguageName = currentLanguage ? currentLanguage.Name : '';
		const otherLanguages = arrayFilter(languages, function (language) {
			return language.LanguajeId !== currentLanguage.LanguajeId;
		});
		const changeLanguage = me.state.locales ? me.state.locales.changeLanguage : '';

		otherLanguages.forEach(function (language, index) {
			const cmp = (
				<li key="{language.LanguajeId}">
					<a onClick={me.changeLanguage.bind(me, language.LanguajeId)}>
						{language.Name}
					</a>
				</li>
			);
			options.push(cmp);
		});

		return (
			<ul className="nav navbar-nav navbar-right">
			    <li className="dropdown">
			        <a className="dropdown-toggle" data-toggle="dropdown">
			        	{currentLanguageName} <i className="fa fa-chevron-down i-xs"></i>
			        </a>
			        <ul className="dropdown-menu animated half flipInX">
			            <li className="dropdown-header visible-lg visible-md">{changeLanguage}</li>
			            {options}
			        </ul>
			    </li>
			</ul>
		)
	}
}

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