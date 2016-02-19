import React from 'react';
import LoadingStore from '../store/loading';

class Loader extends React.Component {

	componentWillMount () {

		this.setState({
            loading: LoadingStore.loading
        });

		LoadingStore.addChangeListener(this.onLoadingChange.bind(this));
	}

	componentWillUnmount () {
		LoadingStore.removeChangeListener(this.onLoadingChange);
	}

	onLoadingChange (loading) {
        this.setState({
            loading: loading
        });
    }

	render () {
		const loadingClass = this.state.loading ? 'modal-loader visible' : 'modal-loader';
		return (
			<div className={loadingClass}>
                <div className="modal-loader-container">
                    <span className="spinner-double-dot-in"></span>
                </div>
            </div>
		)
	}
}

export default Loader