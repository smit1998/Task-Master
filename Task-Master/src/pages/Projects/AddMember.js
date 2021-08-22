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

class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      memberId: '',
      users: [],
      memberAdded: false,
      message: '',
    };
    this.handleAddMember = this.handleAddMember.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    API.getEligibleProjectMembers(match.params.id)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ users: data });
          }
        }
      );
  }

  handleAddMember() {
    const { match } = this.props;
    const { memberId } = this.state;

    API.addProjectMember(match.params.id, parseInt(memberId))
      .then(
        result => {
          if (result.status !== 200) {
            this.setState({ message: result.body.error });
          } else {
            this.setState({ memberAdded: true, message: 'Member added successfully!' });
          }
        },
      );
  }

  renderMessage() {
    const { message, memberAdded } = this.state;

    if (!message) {
      return null;
    }

    return (
      <Alert color={memberAdded ? 'success' : 'danger'} fade={false}>
        <span className="alert-inner--text ml-1">
          {message}
        </span>
      </Alert>
    );
  }

  renderOptions() {
    const { users } = this.state;

    if (!users) {
      return null;
    }

    return users.map((item, i) =>
      (
        <option value={item.id} key={i}>{item.username}</option>
      )
    );
  }

  renderForm() {
    const { memberId } = this.state;

    return (
      <Form>
        {this.renderMessage()}
        <div className="pl-lg-4">
          <Row>
            <Col lg="12">
              <div className="mb-5">
                {'Only users you are connected with may be added. A connection is made if both users are following each other.'}
              </div>
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  {'Pick a user to add'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={memberId}
                  onChange={e => this.setState({ memberId: e.target.value })}
                  type="select"
                >
                  <option value="">{'Select...'}</option>
                  {this.renderOptions()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }

  render() {
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
                      <h3 className="mb-0">{'Add Member'}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={this.handleAddMember}
                      >
                        {'Add'}
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

export default withRouter(AddMember);
