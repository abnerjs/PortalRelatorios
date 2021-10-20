import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Table.css';

type Props = {
  title: string;
  subtitle?: string;
  arr: Array<any>;
};

const Table = (props: Props) => {
  const subtitle = props.subtitle ? (
    <Typography variant="subtitle1">
      Tudo o que você não viu desde o seu último acesso
    </Typography>
  ) : null;

  return (
    <div className="Table">
      <Typography variant="h5">{props.title}</Typography>
      {subtitle}

      <div className="principalContent">
        {props.arr.map((doc, index) => <div className="row" key={index}>
              <div className="textual">
                <div className="regname">Nome do registro</div>
                <div className="date">26/01/2019 17:50</div>
              </div>
              <Link to="/demonstrativo">
                <button className="reg">ABRIR</button>
              </Link>
            </div>)}
      </div>
    </div>
  );
};

export default Table;
