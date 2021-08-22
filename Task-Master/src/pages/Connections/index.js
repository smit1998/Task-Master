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
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';
import Header from '../../components/Headers/Header.js';
import API from '../../api';


class Connections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: []
    };
  }

  componentDidMount() {
    API.listConnections()
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ connections: data });
          }
        }
      );
  }

  renderTable() {
    const { connections } = this.state;

    if (connections.length === 0) {
      return (
        <Table className="align-items-center table-flush" responsive>
          <tbody>
              <tr>
                <td>
                  <span className="mb-0 text-sm">
                    You have no connections
                  </span>
                </td>
              </tr>
          </tbody>
        </Table>
      )
    }

    return (
      <Table className="align-items-center table-flush" responsive>
        <tbody>
          {connections && connections.map(item =>
            (
              <tr key={item}>
                <td>
                  <Link to={`/dashboard/profile/${item}`}>
                    <span className="mb-0 text-sm">
                      {item}
                    </span>
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{'My Connections'}</h3>
                    </Col>
                  </Row>
                </CardHeader>
                {this.renderTable()}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
};

export default Connections;
