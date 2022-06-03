import { Redirect, Route, Switch } from 'react-router';
import Relatorios from '../index';
import RelForCanaEntregue from './RelForCanaEntregue';
import RelForCarregamento from './RelForCarregamento';
import RelForPagamento from './RelForPagamento';
import RelPreCombustivel from './RelPreCombustivel';
import RelPreExtrato from './RelPreExtrato';
import RelPreProducao from './RelPreProducao';
import RelPreRecurso from './RelPreRecurso';

const reportsRouteController = (props: any) => {
  return (
    <>
      <Switch>
        <Route exact path={`${props.match.path}`} component={Relatorios} />
        <Route path={`${props.match.path}/relpreextrato`} component={RelPreExtrato} />
        <Route path={`${props.match.path}/relpreproducao`} component={RelPreProducao} />
        <Route path={`${props.match.path}/relprerecurso`} component={RelPreRecurso} />
        <Route path={`${props.match.path}/relforpagamento`} component={RelForPagamento} />
        <Route path={`${props.match.path}/relforcarregamento`} component={RelForCarregamento} />
        <Route path={`${props.match.path}/relforcanaentregue`} component={RelForCanaEntregue} />
        <Route path={`${props.match.path}/relprecombustivel`} component={RelPreCombustivel} />

        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default reportsRouteController;
