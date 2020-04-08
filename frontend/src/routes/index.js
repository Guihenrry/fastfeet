import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '~/pages/SignIn';
import Problems from '~/pages/Problems';

import Orders from '~/pages/Orders';
import OrdersForm from '~/pages/Orders/Form';

import Deliverymans from '~/pages/Deliverymans';
import DeliverymansForm from '~/pages/Deliverymans/Form';

import Recipients from '~/pages/Recipients';
import RecipientsForm from '~/pages/Recipients/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/register" component={OrdersForm} isPrivate />
      <Route path="/orders/edit/:id" component={OrdersForm} isPrivate />

      <Route path="/deliverymans" exact component={Deliverymans} isPrivate />
      <Route
        path="/deliverymans/register"
        component={DeliverymansForm}
        isPrivate
      />
      <Route
        path="/deliverymans/edit/:id"
        component={DeliverymansForm}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/register" component={RecipientsForm} isPrivate />
      <Route path="/recipients/edit/:id" component={RecipientsForm} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
