import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getFlights, deleteFlight } from "../../actions/flightActions";
import { touristRemoveFlight } from "../../actions/touristActions";
import { Link } from "react-router-dom";

class Flights extends Component {
  state = {};
  componentDidMount() {
    this.props.getFlights();
  }

  deleteFlight = id => {
    const updateTourist = {
      flightId: id
    };

    this.props.deleteFlight(id);
    this.props.touristRemoveFlight(updateTourist);
  };

  dateDisplay = str => {
    return str
      .substring(2, 10)
      .split("-")
      .reverse()
      .join("/");
  };

  timeDisplay = str => {
    return " " + (parseInt(str.substring(11, 13)) + 2) + str.substring(13, 16);
  };

  render() {
    const flights = this.props.results.flights;

    return this.props.results.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <h4
          className='text-uppercase font-weight-bold text-muted d-none d-md-block'
          style={{ marginTop: "80px" }}
        >
          <i className='fas fa-space-shuttle px-2' />
          Flights List
        </h4>
        <div className='table-responsive-md'>
          <table className='table table-striped text-center mt-3 '>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Departure</th>
                <th scope='col'>Arrival</th>
                <th scope='col'>Tourists</th>
                <th scope='col'>Seats (Avaible)</th>
                <th scope='col'>Price</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, i) => (
                <tr key={flight._id}>
                  <td>{i + 1}</td>
                  <td>
                    {flight.departure ? this.dateDisplay(flight.departure) : ""}
                    <span className='pl-2'>
                      {flight.departure
                        ? this.timeDisplay(flight.departure)
                        : ""}
                    </span>
                  </td>
                  <td>
                    {flight.arrival ? this.dateDisplay(flight.arrival) : ""}
                    <span className='pl-2'>
                      {flight.arrival ? this.timeDisplay(flight.arrival) : ""}
                    </span>
                  </td>
                  <td>{flight.tourists ? flight.tourists.length : 0}</td>
                  <td>
                    {flight.seats} (
                    {flight.seats -
                      (flight.tourists ? flight.tourists.length : 0)}
                    )
                  </td>
                  <td>{flight.price}</td>
                  <td>
                    <div className='action-buttons'>
                      <Link
                        to={`/flights/flight-edit/${flight._id}`}
                        className=' px-2 btn btn-info btn-sm mr-2'
                      >
                        <i className='fas fa-edit' />
                      </Link>
                      <button
                        type='button'
                        className='btn btn-danger btn-sm'
                        onClick={this.deleteFlight.bind(this, flight._id)}
                      >
                        <i className='fas fa-times' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  results: state.flightReducer,
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { getFlights, deleteFlight, touristRemoveFlight }
)(Flights);
