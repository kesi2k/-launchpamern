import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component
{

	render(){
		if(this.props.auth){
			var user = this.props.auth
			console.log(user)
		}
		
		return(
			<div style={{ textAlign: 'center'}}>
				<h1> User: { this.props.auth ? user.name : '' } </h1>
				<h3> User info listed here </h3>
			</div>
			)
	}
}

function mapStateToProps(state)
{
	return {auth: state.auth}
}


export default connect(mapStateToProps)(Dashboard);