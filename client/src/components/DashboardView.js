import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';


class Dashboard extends Component
{
	componentDidMount(){
		const id = this.props.match.params.id;
		//console.log(id);
		this.props.fetchSingleUser(id);
	}

	render(){
		//console.log(this.props.oneUserReducer)
		var user = this.props.oneUserReducer
		if(user)
		{
			return(			
					<div>
						<h1> User: {user.name} </h1>
						<h3> {user.description } </h3>
					</div>
				  )
		}
		return(
			<div style={{ textAlign: 'center'}}>
				<h3> Specific User Loading </h3>
			</div>
			)
	}
}

function mapStateToProps(state)
{
	return {oneUserReducer: state.user}
}


export default connect(mapStateToProps, actions)(Dashboard);				


// <h1> User: { this.props.auth ? user.name : '' } </h1>
// <h3> { this.props.auth ? user.description : '' } </h3>