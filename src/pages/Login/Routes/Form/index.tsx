import 'src/pages/Login/Routes/Form/Styles/index.css';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';

import Title from 'src/components/Title';
import Button from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import { useAppDispatch } from 'src/store';
import { loginRequest } from 'src/store/ducks/login';

interface FormInputs {
  desLogin: string;
  desSenha: string;
}

const schema = Yup.object({
  desLogin: Yup.string().required(),
  desSenha: Yup.string().required(),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <form
      className="Login form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Title content="Acessar" primaryColor />
      <TextField
        id="desLogin"
        autoFocus
        fullWidth
        label="Nome de usuário"
        color="primary"
        variant="filled"
        className="secondary"
        InputProps={{
          disableUnderline: true,
        }}
        error={!!formState.errors.desLogin}
        {...register('desLogin')}
      />
      <TextField
        id="desSenha"
        fullWidth
        label="Senha"
        color="primary"
        variant="filled"
        className="secondary"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
        error={!!formState.errors.desSenha}
        {...register('desSenha')}
      />
      {/* <Checkbox flexEnd medium id="checkbox" content="Manter conectado" /> */}
      <Button content="ENTRAR" />
      {/*
        <Link className="forgot" to="/recovery">
          Esqueceu a senha?
        </Link> 
      */}
    </form>
  );
};

export default Login;
