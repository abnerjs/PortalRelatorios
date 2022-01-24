import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header/Header';
import Table from 'src/components/Table/Table';
import './Dashboard.css';
import { Icon } from '@iconify/react';

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
            <Card elevation={3}>
              <CardContent>
                <Icon
                  icon="fluent:document-bullet-list-20-regular"
                  width={30}
                />
                <p className="date">{new Date().toDateString()}</p>
                <h2 className="nameReg">Nome do registro</h2>
              </CardContent>
            </Card>
            <Card elevation={3}>
              <CardContent>
                <Icon
                  icon="fluent:document-bullet-list-20-regular"
                  width={30}
                />
                <p className="date">{new Date().toDateString()}</p>
                <h2 className="nameReg">Nome do registro só que mais longo</h2>
              </CardContent>
            </Card>
            <Card elevation={3}>
              <CardContent>
                <Icon
                  icon="fluent:document-bullet-list-20-regular"
                  width={30}
                />
                <p className="date">{new Date().toDateString()}</p>
                <h2 className="nameReg">Nome do registro</h2>
              </CardContent>
            </Card>
            <Card elevation={3}>
              <CardContent>
                <Icon
                  icon="fluent:document-bullet-list-20-regular"
                  width={30}
                />
                <p className="date">{new Date().toDateString()}</p>
                <h2 className="nameReg">Nome do registro</h2>
              </CardContent>
            </Card>
            <Card elevation={3}>
              <CardContent>
                <Icon
                  icon="fluent:document-bullet-list-20-regular"
                  width={30}
                />
                <p className="date">{new Date().toDateString()}</p>
                <h2 className="nameReg">Nome do registro</h2>
              </CardContent>
            </Card>
          </div>
          <div className="comp">
            <Typography variant="h5">Nome da empresa</Typography>
            <Typography variant="subtitle1">contact@corporation.com</Typography>
            <Typography variant="subtitle1">(16) 98765-4321</Typography>
          </div>
        </div>
        <div className="row tables">
          <Table
            arr={[]}
            title="Novos arquivos"
            subtitle="Tudo o que você não viu desde o seu último acesso"
            tableIndex={-1}
          />
          <Table
            arr={[]}
            title="Últimas atualizações"
            subtitle="Tudo o que você não viu desde o seu último acesso"
            tableIndex={-1}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
