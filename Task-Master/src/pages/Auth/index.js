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
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

import Login from '../Login';
import SignUp from '../SignUp';
import LogOut from '../LogOut';
import AuthNavbar from '../../components/Navbars/AuthNavbar.js';


class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-default');
  }

  componentWillUnmount() {
    document.body.classList.remove('bg-default');
  }

  renderRoutes() {
    return (
      <Switch>
        <Route
          path="/auth/login"
          component={Login}
        />
        <Route
          path="/auth/signup"
          component={SignUp}
        />
        <Route
          path="/auth/logout"
          component={LogOut}
        />
        <Redirect from="*" to="/auth/login" />
      </Switch>
    );
  }

  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
          </div>
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              {this.renderRoutes()}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Auth;
