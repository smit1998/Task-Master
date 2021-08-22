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
import { Button, Container, Row, Col } from 'reactstrap';
import Navbar from '../../components/Navbars/HomeNavbar';


class Home extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleClick(path) {
    this.props.history.push(path);
  }

  renderCircles() {
    return (
      <div className="shape shape-style-1 shape-default">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>   
    );
  }

  renderContent() {
    return (
      <Container className="py-lg-md d-flex align-items-center">
        <div className="col px-0">
          <Row className="justify-content-center text-center">
            <Col lg="10">
              <h1 className="display-3 text-white">
                {'Task Master'}
                <span>{'A task managing tool for your team'}</span>
              </h1>
              <p className="lead text-white">
                {'Task Master is designed to help teams plan and keep track of tasks to successfully achieve your goals.'}
              </p>
              <div className="btn-wrapper">
                <Button
                  className="btn-icon mb-3 mb-sm-0"
                  color="info"
                  onClick={() => this.props.history.push('/auth/register')}
                >
                  <span className="btn-inner--text">{'Try it now'}</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

  renderHero() {
    return (
      <div className="vh-100 position-relative">
        <section className="h-100 section section-lg section-shaped">
          {this.renderCircles()}
          {this.renderContent()}
        </section>
      </div>
    );
  }

  render() {
    return (
      <>
        <Navbar />
        <main ref="main">
          {this.renderHero()}
        </main>
      </>
    );
  }
}

export default Home;
