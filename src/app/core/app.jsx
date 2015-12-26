import React from 'react';
import Header from './header';

class App extends React.Component {

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
