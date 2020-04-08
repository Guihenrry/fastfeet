import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';

export default function RouteWrapper({
  isPrivate,
  component: Component,
  ...rest
}) {
  const { signed } = useSelector(state => state.auth);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/orders" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={props => (
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.defaultProps = {
  isPrivate: false,
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
};
