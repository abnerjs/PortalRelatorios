import React from 'react'
import './Main.css'
import { Route, Switch } from 'react-router';
import Menu from 'src/components/Menu'
import Dashboard from './Dashboard';
import Usuarios from './Usuarios';

const Main = () => {
    return (
        <div className="Main">
            <Menu />

            <Switch>
                <Route path="/usuarios">
                    <Usuarios />
                </Route>
                <Route path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </div>
    );
}

export default Main