import React from 'react';
import { Link } from 'react-router';
import arrayFind from 'array-find';
import arrayFilter from 'array-filter';
import LanguagesStore from '../store/languages';
import SessionStore from '../store/session';

class LanguagesShortcut extends React.Component {

	componentWillMount() {
		const me = this;
		me.setState({});
		if(!LanguagesStore.initialized) {
			LanguagesStore.addChangeListener(me.onLanguagesLoad.bind(me));
			LanguagesStore.load();
		}
		else {
			me.onLanguagesLoad(LanguagesStore.languages);
		}
	}

	onLanguagesLoad (languages) {
		const me = this;
		const state = {
			languages: languages
		};
		me.setState(state);
	}

	componentWillUnmount() {
		const me = this;
		LanguagesStore.removeChangeListener(me.onLanguagesLoad);
	}

	changeLanguage(languageId) {
		LanguagesStore.currentLanguageId = languageId;
		location.reload()
	}

	render () {
		const me = this;
		const options = [];
		const languages = me.state.languages || [];
		const currentLanguageId = SessionStore.currentLanguage;
		const currentLanguage = arrayFind(languages, function (language) {
			return language.LanguajeId === currentLanguageId;
		});
		const currentLanguageName = currentLanguage ? currentLanguage.Name : '';
		const otherLanguages = arrayFilter(languages, function (language) {
			return language.LanguajeId !== currentLanguage.LanguajeId;
		});

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
			            <li className="dropdown-header visible-lg visible-md">Adios</li>
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