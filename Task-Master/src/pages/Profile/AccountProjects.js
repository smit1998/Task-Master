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
} from 'reactstrap';
import API from '../../api';

class AccountProjects extends React.Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
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

    API.getProjects(username)
      .then(
        result => {
          const data = result.body;
          if (this.is_mounted && result.status === 200) {
            this.setState({
              projects: data,
            });
          }
        },
      );
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  renderProjects() {
    if (this.state.projects.length === 0) return (<div>This user does not belong to any projects</div>)
    return (
      this.state.projects.map((project) =>
        <span key={project.id} className="badge badge-pill badge-primary" style = {{marginRight: '8px'}}>
          {project.name}
        </span>
      )
    )
  }

  render() {
    if (this.state.projects === undefined || this.state.projects === '') return (
      <></>
    )
    return (
      <>
        <Row className="mt-5">
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{'Projects'}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                { this.renderProjects() }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(AccountProjects);