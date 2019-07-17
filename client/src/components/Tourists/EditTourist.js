import React, { Component } from "react";
import {
  getFlightDetails,
  getFlights,
  flightAddTourist,
  flightRemoveTourist
} from "../../actions/flightActions";
import {
  getTouristDetails,
  getTourists,
  touristAddFlight,
  touristRemoveFlight
} from "../../actions/touristActions";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";

class EditTourist extends Component {
  componentDidMount() {
    this.props.getFlights();
    this.props.getTourists();
    this.props.getTouristDetails(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tourists.touristDetails.flightId !==
      prevProps.tourists.touristDetails.flightId
    ) {
      this.props.getFlightDetails(this.props.tourists.touristDetails.flightId);
    }
  }

  // Add flight to tourist
  addFlight = id => {
    const updateTourist = {
      touristId: this.props.tourists.touristDetails._id,
      flightId: this.props.tourists.touristDetails.flightId
    };

    const updateFlight = {
      touristId: this.props.tourists.touristDetails._id,
      flightId: id
    };

    if (this.props.tourists.touristDetails.flightId.length > 0) {
      this.props.touristAddFlight(updateFlight);
      this.props.flightAddTourist(updateFlight);
      this.props.flightRemoveTourist(updateTourist);
    } else {
      this.props.touristAddFlight(updateFlight);
      this.props.flightAddTourist(updateFlight);
    }
  };

  //remove flight from tourist
  removeTouristFromFlight = id => {
    const updateTourist = {
      touristId: this.props.tourists.touristDetails._id,
      flightId: id
    };

    const updateFlight = {
      touristId: this.props.tourists.touristDetails._id,
      flightId: id
    };

    this.props.touristRemoveFlight(updateTourist);
    this.props.flightRemoveTourist(updateFlight);
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
    const tourist = this.props.tourists.touristDetails;
    const flights = this.props.results.flights;

    return this.props.results.loading ? (
      <Spinner />
    ) : (
      <div>
        <h4
          className='text-uppercase font-weight-bold text-muted d-none d-md-block'
          style={{ marginTop: "80px" }}
        >
          <i className='fas fa-user px-2' />
          Tourist
        </h4>
        <div className='table-responsive-md'>
          <table className='table mt-3 text-center'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Country</th>
                <th scope='col'>Remarks</th>
                <th scope='col'>Birth Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tourist.firstName}</td>
                <td>{tourist.lastName}</td>
                <td>{tourist.gender}</td>
                <td>{tourist.country}</td>
                <td>{tourist.remarks ? tourist.remarks : "---"}</td>
                <td>
                  {tourist.birthDate && this.dateDisplay(tourist.birthDate)}
                </td>
              </tr>
              <tr className='bg-secondary'>
                <th scope='col'>Flight ID</th>
                <th scope='col'>Departure</th>
                <th scope='col'>Arrival</th>
                <th scope='col'>Seats (Avaible)</th>
                <th scope='col'>Price</th>
                <th scope='col'>Remove Flight</th>
              </tr>
              {flights.map(flight => (
                <React.Fragment key={flight._id}>
                  {flight._id === tourist.flightId && (
                    <tr key={flight._id} className='row-animation'>
                      <td>
                        {tourist.flightId
                          ? tourist.flightId.substring(18, 24)
                          : ""}
                      </td>
                      <td>
                        {flight.departure
                          ? this.dateDisplay(flight.departure)
                          : ""}
                        <span className='pl-2'>
                          {flight.departure
                            ? this.timeDisplay(flight.departure)
                            : ""}
                        </span>
                      </td>
                      <td>
                        {flight.arrival ? this.dateDisplay(flight.arrival) : ""}
                        <span className='pl-2'>
                          {flight.arrival
                            ? this.timeDisplay(flight.arrival)
                            : ""}
                        </span>
                      </td>
                      <td>
                        {flight.seats} (
                        {flight.seats -
                          (flight.tourists ? flight.tourists.length : 0)}
                        )
                      </td>
                      <td>{flight.price}</td>
                      <td>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={this.removeTouristFromFlight.bind(
                            this,
                            flight._id
                          )}
                        >
                          <i className='fas fa-times' />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <h4
          className='text-uppercase font-weight-bold text-muted d-none d-md-block'
          style={{ marginTop: "100px" }}
        >
          <i className='fas fa-space-shuttle px-2' />
          Avaible Flights
        </h4>
        <div className='table-responsive-md'>
          <table className='table table-striped mt-3 text-center'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Flight ID</th>
                <th scope='col'>Departure</th>
                <th scope='col'>Arrival</th>
                <th scope='col'>Seats (Avaible)</th>
                <th scope='col'>Price</th>
                <th scope='col'>Add</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <React.Fragment key={flight._id}>
                  {flight._id !== tourist.flightId &&
                    (flight.tourists ? flight.tourists.length : 0) <
                      flight.seats && (
                      <tr key={flight._id} className='row-animation'>
                        <td>{flight._id.substring(18, 24)}</td>
                        <td>
                          {flight.departure
                            ? this.dateDisplay(flight.departure)
                            : ""}
                          <span className='pl-2'>
                            {flight.departure
                              ? this.timeDisplay(flight.departure)
                              : ""}
                          </span>
                        </td>
                        <td>
                          {flight.arrival
                            ? this.dateDisplay(flight.arrival)
                            : ""}
                          <span className='pl-2'>
                            {flight.arrival
                              ? this.timeDisplay(flight.arrival)
                              : ""}
                          </span>
                        </td>
                        <td>
                          {flight.seats} (
                          {flight.seats -
                            (flight.tourists ? flight.tourists.length : 0)}
                          )
                        </td>
                        <td>{flight.price}</td>
                        <td>
                          <button
                            onClick={this.addFlight.bind(this, flight._id)}
                            className={"btn btn-sm btn-success"}
                          >
                            <i className='fas fa-plus' />
                          </button>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tourists: state.touristReducer,
  results: state.flightReducer
});

export default connect(
  mapStateToProps,
  {
    getTourists,
    getTouristDetails,
    getFlights,
    getFlightDetails,
    touristAddFlight,
    touristRemoveFlight,
    flightAddTourist,
    flightRemoveTourist
  }
)(EditTourist);
