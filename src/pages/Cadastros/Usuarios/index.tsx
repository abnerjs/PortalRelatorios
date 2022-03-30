import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Tab, Tabs, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header/Header';
import Form from 'src/pages/Cadastros/Usuarios/Components/Form';
import { usePesquisa } from 'src/hooks/usePesquisa';
import { useAppSelector, useAppDispatch } from 'src/store';
import {
  usuariosGetRequest,
  usuariosDeleteRequest,
  usuariosIdleOperation,
  usuariosCancelDelete,
  usuariosCleanError,
  usuariosChangeFlagActiveRequest,
} from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmList from 'src/components/DmList/DmList';

const searchInitValues = {
  init: {
    itensPorPagina: 10,
    novaOrdenacao: 'desNome',
    numPagina: 1,
  },
};

const Usuarios = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'usuarios')?.flgAcesso ||
    'N';

  const [flgTipo, setFlgTipo] = useState('I');
  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    ...searchInitValues,
    params: [{ key: 'flgTipo', value: 'I' }],
  });

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarios.data);
  const pagination = useAppSelector((state) => state.usuarios.pagination);
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
      global.window.document.getElementById('Nomecompleto')?.focus();
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

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

  const handleChangeFlgAtivo = (id: number) => {
    dispatch(usuariosChangeFlagActiveRequest(usuarios[id]));
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
          <div className={`tableContainer${isFormOpened ? '' : ' formInvi'}`}>
            <div
              className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}
            >
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
              <DmList
                list={usuarios}
                object={usuario}
                getError={getError}
                errors={errors}
                deleteState={deleteState}
                cancelDelete={usuariosCancelDelete}
                deleteRequest={usuariosDeleteRequest}
                handleFormOpen={handleFormOpen}
                isFormOpened={isFormOpened}
                key="idRelUsuario"
                labelKey="desNome"
                loading={loading}
                request={usuariosGetRequest}
                handlePesquisa={handlePesquisa}
                pesquisa={pesquisa}
                setObject={setUsuario}
                pagination={pagination}
                switchFunction={handleChangeFlgAtivo}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            </div>
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
