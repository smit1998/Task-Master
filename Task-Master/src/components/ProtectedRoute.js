import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem('_auth');

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}
