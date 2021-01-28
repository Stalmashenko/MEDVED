import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from '../services/auth-header';
import { withRouter } from "react-router-dom";
import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


class Journal extends React.Component {
  state = {
    loading: true,
    users: null
  };

  async componentDidMount() {



  //  const url = API_URL+"manager/createschedule";
  const {data} = await axios.get(API_URL + "doctor/journal", { headers: authHeader() });
//  const {token} = await axios.get(API_URL + "manager/gettoken", { headers: authHeader() });
//  console.log(response);
//    const {data} = await response.json();
  console.log(data);
    this.setState({ jour: data, loading: false });

  }

  render() {
    if (this.state.loading) {
      return <div className="loading">loading...</div>;
    }

    if (!this.state.jour.length) {
      return <div className="loading">didn't get a person</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let axiosConfig = {
            headers: authHeader()
          };

          axios.post(API_URL + "doctor/journal/",data, axiosConfig);
          window.location.href = '/journal'

    }
    return (
      <form onSubmit={handleSubmit}>
      <table>
      <tbody>
        <th>Date</th>
        <th>Time</th>
        <th>Patient</th>
        <th>Work Done</th>
        <th>Diagnosis</th>
        <th>Status</th>
        <th hidden><button className="btn btn-primary btn-block" value="saveJ">Save</button></th>
        <th hidden>id</th>

      </tbody>

      {this.state.jour.map(write => (
        <tbody>
        <th>{write.visitId.visitDate}</th>
        <th>{write.visitId.visitTime}</th>
        <th>{write.patientId.firstName} {write.patientId.lastName}</th>
        <th><textarea name="workdone">{write.workDone}</textarea></th>
        <th><textarea name="diagnosis">{write.diagnosis}</textarea></th>
        <th>{write.visitId.status}</th>
        <th><button className="btn btn-primary btn-block" value="saveJ">Save</button></th>

          <th><input name="writeid" hidden value={write._id}></input></th>
        </tbody>
      ))}
    </table>
    </form>
  );
}
}

export default withRouter(Journal);
