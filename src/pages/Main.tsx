import React from 'react';
import './Main.css';
import { Route, Switch } from 'react-router';
import Menu from 'src/components/Menu';
import Dashboard from './Dashboard';
import Usuarios from './Cadastros/Usuarios';
import Perfis from './Cadastros/Perfis';
import VinculosUsuarios from './Cadastros/VinculosUsuarios';
import Documentos from './Documentos/Documentos';
import RelPreExtrato from './Relatorios/Routes/RelPreExtrato';
import RelPreCombustivel from './Relatorios/Routes/RelPreCombustivel';
import RelPreProducao from './Relatorios/Routes/RelPreProducao';
import RelPreRecurso from './Relatorios/Routes/RelPreRecurso';
import RelForPagamento from './Relatorios/Routes/RelForPagamento';
import RelForCarregamento from './Relatorios/Routes/RelForCarregamento';
import RelForCanaEntregue from './Relatorios/Routes/RelForCanaEntregue';
import TiposArquivos from './Cadastros/TiposArquivos';

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
        <Route path="/vinculos-usuarios">
          <VinculosUsuarios />
        </Route>
        <Route path="/relatorios">
          <Documentos />
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
        <Route path="/relprerecurso">
          <RelPreRecurso />
        </Route>
        <Route path="/relforpagamento">
          <RelForPagamento />
        </Route>
        <Route path="/relforcarregamento">
          <RelForCarregamento />
        </Route>
        <Route path="/relforcanaentregue">
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
