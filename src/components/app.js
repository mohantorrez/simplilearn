import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./login/login";
import Register from "./register";
class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {

    return (
        <React.Fragment>
       <div>App</div>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </React.Fragment>
    );
  }
}
 

export default App
