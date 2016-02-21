import React from 'react';
import Header from '../../core/header';
import LocalesStore from '../../store/locales';
import LocalizedComponent from '../base/LocalizedComponent';
import AuthenticatedComponent from '../base/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends LocalizedComponent {

	componentWillMount () {
		super.componentWillMount();
	}

    componentDidMount() {
    	super.componentDidMount();

    }

    componentWillUnmount() {
    	super.componentWillUnmount();
    }

	getLocalesState () {
		return LocalesStore.initialized ? { locales: LocalesStore.locales.views.dashboard } : { locales: {} };
	}

	render () {
		return (
			<div>
				<Header />
				<div className="container">
					{this.state.locales.test}
				</div>
			</div>
		)
	}
})