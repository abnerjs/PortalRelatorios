import { Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import MainTable from '../components/MainTable';
import './Dashboard.css';

const Documentos = () => {
  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Relatórios" />
          <Typography variant="subtitle1">
            Todos os relatórios pertinentes
          </Typography>
        </div>
        <div className="row tables">
          <MainTable title="Para prestadores" />
          <MainTable title="Para fornecedores" />
        </div>
      </div>
    </div>
  );
};

export default Documentos;
