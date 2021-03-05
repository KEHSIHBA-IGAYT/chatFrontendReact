import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Home from './components/home';
import ChatRoom from './components/chat';

const history = createBrowserHistory();

const App = () => {

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chatRoom/" component={ChatRoom} />
          <Route exact path="/chatRoom/:id" component={ChatRoom} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div >
  );
}


export default App;