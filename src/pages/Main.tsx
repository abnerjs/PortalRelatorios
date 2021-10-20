import React from 'react';
import './Main.css';
import { Route, Switch } from 'react-router';
import Menu from 'src/components/Menu';
import Dashboard from './Dashboard';
import Usuarios from './Cadastros/Usuarios';
import Perfis from './Cadastros/Perfis';
import Atrelamento from './Atrelamento';
import Demonstrativo from './Relatorios';
import RelPreExtrato from './Relatorios/Routes/RelPreExtrato';
import RelPreCombustivel from './Relatorios/Routes/RelPreCombustivel';
import RelPreProducao from './Relatorios/Routes/RelPreProducao';

const Main = () => {
  return (
    <div className="Main">
      <Menu />

      <Switch>
        <Route path="/usuarios">
          <Usuarios />
        </Route>
        <Route path="/perfis">
          <Perfis />
        </Route>
        <Route path="/atrelamento">
          <Atrelamento />
        </Route>
        <Route path="/relatorios">
          <Demonstrativo />
        </Route>
        <Route path="/relpreextrato">
          <RelPreExtrato />
        </Route>
        <Route path="/relprecombustivel">
          <RelPreCombustivel />
        </Route>
        <Route path="/relpreproducao">
          <RelPreProducao />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
