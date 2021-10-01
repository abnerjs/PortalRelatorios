import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import Checkbox from './Checkbox';
import './FormUser.css';
import Select from './Select';
import Title from './Title';

type Props = {
  visible: boolean;
  setFormOpened: Function;
  userSelected?: any;
  setUserSelected: Function;
  setNewUserSection?: Function;
};

const FormUser = (props: Props) => {
  const [initial, setInitial] = useState('');
  const [selected, setSelected] = useState('');

  const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
    var arr: string[];
    arr = event.target.value.trim().split(' ');
    var aux: string = '';
    aux += arr[0].charAt(0);

    if (arr.length > 1) aux += arr[arr.length - 1].charAt(0);
    setInitial(aux);
  };

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  function handleSubmit(e: any) {
    e.preventDefault();
  }

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
            onChange={handleChangeNome}
            fullWidth
            color="primary"
            label="Nome"
            InputProps={{
              disableUnderline: true,
              inputProps: { tabIndex: props.visible ? 0 : -1 },
            }}
            variant="filled"
          />
          <TextField
            id="matricula"
            fullWidth
            color="primary"
            label="Matrícula"
            InputProps={{
              disableUnderline: true,
              inputProps: { tabIndex: props.visible ? 0 : -1 },
            }}
            variant="filled"
          />
        </div>
      </div>
      <TextField
        id="email"
        fullWidth
        color="primary"
        label="E-mail"
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
        id="senha"
        fullWidth
        color="primary"
        label="Nome de usuário"
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
        >
          SALVAR
        </Button>
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
      </div>
    </form>
  );
};

export default FormUser;
