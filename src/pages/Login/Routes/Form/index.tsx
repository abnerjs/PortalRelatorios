import 'src/pages/Login/Routes/Form/Styles/index.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';

// import Checkbox from 'src/components/Checkbox';
import { useAppDispatch, useAppSelector } from 'src/store';
import { loginRequest } from 'src/store/ducks/login';
import { Box } from '@mui/system';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

interface FormInputs {
  desLogin: string;
  desSenha: string;
}

const schema = Yup.object({
  desLogin: Yup.string().required(),
  desSenha: Yup.string().required(),
});

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.session.error);
  const isLoading = useAppSelector((state) => state.session.loading);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    history.push('/');
    dispatch(loginRequest(data));

    if (loginError) setErrorCollapseOpened(true);
  };

  useEffect(() => {
    if (loginError) setErrorCollapseOpened(true);
  }, [loginError]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="Login form"
    >
      <Typography variant="h5" className="primary">
        Acessar
      </Typography>
      <DmCollapseHandler
        error={loginError}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
      />
      <TextField
        id="desLogin"
        autoFocus
        fullWidth
        label="Nome de usuário"
        color="primary"
        margin="dense"
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
        margin="dense"
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
      <Box sx={{ m: 0, position: 'relative' }}>
        <Button
          variant="contained"
          disabled={formState.isSubmitting || isLoading}
          type="submit"
          className={formState.isSubmitting || isLoading ? 'secondary' : ''}
          style={{ marginTop: 8 }}
        >
          ENTRAR
        </Button>
        {(formState.isSubmitting || isLoading) && (
          <CircularProgress
            size={24}
            sx={{
              color: '#23ACE6',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      <Link className="forgot" to="/recovery">
        Esqueceu a senha?
      </Link>
    </form>
  );
};

export default Login;
