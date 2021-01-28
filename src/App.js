import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/authService";


import CreateSchedule from "./components/create-schedule.component";
import CreateDoctor from "./components/create-doctor.component";
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Doctors from "./components/doctors.component";
import History from "./components/history.component";
import Journal from "./components/journal.component";
import Ticket from "./components/ticket.component";
import DoctorSchedule from "./components/doctor-schedule.component"
import InfoDoctor from "./components/info-doctor.component";
import BoardPatient from "./components/board-patient.component";
import BoardManager from "./components/board-manager.component";
import BoardAdmin from "./components/board-admin.component";
import BoardDoctor from "./components/board-doctor.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showManagerBoard: false,
      showAdminBoard: false,
        showDoctorBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showManagerBoard: user.roles.includes("ROLE_MANAGER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showDoctorBoard: user.roles.includes("ROLE_DOCTOR"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showManagerBoard, showAdminBoard, showDoctorBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MEDved
          </Link>
          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/alldoctors"} className="nav-link">
                All doctors
              </Link>
            </li>

            {showManagerBoard && (
              <li className="nav-item">
                <Link to={"/manager"} className="nav-link">
                  Manager Board
                </Link>
              </li>
            ) && (
              <li className="nav-item">
                <Link to={"/join"} className="nav-link">
                Chat
                </Link>
              </li>
        ) }

        {showManagerBoard  && (
          <li className="nav-item">
            <Link to={"/createschedule"} className="nav-link">
               Create schedule
            </Link>
          </li>
        ) }

            {showManagerBoard  && (
                  <li className="nav-item">
                    <Link to={"/createdr"} className="nav-link">
                      Create doctor
                    </Link>
                  </li>
                ) }




            {showDoctorBoard && (
              <li className="nav-item">
                <Link to={"/doctor"} className="nav-link">
                  Doctor Board
                </Link>
              </li>
            ) && (
              <li className="nav-item">
                <Link to={"/drschedule"} className="nav-link">
                   My schedule
                </Link>
              </li>)}

              {showDoctorBoard &&(
                  <li className="nav-item">
                    <Link to={"/journal"} className="nav-link">
                    Journal
                    </Link>
                  </li>
              )}

              {showDoctorBoard && (
                  <li className="nav-item">
                    <Link to={"/join"} className="nav-link">
                    Chat
                    </Link>
                  </li>
              )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                            <Link to={"/history"} className="nav-link">
                              History
                            </Link>
                             </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Exit
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/patient" component={BoardPatient} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/doctor" component={BoardDoctor} />
            <Route path="/info/:id" component={InfoDoctor} />
            <Route exact path="/createschedule" component={CreateSchedule} />
            <Route exact path="/createdr" component={CreateDoctor} />
            <Route exact path="/journal" component={Journal} />
            <Route exact path="/history" component={History} />
            <Route exact path="/drschedule" component={DoctorSchedule} />
            <Route exact path="/alldoctors" component={Doctors} />
            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
