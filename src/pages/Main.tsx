import './Main.css';

import React from 'react';
import { Route, Switch } from 'react-router';

import Menu from 'src/components/Menu/Menu';
import Dashboard from './Dashboard';
import Usuarios from './Cadastros/Usuarios';
import Perfis from './Cadastros/Perfis';
import VinculosUsuarios from './Cadastros/VinculosUsuarios';
import Relatorios from './Relatorios';
import RelPreExtrato from './Relatorios/Routes/RelPreExtrato';
import RelPreCombustivel from './Relatorios/Routes/RelPreCombustivel';
import RelPreProducao from './Relatorios/Routes/RelPreProducao';
import RelPreRecurso from './Relatorios/Routes/RelPreRecurso';
import RelForPagamento from './Relatorios/Routes/RelForPagamento';
import RelForCarregamento from './Relatorios/Routes/RelForCarregamento';
import RelForCanaEntregue from './Relatorios/Routes/RelForCanaEntregue';
import TiposArquivos from './Cadastros/TiposArquivos';
import Gerenciamento from './Relatorios/Gerenciamento';
import MeusUploads from './Relatorios/MeusUploads';

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
        <Route path="/tiposarquivos">
          <TiposArquivos />
        </Route>
        <Route path="/gerenciarrelatorios">
          <Gerenciamento />
        </Route>
        <Route path="/meusuploads">
          <MeusUploads />
        </Route>
        <Route path="/vinculosusuarios">
          <VinculosUsuarios />
        </Route>
        <Route exact path="/relatorios">
          <Relatorios />
        </Route>
        <Route path="/relatorios/relpreextrato">
          <RelPreExtrato />
        </Route>
        <Route path="/relatorios/relprecombustivel">
          <RelPreCombustivel />
        </Route>
        <Route path="/relatorios/relpreproducao">
          <RelPreProducao />
        </Route>
        <Route path="/relatorios/relprerecurso">
          <RelPreRecurso />
        </Route>
        <Route path="/relatorios/relforpagamento">
          <RelForPagamento />
        </Route>
        <Route path="/relatorios/relforcarregamento">
          <RelForCarregamento />
        </Route>
        <Route path="/relatorios/relforcanaentregue">
          <RelForCanaEntregue />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
