import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import SideNav from "./components/Navigation/SideNav";
import Landing from "./components/Landing/Landing";
import Flights from "./components/Flights/Flights";
import AddFlight from "./components/Flights/AddFlight";
import AddTourist from "./components/Tourists/AddTourist";
import EditFlight from "./components/Flights/EditFlight";
import EditTourist from "./components/Tourists/EditTourist";
import Tourists from "./components/Tourists/Tourists";
import PrivateRoute from "./components/Routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default class App extends Component {
  state = {
    sideNavOpen: true
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  toggleSideNav = () => {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  };

  render() {
    return (
      <Router>
        <Provider store={store}>
          <Route path='/' exact component={Landing} />
          <Navbar toggleSideNav={this.toggleSideNav} />
          <SideNav sideNavOpen={this.state.sideNavOpen} />
          <Switch>
            <Fragment>
              <div
                className={`content ${this.state.sideNavOpen &&
                  "content-right"}`}
              >
                <PrivateRoute path='/flights' exact component={Flights} />
                <PrivateRoute path='/add-flight' exact component={AddFlight} />
                <PrivateRoute
                  path='/flights/flight-edit/:id'
                  exact
                  component={EditFlight}
                />
                <PrivateRoute path='/tourists' exact component={Tourists} />
                <PrivateRoute
                  path='/add-tourist'
                  exact
                  component={AddTourist}
                />
                <PrivateRoute
                  path='/tourists/tourist-edit/:id'
                  exact
                  component={EditTourist}
                />
              </div>
            </Fragment>
          </Switch>
        </Provider>
      </Router>
    );
  }
}
