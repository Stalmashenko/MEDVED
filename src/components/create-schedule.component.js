import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from '../services/auth-header';

import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


export default class CreateSchedule extends React.Component {
  state = {
    loading: true,
    users: null
  };

  async componentDidMount() {



  //  const url = API_URL+"manager/createschedule";
  const {data} = await axios.get(API_URL + "manager/createschedule", { headers: authHeader() });
//  const {token} = await axios.get(API_URL + "manager/gettoken", { headers: authHeader() });
//  console.log(response);
//    const {data} = await response.json();
  console.log(data);
    this.setState({ users: data, loading: false });

  }

  render() {
    if (this.state.loading) {
      return <div className="loading">loading...</div>;
    }

    if (!this.state.users.length) {
      return <div className="loading">didn't get a person</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        let axiosConfig = {
            headers: authHeader()
          };

          axios.post(API_URL + "manager/posttime",data, axiosConfig);
    }
    return (
      <div className="profile">
      <div>
    <header className="headerprofile">
      <h3>
Create Schedule      </h3>
    </header>
    </div>
      <form className="createschedule" onSubmit={handleSubmit}>
      <label className="labell">Choose Doctor</label>
      <select size="1" name="doctor" required>
        {this.state.users.map(user => (
          <option value={user._id}>{user.firstName} {user.lastName}</option>
        ))}
      </select>
      <label className="labell">Choose Date</label>
      <input type="date" name="date" />
       <p>
       <label className="labell">Choose Time</label>
       <select size="5"  name="time">
          <option disabled>Choose</option>
          <option selected value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
       </select>
       </p>

      <p>
        <button className="btn btn-primary btn-block"  value="Отправить">Create schedule</button>
      </p>
      </form>
      </div>

    );
  }
}
