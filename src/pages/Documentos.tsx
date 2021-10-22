import { Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Table, { LinkProps } from '../components/Table';
import './Dashboard.css';

import { useAppSelector } from 'src/store';

const Documentos = () => {
  const user = useAppSelector((state) => state.session.user);

  function getObjetos(flgFiltro: string): Array<LinkProps> {
    const objetos: Array<LinkProps> = [];

    user?.lstSistemas?.forEach((sistema) =>
      sistema.lstTiposObjetos?.forEach((tipoObjeto) => {
        if (tipoObjeto.flgTipo === flgFiltro)
          tipoObjeto.lstObjetos?.forEach((objeto) => {
            objetos.push({
              name: objeto.desObjeto,
              linkTo: `/${objeto.nomPagina.toLowerCase()}`,
            });
          });
      })
    );

    return objetos;
  }

  const prestadores = getObjetos('P');
  const fornecedores = getObjetos('F');

  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Relatórios" />
          <Typography variant="subtitle1">
            Relatórios e demonstrativos disponíveis para consulta
          </Typography>
        </div>
        <div className="row tables">
          {prestadores.length !== 0 && (
            <Table arr={prestadores} title="Para prestadores" />
          )}
          {fornecedores.length !== 0 && (
            <Table arr={fornecedores} title="Para fornecedores" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentos;
