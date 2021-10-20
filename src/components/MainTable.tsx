import { Typography } from '@mui/material';
import React from 'react';
import './MainTable.css';
import Table from './Table';

const MainTable = (props: { title: string, subtitle?: string }) => {

  const subtitle = props.subtitle ? <Typography variant="subtitle1">Tudo o que você não viu desde o seu último acesso</Typography> : null;

  return (
    <div className="MainTable">
      <Typography variant="h5">{props.title}</Typography>
      {subtitle}

      <Table />
    </div>
  );
};

export default MainTable;
