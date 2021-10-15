import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Avatar,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Header from 'src/components/Header';
import { getInitialsFromString } from 'src/utils/StringUtils';
import './Usuarios.css';
import './FormUser.css';
import './SectionizedTable.css';
import jsonFile from 'src/testing/fakeData/users.json';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';

interface Usuario {
  idRelUsuario: number;
  idRelPerfil: number;
  desNome: string;
  desEmail: string;
  desLogin: string;
  desSenha: string;
  desCpfCnpj: string;
  codColaborador: string;
  flgTipo: string;
  flgAtivo: string;
}

function rows(
  searchText: string,
  setFormOpened: Function,
  indexSelected: number,
  setIndexSelected: Function,
  setUsuarioSelecionado: Function,
  lstUsuarios: Array<Usuario>
) {
  let arr: any[] = [];

  lstUsuarios.forEach((user, index) => {
    arr.push(
      <div
        className={`row forprestadores${
          indexSelected === index ? ' selected' : ''
        }`}
      >
        <div
          className="header"
          onClick={() => {
            if (indexSelected !== index) {
              setIndexSelected(index);
              setUsuarioSelecionado(user);
              setFormOpened(true);
            } else {
              setIndexSelected(-1);
              setFormOpened(false);
            }
          }}
        >
          <Avatar
            sx={{ bgcolor: '#1878a1' }}
            children={getInitialsFromString(user.desNome)}
            style={{
              width: '33px',
              height: '33px',
              margin: '0 10px 0 0',
              fontWeight: 400,
              fontSize: '12pt',
            }}
          />
          <div className="nome">{user.desNome}</div>
          <div className="matricula">{user.codColaborador}</div>

          <DmIconifiedSwitch
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  });

  return arr;
}

const Atrelamento = () => {
  const [isFormOpened, setFormOpened] = useState(false);
  const [rowSelected, setRowSelected] = useState(-1);
  const [tipoUsuario, setTipoUsuario] = useState('interno');
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario>();

  const [tabsForm, setTabsForm] = React.useState('forn');

  const handleChangeFormTabsFornecedoresPrestadores = (event: React.SyntheticEvent, newValue: string) => {
    setTabsForm(newValue);
  };

  const handleChangeInternoExterno = (event: React.SyntheticEvent, newValue: string) => {
    setTipoUsuario(newValue);
  };

  const handleOpenForm = (value: boolean) => {
    setFormOpened(value);
    setTimeout(() => {
      document.getElementById('nome')?.focus();
    }, 400);
  };

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários x Fornecedores/Prestadores" />
          <Typography variant="subtitle1">
            Todos os usuários do sistema
          </Typography>
        </div>

        <div className="row">
          <div
            className={`SectionizedTable fornprestadores${
              isFormOpened ? '' : ' formInvi'
            }`}
          >
            <Tabs
              className={`tabs${isFormOpened ? '' : ' middle'}`}
              value={tipoUsuario}
              onChange={handleChangeInternoExterno}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="interno" label="interno" />
              <Tab disableRipple value="externo" label="externo" />
            </Tabs>
            <div className="search">
              <Icon
                icon="fluent:search-12-regular"
                width={25}
                className={`icon${focused ? ' active' : ''}`}
              />
              <TextField
                id="searchbar"
                autoComplete="none"
                onChange={handleChangeSearch}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                fullWidth
                className="iconified"
                color="primary"
                label={
                  tipoUsuario === 'interno'
                    ? 'Nome, matrícula ou e-mail'
                    : 'Nome, CPF, CPNJ ou e-mail'
                }
                InputProps={{
                  disableUnderline: true,
                }}
                variant="filled"
                margin="normal"
              />
            </div>
            <div className="rows forprestadores">
              {rows(
                searchText,
                handleOpenForm,
                rowSelected,
                setRowSelected,
                setUsuarioSelecionado,
                jsonFile
              )}
            </div>
          </div>

          <form
            className={`FormUser flexGrow${isFormOpened ? '' : ' invi'}`}
            onSubmit={handleSubmit}
          >
            <Tabs
              value={tabsForm}
              onChange={handleChangeFormTabsFornecedoresPrestadores}
              aria-label="Form section controller"
            >
              <Tab disableRipple value="forn" label="Fornecedores" />
              <Tab disableRipple value="prest" label="Prestadores" />
            </Tabs>

            <Autocomplete
              multiple
              open={true}
              disableListWrap={true}
              disablePortal
              fullWidth
              clearOnBlur
              selectOnFocus
              handleHomeEndKeys
              disableCloseOnSelect
              limitTags={1}
              options={arr}
              filterSelectedOptions
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Fornecedores"
                  variant="filled"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
            />

            <div className="buttons">
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setRowSelected(-1);
                  setFormOpened(false);
                }}
                className="secondary"
              >
                CANCELAR
              </Button>
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setRowSelected(-1);
                  setFormOpened(false);
                }}
              >
                SALVAR
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Atrelamento;