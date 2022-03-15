import 'src/pages/Login/Routes/Recovery/Styles/index.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'src/store';
import { recoveryRequest, reset } from 'src/store/ducks/login';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

interface FormInputs {
  desLogin: string;
  desEmail: string;
}

const schema = Yup.object({
  desLogin: Yup.string().required('Campo obrigatório'),
  desEmail: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
});

const Recovery: React.FC = () => {
  const dispatch = useAppDispatch();
  const recoveryError = useAppSelector((state) => state.session.error);
  const operationState = useAppSelector(
    (state) => state.session.operationState
  );
  const [isAllertCollapseOpened, setAlertCollapseOpened] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(recoveryRequest(data));
  };

  useEffect(() => {
    const open = operationState === 'success' || operationState === 'error';
    setAlertCollapseOpened(open);
  }, [operationState, dispatch]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="form"
    >
      <Typography variant="h5" className="primary">
        Recuperação de senha
      </Typography>
      <div className="recoveryinfo">
        <p>
          Preencha o formulário a seguir para recuperar a sua senha de acesso
        </p>
      </div>
      <DmCollapseHandler
        error={recoveryError}
        isErrorCollapseOpened={isAllertCollapseOpened}
        setErrorCollapseOpened={setAlertCollapseOpened}
      />
      <TextField
        id="desLogin"
        autoFocus
        fullWidth
        label="Nome de usuário"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary DmTextField"
        InputProps={{
          disableUnderline: true,
          readOnly: operationState === 'success',
        }}
        error={!!formState.errors.desLogin}
        helperText={formState.errors.desLogin?.message}
        {...register('desLogin')}
      />
      <TextField
        id="desEmail"
        fullWidth
        label="E-mail"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary DmTextField"
        InputProps={{
          disableUnderline: true,
          readOnly: operationState === 'success',
        }}
        error={!!formState.errors.desEmail}
        helperText={formState.errors.desEmail?.message}
        {...register('desEmail')}
      />
      <Box sx={{ m: 0, position: 'relative', marginTop: '48px' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={formState.isSubmitting || operationState === 'request'}
          className={
            formState.isSubmitting || operationState === 'request'
              ? 'secondary'
              : ''
          }
          style={{ display: operationState !== 'success' ? 'block' : 'none' }}
          fullWidth
        >
          ENVIAR
        </Button>
        {(formState.isSubmitting || operationState === 'request') && (
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          className={operationState !== 'success' ? 'secondary' : ''}
          style={{ marginTop: 8 }}
          fullWidth
        >
          {operationState !== 'success' ? 'CANCELAR' : 'VOLTAR'}
        </Button>
      </Link>
      <h4 className="hint">
        Caso não tenha acesso a essas informações, entre em contato com um
        administrador do sistema.
      </h4>
    </form>
  );
};

export default Recovery;
