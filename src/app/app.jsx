import React from 'react';
import Header from './header';
//import AuthService from '../service/authentication';
//import SessionStore from '../store/session';

class App extends React.Component {

  componentDidMount() {
    //AuthService.login('chinopb@gmail.com', '123').done(this.onSessionStarted);
    //console.log(SessionStore.test());
  }

  onSessionStarted(response) {
    console.log(response);
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
