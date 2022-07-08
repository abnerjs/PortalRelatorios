import 'src/pages/Login/Routes/FirstAccess/Styles/index.css';

import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/store';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';
import { ChangePasswordFromRecoveryRequest } from 'src/store/ducks/usuarios/types';
import { changePasswordFromRecoveryIdle, changePasswordFromRecoveryRequest, changeUsuarioPasswordCancel, changeUsuarioPasswordIdle } from 'src/store/ducks/usuarios';
//import { logout } from 'src/store/ducks/login';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

interface FormInputs {
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
}

const schema = Yup.object({
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
  let query = useQuery();
  const dispatch = useAppDispatch();
  const changeError = useAppSelector((state) => state.usuarios.changePasswordFromRequestError);
  const changeState = useAppSelector((state) => state.usuarios.changePasswordFromRequestState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const defaultValues: ChangePasswordFromRecoveryRequest = {
    desNovaSenha: '',
    desConfirmaNovaSenha: '',
    Authorization: '',
  };

  const { register, handleSubmit, formState } = useForm<ChangePasswordFromRecoveryRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(changePasswordFromRecoveryRequest(data));
    if (changeError) setErrorCollapseOpened(true);
    else {
      dispatch(changePasswordFromRecoveryIdle());
      setErrorCollapseOpened(true);
    }
  };

  /**
   * const onCancel = () => {
    dispatch(changeUsuarioPasswordCancel());
    setErrorCollapseOpened(false);
    dispatch(logout());
  };
   */

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
        Recuperação de senha
      </Typography>
      <DmCollapseHandler
        error={changeError}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
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
      </Box>
    </form>
  );
};

export default FirstAccess;
