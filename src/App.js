import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/users/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { About } from "./components/pages/About";
import { Clear } from "./components/users/Clear";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount() {
  // 	this.setState({ loading: true });
  // 	const res = await axios.get(
  // 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLENT_SECRET}`
  // 	);
  // 	this.setState({ loading: false, users: res.data });
  // }
  //Search GuitHub Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ loading: false, users: res.data.items });
  };
  //clear all users
  clearAll = (e) => {
    this.setState({ users: [] });
  };
  //setting alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      setAlert={this.setAlert}
                    />
                    {this.state.users.length > 0 && (
                      <Clear clearAll={this.clearAll} />
                    )}
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
