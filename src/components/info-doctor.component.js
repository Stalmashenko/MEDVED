import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Link} from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import authHeader from '../services/auth-header';

import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


 class InfoDoctor extends React.Component {
  state = {
    loading: true,
    visits: null
  };

  async componentDidMount() {
//console.log("GOVNO");


  //  const url = API_URL+"manager/createschedule";
  try{
    console.log(this.props);
    let linkId = this.props.match.params.id;
 const {data} = await axios.get(API_URL + `doctor/info/${linkId}`, { headers: authHeader() });
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
    let linkId = this.props.match.params.id;

    const handleSubmit = async (visitid, event) => {
      try{  event.preventDefault();
        let axiosConfig = {
            headers: authHeader()
          };
        await  axios.post(API_URL + "patient/history/",{visitid}, axiosConfig);
          window.location.href = '/history'
        }
        catch(e) {
          window.location.href = '/login'
        }
    }
    return (
      <div className="profile">
      <div>
    <header className="headerprofile">
      <h3>Doctor Schedule</h3>
    </header>
    </div>
      <table>
        <tbody>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th></th>
        </tr>

        {this.state.visits.map(visit => (
          <tr>
          <th>{visit.visitDate}</th>
          <th>{visit.visitTime}</th>
          <th>{visit.status}</th>
<th><button className="btn btn-primary btn-block" value="zapiska" onClick={handleSubmit.bind(this, visit._id)}>Make an appointment</button></th>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    );
  }
}

export default withRouter(InfoDoctor);
