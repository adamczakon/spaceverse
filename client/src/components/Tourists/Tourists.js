import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTourists, deleteTourist } from "../../actions/touristActions";
import Spinner from "../Layout/Spinner";

class Tourists extends Component {
  state = {
    flightsOpen: false,
    flightId: ""
  };
  componentDidMount() {
    this.props.getTourists();
  }

  deleteTourist = _id => {
    this.props.deleteTourist(_id);
  };

  toggleFlights = id => {
    this.setState({ flightsOpen: !this.state.flightsOpen });
    this.setState({ flightId: id });
    console.log(document.getElementsByClassName(id).classList);
  };

  setFlightId = id => {
    this.setState({ flightId: id });
  };

  // Date display
  dateDisplay = str => {
    return str
      .substring(2, 10)
      .split("-")
      .reverse()
      .join("/");
  };

  render() {
    const tourists = this.props.results.tourists;

    return this.props.results.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div style={{ marginTop: "80px" }}>
          <h4 className='text-uppercase mb-3 font-weight-bold text-muted'>
            <i className='fas fa-user-friends px-2' />
            Tourists List
          </h4>
          <div className='table-responsive-md'>
            <table className='table table-striped text-center'>
              <thead className='table-dark'>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First Name</th>
                  <th scope='col'>Last Name</th>
                  <th scope='col'>Birth Date</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Remarks</th>
                  <th scope='col'>Flight ID</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourists.map((tourist, i) => (
                  <tr key={tourist._id}>
                    <td>{i + 1}</td>
                    <td>{tourist.firstName.substring(0, 9)}</td>
                    <td>{tourist.lastName.substring(0, 9)}</td>
                    <td>{this.dateDisplay(tourist.birthDate)}</td>
                    <td>{tourist.gender}</td>
                    <td>{tourist.country}</td>
                    <td>{tourist.remarks ? tourist.remarks : "---"}</td>
                    <td>
                      {tourist.flightId
                        ? tourist.flightId.substring(18, 24)
                        : "---"}
                    </td>
                    <td>
                      <div className='action-buttons'>
                        <Link
                          to={`/tourists/tourist-edit/${tourist._id}`}
                          className='btn btn-info btn-sm mr-2'
                          onClick={this.toggleFlights.bind(this, tourist._id)}
                        >
                          <i className='fas fa-edit' />
                        </Link>
                        <button
                          type='button'
                          className='btn btn-danger btn-sm'
                          onClick={this.deleteTourist.bind(this, tourist._id)}
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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  results: state.touristReducer
});

export default connect(
  mapStateToProps,
  { getTourists, deleteTourist }
)(Tourists);
