import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <div
        className='sidenav bg-dark'
        style={
          this.props.sideNavOpen
            ? {
                transform: "translateX(0)",
                transition: "transform 0.3s ease-in"
              }
            : {
                transform: "translateX(-100%)",
                transition: "transform 0.3s ease-in"
              }
        }
      >
        <i className='fas fa-4x fa-user-circle sidenav-picture pt-3' />
        <p className='pt-1 pb-0'>
          {this.props.auth.user ? this.props.auth.user.name : ""}
        </p>
        <ul className='sidenav-list'>
          <NavLink
            className='sidenav-link '
            activeClassName='active'
            to='/flights'
          >
            <li className='sidenav-item'>
              <i className='fas fa-space-shuttle pr-3' />
              Flights
            </li>
          </NavLink>
          <NavLink
            className='sidenav-link '
            activeClassName='active'
            to='/add-flight'
          >
            <li className='sidenav-item'>
              <i className='fas fa-calendar-plus  pr-3' /> Add Flight
            </li>
          </NavLink>
          <NavLink
            className='sidenav-link '
            activeClassName='active'
            to='/tourists'
          >
            <li className='sidenav-item'>
              <i className='fas fa-user-friends pr-2' /> Tourists
            </li>
          </NavLink>
          <NavLink
            className='sidenav-link '
            activeClassName='active'
            to='/add-tourist'
          >
            <li className='sidenav-item'>
              <i className='fas fa-user-plus pr-3' />
              Add Tourist
            </li>
          </NavLink>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(SideNav);
