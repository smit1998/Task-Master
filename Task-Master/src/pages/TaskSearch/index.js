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

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
} from 'reactstrap';
import API from '../../api';
import TasksTable from '../../components/TableContainer';
import UserHeader from '../../components/Headers/UserHeader';

const getState = {
  'N': 'Not Started',
  'I': 'In Progress',
  'B': 'Blocked',
  'D': 'Done',
};

const getPriority = {
  'N': 'Needs Triage',
  'L': 'Low',
  'M': 'Medium',
  'H': 'High',
};

function TaskSearch(props) {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState([]);

  const handleGetAllTasks = useCallback(() => {
    if (props.userDetails.username !== undefined)
    API.getConnectedTaskSearchList("", props.userDetails.username)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            setTasks(data);
          }
        },
      )
  }, [props]);

  const handleSearchChange = event => {
    setQuery(event.target.value);
    API.getConnectedTaskSearchList(event.target.value, props.userDetails.username)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            setTasks(data);
          }
        }
      );
  };

  useEffect(() => {
    handleGetAllTasks();
  }, [handleGetAllTasks]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => row.values.name
      },
      {
        Header: "Project Name",
        accessor: "project_name",
        Cell: ({ row }) => row.values.project_name
      },
      {
        Header: "Task ID",
        accessor: "id",
      },
      {
        Header: "Assigned To",
        accessor: "assigned_to",
        Cell: ({ row }) => (<Link to={{ pathname: `/dashboard/profile/${row.original.assigned_to}` }}>{row.values.assigned_to}</Link>)
      },
      {
        Header: "Story Points",
        accessor: "story_points",
      },
      {
        Header: "State",
        accessor: "state",
        Cell: ({ cell: { value } }) => getState[value]
      },
      {
        Header: "Priority",
        accessor: "priority",
        Cell: ({ cell: { value } }) => getPriority[value]
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        Cell: ({ cell: { value } }) => value ? value : "N/A"
      }
    ] ,[]
  )

  if (tasks === undefined || tasks === null) {
    return (
      <div>
        <Row className="mt-5">
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{'Assigned Tasks'}</h3>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <>
      <UserHeader username={ "All Tasks" } />
        <Container className="mt--7" fluid>
        <div>
          <Row className="mt-5">
            <Col className="order-xl-1" >
              <Card className="shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">{'All Tasks'}</h3>
                    </Col>
                    <Form role="form"
                      className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
                    >
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            type="text"
                            value={query}
                            onChange={handleSearchChange}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </Row>
                </CardHeader>
                <TasksTable columns={columns} data={tasks} />
              </Card>
            </Col>
          </Row>
        </div>
        </Container>
    </>
  );
}


export default withRouter(TaskSearch);
