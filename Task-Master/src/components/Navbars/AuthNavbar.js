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
import { Link } from 'react-router-dom';
import {
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from 'reactstrap';
import logoImg from '../../assets/img/brand/task_master_white.png';


class AuthNavbar extends React.Component {
  renderLogo() {
    return (
      <NavbarBrand to="/" tag={Link}>
        <img
          alt="..."
          src={logoImg}
        />
      </NavbarBrand>
    );
  }

  render() {
    return (
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          {this.renderLogo()}
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                to="/auth/signup"
                tag={Link}
              >
                <i className="ni ni-circle-08" />
                <span className="nav-link-inner--text">{'Sign Up'}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                <i className="ni ni-key-25" />
                <span className="nav-link-inner--text">{'Login'}</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
};

export default AuthNavbar;
