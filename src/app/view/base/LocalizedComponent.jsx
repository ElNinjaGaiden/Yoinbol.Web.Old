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
		this._localesChangedLister = this.onLocalesChanged.bind(this)
		LocalesStore.addChangeListener(this._localesChangedLister);
	}

	componentWillUnmount () {
		LocalesStore.removeChangeListener(this._localesChangedLister);
	}

	onLocalesChanged() {
		this.setState(this.getLocalesState());
	}
}