import React from 'React';
import LocalesStore from '../../store/locales';

export default class LocalizedComponent extends React.Component {

	constructor () {
		super();
	}

	componentWillMount() {
		this.setState(this.getLocalesState());
	}

	componentDidMount () {
		LocalesStore.addChangeListener(this.onLocalesLoad.bind(this));
	}

	componentWillUnmount () {
		LocalesStore.removeChangeListener(this.onLocalesLoad.bind(this));
	}

	onLocalesLoad() {
		this.setState(this.getLocalesState());
	}
}