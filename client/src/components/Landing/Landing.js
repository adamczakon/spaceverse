import React, { useState } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Register from "./Register";

const Landing = () => {
  const [loginActive, setLoginActive] = useState(true);

  const toggleOnClick = () => {
    setLoginActive(!loginActive);
  };
  //show login or register forms
  let component;
  loginActive
    ? (component = <Login toggleOnClick={toggleOnClick} />)
    : (component = <Register toggleOnClick={toggleOnClick} />);

  return <div className='landing'>{component}</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

Landing.propTypes = {};

export default connect(mapStateToProps)(Landing);
