import React from 'react';
import LocalesStore from '../store/locales';
import LoadingStore from '../store/loading';

class App extends React.Component {

    getChildContext() {
        return {
            refresh: () => this.forceUpdate()
        }
    }

    componentWillMount () {
        const me = this;
        me.setState({
            loading: LoadingStore.loading
        });

        if(!LocalesStore.initialized) {
            LocalesStore.addChangeListener(me.onLocalesLoad.bind(me));
            LocalesStore.load();
        }
        else {
            me.onLocalesLoad(LocalesStore.LocalesStore);
        }

        LoadingStore.addChangeListener(me.onLoadingChange.bind(me));
    }

    onLocalesLoad (locales) {
        console.log('App:onLocalesLoad', locales);
    }

    onLoadingChange (loading) {
        this.setState({
            loading: loading
        });
    }

    render() {
        const loadingClass = this.state.loading ? 'modal-loader visible' : 'modal-loader';
        return (
            <div>
                <div className="view-content">
                    {this.props.children}
                </div>
                <div className={loadingClass}></div>
            </div>
        )
    }
}

App.childContextTypes = {
    refresh: React.PropTypes.func
}

export default App;
