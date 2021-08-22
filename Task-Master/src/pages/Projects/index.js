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
import { Redirect, Route, Switch } from 'react-router-dom';
import UserProjects from './UserProjects';
import CreateProject from './CreateProject';
import ProjectTasks from './ProjectTasks';
import CreateTask from './CreateTask';
import Task from './Task';
import AddMember from './AddMember';


class Projects extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/dashboard/projects" component={UserProjects} />
          <Route exact path="/dashboard/projects/create" component={CreateProject} />
          <Route exact path="/dashboard/projects/:id" component={ProjectTasks} />
          <Route exact path="/dashboard/projects/:id/tasks/create" component={CreateTask} />
          <Route exact path="/dashboard/projects/:project_id/tasks/:task_id" component={Task} />
          <Route exact path="/dashboard/projects/:id/add-user" component={AddMember} />
          <Redirect from="*" to="/dashboard/projects" />
        </Switch>
      </>
    );
  }
};

export default Projects;
