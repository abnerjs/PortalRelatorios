import { Icon } from '@iconify/react';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import Header from 'src/components/Header';
import Select from 'src/components/Select';
import Subtitle from 'src/components/Subtitle';
import Title from 'src/components/Title';
import { getInitialsFromString } from 'src/utils/StringUtils';
import './Usuarios.css';
import './FormUser.css';
import './SectionizedTable.css';
import CRUDButton from 'src/components/CRUDButton';
import jsonFile from 'src/testing/fakeData/users.json';

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
  setOpen: Function,
  setUsuarioSelecionado: Function,
  lstUsuarios: Array<Usuario>
) {
  let arr: any[] = [];

  lstUsuarios.map((user, index) => {
    arr.push(
      <div
        className={`row${indexSelected === index ? ' selected' : ''}`}
        onClick={() => {
          if (indexSelected !== index) setIndexSelected(index);
          if (indexSelected !== index) setUsuarioSelecionado(user);
        }}
      >
        <div className="header">
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
          <div className="email">{user.desEmail}</div>
          <Icon
            icon="fluent:chevron-right-16-filled"
            width={16}
            className="icon"
          />
        </div>
        <div className="buttons">
          <Button
            tabIndex={indexSelected === index ? 0 : -1}
            variant="contained"
            onClick={() => {
              setFormOpened(true);
            }}
          >
            ALTERAR
          </Button>
          <Button
            tabIndex={indexSelected === index ? 0 : -1}
            variant="contained"
            className="errorColor"
            onClick={() => setOpen(true)}
          >
            DELETAR
          </Button>
        </div>
      </div>
    );
  });

  return arr;
}

const mask = (v: string) => {
  v = v.replace(/\D/g, '');

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  }

  return v;
};

const maskCpf = (v: string) => {
  v = v.replace(/\D/g, '');

  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return v;
};

const renderIfTipoUsuario = (
  tipoUsuario: string,
  cpfCnpj: string,
  visible: boolean,
  handleChangeCpfCnpj: any
) => {
  if (tipoUsuario === 'interno') {
    return (
      <TextField
        id="matricula"
        autoComplete="none"
        fullWidth
        color="primary"
        label="Matrícula"
        InputProps={{
          disableUnderline: true,
          inputProps: {
            tabIndex: visible ? 0 : -1,
          },
        }}
        variant="filled"
      />
    );
  } else {
    return (
      <TextField
        id="cpfCnpjExterno"
        autoComplete="none"
        fullWidth
        color="primary"
        value={cpfCnpj}
        label={'CPF/CNPJ'}
        onChange={handleChangeCpfCnpj}
        InputProps={{
          disableUnderline: true,
          inputProps: {
            tabIndex: visible ? 0 : -1,
            maxLength: 18,
          },
        }}
        variant="filled"
      />
    );
  }
};

