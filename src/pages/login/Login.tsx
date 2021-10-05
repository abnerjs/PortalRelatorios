import React from 'react';
import './Login.css';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const Login: React.FC = (props: any) => {
  return (
    <form className="form Login" action="">
      <Title content="Acessar" primaryColor />
      <TextField
        autoFocus
        id="login"
        fullWidth
        color="primary"
        label="Nome de usuário"
        className="secondary"
        InputProps={{
          disableUnderline: true,
        }}
        variant="filled"
      />
      <TextField
        autoFocus
        id="senha"
        fullWidth
        color="primary"
        label="Senha"
        type="password"
        className="secondary"
        InputProps={{
          disableUnderline: true,
        }}
        variant="filled"
      />
      <Checkbox flexEnd medium id="checkbox" content="Manter conectado" />
      <Button content="ENTRAR" />
      <Link className="forgot" to="/recovery">
        Esqueceu a senha?
      </Link>
    </form>
  );
};

export default Login;
