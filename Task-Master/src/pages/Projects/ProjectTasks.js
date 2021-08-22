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
  Button,
  Card,
  CardHeader,
  Col,
  Alert,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Table,
  Row,
} from 'reactstrap';
import Header from '../../components/Headers/Header.js';
import API from '../../api';


const getState = {
  'N': 'Not Started',
  'I': 'In Progress',
  'B': 'Blocked',
  'D': 'Done',
};

const getPriority = {
  'N': 'Needs Triage',
  'L': 'Low',
  'M': 'Medium',
  'H': 'High',
};

class ProjectTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      members: [],
      isOwner: false,
      query: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;

    this.handleGetProjectTasks()
    API.getProjectUsers(match.params.id)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ members: data.members, isOwner: data.is_owner });
          }
        }
      );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.query !== prevState.query) {
      API.getProjectTaskSearchList(this.props.match.params.id, this.state.query)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ tasks: data });
          }
        }
      );
    } else {
      prevState.query = this.state.query
    }
  }

  handleGetProjectTasks() {
    const { match } = this.props;

    API.getProjectTasks(match.params.id)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ tasks: data });
          }
        }
      );
  }

  handleToggleNudge(taskID) {
    API.toggleNudge(taskID)
      .then(
        result => {
          if (result.status === 200) {
            this.handleGetProjectTasks()
          }
        }
      );
  }

  renderTable() {
    const { match } = this.props;
    const { tasks } = this.state;

    return (
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">{'Name'}</th>
            <th scope="col">{'Task ID'}</th>
            <th scope="col">{'Story Points'}</th>
            <th scope="col">{'State'}</th>
            <th scope="col">{'Priority'}</th>
            <th scope="col">{'Assigned To'}</th>
            <th scope="col">{'Deadline'}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map(item =>
          (
            <tr key={item.id}>
              <td>
                <Link to={`/dashboard/projects/${match.params.id}/tasks/${item.id}`}>
                  <span className="mb-0 text-sm">
                    {item.name}
                  </span>
                </Link>
              </td>
              <td>
                {item.id}
              </td>
              <td>
                {item.story_points ? item.story_points : 'N/A'}
              </td>
              <td>
                {getState[item.state]}
              </td>
              <td>
                {getPriority[item.priority]}
              </td>
              <td>
                {item.assigned_to ? item.assigned_to : 'None'}
              </td>
              <td>
                {item.deadline ? item.deadline : 'N/A'}
              </td>
              <td>
                <Button
                  color={item.nudged ? 'success' : 'danger'}
                  disabled={item.nudged}
                  onClick={() => this.handleToggleNudge(item.id)}
                >
                  {item.nudged ? 'Nudged' : 'Nudge'}
                </Button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </Table>
    );
  }

  renderMemberTable() {
    const { members } = this.state;

    return (
      <Table className="align-items-center table-flush" responsive>
        <tbody>
          {members && members.map(item =>
            (
              <tr key={item.username}>
                <td>
                  <Link to={`/dashboard/profile/${item.username}`}>
                    <span className="mb-0 text-sm">
                      {item.username}
                    </span>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  }

  renderProjectMembers() {
    const { match } = this.props;
    const { isOwner } = this.state;

    return (
      <Row className="mt-5">
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">{'Project Members'}</h3>
                </Col>
                <Col className="text-right" xs="4">
                  {isOwner &&
                    (
                      <Button
                        color="primary"
                        onClick={() => this.props.history.push(`/dashboard/projects/${match.params.id}/add-user`)}
                      >
                        {'Add Member'}
                      </Button>
                    )
                  }
                </Col>
              </Row>
            </CardHeader>
            {this.renderMemberTable()}
          </Card>
        </div>
      </Row>
    );
  }

  renderAlert() {
    const { taskCreated } = this.props.location;

    if (!taskCreated) {
      return null;
    }

    return (
      <Alert color="success" fade={false}>
        <span className="alert-inner--text ml-1">
          {'Task successfully created!'}
        </span>
      </Alert>
    );
  }

  render() {
    const { match } = this.props;
    const { query } = this.state;

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          {this.renderAlert()}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <Col xs="1">
                      <h3 className="mb-0">{'Tasks'}</h3>
                    </Col>
                    <Col xs="7">
                      <Form role="form"
                        className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
                      >
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-search" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Search"
                              type="text"
                              value={query}
                              onChange={e => this.setState({ query: e.target.value })}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={() => this.props.history.push(`/dashboard/projects/${match.params.id}/tasks/create`)}
                      >
                        {'New Task'}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                {this.renderTable()}
              </Card>
            </div>
          </Row>
          {this.renderProjectMembers()}
        </Container>
      </>
    );
  }
};

export default withRouter(ProjectTasks);
