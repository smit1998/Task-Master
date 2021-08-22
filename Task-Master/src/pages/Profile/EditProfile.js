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
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import UserHeader from '../../components/Headers/UserHeader.js';
import API from '../../api';


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const { userDetails } = props;

    this.state = {
      username: userDetails.username,
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      editSuccess: false,
      message: '',
    };
    this.handleProfileEdit = this.handleProfileEdit.bind(this);
  }

  handleProfileEdit() {
    const { firstName, lastName, email } = this.state;

    API.updateUser(firstName, lastName, email)
      .then(result => {
        if (result.status !== 200) {
          this.setState({ editSuccess: false, message: 'Could not edit your details' });
        } else {
          this.setState({
            editSuccess: true,
            message: 'Your user details have been changed! Refresh the page to see the changes.'
          });
        }
      })
  }

  renderMessage() {
    const { message, editSuccess } = this.state;

    if (message === '') {
      return null;
    }

    return (
      <Alert color={editSuccess ? 'success' : 'danger'} fade={false}>
        <span className="alert-inner--text ml-1">
          {message}
        </span>
      </Alert>
    );
  }

  renderForm() {
    const { username, email, firstName, lastName } = this.state;

    return (
      <Form>
        {this.renderMessage()}
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  {'Username'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={username}
                  placeholder="Username"
                  disabled
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-email"
                >
                  {'Email'}
                </label>
                <Input
                  className="form-control-alternative"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                  {'First name'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  placeholder="First name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-last-name"
                >
                  {'Last name'}
                </label>
                <Input
                  className="form-control-alternative"
                  value={lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  placeholder="Last name"
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
    const { username } = this.state;

    return (
      <>
        <UserHeader username={username} />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" >
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{'Edit Account Info'}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={this.handleProfileEdit}
                      >
                        {'Save'}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {this.renderForm()}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditProfile;
