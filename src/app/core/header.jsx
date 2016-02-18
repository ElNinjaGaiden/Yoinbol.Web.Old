import React from 'react';
import { Link } from 'react-router';
import arrayFind from 'array-find';
import arrayFilter from 'array-filter';
import LanguagesStore from '../store/languages';
import SessionStore from '../store/session';
import LocalesStore from '../store/locales';

class LanguagesShortcut extends React.Component {

	static get contextTypes () {
		return {
    		router: React.PropTypes.object,
    		refresh: React.PropTypes.func
		};
	}

	componentWillMount() {
		const me = this;
		me.setState({});
	}

	componentDidMount () {
		const me = this;
		if(!LanguagesStore.initialized) {
			LanguagesStore.addChangeListener(me.onLanguagesLoad.bind(me));
			LanguagesStore.load();
		}
		else {
			me.onLanguagesLoad();
		}

		if(!LocalesStore.initialized) {
			LocalesStore.addChangeListener(me.onLocalesLoad.bind(me));
		}
		else {
			me.onLocalesLoad();
		}		
	}

	getLanguagesState () {
		return {
			languages: LanguagesStore.languages
		};
	}

	getLocalesState () {
		return {
			locales: LocalesStore.locales.app.header
		};
	}

	onLanguagesLoad () {
		this.setState(this.getLanguagesState());
	}

	onLocalesLoad() {
		this.setState(this.getLocalesState());
	}

	componentWillUnmount() {
		const me = this;
		LanguagesStore.removeChangeListener(me.onLanguagesLoad);
		LocalesStore.removeChangeListener(me.onLocalesLoad);
	}

	changeLanguage(languageId) {
		SessionStore.currentLanguageId = languageId;
		//location.reload();
		this.context.refresh();
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

class Header extends React.Component {

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

export default Header;