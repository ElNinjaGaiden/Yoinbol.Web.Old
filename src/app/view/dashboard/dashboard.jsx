import React from 'react';
import Header from '../../components/header/header';
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
		return { locales: LocalesStore.initialized ? LocalesStore.locales.views.dashboard : {} };
	}

	render () {
		return (
			<div>
				<Header />
			</div>
		)
	}
})