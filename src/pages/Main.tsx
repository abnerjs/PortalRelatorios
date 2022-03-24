import './Main.css';

import { Route, Switch } from 'react-router';

import Menu from 'src/components/Menu/Menu';
import Dashboard from './Dashboard';
import Usuarios from './Cadastros/Usuarios';
import Perfis from './Cadastros/Perfis';
import VinculosUsuarios from './Cadastros/VinculosUsuarios';
import TiposArquivos from './Cadastros/TiposArquivos';
import Gerenciamento from './Relatorios/Gerenciamento';
import MeusUploads from './Relatorios/MeusUploads';
import useResponsivity from 'src/hooks/useResponsivity';
import reportsRouteController from './Relatorios/Routes/reportsRouteController';

const Main = () => {
  const isMobileView = useResponsivity();

  return (
    <div className={`Main${isMobileView ? ' mobile' : ''}`}>
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
        <Route path="/relatorios" component={reportsRouteController} />
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
