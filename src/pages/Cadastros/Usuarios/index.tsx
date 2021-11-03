import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Fade,
  IconButton,
  Modal,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import Header from 'src/components/Header';
import Row from 'src/pages/Cadastros/Usuarios/Components/Row';
import Form from 'src/pages/Cadastros/Usuarios/Components/Form';
import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppSelector, useAppDispatch } from 'src/store';
import {
  usuariosGetRequest,
  usuariosPutRequest,
  usuariosDeleteRequest,
} from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';

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

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarios.data);
  const loading = useAppSelector((state) => state.usuarios.loading);
  const errors = useAppSelector((state) => state.usuarios.deleteError);
  const deleteState = useAppSelector((state) => state.usuarios.deleteState);
  const operationState = useAppSelector(
    (state) => state.usuarios.operationState
  );
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

  useEffect(() => {
    setErrorCollapseOpened(errors !== undefined);
  }, [errors]);

  useEffect(() => {
    if (deleteState === 'success') {
      if (usuario?.idRelUsuario === usuarios[rowSelected]?.idRelUsuario) {
        setFormOpened(false);
      }

      setModalOpen(false);
      setRowSelected(-1);

      dispatch(usuariosGetRequest(pesquisa.toString()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState]);

  const handleChangeFlgTipo = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFlgTipo(newValue);
    handleCustomParameters({ key: 'flgTipo', value: newValue });
  };

  const handleUpdate = (index: number, flgAtivo: string) => {
    const data = { ...usuarios[index] };
    data.flgAtivo = flgAtivo;

    dispatch(usuariosPutRequest(data));
    dispatch(usuariosGetRequest(pesquisa.toString()));
  };

  const onCancel = () => {
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);
    setNewUserSection(false);
  };

  useEffect(() => {
    setRowSelected(-1);
    dispatch(usuariosGetRequest(pesquisa.toString()));
  }, [pesquisa, dispatch]);

  const isOverflown = (e: any) => {
    return e.scrollWidth > e.clientWidth;
  };

  let arrElems = global.window.document.getElementsByClassName('textual');

  for(let elem of arrElems) {
    if (isOverflown(elem)) elem.classList.add('overflown');
  }

  useEffect(() => {
    for(let elem of arrElems) {
      if (isOverflown(elem)) elem.classList.add('overflown');
    }
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
            >
              NOVO USUÁRIO
            </Button>
            <div
              className="rows"
              style={{ overflow: loading ? 'hidden' : 'auto' }}
            >
              {loading
                ? loadingUsersRows()
                : usuarios.map((item, index) => (
                    <Row
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
            <Modal
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
            >
              <Fade in={isModalOpen}>
                <Box className="modal-confirm-delete">
                  <Collapse in={errors !== undefined && isErrorCollapseOpened}>
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setErrorCollapseOpened(false);
                          }}
                        >
                          <Icon icon="fluent:dismiss-20-regular" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {errors}
                    </Alert>
                  </Collapse>
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
                      }}
                      variant="contained"
                      className="secondary"
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
                        className={deleteState === 'request' ? 'errorSecondary' : 'errorColor'}
                      >
                        DELETAR
                      </Button>
                      {deleteState === 'request' && (
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
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
          <Form
            data={usuario}
            tipoUsuario={flgTipo}
            isFormOpened={isFormOpened}
            onCancel={onCancel}
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
      <div className={`row`}>
        <div className="header">
          <Skeleton
            animation="wave"
            variant="circular"
            width={36}
            height={36}
            style={{ marginRight: '10px' }}
          />
          <Typography component="div" variant="body1" style={{flex: 1}}>
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
