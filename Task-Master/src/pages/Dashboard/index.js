import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import dashboardRoutes from "../../dashboardRoutes";

class Dashboard extends React.Component {
  renderRoutes() {
    const { userDetails } = this.props;

    return dashboardRoutes.map((item, key) =>
      (
        <Route
          path={item.path}
          render={() => <item.component userDetails={userDetails} />}
          key={key}
        />
      )
    );
  }

  getTitle(path) {
    for (let i = 0; i < dashboardRoutes.length; i++) {
      if (dashboardRoutes[i].path === path) return dashboardRoutes[i].name;
    }
    return '';
  };

  render() {
    const { location, userDetails } = this.props;

    return (
      <>
        <Sidebar />
        <div className="main-content mb-n-5">
          <DashboardNavbar
            title={this.getTitle(location.pathname)}
            userDetails={userDetails}
          />
          <Switch>
            {this.renderRoutes()}
          </Switch>
        </div>
      </>
    );
  }
};

export default Dashboard;
