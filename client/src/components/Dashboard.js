import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';


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
				<h3> { this.props.auth ? user.description : '' } </h3>
				<div className="fixed-action-btn">
				<Link to='/info/fill' className="btn-floating btn-large red">
				   <i className="large material-icons">Edit</i>
				</Link>
			</div>
			</div>
			)
	}
}

function mapStateToProps(state)
{
	return {auth: state.auth}
}


export default connect(mapStateToProps)(Dashboard);