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
import Table from 'src/components/Table/Table';
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
import { TipoFiltro } from 'src/store/ducks/base/types';
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { usuariosGetFilterRequest } from 'src/store/ducks/usuarios';
import UncontrolledLottie from 'src/components/UncontrolledLottie';

export interface FiltrosRelatorios {
  descricao?: string;
  fornecedores?: Array<TipoFiltro>;
  prestadores?: Array<TipoFiltro>;
  periodoRef?: DateRange<Date>;
  periodoUp?: DateRange<Date>;
  usuarioUpload?: number;
}

const defaultValuesFiltros: FiltrosRelatorios = {
  descricao: '',
  fornecedores: [],
  prestadores: [],
  periodoRef: [null, null],
  periodoUp: [null, null],
  usuarioUpload: undefined,
};

const Gerenciamento = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const arquivosByTipo = useAppSelector((state) => state.arquivoUpload.data);
  const arquivosState = useAppSelector((state) => state.arquivoUpload.state);
  const file = useAppSelector((state) => state.arquivoUpload.file);
  const [filtros, setFiltros] =
    useState<FiltrosRelatorios>(defaultValuesFiltros);
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
    dispatch(arquivosGetRequest(filtros));

    return () => {
      dispatch(arquivosDownloadIdle());
      dispatch(arquivosUploadIdle());
    };
  }, [dispatch, filtros]);

  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
    dispatch(usuariosGetFilterRequest());
  }, [dispatch]);

  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );
  const lstUsuarios = useAppSelector((state) => state.usuarios.filterList);

  useEffect(() => {
    if (file) window.open(file);
    return () => {
      dispatch(arquivosDownloadIdle());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Gerenciamento" />
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
                    JSON.stringify([null, null]) &&
                  JSON.stringify(filtros.usuarioUpload) ===
                    JSON.stringify(undefined)
                }
              >
                <Icon icon="ci:filter-outline" height={'30px'} />
              </Badge>
            </IconButton>

            <ModalFiltros
              open={openFilters}
              setOpen={setOpenFilters}
              filtros={filtros}
              setFiltros={setFiltros}
              lstFornecedores={lstFornecedores}
              lstPrestadores={lstPrestadores}
              lstUsuarios={lstUsuarios}
              admin
            />
          </div>
        </div>

        <div
          className="row overview"
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
          <div
            className={`column${arquivosState === 'l' ? ' loading' : ''}`}
            style={{
              display: 'flex',
            }}
          >
            {arquivosState === 'l' ? (
              loadingSkeletonElements()
            ) : arquivosByTipo?.length === 0 ? (
              <div className="unfound">
                <UncontrolledLottie />
                <Typography variant="h5">
                  NÃO FORAM ENCONTRADOS REGISTROS
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

export default Gerenciamento;

function filesTypes(arquivosByTipo: ArquivosByTipo[] | undefined): any {
  let arrAux: JSX.Element[] = [];

  arquivosByTipo?.forEach((item, index) => {
    arrAux.push(
      <Table
        key={item.idRelTpArquivo}
        arrArquivo={item.arquivos}
        title={item.desTpArquivo}
        fullView
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
