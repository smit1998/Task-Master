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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from 'reactstrap';
import profileImg from '../../assets/img/theme/placeholder.jpg';

class DashboardNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      users: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { query } = this.state;
    this.props.history.push({
      pathname: "/dashboard/search",
      state: { detail: query }
    })
    if (this.props.location.pathname === "/dashboard/search") {
      return window.location.reload();
    }
  }

  renderDropdown() {
    const { userDetails } = this.props;
    const { query } = this.state;

    return (
      <Nav className="align-items-center d-none d-md-flex" navbar>
        <Form role="form"
          className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
          onSubmit={this.handleSubmit}
        >
          <FormGroup className="mb-0">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Search for users" 
                type="text"
                id="navbar-user-search-input"
                value={query}
                onChange={e => this.setState({ query: e.target.value })}
              />
            </InputGroup>
          </FormGroup>
        </Form>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={profileImg}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {`${userDetails.firstName} ${userDetails.lastName}`}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem to="/dashboard/profile/me" tag={Link}>
              <i className="ni ni-single-02" />
              <span>{'My Profile'}</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => window.location.href = '/auth/logout'}>
              <i className="ni ni-user-run" />
              <span>{'Log Out'}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }

  render() {
    const { title } = this.props;

    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {title}
            </div>
            {this.renderDropdown()}
          </Container>
        </Navbar>
      </>
    );
  }
};

export default withRouter(DashboardNavbar);
