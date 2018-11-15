import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component
{
	renderContent()
	{
		switch(this.props.auth )
		{
			// Waiting on reducer
			case null:
				return 

			case false:
				return <li><a href="/auth/google"> Login with Google</a></li>

			default:
				return [
				// <li key='1'><Name /></li>,
				<li key='1' style= {{margin: '0 10px' }}>
					<Link to='/dashboard'> Click for dashboard: { this.props.auth.name }
					</Link>
				</li>,
				<li key='2'><a href="/api/logout"> Logout </a></li>
				]
		}

	}

	render(){
		//console.log(this.props)
		return (
			<nav>
			    <div className="nav-wrapper">
			      <Link to='/' href="" className="left brand-logo"> 
			      	USERS 
			      </Link>
			      <ul id="nav-mobile" className="right">
			        {this.renderContent()}
			      </ul>
			    </div>
			</nav>
			)
	}
}
function mapStateToProps(state)
{
	return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);

