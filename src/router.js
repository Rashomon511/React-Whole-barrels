import React from 'react';
import PropTypes from 'prop-types';
import {
  routerRedux,
  Route,
  Switch,
} from 'dva/router';
import Home from './home/index';
import Login from './login/index';
import './index.less';

const {ConnectedRouter} = routerRedux;

export default function Router({history}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path='/login' component={Login}/>
        <Route path="/home" component={Home} />
      </Switch>
    </ConnectedRouter>
  );
}

Router.propTypes = {
  history: PropTypes.object
};
