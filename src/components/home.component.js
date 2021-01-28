import React, { Component } from "react";

import UserService from "../services/userService";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div class="about">
          <div class="about-title">ABOUT OUR WEBSITE</div>
          <div class="about-container">
              <div class="about-info">
              <strong>We are Nika and Nastya! Welcome to the website of the Healthcare Institution "MEDved" in Minsk, where you can get all the necessary information about the diagnostic and treatment options in our clinic.</strong>
                  <div class="about-products"></div>
                  <div class="about-title2">You can find us</div>

                  <div class="briefly">
                  <p>
                  <ul>
                      <li>
                          <a href="https://www.instagram.com/veronika.labovitch/">
<p>Inst Niki</p>
                          </a>
                          </li>
                      <li><a href="https://www.instagram.com/stalmashenko/">
<p>Inst Nasti</p>                        </a></li>
<li><a href="https://www.youtube.com/channel/UCAFlmYseZhZAtW8riRZsYQw?view_as=subscriber">
<p>Our Youtub Channel</p>                        </a></li>
                  </ul>

              </p>
                  </div>
                  

              </div>
              <div class="about-photo">
              <img src="https://sun9-33.userapi.com/impg/FYjMUsU9_JPTaStnZld-LE7t3BohlDrH2iEmog/DQC2z-7PDrw.jpg?size=735x597&quality=96&proxy=1&sign=78d0eda4383766a791dbeaa7e44672ad&type=album" alt="ORGANICSHOP"/>


              </div>
          </div>
      </div>
    );
  }
}
