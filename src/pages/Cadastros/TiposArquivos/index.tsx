import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, TextField, Typography } from '@mui/material';

import Header from 'src/components/Header/Header';
import Form from 'src/pages/Cadastros/TiposArquivos/Components/Form';

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
import DmList from 'src/components/DmList/DmList';

const searchInitValues = {
  init: {
    itensPorPagina: 10,
    novaOrdenacao: 'desTpArquivo',
    numPagina: 1,
  },
};

const TiposArquivos = () => {
  const [rowSelected, setRowSelected] = useState(-1);
  const [isFormOpened, setFormOpened] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isNewUserSection, setNewUserSection] = useState(false);

  const [tipoArquivo, setTipoArquivo] = useState<TipoArquivo | null>(null);
  const { pesquisa, handlePesquisa } = usePesquisa({
    ...searchInitValues,
  });

  const dispatch = useAppDispatch();
  const tiposArquivos = useAppSelector((state) => state.tipoArquivo.data);
  const pagination = useAppSelector((state) => state.tipoArquivo.pagination);
  const loading = useAppSelector((state) => state.tipoArquivo.loading);
  const getError = useAppSelector((state) => state.tipoArquivo.error);
  const errors = useAppSelector((state) => state.tipoArquivo.deleteError);
  const deleteState = useAppSelector((state) => state.tipoArquivo.deleteState);
  const operationState = useAppSelector(
    (state) => state.tipoArquivo.operationState
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationState]);

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
              <DmList
                list={tiposArquivos}
                object={tipoArquivo}
                getError={getError}
                errors={errors}
                deleteState={deleteState}
                cancelDelete={tipoArquivoCancelDelete}
                deleteRequest={tipoArquivoDeleteRequest}
                handleFormOpen={handleFormOpen}
                isFormOpened={isFormOpened}
                key="idRelTpArquivo"
                labelKey="desTpArquivo"
                loading={loading}
                request={tipoArquivoGetRequest}
                handlePesquisa={handlePesquisa}
                pesquisa={pesquisa}
                setObject={setTipoArquivo}
                pagination={pagination}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            </div>
          </div>
          <Form data={tipoArquivo} isFormOpened={isFormOpened} />
        </div>
      </div>
    </div>
  );
};

export default TiposArquivos;
