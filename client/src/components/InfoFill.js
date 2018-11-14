import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';




class InfoFill extends Component
{
	onSubmit(values)
	{
		console.log(this.props.auth)
		console.log("In on submit", values);
		this.props.updateInfo(values, this.props.history);

	}

	renderField(field)
	{
		const className = `form-group ${field.meta.touched && field.meta.error ? 'red-text' : ""}`

		// Three states in redux internally: Pristine, Touched and Invalid
		return(
		  <div className={className}>
		    <label> {field.label} </label>
		      <input
		        className="form-control input-group"
		        type="text"
		        {...field.input}
		      />
		      <div className="text-help">
		        {field.meta.touched ? field.meta.error : ""}
		      </div>
		  </div>
		  )
	}
	//handleSubmit provided by redux form
	render()
	{
		return(
			<div style={{ marginTop: '30px' }}>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label="Name"
						type="text"
						name="name"
						component={ this.renderField }
					/>
					<Field
						label="Description"
						type="text"
						name="description"
						component={ this.renderField }
					/>
					<button type="submit" className="teal btn-flat white-text"> Submit </button>
					<Link to="/dashboard" className="red btn-flat right white-text"> Cancel </Link>
				</form>
			</div>
			)
	}
}

function validate(values)
{
  // values { title: 'blabla', categories:'blabla', content:'blabla'}
  const errors = {}

  // Validate inputs from values
  if(!values.name || values.name.length < 5)
  {
    errors.name= "A title longer than 5 characters is required"
  }
  if(!values.description)
  {
    errors.description="A description is required"
  }

  // If errors is empty, fine to submit form.
  return errors

}

function mapStateToProps(state)
{
	return {auth: state.auth}
} 

export default reduxForm({
	validate: validate,
	form: 'infoForm'
})(connect(mapStateToProps, actions)(withRouter(InfoFill)));