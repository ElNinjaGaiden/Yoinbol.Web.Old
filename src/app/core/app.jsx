import React from 'react';
import Loader from './loader';
import LanguagesStore from '../store/languages';
import LocalesStore from '../store/locales';

export default class App extends React.Component {

    componentWillMount () {
        LocalesStore.load();
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
