import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className='fixed-top navbar navbar-expand-lg navbar-dark bg-primary '
          style={{ height: "60px" }}
        >
          <span
            className='navbar-toggler-icon toggler-custom'
            style={{ cursor: "pointer" }}
            onClick={this.props.toggleSideNav}
          />
          <p
            className='mb-0 navbar-brand text-light text-uppercase mr-0 '
            href='#'
          >
            Spaceverse
          </p>
          <div
            className='collapse navbar-collapse'
            id='navbarNav'
            style={{ marginLeft: "1em" }}
          />
          <button className='btn btn-secondary' onClick={this.props.logout}>
            <i className='fas fa-sign-out-alt pr-2' />
            <span className='font-weight-bold hide-sm'>Logout</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
