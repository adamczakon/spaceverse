import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getFlightDetails,
  getFlights,
  flightAddTourist,
  flightRemoveTourist
} from "../../actions/flightActions";
import {
  getTourists,
  touristAddFlight,
  getTouristsInFlight
} from "../../actions/touristActions";

class EditFlight extends Component {
  componentDidMount() {
    this.props.getFlightDetails(this.props.match.params.id);
    this.props.getTourists();
  }

  // Add tourist to flight
  addTouristToFlight = id => {
    const updateQuery = {
      touristId: id,
      flightId: this.props.results.flightDetails._id
    };

    this.props.touristAddFlight(updateQuery);
    this.props.flightAddTourist(updateQuery);
  };

  //Remove tourist from flight
  removeTouristFromFlight = (id, _id) => {
    const updateFlight = {
      touristId: id,
      flightId: this.props.results.flightDetails._id
    };

    const updateTourist = {
      touristId: id,
      flightId: ""
    };

    this.props.touristAddFlight(updateTourist);
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
    const tourists = this.props.tourists.tourists;
    const flightDetails = this.props.results.flightDetails;
    const avaibleSeats = flightDetails.seats
      ? flightDetails.seats -
        (flightDetails.tourists ? flightDetails.tourists.length : 0)
      : 0;

    return (
      <div>
        <h4
          className='text-uppercase font-weight-bold text-muted d-none d-md-block'
          style={{ marginTop: "80px" }}
        >
          <i className='fas fa-space-shuttle px-2' />
          Flight
        </h4>
        <div className='table-responsive-md'>
          <table className='table table-dark text-center'>
            <thead>
              <tr>
                <th scope='col'>Flight Id</th>
                <th scope='col'>Departure</th>
                <th scope='col'>Arrival</th>
                <th scope='col'>Seats</th>
                <th scope='col'>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {flightDetails._id ? flightDetails._id.substring(18, 24) : ""}
                </td>
                <td>
                  {flightDetails.departure
                    ? flightDetails.departure
                        .substring(2, 10)
                        .split("-")
                        .reverse()
                        .join("/") +
                      " " +
                      flightDetails.departure.substring(11, 16)
                    : ""}
                </td>
                <td>
                  {flightDetails.arrival
                    ? this.dateDisplay(flightDetails.arrival)
                    : ""}
                  <span className='pl-2'>
                    {flightDetails.arrival
                      ? this.timeDisplay(flightDetails.arrival)
                      : ""}
                  </span>
                </td>
                <td>
                  {flightDetails.seats} ({avaibleSeats})
                </td>
                <td>{flightDetails.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4
          className='text-uppercase mb-3 font-weight-bold text-muted'
          style={{ marginTop: "100px" }}
        >
          <i className='fas fa-user-friends px-2' />
          Tourists In Flight
        </h4>
        <div className='table-responsive-md'>
          <table className='table table-striped text-center'>
            <thead className='bg-secondary'>
              <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Country</th>
                <th scope='col'>Birth Date</th>
                <th scope='col'>Remarks</th>
                <th scope='col'>Remove</th>
              </tr>
            </thead>
            <tbody>
              {tourists.map((tourist, i) => (
                <React.Fragment key={tourist._id}>
                  {tourist.flightId === flightDetails._id && (
                    <tr className='row-animation' key={tourist._id}>
                      <td>{tourist.firstName}</td>
                      <td>{tourist.lastName}</td>
                      <td>{tourist.gender}</td>
                      <td>{tourist.country}</td>
                      <td>{this.dateDisplay(tourist.birthDate)}</td>
                      <td>{tourist.remarks ? tourist.remarks : "---"}</td>
                      <td>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={this.removeTouristFromFlight.bind(
                            this,
                            tourist.id,
                            tourist._id
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
          className='text-uppercase mb-3 font-weight-bold text-muted'
          style={{ marginTop: "100px" }}
        >
          <i className='fas fa-user-plus px-2' />
          Add Tourist To Flight
        </h4>
        {avaibleSeats > 0 ? (
          <div className='table-responsive-md'>
            <table className='table table-striped text-center'>
              <thead className='table-dark'>
                <tr>
                  <th scope='col'>First Name</th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Birth Date</th>
                  <th scope='col'>Remarks</th>
                  <th scope='col'>Flight</th>
                  <th scope='col'>Add</th>
                </tr>
              </thead>
              <tbody>
                {tourists.map(tourist => (
                  <React.Fragment key={tourist._id}>
                    {tourist.flightId !== flightDetails._id &&
                      tourist.flightId.length < 1 && (
                        <tr className='row-animation' key={tourist._id}>
                          <td>
                            {tourist.flightId !== flightDetails._id
                              ? tourist.firstName
                              : ""}
                          </td>
                          <td>{tourist.lastName}</td>
                          <td>{tourist.gender}</td>
                          <td>{tourist.country}</td>
                          <td>{this.dateDisplay(tourist.birthDate)}</td>
                          <td>{tourist.remarks ? tourist.remarks : "---"}</td>
                          <td>
                            {tourist.flightId
                              ? tourist.flightId.substring(18, 24)
                              : "---"}
                          </td>
                          <td>
                            <button
                              className='btn btn-success btn-sm'
                              onClick={this.addTouristToFlight.bind(
                                this,
                                tourist.id
                              )}
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
        ) : (
          <h4>No seats avaible</h4>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.flightReducer,
  tourists: state.touristReducer
});

export default connect(
  mapStateToProps,
  {
    getFlightDetails,
    getFlights,
    getTourists,
    touristAddFlight,
    flightAddTourist,
    flightRemoveTourist,
    getTouristsInFlight
  }
)(EditFlight);
