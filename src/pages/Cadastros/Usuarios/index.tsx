import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
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

  const handleDelete = () => {
    if (usuario?.idRelUsuario === usuarios[rowSelected]?.idRelUsuario) {
      setFormOpened(false);
    }

    setModalOpen(false);
    setRowSelected(-1);

    dispatch(usuariosDeleteRequest(usuarios[rowSelected]));
    dispatch(usuariosGetRequest(pesquisa.toString()));
  };

  const onSuccess = () => {
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);
    setNewUserSection(false);

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
            <div className="rows">
              {usuarios.map((item, index) => (
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
                      onClick={() => setModalOpen(false)}
                      variant="contained"
                      className="secondary"
                    >
                      CANCELAR
                    </Button>
                    <Button
                      onClick={handleDelete}
                      variant="contained"
                      className="errorColor"
                    >
                      DELETAR
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
          <Form
            data={usuario}
            tipoUsuario={flgTipo}
            isFormOpened={isFormOpened}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
