import { Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
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
          <Table arr={[]} title="Para prestadores" />
          <Table arr={[]} title="Para fornecedores" />
        </div>
      </div>
    </div>
  );
};

export default Documentos;
