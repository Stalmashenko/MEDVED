import React, { PureComponent } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import jsPDF from "jspdf";
import {Link} from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import authHeader from '../services/auth-header';

import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


 class History extends React.Component {
  state = {
    loading: true,
    visits: null
  };

  async componentDidMount() {
//console.log("GOVNO");


  //  const url = API_URL+"manager/createschedule";
  try{
    console.log(this.props);
  //   let linkId = this.props.match.params.id;
    const {data} = await axios.get(API_URL + `patient/history/`, { headers: authHeader() });
    this.setState({ visits: data, loading: false });
}
catch(e){
  console.log(e);
}
//  const {token} = await axios.get(API_URL + "manager/gettoken", { headers: authHeader() });
//  console.log(response);
//    const {data} = await response.json();


  }
jsPdfGenerator = (item) => {
  let user = JSON.parse(localStorage.getItem('user'));
  var doc = new jsPDF('p', 'pt');
  doc.setFont('century gothic');
  doc.text(200, 20, 'TICKET');
  doc.text(500, 20, 'MedVED');
  doc.text(20, 100, 'Patient:  '+ user.username);
  doc.text(20, 150, 'Visit date: '+item.visitDate);
  doc.text(20, 200, 'Visit time: '+item.visitTime);
  doc.text(20, 250, 'Doctor: '+ item.doctorId.firstName + " "+ item.doctorId.lastName);
  doc.text(20, 300, 'Address: Belarus, Minsk. Sverdlova 26 street');
  doc.save("ticket.pdf");
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
      <table>
        <tbody>
          <th>Date</th>
          <th>Time</th>
          <th>Doctor</th>
          <th>Status</th>
          <th>Ticket</th>


        </tbody>

        {this.state.visits.map(visit => (
          <tbody>
          <th>{visit.visitDate}</th>
          <th>{visit.visitTime}</th>
          <th>{visit.doctorId.firstName} {visit.doctorId.lastName}</th>
          <th>{visit.status}</th>

            <th>
            <button  className="btn btn-primary btn-block" onClick={()=>this.jsPdfGenerator(visit)}>Get Ticket</button>
            </th>
          </tbody>
        ))}
      </table>
    );
  }
}

export default withRouter(History);
