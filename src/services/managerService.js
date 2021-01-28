import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:3000/api/test/";
class ManagerService {
  getAllDrs() {
    return axios.get(API_URL + "manager/createschedule", { headers: authHeader() }){
      })
      .then(response => {
        }
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new ManagerService();
