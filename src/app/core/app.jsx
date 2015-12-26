import React from 'react';
import Header from './header';
import LocalesStore from '../store/locales';

class App extends React.Component {

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
        console.log(locales);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="view-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
