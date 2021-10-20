import { Typography } from '@mui/material';
import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Table from '../components/Table';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Início" />
          <Typography variant="subtitle1">
            Últimos relatórios acessados
          </Typography>
        </div>
        <div className="row">
          <div className="cards">
            <Card reg="Nome do registro" date="02/05/2021" />
            <Card reg="Nome do registro" date="02/05/2021" />
            <Card reg="Nome do registro" date="02/05/2021" />
            <Card reg="Nome do registro" date="02/05/2021" />
            <Card reg="Nome do registro" date="02/05/2021" />
          </div>
          <div className="comp">
            <Typography variant="h5">Nome da empresa</Typography>
            <Typography variant="subtitle1">contact@corporation.com</Typography>
            <Typography variant="subtitle1">(16) 98765-4321</Typography>
          </div>
        </div>
        <div className="row tables">
          <Table arr={[]} title="Novos arquivos" subtitle="Tudo o que você não viu desde o seu último acesso" />
          <Table arr={[]} title="Últimas atualizações" subtitle="Tudo o que você não viu desde o seu último acesso" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
