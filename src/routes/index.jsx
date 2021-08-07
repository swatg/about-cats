import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Pagess
import Upload from 'pages/Upload';
import DisplayImage from 'pages/DisplayImage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/upload" component={Upload} />
      <Route exact path="/" component={DisplayImage} />
    </Switch>
  );
}

export default Routes;