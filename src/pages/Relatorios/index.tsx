import '../Dashboard.css';
import './Styles/index.css';

import { Typography, Button, CircularProgress, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import Header from 'src/components/Header';
import Table, { LinkProps } from 'src/components/Table';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Box } from '@mui/system';
import ModalUpload from './Components/ModalUpload';
import {
  arquivosGetRequest,
  arquivosUploadIdle,
  arquivosDownloadIdle,
} from 'src/store/ducks/relatoriosUpload';
import { ArquivosByTipo } from 'src/store/ducks/relatoriosUpload/types';

const Documentos = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const [open, setOpen] = React.useState(false);
  const arquivosByTipo = useAppSelector((state) => state.arquivoUpload.data);
  const arquivosState = useAppSelector((state) => state.arquivoUpload.state);
  const file = useAppSelector((state) => state.arquivoUpload.file);

  useEffect(() => {
    dispatch(arquivosGetRequest());

    return () => {
      dispatch(arquivosDownloadIdle());
      dispatch(arquivosUploadIdle());
    };
  }, [dispatch]);

  useEffect(() => {
    if (file) window.open(file);
  }, [file]);

  function getObjetos(flgFiltro: string): Array<LinkProps> {
    const objetos: Array<LinkProps> = [];

    user?.lstSistemas?.forEach((sistema) =>
      sistema.lstTiposObjetos?.forEach((tipoObjeto) => {
        if (tipoObjeto.flgTipo === flgFiltro)
          tipoObjeto.lstObjetos?.forEach((objeto) => {
            objetos.push({
              name: objeto.desObjeto,
              linkTo: `/${objeto.nomPagina.toLowerCase()}`,
            });
          });
      })
    );

    return objetos;
  }

  const prestadores = getObjetos('P');
  const fornecedores = getObjetos('F');

  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Relatórios" />
          <Typography variant="subtitle1">
            Relatórios e demonstrativos disponíveis para consulta
          </Typography>
        </div>

        <Box sx={{ m: 0, position: 'relative' }} className="btnUpload">
          <Button
            variant="contained"
            type="submit"
            className={false ? 'secondary' : ''}
            style={{ marginTop: 8 }}
            onClick={() => {
              setOpen(true);
              dispatch(arquivosUploadIdle());
            }}
          >
            UPLOAD DE RELATÓRIOS
          </Button>
          {false && (
            <CircularProgress
              size={24}
              sx={{
                color: '#23ACE6',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>

        <ModalUpload open={open} setOpen={setOpen} />

        <div
          className="row tables"
          style={{
            gridTemplateColumns:
              arquivosState === 's' && arquivosByTipo?.length === 0
                ? '1fr'
                : '1fr 1fr',
            gap:
              arquivosState === 's' && arquivosByTipo?.length === 0
                ? '0'
                : '30px',
            width:
              arquivosState === 's' && arquivosByTipo?.length === 0
                ? '50%'
                : '100%',
            marginLeft:
              arquivosState === 's' && arquivosByTipo?.length === 0
                ? '25%'
                : '0',
            transition: 'margin-left ease 0.4s',
          }}
        >
          <div className="column">
            {fornecedores.length !== 0 && (
              <Table arr={fornecedores} title="Para fornecedores" />
            )}
            {prestadores.length !== 0 && (
              <Table arr={prestadores} title="Para prestadores" />
            )}
          </div>
          <div
            className={`column${arquivosState === 'l' ? ' loading' : ''}`}
            style={{
              display:
                arquivosState === 's' && arquivosByTipo?.length === 0
                  ? 'none'
                  : 'flex',
            }}
          >
            {arquivosState === 'l' ? (
              loadingSkeletonElements()
            ) : (
              <div className="filesTypes">{filesTypes(arquivosByTipo)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;

function filesTypes(arquivosByTipo: ArquivosByTipo[] | undefined): any {
  let arrAux: JSX.Element[] = [];

  arquivosByTipo?.forEach((item, index) => {
    arrAux.push(
      <Table
        key={item.idRelTpArquivo}
        arrArquivo={item.arquivos}
        title={item.desTpArquivo}
      />
    );
  });

  return arrAux;
}

const loadingSkeletonElements = () => {
  return (
    <div className="skeletons">
      <Typography variant="h3" sx={{ mb: 2 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>

      <Typography variant="h3" sx={{ mb: 2, mt: 3 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>

      <Typography variant="h3" sx={{ mb: 2, mt: 3 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>

      <Typography variant="h3" sx={{ mb: 2, mt: 3 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <Skeleton />
      </Typography>
      <div className="overflown"></div>
    </div>
  );
};
