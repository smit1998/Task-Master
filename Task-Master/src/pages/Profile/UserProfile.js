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
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import UserHeader from '../../components/Headers/UserHeader';
import AccountInfo from './AccountInfo';
import AccountProjects from './AccountProjects';
import AccountTasks from './AccountTasks';

class UserProfile extends React.Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this.is_mounted = true;

    const { match, userDetails } = this.props;

    if (window.location.pathname === '/dashboard/profile/me') {
      this.setState({
        username: userDetails.username
      });
    } else {
      this.setState({
        username: match.params.username
      });
    }
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  renderProjects() {
    if (window.location.pathname !== '/dashboard/profile/me') {
      return <AccountProjects userDetails={ this.props.match.params } />
    }
    return
  }

  renderTasks() {
    if (window.location.pathname !== '/dashboard/profile/me') {
      return <AccountTasks userDetails={ this.props.match.params } />
    }
    return
  }

  render() {
    const { username } = this.state;
    
    return (
      <>
        <UserHeader username={ username } />
        <Container className="mt--7" fluid>
          <AccountInfo userDetails={ this.props.userDetails } />
          { this.renderProjects() }
          { this.renderTasks() }
        </Container>
      </>
    );
  }
}

export default withRouter(UserProfile);
