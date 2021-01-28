import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/authService";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  //  console.log("CUUUUUUUUUUUUUUUUUURRRRRRRRent"+currentUser);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="profile">
        {(this.state.userReady) ?
          <div>
        <header className="headerprofile">
          <h3>
          My Profile <br/>
            <strong>{currentUser.firstName}</strong>
            <strong> </strong>
            <strong>{currentUser.lastName}</strong>
          </h3>
        </header>
        </div>: null}
        <div className="profileitem">
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>First Name:</strong>{" "}
          {currentUser.firstName}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {currentUser.lastName}
        </p>
        <p>
          <strong>Birthday:</strong>{" "}
          {currentUser.birthDay}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {currentUser.address}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
      </div>
    );
  }
}
