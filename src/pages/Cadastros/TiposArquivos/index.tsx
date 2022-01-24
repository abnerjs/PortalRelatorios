import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';

import Header from 'src/components/Header/Header';
import Form from 'src/pages/Cadastros/TiposArquivos/Components/Form';
import Row from 'src/pages/Cadastros/TiposArquivos/Components/Row';

import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  tipoArquivoGetRequest,
  tipoArquivoDeleteRequest,
  tipoArquivoCancelDelete,
  tipoArquivoIdleOperation,
  tipoArquivoCleanError,
} from 'src/store/ducks/tipoArquivo';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

const TiposArquivos = () => {
  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [tipoArquivo, setTipoArquivo] = useState<TipoArquivo | null>(null);
  const { pesquisa, handlePesquisa } = usePesquisa();

  const dispatch = useAppDispatch();
  const tiposArquivos = useAppSelector((state) => state.tipoArquivo.data);
  const loading = useAppSelector((state) => state.tipoArquivo.loading);
  const getError = useAppSelector((state) => state.tipoArquivo.error);
  const errors = useAppSelector((state) => state.tipoArquivo.deleteError);
  const deleteState = useAppSelector((state) => state.tipoArquivo.deleteState);
  const operationState = useAppSelector(
    (state) => state.tipoArquivo.operationState
  );
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  useEffect(() => {
    dispatch(tipoArquivoCleanError());
    dispatch(tipoArquivoIdleOperation());
  }, [dispatch]);

  const handleFormOpen = (open: boolean, newUser: boolean) => {
    if (newUser) {
      setRowSelected(-1);
    }

    setTipoArquivo(newUser ? null : tiposArquivos[rowSelected]);
    setFormOpened(open);
    setNewUserSection(newUser);

    setTimeout(() => {
      global.window.document.getElementById('desTipoArquivo')?.focus();
    }, 400);
  };

  useEffect(() => {
    dispatch(tipoArquivoGetRequest(pesquisa.toString()));
  }, [pesquisa, dispatch]);

  const isOverflown = (e: any) => {
    return e?.scrollWidth > e?.clientWidth || e?.scrollHeight > e?.clientHeight;
  };

  let arrElems = document.getElementsByClassName('textual');
  let deleteModalElem = document
    .getElementsByClassName('userInfo')[0]
    ?.getElementsByTagName('p')[0];

  useEffect(() => {
    for (let elem of arrElems) {
      if (isOverflown(elem)) elem.classList.add('overflown');
    }
  });

  useEffect(() => {
    setTimeout(() => {
      if (isOverflown(deleteModalElem))
        deleteModalElem.classList.add('overflown');
    }, 505);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    if (operationState === 'success') {
      setTipoArquivo(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);

      dispatch(tipoArquivoGetRequest(pesquisa.toString()));
      dispatch(tipoArquivoIdleOperation());
    } else if (operationState === 'cancel') {
      setTipoArquivo(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);
      dispatch(tipoArquivoIdleOperation());
    }
    setErrorCollapseOpened(errors !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

  useEffect(() => {
    if (deleteState === 'success') {
      if (
        tipoArquivo?.idRelTpArquivo ===
        tiposArquivos[rowSelected]?.idRelTpArquivo
      ) {
        setFormOpened(false);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(tipoArquivoGetRequest(pesquisa.toString()));
    }
    setErrorCollapseOpened(errors !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Tipos de arquivos" />
          <Typography variant="subtitle1">
            Todos os tipos de arquivos do sistema
          </Typography>
        </div>
        <div className="row">
          <div className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}>
            <div className="search">
              <Icon
                icon="fluent:search-12-regular"
                width={25}
                className={`icon${isSearchFocused ? ' active' : ''}`}
              />
              <TextField
                id="searchbar"
                value={pesquisa.filtroPadrao}
                onChange={handleChangeSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                autoComplete="off"
                fullWidth
                color="primary"
                label="Descrição do tipo de arquivo"
                margin="normal"
                variant="filled"
                className="iconified"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
            <Button
              onClick={() => handleFormOpen(true, true)}
              variant="contained"
              className={`tertiary${
                isFormOpened && isNewUserSection ? ' active' : ''
              }`}
              fullWidth
              startIcon={
                <Icon
                  icon="fluent:add-16-regular"
                  width={25}
                  className="icon"
                />
              }
            >
              NOVO TIPO DE ARQUIVO
            </Button>
            <DmCollapseHandler
              error={getError}
              isErrorCollapseOpened={isGetErrorCollapseOpened}
              setErrorCollapseOpened={setGetErrorCollapseOpened}
            />
            <div
              className="rows"
              style={{ overflow: loading ? 'hidden' : 'auto' }}
            >
              {loading
                ? loadingProfilesRows()
                : tiposArquivos.map((item, index) => (
                    <Row
                      key={`tipoArquivo-${index}`}
                      data={item}
                      index={index}
                      indexSelected={rowSelected}
                      handleFormOpen={handleFormOpen}
                      handleModalOpen={setModalOpen}
                      handleIndexSelected={setRowSelected}
                    />
                  ))}
            </div>
            {rowSelected !== -1 && (
              <Modal
                open={isModalOpen}
                onClose={() => {
                  setModalOpen(false);
                  setErrorCollapseOpened(false);
                  setTimeout(() => {
                    dispatch(tipoArquivoCancelDelete());
                  }, 500);
                }}
                closeAfterTransition
                keepMounted
                disablePortal
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
              >
                <Fade in={isModalOpen}>
                  <Box className="modal-confirm-delete">
                    <DmCollapseHandler
                      error={errors}
                      isErrorCollapseOpened={isErrorCollapseOpened}
                      setErrorCollapseOpened={setErrorCollapseOpened}
                    />
                    <Typography id="transition-modal-title">
                      Tem certeza que quer deletar o tipoArquivo?
                    </Typography>
                    <div className="userInfo">
                      <Typography className="modal-user-info">
                        {tiposArquivos[rowSelected]?.desTpArquivo}
                      </Typography>
                    </div>
                    <hr
                      style={{
                        width: '100%',
                        height: 1,
                        border: 'none',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                      }}
                    />
                    <div className="buttons">
                      <Button
                        onClick={() => {
                          setModalOpen(false);
                          setErrorCollapseOpened(false);
                          setTimeout(() => {
                            dispatch(tipoArquivoCancelDelete());
                          }, 500);
                        }}
                        variant="contained"
                        className="secondary"
                        fullWidth
                      >
                        CANCELAR
                      </Button>
                      <Box sx={{ m: 0, position: 'relative' }}>
                        <Button
                          variant="contained"
                          onClick={() =>
                            dispatch(
                              tipoArquivoDeleteRequest(
                                tiposArquivos[rowSelected]
                              )
                            )
                          }
                          disabled={deleteState === 'request'}
                          type="submit"
                          className={
                            deleteState === 'request'
                              ? 'errorSecondary'
                              : 'errorColor'
                          }
                          fullWidth
                        >
                          DELETAR
                        </Button>
                        {deleteState === 'request' && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: '#CA4539',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px',
                            }}
                          />
                        )}
                      </Box>
                    </div>
                  </Box>
                </Fade>
              </Modal>
            )}
          </div>
          <Form data={tipoArquivo} isFormOpened={isFormOpened} />
        </div>
      </div>
    </div>
  );
};

export default TiposArquivos;

const loadingProfilesRows = () => {
  let arr = [];

  for (let i = 0; i < 25; i++) {
    arr.push(
      <div key={`loadingRow-${i}`} className={`row`}>
        <div className="header">
          <Typography component="div" variant="body1" style={{ flex: 1 }}>
            <Skeleton animation="wave" />
          </Typography>
          <Icon
            icon="fluent:chevron-right-16-filled"
            width={16}
            className="icon"
          />
        </div>
      </div>
    );
  }

  return arr;
};
