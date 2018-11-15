import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';





class Landing extends Component
{
	componentDidMount(){
		this.props.fetchAllUsers()
	}

	renderUsers(){
		var users = this.props.users

		return this.props.users.map(user => {
			return(
				<div className="card grey darken-1" key={user._id}>
					<Link to={'/userview/'+user._id}>
				        <div className="card-content white-text">
				          <span className="card-title">{ user.name }</span>
				          <p> Click for more information </p>
				      	</div>
				    </Link>
		     	</div>
		      )
		})
	}

	render(){
		if(this.props.users)
		{
			return(
				<div> { this.renderUsers() } </div>
				)
		}
		return(
			<div style={{ textAlign: 'center'}}>
				<h1> Users </h1>
				<h3> List of users below </h3>
			</div>
			)
	}
}
function mapStateToProps(state)
{
	return {users: state.users}
} 

export default connect(mapStateToProps, actions)(Landing);