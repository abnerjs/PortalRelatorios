import './Table.css';

import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import {
  ArquivoUploadReceiveFormat,
} from 'src/store/ducks/relatoriosUpload/types';
import { arquivosDownloadRequest } from 'src/store/ducks/relatoriosUpload';
import { useAppDispatch } from 'src/store';
import { dateFormatter } from 'src/utils/StringUtils';

export interface LinkProps {
  name: string;
  linkTo: string;
}

type Props = {
  title: string;
  subtitle?: string;
  arr?: Array<LinkProps>;
  arrArquivo?: Array<ArquivoUploadReceiveFormat>;
};

const conditionalArrayTypeRender = (
  arr: Array<LinkProps> | undefined,
  arrArquivo: Array<ArquivoUploadReceiveFormat> | undefined,
  dispatch: any
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
        <div className="row" key={index}>
          <div className="textual">
            <div className="regname">{doc.nomArquivo}</div>
            <div className="date">{dateFormatter(doc.dtaUpload, 'pt-BR')}</div>
          </div>
          <Button
            variant="contained"
            fullWidth
            className="reg"
            onClick={() => {
              dispatch(arquivosDownloadRequest(doc.idRelArquivo));
            }}
          >
            BAIXAR
          </Button>
        </div>
      );
    });
  }

  return arrGui;
};

const Table = (props: Props) => {
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
          {conditionalArrayTypeRender(props.arr, props.arrArquivo, dispatch)}
        </div>
      </div>
    </div>
  );
};

export default Table;
