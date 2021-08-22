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
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';
import dashboardRoutes from '../../dashboardRoutes.js';
import logoImg from '../../assets/img/brand/task_master.png';

class Sidebar extends React.Component {
  renderLinks() {
    return dashboardRoutes.map((item, key) =>
      (
        <NavItem key={key}>
          <NavLink
            to={item.path}
            tag={NavLinkRRD}
            activeClassName="active"
          >
            <i className={item.icon} />
            {item.name}
          </NavLink>
        </NavItem>
      )
    );
  };

  render() {
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <NavbarBrand className="pt-0" to="/dashboard/index" tag={Link}>
            <img
              alt="..."
              className="navbar-brand-img"
              src={logoImg}
            />
          </NavbarBrand>
          <Collapse navbar>
            <Nav navbar>{this.renderLinks()}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default Sidebar;
