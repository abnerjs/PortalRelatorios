import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getInitialsFromString } from 'src/utils/StringUtils';
import Checkbox from './Checkbox';
import './FormUser.css';
import Select from './Select';
import Title from './Title';

const mask = (v: string) => {
  console.log(v);

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
        defaultValue=""
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

type Props = {
  visible: boolean;
  setFormOpened: Function;
  userSelected?: any;
  setUserSelected: Function;
  setNewUserSection?: Function;
  tipoUsuario: string;
  setTipoUsuario: Function;
};

const FormUser = (props: Props) => {
  const [initial, setInitial] = useState('');
  const [selected, setSelected] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  const handleChangeCpfCnpj = (e: any) => {
    const { value } = e.target;

    setCpfCnpj(mask(value));
  };

  return (
    <form
      className={`FormUser${props.visible ? '' : ' invi'}`}
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
            <Icon icon="fluent:person-16-filled" width={120} className="icon" />
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
              inputProps: { tabIndex: props.visible ? 0 : -1 },
            }}
            variant="filled"
          />
          {renderIfTipoUsuario(
            props.tipoUsuario,
            cpfCnpj,
            props.visible,
            handleChangeCpfCnpj
          )}
        </div>
      </div>
      <TextField
        id="cpfInterno"
        fullWidth
        label="CPF"
        onChange={handleChangeCpfCnpj}
        value={props.tipoUsuario === 'interno' ? cpfCnpj : ''}
        autoComplete="none"
        type="text"
        style={{
          display: props.tipoUsuario === 'interno' ? 'block' : 'none',
        }}
        InputProps={{
          disableUnderline: true,
          inputProps: {
            tabIndex: props.visible ? 0 : -1,
            maxLength: 18,
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
          inputProps: { tabIndex: props.visible ? 0 : -1 },
        }}
        variant="filled"
      />
      <Select
        placeholder="Selecione o perfil"
        options={arr}
        selected={selected}
        tabIndex={props.visible ? 0 : -1}
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
        <Checkbox uppercase id="usuarios" content="Cadastro de usuários" />
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
          inputProps: { tabIndex: props.visible ? 0 : -1 },
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
          inputProps: { tabIndex: props.visible ? 0 : -1 },
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
          inputProps: { tabIndex: props.visible ? 0 : -1 },
        }}
        variant="filled"
      />
      <div className="buttons">
        <Button
          tabIndex={props.visible ? 0 : -1}
          variant="contained"
          onClick={() => {
            setSelected('');
            props.setUserSelected(-1);
            props.setFormOpened(false);
          }}
          className="secondary"
        >
          CANCELAR
        </Button>
        <Button
          tabIndex={props.visible ? 0 : -1}
          variant="contained"
          onClick={() => {
            setSelected('');
            props.setUserSelected(-1);
            props.setFormOpened(false);
          }}
        >
          SALVAR
        </Button>
      </div>
    </form>
  );
};

export default FormUser;
