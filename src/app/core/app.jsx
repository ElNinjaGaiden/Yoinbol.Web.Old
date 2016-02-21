import React from 'react';
import Loader from './loader';
import LocalesStore from '../store/locales';
import SessionStore from '../store/session';

export default class App extends React.Component {

    componentWillMount () {
        LocalesStore.refresh(SessionStore.currentLanguageId);
    }

    onLocalesLoad (locales) {
        console.log('App:onLocalesLoad', locales);
    }

    render() {
        return (
            <div>
                <div className="view-content">
                    {this.props.children}
                </div>
                <Loader />
            </div>
        )
    }
}
