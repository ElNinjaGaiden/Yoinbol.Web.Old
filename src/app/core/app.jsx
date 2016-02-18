import React from 'react';
import LocalesStore from '../store/locales';

class App extends React.Component {

    getChildContext() {
        return {
            refresh: () => this.forceUpdate()
        }
    }

    componentWillMount () {
        const me = this;
        me.setState({});

        if(!LocalesStore.initialized) {
            LocalesStore.addChangeListener(me.onLocalesLoad.bind(me));
            LocalesStore.load();
        }
        else {
            me.onLocalesLoad(LocalesStore.LocalesStore);
        }
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
            </div>
        )
    }
}

App.childContextTypes = {
    refresh: React.PropTypes.func
}

export default App;
