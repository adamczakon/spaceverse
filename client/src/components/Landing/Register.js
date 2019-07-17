import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Alert from "../Layout/Alert";

const Register = ({ register, toggleOnClick, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/flights' />;
  }

  return (
    <div className='card'>
      <div className='card-header text-center text-uppercase'>Sign up</div>
      <div className='card-body'>
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control input-sm'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='User ID'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control input-sm'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control input-sm'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Password'
              minLength='6'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control input-sm'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Confirm password'
              minLength='6'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <button className='btn btn-secondary btn-block btn-sm'>
            Sign Up
          </button>
        </form>
        <hr />
        <p className='card-text text-center  mb-1'>
          <small className='text-muted'>Already have an account?</small> <br />
        </p>

        <p className='card-text text-center'>
          <span
            className='text-secondary'
            onClick={toggleOnClick}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
