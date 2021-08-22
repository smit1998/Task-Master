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
import { Redirect } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  FormGroup,
  Input,
} from 'reactstrap';
import Header from '../../components/Headers/Header.js';
import API from '../../api';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      projectCreated: false,
      message: '',
    };
    this.handleCreateProject = this.handleCreateProject.bind(this);
  }

  handleCreateProject() {
    const { projectName } = this.state;
    
    if (!projectName) {
      this.setState({ message: 'Project name cannot be empty' });
      return;
    }

    API.createProject(projectName)
      .then(
        result => {
          if (result.status !== 201) {
            this.setState({ message: 'We could not process your request at this time. Please try again.' });
          } else {
            this.setState({ projectCreated: true });
          }
        },
      );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message) {
      return null;
    }

    return (
      <Alert color="danger" fade={false}>
        <span className="alert-inner--text ml-1">
          {message}
        </span>
      </Alert>
    );
  }

  renderForm() {
    const { projectName } = this.state;

    return (
      <Form>
        {this.renderMessage()}
        <div className="pl-lg-4">
          <Row>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  {'Project Name'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={projectName}
                  onChange={e => this.setState({ projectName: e.target.value })}
                  placeholder="Name"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }

  render() {
    const { projectCreated } = this.state;

    if (projectCreated) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard/projects',
            projectCreated: true,
          }}
        />
      )
    }

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{'Projects'}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={this.handleCreateProject}
                      >
                        {'Create'}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                {this.renderForm()}
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
};

export default CreateProject;
