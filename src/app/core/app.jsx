import React from 'react';
import Loader from './loader';
import LocalesStore from '../store/locales';

class App extends React.Component {

    getChildContext() {
        return {
            refresh: () => this.forceUpdate()
        }
    }

    componentWillMount () {
        LocalesStore.load();
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

App.childContextTypes = {
    refresh: React.PropTypes.func
}

export default App;
