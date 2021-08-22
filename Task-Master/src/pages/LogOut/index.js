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
  Button,
  Card,
  CardBody,
  Col,
} from 'reactstrap';

class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: 'Logging out...',
    };
  }

  componentDidMount() {
    API.logout()
      .then(
        result => {
          if (result.status === 204) {
            this.setState({ loading: false, message: 'You have logged out successfully!' });
            sessionStorage.removeItem('_auth');
          } else {
            this.setState({ loading: false, message: 'Something went wrong. Please try again'})
          }
        },
      );
  }

  render() {
    const { loading, message } = this.state;

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-xl mb-4">
                {message}
              </div>
              {!loading && (
                <div className="text-center">
                  <Button className="my-4" color="primary" onClick={() => this.props.history.push('/')}>
                    {'Home Page'}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default LogOut;
