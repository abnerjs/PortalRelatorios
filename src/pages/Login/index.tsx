import 'src/pages/Login/Styles/index.css';

import React from 'react';
import { Switch, Route } from 'react-router';

import Left from 'src/pages/Login/Components/Left';
import Confirmation from 'src/pages/Login/Routes/Confirmation';
import Form from 'src/pages/Login/Routes/Form';
import NewPassword from 'src/pages/Login/Routes/NewPassword';
import Recovery from 'src/pages/Login/Routes/Recovery';
import DatamobIcon from 'src/assets/DatamobIcon';
import { Typography } from '@mui/material';
import FirstAccess from './Routes/FirstAccess';

const Canvas: React.FC = () => {
  return (
    <div className="Canvas">
      <Left />
      <div className="right">
        <div className="iconified">
          <DatamobIcon width={49} height={52} />
          <Typography variant="h5" className="primary">
            PORTAL DE RELATÓRIOS
          </Typography>
        </div>
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
          <Route path="/first-access">
            <FirstAccess />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Canvas;
