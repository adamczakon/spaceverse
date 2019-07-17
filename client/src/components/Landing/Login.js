import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import Alert from "../Layout/Alert";

const Login = ({ login, isAuthenticated, toggleOnClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/flights' />;
  }

  return (
    <div className='card'>
      <div className='card-header text-center text-uppercase'>Sign in</div>
      <div className='card-body'>
        <Alert />
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <button className='btn btn-secondary btn-block btn-sm'>
            Sign in
          </button>
        </form>
        <hr />
        <p className='card-text text-center  mb-1'>
          <small className='text-muted'>Don't have an account?</small> <br />
        </p>
        <button
          className='btn btn-secondary btn-block btn-sm'
          onClick={() => login("guestlogin123@gmail.com", "123456")}
        >
          Continue as guest
        </button>

        <p className='card-text text-center'>
          <small className='text-muted'>or</small> <br />
          <span
            className='text-secondary'
            onClick={toggleOnClick}
            style={{ cursor: "pointer" }}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
