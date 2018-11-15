import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.js';
import Landing from './Landing.js';
import Dashboard from './Dashboard.js';
import InfoFill from './InfoFill.js';
import DashboardView from './DashboardView.js';



class App extends Component {
	componentDidMount(){
		this.props.fetchUser()
	}


	render(){
		return (
			<div>
				<BrowserRouter>
					<div style={{"marginRight": 10, "marginLeft": 10}}>
						<Header />
						<Route exact={ true } path="/" component={ Landing } />
						<Route exact={ true } path = "/dashboard" component = { Dashboard } />
						<Route exact={ true } path = "/userview/:id" component = { DashboardView } />
						<Route path = "/info/fill" component = { InfoFill } />
					</div>
				</BrowserRouter>

			</div>
			)
	}
}


export default connect(null, actions)(App);