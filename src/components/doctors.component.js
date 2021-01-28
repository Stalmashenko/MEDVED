import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import authHeader from '../services/auth-header';
import {Link} from "react-router-dom";
import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";

//import ManagerService from "../services/managerService";
const API_URL = "http://localhost:3000/api/test/";


export default class Doctors extends React.Component {
  state = {
    loading: true,
    users: null
  };

  async componentDidMount() {



  //  const url = API_URL+"manager/createschedule";
  const {data} = await axios.get(API_URL + "doctors/alldoctors", { headers: authHeader() });
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

        //  axios.post(API_URL + "manager/posttime",data, axiosConfig);
    }
    return (

    <div className="products-items">
    {this.state.users.map(user => (
                <div className="product-item">
                    <div className="product">
                        <div className="product-photo">
    	                    <img className="product-photo-locale" src={user.photo} />
                        </div>
                        <div className="product-container">
                            <div className="product-title">{user.firstName} {user.lastName}</div>
                            <div className="product-description">{user.description}</div>
                            <Link to={`/info/${user._id}`}>check schedule</Link>
                        </div>
                    </div>
                </div>
              ))}
    </div>

    );
  }
}
