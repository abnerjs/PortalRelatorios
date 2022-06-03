import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Tab, Tabs, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header/Header';
import { usePesquisa } from 'src/hooks/usePesquisa';
import Form from 'src/pages/Cadastros/VinculosUsuarios/Components/Form';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usuariosCleanError, usuariosGetRequest } from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmList from 'src/components/DmList/DmList';
import { usuariosFornecedoresIdleOperation } from 'src/store/ducks/usuariosFornecedores';
import { usuariosPrestadoresIdleOperation } from 'src/store/ducks/usuariosPrestadores';

const searchInitValues = {
  init: {
    itensPorPagina: 10,
    novaOrdenacao: 'desNome',
    numPagina: 1,
  },
};

const VinculosUsuarios = () => {
  const [flgTipo, setFlgTipo] = useState('I');
  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);

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
  const ufOperationState = useAppSelector((state) => state.usuariosFornecedores.operationState);
  const upOperationState = useAppSelector((state) => state.usuariosPrestadores.operationState);

  useEffect(() => {
    dispatch(usuariosCleanError());
  }, []);

  const handleChangeFlgTipo = (event: React.SyntheticEvent, newValue: string) => {
    setFlgTipo(newValue);
    handleCustomParameters({ key: 'flgTipo', value: newValue });

    if (rowSelected !== -1) {
      setFormOpened(false);
      setUsuario(null);
      setRowSelected(-1);
    }
  };

  const handleFormOpen = (open: boolean, newUser: boolean) => {
    setFormOpened(open);

    if (!open) {
      setUsuario(null);
      setRowSelected(-1);
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  useEffect(() => {
    if (ufOperationState === 'success' || upOperationState === 'success') {
      setUsuario(null);
      setRowSelected(-1);
      setFormOpened(false);

      dispatch(usuariosGetRequest(pesquisa.toString()));
      dispatch(usuariosFornecedoresIdleOperation());
      dispatch(usuariosPrestadoresIdleOperation());
    }
  }, [ufOperationState]);

  const onCancel = () => {
    setUsuario(null);
    setRowSelected(-1);
    setFormOpened(false);
  };

  useEffect(() => {
    setRowSelected(-1);
    dispatch(usuariosGetRequest(pesquisa.toString()));
  }, [pesquisa, dispatch]);

  const isOverflown = (e: any) => {
    return e?.scrollWidth > e?.clientWidth || e?.scrollHeight > e?.clientHeight;
  };

  let arrElems = document.getElementsByClassName('textual');

  useEffect(() => {
    for (let elem of arrElems) {
      if (isOverflown(elem)) elem.classList.add('overflown');
    }
  });

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Vínculos de Usuários" />
          <Typography variant="subtitle1">Usuários do sistema e seus vínculos</Typography>
        </div>
        <div className="row">
          <div className={`tableContainer${isFormOpened ? '' : ' formInvi'}`}>
            <div className={`SectionizedTable fornprestadores${isFormOpened ? '' : ' formInvi'}`}>
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
                  label={flgTipo === 'I' ? 'Nome, matrícula, CPF ou e-mail' : 'Nome, CPF/CNPJ ou e-mail'}
                  margin="normal"
                  variant="filled"
                  className="iconified"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </div>

              <DmList
                list={usuarios}
                object={usuario}
                getError={getError}
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
                noAction
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            </div>
          </div>
          <Form data={usuario} isFormOpened={isFormOpened} onCancel={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default VinculosUsuarios;
