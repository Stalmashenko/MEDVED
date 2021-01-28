import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from '../services/auth-header';

import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


export default class DoctorSchedule extends React.Component {
  state = {
    loading: true,
    visits: null
  };

  async componentDidMount() {
//console.log("GOVNO");


  //  const url = API_URL+"manager/createschedule";
  try{
    console.log(axios.get(API_URL + "doctor/drschedule", { headers: authHeader() }));
  const {data} = await axios.get(API_URL + "doctor/drschedule", { headers: authHeader() });
    this.setState({ visits: data, loading: false });
}
catch(e){
  console.log(e);
}
//  const {token} = await axios.get(API_URL + "manager/gettoken", { headers: authHeader() });
//  console.log(response);
//    const {data} = await response.json();


  }

  render() {
    if (this.state.loading) {
      return <div className="loading">loading...</div>;
    }

    if (!this.state.visits.length) {
      return <div className="loading">didn't get a visits</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let axiosConfig = {
            headers: authHeader()
          };

      //    axios.post(API_URL + "manager/posttime",data, axiosConfig);
    }
    return (
      <div className="profile">
      <div>
    <header className="headerprofile">
      <h3>
My Schedule      </h3>
    </header>
    </div>
      <table>
        <tbody>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
        </tbody>

        {this.state.visits.map(visit => (
          <tbody>
          <th>{visit.visitDate}</th>
          <th>{visit.visitTime}</th>
          <th>{visit.status}</th>
          </tbody>
        ))}
      </table>
      </div>
    );
  }
}
