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
  Table,
  Container,
  Alert,
  Row,
  Col,
  Button
} from 'reactstrap';
import Header from '../../components/Headers/Header.js';
import API from '../../api';


class UserProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    API.getUserProjects()
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            this.setState({ projects: data });
          }
        }
      );
  }

  renderTable() {
    const { projects } = this.state;

    return (
      <Table className="align-items-center table-flush" responsive>
        <tbody>
          {projects && projects.map(item =>
            (
              <tr key={item.id}>
                <td>
                  <Link to={`/dashboard/projects/${item.id}`}>
                    <span className="mb-0 text-sm">
                      {item.name}
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

  renderAlert() {
    const { projectCreated } = this.props.location;

    if (!projectCreated) {
      return null;
    }

    return (
      <Alert color="success" fade={false}>
        <span className="alert-inner--text ml-1">
          {'Project successfully created!'}
        </span>
      </Alert>
    );
  }

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          {this.renderAlert()}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{'Projects'}</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={() => this.props.history.push('/dashboard/projects/create')}
                      >
                        {'New Project'}
                      </Button>
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

export default UserProjects;
