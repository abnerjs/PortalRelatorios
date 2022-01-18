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

import Header from 'src/components/Header';
import Form from 'src/pages/Cadastros/Perfis/Components/Form';
import Row from 'src/pages/Cadastros/Perfis/Components/Row';

import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  perfisGetRequest,
  perfisDeleteRequest,
  perfisCancelDelete,
  perfisIdleOperation,
  perfisCleanError,
} from 'src/store/ducks/perfis';
import { Perfil } from 'src/store/ducks/perfis/types';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

const Perfis = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'perfis')?.flgAcesso ||
    'N';

  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const { pesquisa, handlePesquisa } = usePesquisa();

  const dispatch = useAppDispatch();
  const perfis = useAppSelector((state) => state.perfis.data);
  const loading = useAppSelector((state) => state.perfis.loading);
  const getError = useAppSelector((state) => state.perfis.error);
  const errors = useAppSelector((state) => state.perfis.deleteError);
  const deleteState = useAppSelector((state) => state.perfis.deleteState);
  const operationState = useAppSelector((state) => state.perfis.operationState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  useEffect(() => {
    dispatch(perfisCleanError());
    dispatch(perfisIdleOperation());
  }, [dispatch]);

  const handleFormOpen = (open: boolean, newUser: boolean) => {
    if (newUser) {
      setRowSelected(-1);
    }

    setPerfil(newUser ? null : perfis[rowSelected]);
    setFormOpened(open);
    setNewUserSection(newUser);

    setTimeout(() => {
      global.window.document.getElementById('desPerfil')?.focus();
    }, 400);
  };

  useEffect(() => {
    dispatch(perfisGetRequest(pesquisa.toString()));
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
      setPerfil(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);

      dispatch(perfisGetRequest(pesquisa.toString()));
      dispatch(perfisIdleOperation());
    } else if (operationState === 'cancel') {
      setPerfil(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);
      dispatch(perfisIdleOperation());
    }
    setErrorCollapseOpened(errors !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

  useEffect(() => {
    if (deleteState === 'success') {
      if (perfil?.idRelPerfil === perfis[rowSelected]?.idRelPerfil) {
        setFormOpened(false);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(perfisGetRequest(pesquisa.toString()));
    }
    setErrorCollapseOpened(errors !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Perfis" />
          <Typography variant="subtitle1">
            Todos os perfis do sistema
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
                label="Descrição do perfil"
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
              disabled={flgAcesso !== 'A'}
              variant="contained"
              className={`tertiary${
                isFormOpened && isNewUserSection ? ' active' : ''
              }`}
              startIcon={
                <Icon
                  icon="fluent:add-16-regular"
                  width={25}
                  className="icon"
                />
              }
            >
              NOVO PERFIL
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
                : perfis.map((item, index) => (
                    <Row
                      key={`perfil-${index}`}
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
                    dispatch(perfisCancelDelete());
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
                      Tem certeza que quer deletar o perfil?
                    </Typography>
                    <div className="userInfo">
                      <Typography className="modal-user-info">
                        {perfis[rowSelected]?.desPerfil}
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
                            dispatch(perfisCancelDelete());
                          }, 500);
                        }}
                        fullWidth
                        variant="contained"
                        className="secondary"
                      >
                        CANCELAR
                      </Button>
                      <Box sx={{ m: 0, position: 'relative' }}>
                        <Button
                          variant="contained"
                          onClick={() =>
                            dispatch(perfisDeleteRequest(perfis[rowSelected]))
                          }
                          disabled={deleteState === 'request'}
                          type="submit"
                          fullWidth
                          className={
                            deleteState === 'request'
                              ? 'errorSecondary'
                              : 'errorColor'
                          }
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
          <Form data={perfil} isFormOpened={isFormOpened} />
        </div>
      </div>
    </div>
  );
};

export default Perfis;

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
