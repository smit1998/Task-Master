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
import { Route, Switch, Redirect } from 'react-router-dom';
import EditProfile from './EditProfile';
import UserProfile from './UserProfile';

class Profile extends React.Component {
  renderRoutes() {
    const { userDetails } = this.props;

    // need to change the routes a bit
    return (
      <Switch>
        <Route
          path="/dashboard/profile/me/edit"
          render={() => <EditProfile userDetails={userDetails} />}
        />
        <Route
          path="/dashboard/profile/:username"
          render={() => <UserProfile userDetails={userDetails} />}
        />
        <Route
          path="/dashboard/profile/me"
          render={() => <UserProfile userDetails={userDetails} />}
        />
        <Redirect from="*" to="/dashboard/profile/me" />
      </Switch>
    );
  }

  render() {
    return (
      <>
        {this.renderRoutes()}
      </>
    );
  }
}

export default Profile;
