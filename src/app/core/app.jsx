import React from 'react';
import Loader from './loader';
import LanguagesStore from '../store/languages';
import LocalesStore from '../store/locales';
import SessionStore from '../store/session';

export default class App extends React.Component {

    componentWillMount () {
        LocalesStore.refresh(SessionStore.currentLanguageId);
        LanguagesStore.load();
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
