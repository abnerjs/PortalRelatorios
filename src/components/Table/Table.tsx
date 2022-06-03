import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { ArquivoUploadReceiveFormat } from 'src/store/ducks/relatoriosUpload/types';
import Row from './subcomponents/Row';
import './Table.css';

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
  userUploadInfo?: boolean;
};

const conditionalArrayTypeRender = (
  arr: Array<LinkProps> | undefined,
  arrArquivo: Array<ArquivoUploadReceiveFormat> | undefined,
  tableIndex: number,
  fullView?: boolean,
  userUploadInfo?: boolean
) => {
  let arrGui: JSX.Element[] = [];

  if (arr) {
    arr.forEach((doc, index) => {
      arrGui.push(
        <div className="row" key={index}>
          <div className="header">
            <div className="textual">
              <div className="regname">{doc.name}</div>
            </div>
            <Link to={`/relatorios/${doc.linkTo}`} tabIndex={-1} style={{ textDecoration: 'none' }}>
              <Button variant="contained" fullWidth className="reg">
                ABRIR
              </Button>
            </Link>
          </div>
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
          userUploadInfo={userUploadInfo}
        />
      );
    });
  }

  return arrGui;
};

const Table = (props: Props) => {
  const node = useRef<HTMLDivElement>(null);

  const subtitle = props.subtitle ? (
    <Typography variant="subtitle1">Tudo o que você não viu desde o seu último acesso</Typography>
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
            props.tableIndex,
            props.fullView,
            props.userUploadInfo
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
