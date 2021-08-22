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
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Row,
} from 'reactstrap';
import API from '../../api';
import Header from '../../components/Headers/Header.js';

class UserSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      firstName: '',
      lastName: '',
      busyness: '',
      email: '',
      following: false,
      followers: [],
      follow: [],
      openToWork: false,
    };
  }

  componentDidMount() {
    API.getUserProfile(this.state.username)
      .then(
        result => {
          const data = result.body;

          if (result.status === 200) {
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

    API.getProjects(this.state.username)
      .then(
        result => {
          const data = result.body;

          if (result.status === 200) {
            this.setState({
              projects: data,
            });
          }
        },
      );

    API.getLoggedInUser()
      .then(result => {
        const data = result.body;
        API.isFollowing(this.state.username, data.id)
          .then(
            result => {
              if (result.body.message === "User is following" || 
                  result.body.message === "User already connected") {
                // user is following
                this.setState({
                  following: true
                });
              } else if (result.body.message === "User unfollowed successfully" ||
                         result.body.message === "User not connected") {
                this.setState({
                  following: false
                });
              }
            }
          );
      });

    API.listFollowers(this.state.username)
      .then(
        result => {
          const data = result.body;
          let temp1 = []
          if (result.status === 200) {
            for (let i = 0; i < data.length - 1; i++) {
              temp1.push(data[i].follower + ", ")
            }
            temp1.push(data[data.length - 1].follower)
            this.setState({
              followers: temp1
            })
          }
        }
      )

    API.listFollowing(this.state.username)
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
              follow: temp2
            })
          }
        }
      )

    API.getCurrentStateOfSwitch(this.state.username)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
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

            if (data.username === this.state.username) {
              // call the update api here
              API.updateSwitch(data.username)
                .then(
                  result => {
                    if (result.status === 201) {
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

    if (this.state.openToWork === true) {
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

  renderProjects() {
    if (this.state.projects === undefined || this.state.projects.length === 0) return (<></>)
    return(
      <Row>
        <Col>
          <label className="form-control-label">
            {'Projects'}
          </label>
          <div id="badges-component" className="tab-pane tab-example-result" role="tabpanel" aria-labelledby="badges-component-tab">
            {this.state.projects.map((project) =>
              <span key={project.id} className="badge badge-pill badge-primary" style = {{marginRight: '8px'}}>
                {project.name}
              </span>
            )}
          </div>
        </Col>
      </Row>
    );
  }

  renderUserInfo() {
    const { username, email, firstName, lastName, busyness, followers, follow } = this.state;

    return (
      <div className="pl-lg-4">
        <Row>
          <Col>
            <label className="form-control-label">
              {'Username'}
            </label>
            <div>{username}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Email'}
            </label>
            <div>{email}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'First name'}
            </label>
            <div>{firstName}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Last name'}
            </label>
            <div>{lastName}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Busyness'}
            </label>
            <div>{busyness}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Followers'}
            </label>
            <div>{followers.length}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Following'}
            </label>
            <div>{follow.length}</div>
          </Col>
          <Col>
            <label className="form-control-label">
              {'Open To Work'}
            </label>
            <div>{this.renderOpenToWork()}</div>
          </Col>
        </Row>
        <hr className="my-4"/>
        { this.renderProjects() }
      </div>
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
    
    if(!this.state.following) {
      return (
        <Button
          color="success"
          onClick={callFollow}
        >
          {'Follow'}
        </Button>
      );
    }
    return (
      <Button
        color="success"
        onClick={callUnfollow}
      >
        {'Unfollow'}
      </Button>
    );
  }

  renderAccountInfo() {
    return (
      <>
        <Row>
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <Col xs="8">
                    <Link to={`/dashboard/profile/` + this.state.username}>
                      <h3 className="nav-link mb-0">{this.state.username}</h3>
                    </Link>
                  </Col>
                  <Col className="text-right" xs="4">
                    {
                      this.renderConnectButton()
                    }
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.renderUserInfo()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  render() {
    return (
      <>
        <Container className="mt--7" fluid>
          {this.renderAccountInfo()}
        </Container>
      </>
    );
  }
}

class Search extends React.Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: false
    };
  }

  componentDidMount() {
    this.is_mounted = true;
    if (this.props.location.state) {
      const query = this.props.location.state.detail;
      if (query.length !== 0) {
        API.getUserSearchList(query)
          .then(
            result => {
              if (this.is_mounted && result.status === 200) {
                const data = result.body;
                if (!data[0].error) {
                  this.setState({
                    users: data
                  });
                } else {
                  this.setState({
                    error: true
                  })
                }
              }
            },
          );
      }
    }
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  handleNone() {
    if (this.props.location.state === null || this.props.location.state === undefined) {
      return (
        <Container className="mt--7" fluid>
          <Col xs="5">
            <Alert color="secondary" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-bell-55" />
              </span>
              <span className="alert-inner--text ml-1">
                Search for users in the search bar
              </span>
            </Alert>
          </Col>
        </Container>
      )
    }
    if (this.state.error === true) {
      return (
        <Container className="mt--7" fluid>
          <Col xs="5">
            <Alert color="danger" fade={false}>
              <span className="alert-inner--icon">
                <i className="ni ni-support-16" />
              </span>
              <span className="alert-inner--text ml-1">
                Sorry, no users matched your search
              </span>
            </Alert>
          </Col>
        </Container>
      )
    }
  }

  renderUsers () {
    if (this.state.users.error === false || !this.state.users){
      return (<></>)
    }
    return (
      this.state.users.map((user, index) =>
      <li className="mt-8 list-unstyled" key = {index}>
        <UserSearchResult username={user.username}/>
      </li>)
    )
  }

  render() {  
    return (
      <>
        <Header />
          { this.handleNone() }
          <ul>
            { this.renderUsers() }
          </ul>
      </>
    );
  }
};

export default withRouter(Search);
