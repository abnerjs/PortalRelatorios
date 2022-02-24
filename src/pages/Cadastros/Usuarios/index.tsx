import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

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
  Tab,
  TablePagination,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import Header from 'src/components/Header/Header';
import Row from 'src/pages/Cadastros/Usuarios/Components/Row';
import Form from 'src/pages/Cadastros/Usuarios/Components/Form';
import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppSelector, useAppDispatch } from 'src/store';
import {
  usuariosGetRequest,
  usuariosPutRequest,
  usuariosDeleteRequest,
  usuariosIdleOperation,
  usuariosCancelDelete,
  usuariosCleanError,
} from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

const Usuarios = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso ||
    'N';

  const [flgTipo, setFlgTipo] = useState('I');
  const [rowSelected, setRowSelected] = useState(-1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    params: [{ key: 'flgTipo', value: 'I' }],
  });
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarios.data);
  const loading = useAppSelector((state) => state.usuarios.loading);
  const getError = useAppSelector((state) => state.usuarios.error);
  const errors = useAppSelector((state) => state.usuarios.deleteError);
  const deleteState = useAppSelector((state) => state.usuarios.deleteState);
  const changePassword = useAppSelector(
    (state) => state.usuarios.changePasswordState
  );
  const operationState = useAppSelector(
    (state) => state.usuarios.operationState
  );
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);

  useEffect(() => {
    dispatch(usuariosCleanError());
    dispatch(usuariosIdleOperation());
  }, [dispatch]);

  useEffect(() => {
    if (changePassword === 'success') {
      dispatch(usuariosGetRequest(pesquisa.toString()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePassword]);

  useEffect(() => {
    setGetErrorCollapseOpened(getError !== undefined);
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);
    setNewUserSection(false);
  }, [getError]);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  const handleFormOpen = (open: boolean, newUser: boolean) => {
    if (newUser) {
      setRowSelected(-1);
    }

    setUsuario(newUser ? null : usuarios[rowSelected]);
    setFormOpened(open);
    setNewUserSection(newUser);

    setTimeout(() => {
      global.window.document.getElementById('desNome')?.focus();
    }, 400);
  };

  useEffect(() => {
    if (operationState === 'success') {
      setUsuario(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);

      dispatch(usuariosGetRequest(pesquisa.toString()));
    } else if (operationState === 'cancel') {
      setUsuario(null);
      setRowSelected(-1);
      setFormOpened(false);
      setNewUserSection(false);
      dispatch(usuariosIdleOperation());
    }

    setErrorCollapseOpened(errors !== undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

  useEffect(() => {
    if (deleteState === 'success') {
      if (usuario?.idRelUsuario === usuarios[rowSelected]?.idRelUsuario) {
        setFormOpened(false);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(usuariosGetRequest(pesquisa.toString()));
    }

    setErrorCollapseOpened(errors !== undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  const handleChangeFlgTipo = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFlgTipo(newValue);
    handleCustomParameters({ key: 'flgTipo', value: newValue });
    if (rowSelected !== -1) {
      setFormOpened(false);
      setUsuario(null);
      setRowSelected(-1);
    }
  };

  const handleUpdate = (index: number, flgAtivo: string) => {
    const data = { ...usuarios[index] };
    data.flgAtivo = flgAtivo;

    dispatch(usuariosPutRequest(data));
    dispatch(usuariosGetRequest(pesquisa.toString()));
  };

  useEffect(() => {
    setRowSelected(-1);
    dispatch(usuariosGetRequest(pesquisa.toString()));
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

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Typography variant="subtitle1">
            Todos os usuários do sistema
          </Typography>
        </div>
        <div className="row">
          <div className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}>
            <Tabs
              value={flgTipo}
              onChange={handleChangeFlgTipo}
              className={`tabs${isFormOpened ? '' : ' middle'}`}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="I" label="INTERNO" />
              <Tab disableRipple value="E" label="EXTERNO" />
            </Tabs>
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
                label={
                  flgTipo === 'I'
                    ? 'Nome, matrícula, CPF ou e-mail'
                    : 'Nome, CPF/CNPJ ou e-mail'
                }
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
              fullWidth
            >
              NOVO USUÁRIO
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
                ? loadingUsersRows()
                : usuarios.map((item, index) => (
                    <Row
                      key={`usuario-${index}`}
                      data={item}
                      index={index}
                      indexSelected={rowSelected}
                      handleFormOpen={handleFormOpen}
                      handleModalOpen={setModalOpen}
                      handleIndexSelected={setRowSelected}
                      handleChangeFlgAtivo={handleUpdate}
                      isFormOpened={isFormOpened}
                    />
                  ))}
            </div>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Registros por página:"
              labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) { return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`; }}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
              open={isModalOpen}
              onClose={() => {
                setModalOpen(false);
                setErrorCollapseOpened(false);
                setTimeout(() => {
                  dispatch(usuariosCancelDelete());
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
                    Tem certeza que quer deletar o usuário?
                  </Typography>
                  <div className="userInfo">
                    <Typography className="modal-user-info">
                      {usuarios[rowSelected]?.desNome}
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
                          dispatch(usuariosCancelDelete());
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
                          dispatch(usuariosDeleteRequest(usuarios[rowSelected]))
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
          </div>
          <Form
            data={usuario}
            tipoUsuario={flgTipo}
            isFormOpened={isFormOpened}
          />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;

const loadingUsersRows = () => {
  let arr = [];

  for (let i = 0; i < 25; i++) {
    arr.push(
      <div key={`loadingRow-${i}`} className={`row`}>
        <div className="header">
          <Skeleton
            animation="wave"
            variant="circular"
            width={36}
            height={36}
            style={{ marginRight: '10px' }}
          />
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
