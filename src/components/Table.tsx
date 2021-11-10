import './Table.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export type LinkProps = {
  name: string;
  linkTo: string;
};

type Props = {
  title: string;
  subtitle?: string;
  arr: Array<LinkProps>;
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
        <div className="scrollable">
          {props.arr.map((doc, index) => (
            <div className="row" key={index}>
              <div className="textual">
                <div className="regname">{doc.name}</div>
              </div>
              <Link to={doc.linkTo} tabIndex={-1} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  fullWidth
                  className="reg"
                >
                  ABRIR
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
