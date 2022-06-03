import '../Dashboard.css';
import './Styles/index.css';

import { Box, Typography, Button, CircularProgress, Skeleton, IconButton, Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header/Header';
import Table, { LinkProps } from 'src/components/Table/Table';
import { useAppDispatch, useAppSelector } from 'src/store';
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
import DmTextField from 'src/components/DmTextField/DmTextField';

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
  const [filtros, setFiltros] = useState<FiltrosRelatorios>(defaultValuesFiltros);
  const [displayColumn, setDisplayColumn] = useState('flex');
  const [showingAlert, setShowingAlert] = useState(false);
  const [dragStart, setDragStart] = useState([0, 0, 0]);
  const [dragEnd, setDragEnd] = useState([0, 0, 0]);
  const [columnActive, setColumnActive] = useState(0);

  const deleteState = useAppSelector((state) => state.arquivoUpload.deleteState);
  const uploadState = useAppSelector((state) => state.arquivoUpload.uploadState);

  useEffect(() => {
    if (
      Math.abs(dragEnd[0] - dragStart[0]) > 100 &&
      (Math.abs(dragEnd[1] - dragStart[1]) < 50 ||
        (Math.abs(dragEnd[1] - dragStart[1]) < 150 && dragEnd[3] !== undefined)) &&
      dragEnd[2] - dragStart[2] < 1500
    ) {
      setColumnActive((columnActive + 1) % 2);
    }
  }, [dragEnd]);

  useEffect(() => {
    if (deleteState === 's') {
      dispatch(arquivosGetRequest(filtros));
      dispatch(arquivosDeleteIdle());
    }
  }, [deleteState]);

  useEffect(() => {
    if (uploadState === 's') {
      dispatch(arquivosGetRequest(filtros));
    }
  }, [uploadState]);

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

  const lstFornecedores = useAppSelector((state) => state.fornecedores.filterList);
  const lstPrestadores = useAppSelector((state) => state.prestadores.filterList);

  useEffect(() => {
    dispatch(arquivosGetRequest(filtros));

    return () => {
      dispatch(arquivosDownloadIdle());
      dispatch(arquivosUploadIdle());
    };
  }, [dispatch, filtros]);

  useEffect(() => {
    if (file) {
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open(file);
      }
    }

    return () => {
      dispatch(arquivosDownloadIdle());
    };
  }, [file]);

  function getObjetos(flgFiltro: string): Array<LinkProps> {
    const objetos: Array<LinkProps> = [];

    user?.lstSistemas?.forEach((sistema) =>
      sistema.lstTiposObjetos?.forEach((tipoObjeto) => {
        if (tipoObjeto.flgTipo === flgFiltro)
          tipoObjeto.lstObjetos?.forEach((objeto) => {
            objetos.push({
              name: objeto.desObjeto,
              linkTo: objeto.nomPagina.toLowerCase(),
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
          <Typography variant="subtitle1">Relatórios e demonstrativos disponíveis para consulta</Typography>
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
              <div className="uploadButtonText">UPLOAD DE RELATÓRIOS</div>
              <Icon className="uploadButtonIcon" icon="fluent:arrow-upload-16-filled" height={'30px'} />
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
            <DmTextField
              label="Nome do arquivo"
              size="small"
              margin="none"
              onChange={(e: any) => {
                setFiltros({
                  ...filtros,
                  descricao: e.target.value,
                });
              }}
              sx={{
                mr: 2,
              }}
            />
            <IconButton className="filterButton" onClick={() => setOpenFilters(true)} style={{ width: 45, height: 45 }}>
              <Badge
                color="primary"
                variant="dot"
                invisible={
                  JSON.stringify(filtros.fornecedores) === JSON.stringify([]) &&
                  JSON.stringify(filtros.prestadores) === JSON.stringify([]) &&
                  JSON.stringify(filtros.periodoRef) === JSON.stringify([null, null]) &&
                  JSON.stringify(filtros.periodoUp) === JSON.stringify([null, null])
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
          className={`row tables${columnActive === 1 ? ' drag' : ''}`}
          style={{
            gridTemplateColumns: displayColumn === 'none' ? '1fr' : '1fr 1fr',
            gap: displayColumn === 'none' ? '0' : '30px',
            width: displayColumn === 'none' ? '50%' : '100%',
            marginLeft: displayColumn === 'none' ? '25%' : '0',
            transition: 'margin-left ease 0.4s',
          }}
          draggable
          onDragStart={(e) => {
            setDragStart([e.clientX, e.clientY, new Date().getTime()]);
          }}
          onTouchStart={(e) => {
            setDragStart([e.touches[0].clientX, e.touches[0].clientY, new Date().getTime()]);
          }}
          onDragEnd={(e) => {
            setDragEnd([e.clientX, e.clientY, new Date().getTime()]);
          }}
          onTouchEnd={(e) => {
            setDragEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY, new Date().getTime(), 0]);
          }}
        >
          <div className="column">
            {fornecedores.length !== 0 && <Table arr={fornecedores} title="Para fornecedores" tableIndex={-1} />}
            {prestadores.length !== 0 && <Table arr={prestadores} title="Para prestadores" tableIndex={-1} />}
          </div>
          <div
            className={`column${arquivosState === 'l' || showingAlert ? ' loading' : ''}`}
            style={{
              display: displayColumn,
            }}
          >
            {arquivosState === 'l' ? (
              loadingSkeletonElements()
            ) : arquivosByTipo?.length === 0 ? (
              <div className="unfound">
                <UncontrolledLottie />
                <Typography variant="h5">{getError ? getError : 'NÃO FORAM ENCONTRADOS REGISTROS'}</Typography>
              </div>
            ) : (
              <div className="filesTypes">{filesTypes(arquivosByTipo)}</div>
            )}
          </div>
        </div>

        <div className="sectionsController">
          <div className={`dot${columnActive === 0 ? ' active' : ''}`}></div>
          <div className={`dot${columnActive === 1 ? ' active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;

function filesTypes(arquivosByTipo: ArquivosByTipo[] | undefined): JSX.Element[] {
  let arrAux: JSX.Element[] = [];

  arquivosByTipo?.forEach((item, index) => {
    arrAux.push(
      <Table key={item.idRelTpArquivo} arrArquivo={item.arquivos} title={item.desTpArquivo} tableIndex={index} />
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
