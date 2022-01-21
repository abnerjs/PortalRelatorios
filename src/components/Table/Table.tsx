import './Table.css';

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ArquivoUploadReceiveFormat } from 'src/store/ducks/relatoriosUpload/types';
import { useAppDispatch } from 'src/store';
import Row from './subcomponents/Row';

export interface LinkProps {
  name: string;
  linkTo: string;
}

type Props = {
  title: string;
  tableIndex: number;
  subtitle?: string;
  arr?: Array<LinkProps>;
  arrArquivo?: Array<ArquivoUploadReceiveFormat>;
  fullView?: boolean;
};

const conditionalArrayTypeRender = (
  arr: Array<LinkProps> | undefined,
  arrArquivo: Array<ArquivoUploadReceiveFormat> | undefined,
  dispatch: any,
  collapsed: boolean,
  setCollapsed: Function,
  tableIndex: number,
  fullView?: boolean,
) => {
  let arrGui: JSX.Element[] = [];

  if (arr) {
    arr.forEach((doc, index) => {
      arrGui.push(
        <div className="row" key={index}>
          <div className="textual">
            <div className="regname">{doc.name}</div>
          </div>
          <Link
            to={doc.linkTo}
            tabIndex={-1}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" fullWidth className="reg">
              ABRIR
            </Button>
          </Link>
        </div>
      );
    });
  } else if (arrArquivo) {
    arrArquivo.forEach((doc, index) => {
      arrGui.push(
        <Row
          arrArquivo={arrArquivo}
          tableIndex={tableIndex}
          rowIndex={index}
          key={index}
          doc={doc}
          fullView={fullView}
        />
      );
    });
  }

  return arrGui;
};

const Table = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const node = useRef<HTMLDivElement>(null);

  const subtitle = props.subtitle ? (
    <Typography variant="subtitle1">
      Tudo o que você não viu desde o seu último acesso
    </Typography>
  ) : null;

  return (
    <div className="Table" ref={node}>
      <Typography variant="h5">{props.title}</Typography>
      {subtitle}
      <div className="principalContent">
        <div className="scrollable">
          {conditionalArrayTypeRender(
            props.arr,
            props.arrArquivo,
            dispatch,
            collapsed,
            setCollapsed,
            props.tableIndex,
            props.fullView,
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
