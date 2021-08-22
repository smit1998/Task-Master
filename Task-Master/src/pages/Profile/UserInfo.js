/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import { withRouter } from 'react-router';
import {
  Form,
  Row,
  Col,
  Button,
} from 'reactstrap';
import API from '../../api';


class UserInfo extends React.Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      busyness: '',
      email: '',
      tasks: [],
      followers: [],
      following: [],
      openToWork: false,
    };
  }

  componentDidMount() {
    this.is_mounted = true;
    const { match, userDetails } = this.props;

    let username = ''
    if (window.location.pathname === '/dashboard/profile/me') {
      username = userDetails.username;
    } else {
      username = match.params.username;
    }

    API.getUserProfile(username)
      .then(
        result => {
          const data = result.body;
          if (this.is_mounted && result.status === 200) {
            this.setState({
              username: data.username,
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              busyness: data.busyness,
            });
          }
        },
      );

      API.listFollowers(username)
        .then(
          result => {
            const data = result.body;
            let temp1 = []
            if(result.status === 200) {
              for(let i = 0; i < data.length - 1; i++) {
                temp1.push(data[i].follower + ", ")
              }
              temp1.push(data[data.length-1].follower)
              this.setState({
                followers: temp1
              })
            }
          }
        )

    API.listFollowing(username)
      .then(
        result => {
          const data = result.body;
          let temp2 = []
          if (result.status === 200) {
            for (let i = 0; i < data.length - 1; i++) {
              temp2.push(data[i].follow + ", ")
            }
            temp2.push(data[data.length - 1].follow)
            this.setState({
              following: temp2
            })
          }
        }
      )

      API.getCurrentStateOfSwitch(username)
        .then(
          result => {
            const data = result.body;
            if(result.status === 200) {
              this.setState({
                openToWork: data.is_open_to_work
              })
            } 
          }
        )
  }

  renderOpenToWork() {
    
    const checkIfUser = () => {
      API.getLoggedInUser()
        .then(
          result => {
            const data = result.body;

            if(data.username === this.state.username) {
              // call the update api here
              API.updateSwitch(data.username)
                .then(
                  result => {
                    if(result.status === 201) {
                      this.setState({
                        openToWork: !this.state.openToWork
                      })
                    }
                  }
                )
            }
          } 
       )
    }

    if(this.state.openToWork === true) { 
      return (
        <Button
          color="success"
          onClick={checkIfUser}
        >
          Available
        </Button>
      )
    } else {
        return (
        <Button
            style={{ "backgroundColor": "#FFFFFF", "color": "#808080" }}
            onClick={checkIfUser}
        >
          Unavailable
        </Button>
      )
    }
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  render() {
    const { username, email, firstName, lastName, busyness, followers, following } = this.state;

    return (
      <Form>
        <div className="pl-lg-4">
          <Row>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Username'}
              </label>
              <div>{username}</div>
            </Col>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Email'}
              </label>
              <div>{email}</div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'First Name'}
              </label>
              <div>{firstName}</div>
            </Col>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Last Name'}
              </label>
              <div>{lastName}</div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Followers'}
              </label>
              <div>{followers.length}</div>
            </Col>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Following'}
              </label>
              <div>{following.length}</div>
            </Col>
          </Row>
          <Row>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Busyness'}
              </label>
              <div>{busyness}</div>
            </Col>
            <Col className="pt-3" lg="6">
              <label className="form-control-label">
                {'Open To Work'}
              </label>
              <div>{this.renderOpenToWork()}</div>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

export default withRouter(UserInfo);
