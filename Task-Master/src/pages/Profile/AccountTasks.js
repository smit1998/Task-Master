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

import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from 'reactstrap';
import API from '../../api';
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

function AccountTasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let is_mounted = true;

    API.getConnectedUserTasks(props.match.params.username)
      .then(
        result => {
          const data = result.body;
            if (is_mounted && result.status === 200) {
              setTasks(data);
            }
          },
        );
        
    return () => {
      is_mounted = false;
    };
    // eslint-disable-next-line
  },[]);
  
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Project Name",
        accessor: "project_name",
      },
      {
        Header: "Task ID",
        accessor: "id",
      },
      {
        Header: "Story Points",
        accessor: "story_points"
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
    ] ,[]
  );
  
  if(tasks.length === 0) return (<></>)
  return (
    <>
      <Row className="mt-5">
        <Col className="order-xl-1" >
          <Card className="shadow">
            <CardHeader className="bg-white">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">{'Current Tasks'}</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <TasksTable columns={columns} data={tasks} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );

}

export default withRouter(AccountTasks);
