import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header/Header';
import Form from './Components/Form';

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
import DmList from 'src/components/DmList/DmList';

const searchInitValues = {
  init: {
    itensPorPagina: 10,
    novaOrdenacao: 'desPerfil',
    numPagina: 1,
  },
};

const Perfis = () => {
  const objetos = useAppSelector((state) => state.session.objetos);
  const flgAcesso =
    objetos.find((x) => x.nomPagina.toLowerCase() === 'perfis')?.flgAcesso ||
    'N';

  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const { pesquisa, handlePesquisa } = usePesquisa({
    ...searchInitValues,
  });

  const dispatch = useAppDispatch();
  const perfis = useAppSelector((state) => state.perfis.data);
  const pagination = useAppSelector((state) => state.perfis.pagination);
  const loading = useAppSelector((state) => state.perfis.loading);
  const getError = useAppSelector((state) => state.perfis.error);
  const errors = useAppSelector((state) => state.perfis.deleteError);
  const deleteState = useAppSelector((state) => state.perfis.deleteState);
  const operationState = useAppSelector((state) => state.perfis.operationState);

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
      global.window.document.getElementById('Descricaodoperfil')?.focus();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

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
          <div className={`tableContainer${isFormOpened ? '' : ' formInvi'}`}>
            <div
              className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}
            >
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

              <DmList
                list={perfis}
                object={perfil}
                getError={getError}
                errors={errors}
                deleteState={deleteState}
                cancelDelete={perfisCancelDelete}
                deleteRequest={perfisDeleteRequest}
                handleFormOpen={handleFormOpen}
                isFormOpened={isFormOpened}
                key="idRelPerfil"
                labelKey="desPerfil"
                loading={loading}
                request={perfisGetRequest}
                handlePesquisa={handlePesquisa}
                pesquisa={pesquisa}
                setObject={setPerfil}
                pagination={pagination}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            </div>
          </div>
          <Form data={perfil} isFormOpened={isFormOpened} />
        </div>
      </div>
    </div>
  );
};

export default Perfis;
