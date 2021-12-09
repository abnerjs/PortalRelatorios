import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Alert, AlertColor, Collapse, IconButton, Skeleton, Tab, Tabs, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header';
import { usePesquisa } from 'src/hooks/usePesquisa';
import Form from 'src/pages/Cadastros/VinculosUsuarios/Components/Form';
import Row from 'src/pages/Cadastros/VinculosUsuarios/Components/Row';
import { useAppDispatch, useAppSelector } from 'src/store';
import { usuariosCleanError, usuariosGetRequest } from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

const VinculosUsuarios = () => {
  const [flgTipo, setFlgTipo] = useState('I');
  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { pesquisa, handlePesquisa, handleCustomParameters } = usePesquisa({
    params: [{ key: 'flgTipo', value: 'I' }],
  });

  const dispatch = useAppDispatch();
  const usuarios = useAppSelector((state) => state.usuarios.data);
  const loading = useAppSelector((state) => state.usuarios.loading);
  const getError = useAppSelector((state) => state.usuarios.error);
  const ufOperationState = useAppSelector(
    (state) => state.usuariosFornecedores.operationState
  );
  const [isGetErrorCollapseOpened, setGetErrorCollapseOpened] = useState(false);

  useEffect(() => {
    dispatch(usuariosCleanError());
  }, []);

  const handleChangeFlgTipo = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFlgTipo(newValue);
    handleCustomParameters({ key: 'flgTipo', value: newValue });

    if(rowSelected !== -1) {
      setFormOpened(false);
      setUsuario(null);
      setRowSelected(-1);
    }
  };

  const handleIndexSelected = (value: number) => {
    setUsuario(value !== -1 ? usuarios[value] : null);
    setFormOpened(value !== -1 ? true : false);
    setRowSelected(value);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePesquisa('filtroPadrao', event.target.value);
  };

  

  useEffect(() => {
    if (ufOperationState === 'success') {
      setUsuario(null);
      setRowSelected(-1);
      setFormOpened(false);

      dispatch(usuariosGetRequest(pesquisa.toString()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Header title="Vínculo de Usuários" />
          <Typography variant="subtitle1">
            Usuários do sistema e seus vínculos
          </Typography>
        </div>
        <div className="row">
          <div
            className={`SectionizedTable fornprestadores${
              isFormOpened ? '' : ' formInvi'
            }`}
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
            <DmCollapseHandler
              error={getError}
              isErrorCollapseOpened={isGetErrorCollapseOpened}
              setErrorCollapseOpened={setGetErrorCollapseOpened}
            />
            <div
              className="rows forprestadores"
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
                      handleIndexSelected={handleIndexSelected}
                    />
                  ))}
            </div>
          </div>
          <Form
            data={usuario}
            isFormOpened={isFormOpened}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default VinculosUsuarios;

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
        </div>
      </div>
    );
  }

  return arr;
};
