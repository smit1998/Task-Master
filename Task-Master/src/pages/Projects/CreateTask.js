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
import { withRouter } from 'react-router';
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


class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      deadline: '',
      storyPoints: '1',
      assignedTo: '',
      priority: 'N',
      members: [],
      taskCreated: false,
      message: '',
    };
    this.handleCreateTask = this.handleCreateTask.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    API.getProjectUsers(parseInt(match.params.id))
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ members: data.members });
          }
        },
      );
  }

  handleCreateTask() {
    const {
      name,
      description,
      storyPoints,
      assignedTo,
      priority,
      deadline,
    } = this.state;
    const { match } = this.props;
    const projectID = match.params.id;

    if (!name) {
      this.setState({ message: 'Task name cannot be empty' });
      return;
    }

    if (deadline) {
      const dateNow = new Date();
      const dateDeadline = new Date(deadline);

      if (dateNow > dateDeadline) {
        this.setState({ message: 'Deadline can only be set after today' });
        return;
      }
    }

    API.createTask(
      name,
      parseInt(projectID),
      description,
      parseInt(storyPoints),
      assignedTo,
      priority,
      deadline
    )
      .then(
        result => {
          if (result.status !== 201) {
            this.setState({ message: 'We could not process your request at this time. Please try again.' });
          } else {
            this.setState({ taskCreated: true });
          }
        },
      );
  }

  renderMembers() {
    const { members } = this.state;

    if (!members) {
      return null;
    }

    return members.map((item, i) => {
      if (item.busyness === "100%+ overloaded") {
        return (
          <option disabled 
            style={{"color": "#ccc"}}
            value={item.username}
            key={i}>{item.username} - ({item.busyness})
          </option>
        )
      } else {
        return <option value={item.username} key={i}>{item.username} - ({item.busyness})</option>
      }
    });
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
    const {
      name,
      storyPoints,
      priority,
      assignedTo,
      deadline,
      description
    } = this.state;

    return (
      <Form>
        {this.renderMessage()}
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">
                  {'Name *'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">
                  {'Story Points *'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={storyPoints}
                  onChange={e => this.setState({ storyPoints: e.target.value })}
                  type="select"
                >
                  <option value="1">{'1'}</option>
                  <option value="2">{'2'}</option>
                  <option value="3">{'3'}</option>
                  <option value="4">{'4'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-last-name"
                >
                  {'Priority *'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={priority}
                  onChange={e => this.setState({ priority: e.target.value })}
                  type="select"
                >
                  <option value="N">{'Needs Triage'}</option>
                  <option value="L">{'Low'}</option>
                  <option value="M">{'Medium'}</option>
                  <option value="H">{'High'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                  {'Assigned To *'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={assignedTo}
                  onChange={e => this.setState({ assignedTo: e.target.value })}
                  type="select"
                >
                  {this.renderMembers()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-last-name"
                >
                  {'Deadline'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={deadline}
                  onChange={e => this.setState({ deadline: e.target.value })}
                  type="date"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-last-name"
                >
                  {'Description'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={description}
                  onChange={e => this.setState({ description: e.target.value })}
                  type="textarea"
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }

  render() {
    const { taskCreated } = this.state;
    const { match } = this.props;

    if (taskCreated) {
      return (
        <Redirect
          to={{
            pathname: `/dashboard/projects/${match.params.id}`,
            taskCreated: true,
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
                      <h3 className="mb-0">{'Create Task'}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={this.handleCreateTask}
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

export default withRouter(CreateTask);
