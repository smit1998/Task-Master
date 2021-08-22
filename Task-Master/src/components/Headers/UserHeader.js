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
import { Container, Col } from 'reactstrap';


class UserHeader extends React.Component {

  render() {
    const { username } = this.props;

    return (
      <>
        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
          <span className="mask bg-gradient-default opacity-8" />
          <Container className="d-flex align-items-center" fluid>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">{username}</h1>
            </Col>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