const Usuarios = () => {
  const [isFormOpened, setFormOpened] = useState(false);
  const [userSelected, setUserSelected] = useState(-1);
  const [newUserSection, setNewUserSection] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('interno');
  const [initial, setInitial] = useState('');
  const [selected, setSelected] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario>();

  const handleOpenForm = (value: boolean) => {
    setFormOpened(value);
    setTimeout(() => {
      document.getElementById('nome')?.focus();
    }, 301);
  };

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  const handleChangeCpfCnpj = (e: any) => {
    const { value } = e.target;

    setCpfCnpj(mask(value));
  };

  const handleChangeCpf = (e: any) => {
    const { value } = e.target;

    setCpf(maskCpf(value));
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Subtitle content="Todos os usuários no sistema" />
        </div>

        <div className="row">
          <div className={`SectionizedTable${isFormOpened ? '' : ' formInvi'}`}>
            <div className={`tabs${isFormOpened ? '' : ' middle'}`}>
              <div
                className={`option${
                  tipoUsuario === 'interno' ? ' active' : ''
                }`}
                onClick={() => {
                  setTipoUsuario('interno');
                }}
              >
                INTERNO
              </div>
              <div
                className={`option${
                  tipoUsuario === 'externo' ? ' active' : ''
                }`}
                onClick={() => {
                  setTipoUsuario('externo');
                }}
              >
                EXTERNO
              </div>
              <div
                className={`selector${
                  tipoUsuario === 'externo' ? ' active' : ''
                }`}
              ></div>
            </div>
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
            <CRUDButton
              newUserSection={newUserSection}
              setNewUserSection={setNewUserSection}
              setFormOpened={handleOpenForm}
              isFormOpened={isFormOpened}
              content="novo usuário"
            />
            <div className="rows">
              {rows(
                searchText,
                setFormOpened,
                userSelected,
                setUserSelected,
                setOpen,
                setUsuarioSelecionado,
                jsonFile
              )}
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box className="modal-confirm-delete">
                  <Typography id="transition-modal-title">
                    Tem certeza que quer deletar o usuário?
                  </Typography>
                  <Avatar
                    sx={{ bgcolor: '#1878a1' }}
                    children={getInitialsFromString(
                      usuarioSelecionado?.desNome || ''
                    )}
                    style={{
                      width: '80px',
                      height: '80px',
                      fontWeight: 400,
                      fontSize: '26pt',
                      marginBottom: '20px',
                    }}
                  />
                  <div className="userInfo">
                    <Typography className="modal-user-info">
                      {usuarioSelecionado?.desNome}
                    </Typography>
                    <Typography className="modal-user-info">
                      {usuarioSelecionado?.codColaborador}
                    </Typography>
                    <Typography className="modal-user-info">
                      {usuarioSelecionado?.desEmail}
                    </Typography>
                  </div>
                  <hr
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      width: '100%',
                      height: 1,
                      border: 'none',
                    }}
                  />
                  <div className="buttons">
                    <Button
                      variant="contained"
                      onClick={() => setOpen(false)}
                      className="secondary"
                    >
                      CANCELAR
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setOpen(false)}
                      className="errorColor"
                    >
                      DELETAR
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
          <form
            className={`FormUser${isFormOpened ? '' : ' invi'}`}
            onSubmit={handleSubmit}
          >
            <div className="sectionImage">
              <div className="image">
                <div className="text"></div>
                <div className="img">
                  {/*
                            <div
                                className="picture"
                                style={{
                                    backgroundImage:
                                        "url(https://picsum.photos/200)",
                                }}
                            ></div>
                        */}
                  <div className={`initial${initial !== '' ? ' active' : ''}`}>
                    {initial}
                  </div>
                  <Icon
                    icon="fluent:person-16-filled"
                    width={120}
                    className="icon"
                  />
                </div>
              </div>
              <div className="inputs">
                <TextField
                  id="nome"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setInitial(getInitialsFromString(event.target.value))
                  }
                  autoComplete="none"
                  fullWidth
                  color="primary"
                  label="Nome"
                  InputProps={{
                    disableUnderline: true,
                    inputProps: { tabIndex: isFormOpened ? 0 : -1 },
                  }}
                  variant="filled"
                />
                {renderIfTipoUsuario(
                  tipoUsuario,
                  cpfCnpj,
                  isFormOpened,
                  handleChangeCpfCnpj
                )}
              </div>
            </div>
            <TextField
              id="cpfInterno"
              fullWidth
              label="CPF"
              onChange={handleChangeCpf}
              value={tipoUsuario === 'interno' ? cpf : ''}
              autoComplete="none"
              type="text"
              style={{
                display: tipoUsuario === 'interno' ? 'block' : 'none',
              }}
              InputProps={{
                disableUnderline: true,
                inputProps: {
                  tabIndex: isFormOpened ? 0 : -1,
                  maxLength: 14,
                },
              }}
              variant="filled"
            />
            <TextField
              id="email"
              fullWidth
              color="primary"
              label="E-mail"
              autoComplete="none"
              type="email"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
            <Select
              placeholder="Selecione o perfil"
              options={arr}
              selected={selected}
              tabIndex={isFormOpened ? 0 : -1}
              setSelected={setSelected}
            >
              <TextField
                id="perfil"
                fullWidth
                color="primary"
                className="secondary"
                label="Descrição do perfil"
                InputProps={{
                  disableUnderline: true,
                  inputProps: { tabIndex: -1 },
                  style: { marginTop: '20px' },
                }}
                InputLabelProps={{
                  style: { marginTop: '20px' },
                }}
                variant="filled"
              />
              <Checkbox
                uppercase
                id="usuarios"
                content="Cadastro de usuários"
              />
              <Checkbox uppercase id="logs" content="Acesso aos logs" />
              <Checkbox uppercase id="arquivos" content="Upload de arquivos" />
              <Title width={18} content="Tipos de arquivos" />
            </Select>
            <TextField
              id="login"
              fullWidth
              color="primary"
              label="Nome de usuário"
              autoComplete="none"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
            <TextField
              id="senha"
              fullWidth
              color="primary"
              label="Senha"
              type="password"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
            <TextField
              id="r-senha"
              fullWidth
              color="primary"
              label="Repita a senha"
              type="password"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
            <div className="buttons">
              <Button
                tabIndex={isFormOpened ? 0 : -1}
                variant="contained"
                onClick={() => {
                  setSelected('');
                  setUserSelected(-1);
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
                  setSelected('');
                  setUserSelected(-1);
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

export default Usuarios;
