import React from 'react';
import arrayFind from 'array-find';
import arrayFilter from 'array-filter';
import LanguagesStore from '../../store/languages';
import SessionStore from '../../store/session';
import LocalesStore from '../../store/locales';
import LocalizedComponent from '../../view/base/LocalizedComponent';

export default class LanguagesShortcut extends LocalizedComponent {

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

	getCurrentLanguaje () {
		const languages = this.state.languages || [];
		const currentLanguageId = SessionStore.currentLanguageId;
		const currentLanguage = arrayFind(languages, function (language) {
			return language.LanguajeId === currentLanguageId;
		});
		return currentLanguage;
	}

	getLanguagesOptions (currentLanguage) {
		const options = [];
		const languages = this.state.languages || [];
		const otherLanguages = arrayFilter(languages, function (language) {
			return language.LanguajeId !== currentLanguage.LanguajeId;
		});

		otherLanguages.forEach(function (language, index) {
			const cmp = (
				<li key="{language.LanguajeId}">
					<a onClick={this.changeLanguage.bind(this, language.LanguajeId)}>
						{language.Name}
					</a>
				</li>
			);
			options.push(cmp);
		}, this);
		
		return options;
	}

	render () {
		const changeLanguage = this.state.locales ? this.state.locales.changeLanguage : '';
		const currentLanguage = this.getCurrentLanguaje();
		const currentLanguageName = currentLanguage ? currentLanguage.Name : '';
		const options = this.getLanguagesOptions(currentLanguage);

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