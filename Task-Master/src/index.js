import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';
import './assets/vendor/font-awesome/css/font-awesome.min.css';

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Home from './pages/Home';
import API from './api';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userDetails: {}
    }
  }

  componentDidMount() {
    API.getLoggedInUser()
      .then(
        result => {
          const data = result.body;

          if (result.status === 200) {
            this.setState({
              userDetails: {
                username: data.username,
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email
              },
              loggedIn: true,
            });
          }
        },
      );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/dashboard" component={(props) => <Dashboard {...props} {...this.state} />} />
          <Route path="/auth" render={(props) => <Auth {...props} {...this.state} />} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
