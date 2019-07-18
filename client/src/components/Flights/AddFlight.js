import React, { Component } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { addFlight } from "../../actions/flightActions";
import { setAlert } from "../../actions/alert";
import Alert from "../Layout/Alert";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddFlight extends Component {
  state = {
    tourist: [],
    departure: new Date(),
    arrival: new Date(),
    seats: "",
    price: ""
  };

  handleDeparture = date => {
    this.setState({
      departure: date
    });
  };

  handleArrival = date => {
    this.setState({
      arrival: date
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (
      this.state.departure !== "" &&
      this.state.arrival !== "" &&
      this.state.price !== "" &&
      this.state.seats !== ""
    ) {
      const newFlight = {
        id: uuid(),
        departure: this.state.departure,
        arrival: this.state.arrival,
        seats: this.state.seats,
        price: this.state.price
      };
      this.props.addFlight(newFlight);
    } else {
      this.props.setAlert("Fill all the fields", "danger");
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className=' card mt-5'>
        <div className='card-body'>
          <h4 className='text-uppercase mb-4 font-weight-bold text-muted'>
            <i className='fas fa-calendar-plus px-2' />
            Add flight
          </h4>
          <form>
            <div className='form-row'>
              <div className='form-group col-md-4 pl-3'>
                <p className='font-weight-bold my-2'>Departure</p>
                <DatePicker
                  className='form-control'
                  type='date'
                  name='departure'
                  selected={this.state.departure}
                  onChange={this.handleDeparture}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  dateFormat='dd/MM/yy h:mm aa'
                  timeCaption='time'
                  placeholderText='Departure date'
                />
              </div>

              <div className='col-md-1' />
              <div className='form-group col-md-4 pl-3 '>
                <p className='font-weight-bold my-2'>Ticket Price</p>
                <input
                  type='number'
                  className='form-control'
                  name='price'
                  placeholder='Price'
                  onChange={this.onChange}
                  autoComplete='off'
                  required
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-4 pl-3'>
                <p className='font-weight-bold my-2'>Arrival</p>
                <DatePicker
                  className='form-control'
                  name='departure'
                  selected={this.state.arrival}
                  onChange={this.handleArrival}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={30}
                  dateFormat='dd/MM/yy h:mm aa'
                  timeCaption='time'
                  placeholderText='Arrival date'
                  autoComplete='off'
                />
              </div>
              <div className='col-md-1' />
              <div className='form-group col-md-4 pl-3'>
                <p className='font-weight-bold my-2'>Seats</p>
                <input
                  type='number'
                  className='form-control'
                  name='seats'
                  placeholder='Seats'
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-info text-light btn-md ml-2 my-4'
              onClick={this.onSubmit}
            >
              Add Flight
            </button>
          </form>
          <Alert />
        </div>
      </div>
    );
  }
}

AddFlight.propTypes = {
  addFlight: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tourists: state.touristReducer
});

export default connect(
  mapStateToProps,
  { addFlight, setAlert }
)(AddFlight);
