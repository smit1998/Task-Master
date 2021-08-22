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
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Col,
  Row,
} from 'reactstrap';
import API from '../../api';
import { Link } from 'react-router-dom';
import TasksTable from '../../components/TableContainer';

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

function AssignedTasks(props) {
  const [tasks, setTasks] = useState([]);
  const [nudgedTasks, setNudgedTasks] = useState([]);
  const [query, setQuery] = useState([]);

  const handleGetAssignedTasks = useCallback(() => {
    if (props.username !== undefined)
    API.getAssignedTasks(props.username)
      .then(
        result => {
          const data = result.body;
          if (result.status === 200) {
            setTasks(data);
            setNudgedTasks(data.filter(item => item.nudged));
          }
        },
      )
  }, [props.username]);

  const handleSearchChange = event => {
    setQuery(event.target.value);
    API.getAssignedTaskSearchList(event.target.value, props.username)
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
    handleGetAssignedTasks();
  }, [handleGetAssignedTasks]);

  const handleToggleNudge = useCallback((taskID) => {
    API.toggleNudge(taskID)
      .then(
        result => {
          if (result.status === 200) {
            handleGetAssignedTasks();
          }
        }
      );
  }, [handleGetAssignedTasks]);

  const nudgeButton = useCallback((id) => (
    <Button
      color="info"
      onClick={() => handleToggleNudge(id)}
    >
      {'Unnudge'}
    </Button>
  ), [handleToggleNudge]);

  const alertNudgedTasks = () => (
    <Alert color="danger" fade={false}>
      <span className="alert-inner--icon">
        <i className="ni ni-support-16" />
      </span>
      <span className="alert-inner--text ml-1">
        {'You have been nudged on the following tasks:'}
      </span>
      <ul>
        {nudgedTasks.map(item =>
          (
            <li key={item.id}>
              <span className="alert-inner--text ml-1">
                {item.name}
              </span>
            </li>
          )
        )}
      </ul>
    </Alert>
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (<Link to={{ pathname: `/dashboard/projects/${row.original.project_id}/tasks/${row.original.id}` }}>{row.values.name}</Link>)
      },
      {
        Header: "Project Name",
        accessor: "project_name",
        Cell: ({ row }) => (<Link to={{ pathname: `/dashboard/projects/${row.original.project_id}` }}>{row.original.project_name}</Link>)
      },
      {
        Header: "Task ID",
        accessor: "id",
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
      },
      {
        Header: "",
        accessor: "nudged",
        Cell: ({ row }) => row.values.nudged ? nudgeButton(row.original.id) : ''
      },
    ] ,[nudgeButton]
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
      {nudgedTasks.length > 0 && alertNudgedTasks()}
      <div>
        <Row className="mt-5">
          <Col className="order-xl-1" >
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{'Assigned Tasks'}</h3>
                  </Col>
                  <Form role="form"
                    className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
                    // onSubmit={this.handleSubmit}
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
    </>
  );
}


export default withRouter(AssignedTasks);
