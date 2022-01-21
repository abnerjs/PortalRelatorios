import '../Dashboard.css';
import './Styles/index.css';

import {
  Typography,
  Button,
  CircularProgress,
  Skeleton,
  TextField,
  IconButton,
  Badge,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header';
import Table, { LinkProps } from 'src/components/Table/Table';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Box } from '@mui/system';
import ModalUpload from './Components/ModalUpload';
import {
  arquivosGetRequest,
  arquivosUploadIdle,
  arquivosDownloadIdle,
  arquivosDeleteIdle,
} from 'src/store/ducks/relatoriosUpload';
import { ArquivosByTipo } from 'src/store/ducks/relatoriosUpload/types';
import { Icon } from '@iconify/react';
import ModalFiltros from './Components/ModalFiltros';
import { FiltrosRelatorios } from './Gerenciamento';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import UncontrolledLottie from 'src/components/UncontrolledLottie';

const defaultValuesFiltros: FiltrosRelatorios = {
  descricao: '',
  fornecedores: [],
  prestadores: [],
  periodoRef: [null, null],
  periodoUp: [null, null],
  usuarioUpload: undefined,
};

const Documentos = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.session.user);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const arquivosByTipo = useAppSelector((state) => state.arquivoUpload.data);
  const arquivosState = useAppSelector((state) => state.arquivoUpload.state);
  const getError = useAppSelector((state) => state.arquivoUpload.error);
  const file = useAppSelector((state) => state.arquivoUpload.file);
  const [filtros, setFiltros] =
    useState<FiltrosRelatorios>(defaultValuesFiltros);
  const [displayColumn, setDisplayColumn] = useState('flex');
  const [showingAlert, setShowingAlert] = useState(false);

  const deleteState = useAppSelector(
    (state) => state.arquivoUpload.deleteState
  );

  useEffect(() => {
    if (deleteState === 's') {
      dispatch(arquivosGetRequest(filtros));
      dispatch(arquivosDeleteIdle());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  useEffect(() => {
    if (arquivosState === 's' && arquivosByTipo?.length === 0) {
      setShowingAlert(true);
      const timeout = setTimeout(() => {
        setDisplayColumn('none');
      }, 8000);

      return () => clearTimeout(timeout);
    } else {
      setShowingAlert(false);
      setDisplayColumn('flex');
    }
  }, [arquivosState, arquivosByTipo]);

  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
  }, [dispatch]);

  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );

  useEffect(() => {
    dispatch(arquivosGetRequest(filtros));

    return () => {
      dispatch(arquivosDownloadIdle());
      dispatch(arquivosUploadIdle());
    };
  }, [dispatch, filtros]);

  useEffect(() => {
    if (file) window.open(file);

    return () => {
      dispatch(arquivosDownloadIdle());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

        <div className="row up">
          <Box sx={{ m: 0, position: 'relative' }} className="btnUpload">
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className={false ? 'secondary' : ''}
              style={{ height: 48 }}
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

          <div className="filters">
            <TextField
              id="desNome"
              label="Nome do arquivo"
              color="primary"
              margin="none"
              variant="filled"
              className="smaller"
              size="small"
              fullWidth
              sx={{
                mr: 2,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  descricao: e.target.value,
                });
              }}
            />
            <IconButton
              className="filterButton"
              aria-label="add to shopping cart"
              onClick={() => setOpenFilters(true)}
            >
              <Badge
                color="primary"
                variant="dot"
                invisible={
                  JSON.stringify(filtros.fornecedores) === JSON.stringify([]) &&
                  JSON.stringify(filtros.prestadores) === JSON.stringify([]) &&
                  JSON.stringify(filtros.periodoRef) ===
                    JSON.stringify([null, null]) &&
                  JSON.stringify(filtros.periodoUp) ===
                    JSON.stringify([null, null])
                }
              >
                <Icon icon="ci:filter-outline" height={'30px'} />
              </Badge>
            </IconButton>
            <ModalFiltros
              filtros={filtros}
              setFiltros={setFiltros}
              open={openFilters}
              setOpen={setOpenFilters}
              lstFornecedores={lstFornecedores}
              lstPrestadores={lstPrestadores}
            />
          </div>
        </div>

        <div
          className="row tables"
          style={{
            gridTemplateColumns: displayColumn === 'none' ? '1fr' : '1fr 1fr',
            gap: displayColumn === 'none' ? '0' : '30px',
            width: displayColumn === 'none' ? '50%' : '100%',
            marginLeft: displayColumn === 'none' ? '25%' : '0',
            transition: 'margin-left ease 0.4s',
          }}
        >
          <div className="column">
            {fornecedores.length !== 0 && (
              <Table arr={fornecedores} title="Para fornecedores" tableIndex={-1} />
            )}
            {prestadores.length !== 0 && (
              <Table arr={prestadores} title="Para prestadores" tableIndex={-1} />
            )}
          </div>
          <div
            className={`column${
              arquivosState === 'l' || showingAlert ? ' loading' : ''
            }`}
            style={{
              display: displayColumn,
            }}
          >
            {arquivosState === 'l' ? (
              loadingSkeletonElements()
            ) : arquivosByTipo?.length === 0 ? (
              <div className="unfound">
                <UncontrolledLottie />
                <Typography variant="h5">
                  {getError ? getError : 'NÃO FORAM ENCONTRADOS REGISTROS'}
                </Typography>
              </div>
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

function filesTypes(
  arquivosByTipo: ArquivosByTipo[] | undefined
): JSX.Element[] {
  let arrAux: JSX.Element[] = [];

  arquivosByTipo?.forEach((item, index) => {
    arrAux.push(
      <Table
        key={item.idRelTpArquivo}
        arrArquivo={item.arquivos}
        title={item.desTpArquivo}
        tableIndex={index}
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
