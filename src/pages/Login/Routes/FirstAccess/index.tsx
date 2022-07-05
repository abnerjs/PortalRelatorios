import 'src/pages/Login/Routes/FirstAccess/Styles/index.css';

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/store';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';
import { ChangeUsuarioPasswordRequest } from 'src/store/ducks/usuarios/types';
import { changeUsuarioPasswordCancel, changeUsuarioPasswordIdle, changeUsuarioPasswordRequest } from 'src/store/ducks/usuarios';
import { logout } from 'src/store/ducks/login';

interface FormInputs {
  desSenha: string;
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
}

const schema = Yup.object({
  desSenha: Yup.string()
    .required(`Campo obrigatório!`),
  desNovaSenha: Yup.string()
    .required(`Campo obrigatório!`)
    .max(32, (params) => `Máximo de ${params.max} caracteres!`)
    .min(8, (params) => `Mínimo de ${params.min} caracteres!`),
  desConfirmaNovaSenha: Yup.string()
    .required(`Campo obrigatório!`)
    .max(32, (params) => `Máximo de ${params.max} caracteres!`)
    .min(8, (params) => `Mínimo de ${params.min} caracteres!`)
    .oneOf([Yup.ref('desNovaSenha')], 'Senhas devem ser iguais!'),
});

const FirstAccess: React.FC = (props: any) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const changeError = useAppSelector((state) => state.usuarios.changePasswordError);
  const changeState = useAppSelector((state) => state.usuarios.changePasswordState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const defaultValues: ChangeUsuarioPasswordRequest = {
    desSenha: '',
    desNovaSenha: '',
    desConfirmaNovaSenha: '',
  };

  const { register, handleSubmit, formState } = useForm<ChangeUsuarioPasswordRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(changeUsuarioPasswordRequest(data));

    if (changeError) setErrorCollapseOpened(true);
    else {
      dispatch(changeUsuarioPasswordIdle());
    }
  };

  const onCancel = () => {
    dispatch(changeUsuarioPasswordCancel());
    setErrorCollapseOpened(false);
    dispatch(logout());
  };

  useEffect(() => {
    if (changeError) setErrorCollapseOpened(true);
  }, [changeError]);

  useEffect(() => {
    if (changeState === 'success') {
      setErrorCollapseOpened(false);

      // dispatch(logout()); //after a while
    }
  }, [changeState]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form FirstAccess">
      <Typography variant="h5" className="primary">
        Renovação de senha
      </Typography>
      <DmCollapseHandler
        error={changeError}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
      />
      <TextField
        id="desSenha"
        fullWidth
        autoFocus
        label="Senha atual"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary DmTextField"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: {
            paddingLeft: '20px !important',
          },
        }}
        error={!!formState.errors.desSenha}
        helperText={formState.errors.desSenha?.message}
        {...register('desSenha')}
      />
      <TextField
        id="desNovaSenha"
        fullWidth
        label="Nova senha"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary DmTextField"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: {
            paddingLeft: '20px !important',
          },
        }}
        error={!!formState.errors.desNovaSenha}
        helperText={formState.errors.desNovaSenha?.message}
        {...register('desNovaSenha')}
      />
      <TextField
        id="desConfirmaNovaSenha"
        fullWidth
        label="Confirmar nova senha"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary DmTextField"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          style: {
            paddingLeft: '20px !important',
          },
        }}
        error={!!formState.errors.desConfirmaNovaSenha}
        helperText={formState.errors.desConfirmaNovaSenha?.message}
        {...register('desConfirmaNovaSenha')}
      />

      <Box sx={{ m: 0, mt: 1, position: 'relative' }}>
        <Box sx={{ m: 0, position: 'relative', width: '100%' }}>
          <Button type="submit" variant="contained" fullWidth
            disabled={formState.isSubmitting || changeState === 'request'}
            className={formState.isSubmitting || changeState === 'request' ? 'secondary' : ''}
          >
            SALVAR
          </Button>
          {(formState.isSubmitting || changeState === 'request') && (
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
          <Button variant="contained" className="secondary" style={{ marginTop: 8 }} fullWidth
            onClick={() => {
              onCancel();
            }
            }>
            CANCELAR
          </Button>
        </Link>
      </Box>
    </form>
  );
};

export default FirstAccess;
