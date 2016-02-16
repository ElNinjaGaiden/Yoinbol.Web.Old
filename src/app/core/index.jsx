import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import jQuery from 'jquery';
global.jQuery = jQuery;

import App from './app';
import Home from '../view/home/home';
import User  from '../view/users/user';
import SportsCenters from '../view/sportscenters/sportscenters';
import SportsCenter from '../view/sportscenters/sportscenter';
import Friends from '../view/friends/friends';
import Dashboard from '../view/dashboard/dashboard';

const appContainer = document.getElementById('app-container');

// let bHistory = browserHistory({
//   queryKey: false
// });

render((
  	<Router >
    	<Route path="/" component={App}>
	        <IndexRoute component={Home} />
	        <Route path="dashboard" component={Dashboard} />
	        <Route path="users/:userId" component={User} />
	        <Route path="sportscenters" component={SportsCenters} />
	        <Route path="/sportscenter/:sportsCenterId" component={SportsCenter} />
	        <Route path="friends" component={Friends} />
    	</Route>
  	</Router>
), appContainer)
