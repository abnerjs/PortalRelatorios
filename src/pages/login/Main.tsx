import React from 'react';
import './Main.css';
import Left from './Left';
import { Switch, Route } from 'react-router';
import Login from './Login';
import Recovery from './Recovery';
import Confirmation from './Confirmation';
import NewPassword from './NewPassword';

const Canvas: React.FC = (props: any) => {
  return (
    <div className="Canvas">
      <Left />
      <div className="right">
        <Switch>
          <Route path="/recovery">
            <Recovery />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/change-password">
            <NewPassword />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Canvas;
