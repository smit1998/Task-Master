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
import API from '../../api';
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      changed: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;

    API.login(username, password)
      .then(
        result => {
          if (result.status === 200) {
            const data = result.body;
            sessionStorage.setItem('_auth', data.auth_token);
            window.location.href = '/dashboard/index';
          } else if (result.status === 400) {
            this.setState({
              changed: false,
              error: 'The username or password you have entered is incorrect.' 
            });
          } else {
            this.setState({
              changed: false,
              error: 'We could not process your request at this time. Please try again later.'
            });
          }
        },
      );
  };

  renderError() {
    const { changed, error } = this.state;

    return (
      <Alert color="danger" isOpen={(!changed && error !== '')} fade={false}>
        <span className="alert-inner--text ml-1">
          {error}
        </span>
      </Alert>
    );
  }

  renderForm() {
    const { username, password } = this.state;

    return (
      <Form role="form" onSubmit={this.handleLogin}>
        <FormGroup className="mb-3">
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-single-02" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={e => this.setState({ username: e.target.value, changed: true })}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-lock-circle-open" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value, changed: true })}
            />
          </InputGroup>
        </FormGroup>
        <div className="text-center">
          <Button className="my-4" color="primary" type="submit">
            {'Login'}
          </Button>
        </div>
      </Form>
    );
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-xl mb-4">
                {'Login'}
              </div>
              {this.renderError()}
              {this.renderForm()}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
};

export default Login;
