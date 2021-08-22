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
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from 'reactstrap';
import logoImg from '../../assets/img/brand/task_master_white.png';


class HomeNavbar extends React.Component {
  renderLogo() {
    return (
      <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
        <img alt="..." src={logoImg} />
      </NavbarBrand>
    );
  }

  renderNavButtons() {
    return (
      <Nav className="align-items-lg-center ml-lg-auto" navbar>
        <NavItem className="d-none d-lg-block ml-lg-4">
          <Button
            className="btn-neutral btn-icon"
            color="secondary"
            onClick={() => this.props.history.push('/auth/signup')}
            target="_blank"
          >
            <span className="nav-link-inner--text ml-1">
              {'Sign Up'}
            </span>
          </Button>
        </NavItem>
        <NavItem className="d-none d-lg-block ml-lg-4">
          <Button
            className="btn-icon"
            color="primary"
            onClick={() => this.props.history.push('/auth/login')}
            target="_blank"
          >
            <span className="nav-link-inner--text ml-1">
              {'Login'}
            </span>
          </Button>
        </NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            {this.renderLogo()}
            {this.renderNavButtons()}
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(HomeNavbar);
