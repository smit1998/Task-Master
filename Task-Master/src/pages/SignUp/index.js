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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      accountCreated: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        errors: ['The passwords do not match. Please try again.']
      });
      return;
    } else if (
      firstName === '' ||
      lastName === '' ||
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      this.setState({
        errors: ['Please fill out all the fields.']
      });
      return;
    }

    API.signUp(firstName, lastName, username, email, password)
      .then(
        result => {
          const data = result.body;

          if (result.status === 201) {
            this.setState({ accountCreated: true });

            API.createSwitch(data.username)
              .then(result)

          } else if (result.status === 400) {
            let errors = [];
            if (data.username) errors = errors.concat(data.username);
            if (data.password) errors = errors.concat(data.password);
            if (data.email) errors = errors.concat(data.email);
            this.setState({ errors: errors });
          } else {
            this.setState({
              errors: ['We could not process your request at this time. Please try again later.']
            });
          }
        }
      );
  }

  renderError() {
    const { errors, accountCreated } = this.state;

    if (errors.length < 1 || accountCreated) {
      return null;
    }

    return (
      <Alert color="danger" fade={false}>
        <span className="alert-inner--icon">
          <i className="ni ni-support-16" />
        </span>
        {errors.length > 1 && (
          <span className="alert-inner--text ml-1">
            {'The following errors occured:'}
          </span>
        )}
        {errors.map(item =>
          (
            <span key={item} className="alert-inner--text ml-1">
              {item}
            </span>
          )
        )}
      </Alert>
    );
  }

  renderForm() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <Form role="form" onSubmit={this.handleSignUp}>
        <FormGroup>
          <InputGroup className="input-group-alternative mb-2">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-circle-08" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-circle-08" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-single-02" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
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
              onChange={e => this.setState({ password: e.target.value })}
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
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </InputGroup>
        </FormGroup>
        <div className="text-center">
          <Button className="mt-4" color="primary" type="submit">
            {'Sign Up'}
          </Button>
        </div>
      </Form>
    );
  }

  renderSignUpSuccess() {
    return (
      <>
        <div className="text-center text-xl mb-4">
          {'Account created successfully!'}
        </div>
        <div className="text-center">
          <Button
            className="mt-4"
            color="primary"
            onClick={() => this.props.history.push('/auth/login')}
          >
            {'Go login page'}
          </Button>
        </div>
      </>
    );
  }

  renderTitle() {
    return (
      <div className="text-center text-xl mb-4">
        {'Sign Up'}
      </div>
    );
  }

  render() {
    const { accountCreated } = this.state;

    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              {!accountCreated && this.renderTitle()}
              {this.renderError()}
              {accountCreated ? this.renderSignUpSuccess() : this.renderForm()}
            </CardBody>
          </Card>
        </Col>
      </>
    )
  }
};

export default Register;
