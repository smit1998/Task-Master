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
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';
import UserInfo from '../../pages/Profile/UserInfo';
import API from '../../api';

class AccountInfo extends React.Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      busyness: '',
      email: '',
      following: false,
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

    API.getLoggedInUser()
      .then(result => {
        const data = result.body;
        API.isFollowing(username, data.id)
          .then(
            result => {
              if (result.status === 201 && result.body.message === "User is following") {
                // user is following
                this.setState({
                  following: true
                });
              } else if (result.status === 201 && result.body.message === "user is not following") {
                this.setState({
                  following: false
                });
              }
            }
          );
      });
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  renderEditButton() {
    const { history } = this.props;

    return (
      <Button
        color="primary"
        onClick={() => history.push('/dashboard/profile/me/edit')}
      >
        {'Edit'}
      </Button>
    );
  }

  renderConnectButton() {

    const callFollow = () => {
      API.getLoggedInUser()
        .then(
          result => {
            const data = result.body;

            if (result.status === 200) {
              API.follow(this.state.username, data.id)
                .then(
                  result => {
                    if (result.status === 201) {
                      this.setState({
                        following: true
                      });
                    } else {
                      this.setState({
                        following: false
                      });
                    }
                  }
                )
            }
          }
        )
    }

    const callUnfollow = () => {
      API.getLoggedInUser()
        .then(
          result => {
            const data = result.body;

            if (result.status === 200) {
              API.unfollow(this.state.username, data.id)
                .then(
                  result => {
                    if (result.status === 201 && 
                      (result.body.message === "User is following" || 
                      result.body.message === "User already connected")) {
                        this.setState({
                          following: true
                        });
                      } else if (result.status === 201 &&
                                (result.body.message === "User unfollowed successfully" ||
                                 result.body.message === "User not connected")){
                        this.setState({
                          following: false
                        });
                    }
                  }
                )
            }
          }
        )
    }

    if (this.state.following === false) {
      return (
        <Button
          color="success"
          onClick={callFollow}
        >
          {'Follow'}
        </Button>
      );
    } else {
      return (
        <Button
          color="success"
          onClick={callUnfollow}
        >
          {'Unfollow'}
        </Button>
      );
    }

  }


  render() {
    return (
      <>
        <Row>
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{'Account Info'}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {window.location.pathname === '/dashboard/profile/me' ?
                      this.renderEditButton() :
                      this.renderConnectButton()
                    }
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              < UserInfo userDetails={this.props.userDetails}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(AccountInfo);