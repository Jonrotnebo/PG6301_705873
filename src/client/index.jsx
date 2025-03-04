// Disclaimer: I Did not write this file. Minor changes/Alterations from repo, se link below
// Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/client/index.jsx

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HeaderBar from "./headerbar";
import {Home} from "./home";
import SignUp from "./signup";
import Login from "./login";
import {Create} from "./create";
import {Bid} from "./bid";


export class App extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();

    }

    componentWillUnmount() {
        this.socket.close();
    }


    fetchAndUpdateUserInfo = async () => {

        const url = "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            //that is ok
            this.updateLoggedInUser(null);
            return;
        }

        if (response.status !== 200) {
            //TODO here could have some warning message in the page.
        } else {
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    };

    updateLoggedInUser = (user) => {
        this.setState({user: user});
    };

    notFound() {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };

    render() {
        const id = this.state.user ? this.state.user.id : null

        return (
            <BrowserRouter>
                <div className="indexDiv">
                    <HeaderBar userId={id} updateLoggedInUser={this.updateLoggedInUser}/>

                    <Switch>

                        <Route exact path="/signup" render={props => <SignUp {...props} fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>
                        <Route exact path="/login" render={props => <Login {...props} fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>

                        <Route exact path="/"
                               render={props => <Home {...props}
                                                      user={this.state.user}
                                                      userCount={this.state.userCount}
                                                      updateLoggedInUser={this.updateLoggedInUser}
                                                      fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}

                               />}/>
                        <Route exact path="/create"
                               render={props => <Create {...props}
                                   user={this.state.user}
                                                        maker={this.state.user.maker}
                                   updateLoggedInUser={this.updateLoggedInUser}
                                   fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>

                        <Route exact path="/bid" render={props => <Bid {...props}
                                                                          user={this.state.user}
                                                                          updateLoggedInUser={this.updateLoggedInUser}
                                                                          fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}/>}/>

                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));