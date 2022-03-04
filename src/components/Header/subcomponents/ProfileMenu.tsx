import React, { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import './ProfileMenu.css';
import { Icon } from '@iconify/react';
import useOutsideClick from 'src/hooks/useOutsideClick';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { getInitialsFromString } from 'src/utils/StringUtils';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Box } from '@mui/system';
import { ChangeUsuarioPasswordRequest } from 'src/store/ducks/usuarios/types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  changeUsuarioPasswordCancel,
  changeUsuarioPasswordIdle,
  changeUsuarioPasswordRequest,
} from 'src/store/ducks/usuarios';
import DmCollapseHandler from '../../DmCollapseHandler/DmCollapseHandler';
import DmTextField from 'src/components/DmTextField/DmTextField';

interface ProfileMenuProps {
  onLogout?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const schema = Yup.object({
  desLogin: Yup.string()
    .max(200, (params) => `Máximo de ${params.max} caracteres!`)
    .required(`Campo obrigatório!`),
  desSenha: Yup.string()
    .max(128, (params) => `Máximo de ${params.max} caracteres!`)
    .required(`Campo obrigatório!`),
  desNovaSenha: Yup.string()
    .oneOf([Yup.ref('desConfirmaNovaSenha')], 'Senhas devem ser iguais!')
    .max(128, (params) => `Máximo de ${params.max} caracteres!`)
    .min(4, (params) => `Mínimo de ${params.min} caracteres!`)
    .required(`Campo obrigatório!`),
  desConfirmaNovaSenha: Yup.string()
    .oneOf([Yup.ref('desNovaSenha')], 'Senhas devem ser iguais!')
    .max(128, (params) => `Máximo de ${params.max} caracteres!`)
    .min(4, (params) => `Mínimo de ${params.min} caracteres!`)
    .required(`Campo obrigatório!`),
});

interface FormInputs {
  desLogin: string;
  desSenha: string;
  desNovaSenha: string;
  desConfirmaNovaSenha: string;
}

const ProfileMenu = (props: ProfileMenuProps) => {
  const user = useAppSelector((state) => state.session.user);

  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setCollapsed(false);
  });

  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const errors = useAppSelector((state) => state.usuarios.changePasswordError);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const changePasswordState = useAppSelector(
    (state) => state.usuarios.changePasswordState
  );

  const dispatch = useAppDispatch();

  const defaultValues: ChangeUsuarioPasswordRequest = {
    desLogin: '',
    desSenha: '',
    desNovaSenha: '',
    desConfirmaNovaSenha: '',
  };

  const { handleSubmit, reset, control, formState } =
    useForm<ChangeUsuarioPasswordRequest>({
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    });

  const onSubmit: SubmitHandler<FormInputs> = (values) => {
    dispatch(changeUsuarioPasswordRequest(values));

    if (errors) setErrorCollapseOpened(true);
    else {
      dispatch(changeUsuarioPasswordIdle());
    }
  };

  const onCancel = () => {
    dispatch(changeUsuarioPasswordCancel());
    setErrorCollapseOpened(false);
  };

  useEffect(() => {
    if (changePasswordState === 'success') {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
      setTimeout(() => {
        setSuccess(false);
        reset();
      }, 1500);
      setErrorCollapseOpened(false);
      setSuccess(true);
      dispatch(changeUsuarioPasswordIdle());
    } else if (changePasswordState === 'error') {
      setErrorCollapseOpened(true);
      setSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePasswordState]);

  useEffect(() => {
    setErrorCollapseOpened(errors !== undefined);
  }, [errors]);

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <div className="ProfileMenu" ref={ref}>
      <div className="collapseToggle" onClick={() => setCollapsed(!collapsed)}>
        <Avatar
          sx={{ bgcolor: '#1878a1' }}
          children={getInitialsFromString(user?.nomUsuario || '')}
          style={{
            fontSize: '12pt',
            margin: '0 10px 0 0',
            fontWeight: 800,
          }}
        />
        <Icon icon="fluent:chevron-down-20-filled" />
      </div>

      <div className={`menuCollapse${collapsed ? ' active' : ''}`}>
        <div className="item" onClick={handleOpen}>
          <p>ALTERAR SENHA</p>
        </div>
        <div className="item" onClick={props.onLogout}>
          <p>SAIR</p>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          onCancel();
          handleClose();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="profile-modal">
            <Typography variant="h6" component="h2">
              Alterar senha
            </Typography>
            <Avatar
              sx={{
                bgcolor: success ? '#4bb543' : '#1878a1',
                transition: 'all ease 0.2s',
              }}
              children={
                success ? (
                  <span className="success icon"></span>
                ) : (
                  getInitialsFromString(user?.nomUsuario || '')
                )
              }
              style={{
                fontSize: '38pt',
                width: 120,
                height: 120,
                marginTop: 20,
                fontWeight: 800,
              }}
            />
            <Typography className="transition-modal-description">
              {user?.nomUsuario}
            </Typography>

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="form-edit-profile"
            >
              <DmCollapseHandler
                error={errors}
                isErrorCollapseOpened={isErrorCollapseOpened}
                setErrorCollapseOpened={setErrorCollapseOpened}
              />
              {/*
              <Controller
                name="desEmail"
                control={control}
                render={({ field: { ref, value, ...rest }, fieldState }) => (
                  <TextField
                    id="desEmail"
                    fullWidth
                    label="E-mail"
                    placeholder="Ex.: joao@email.com"
                    className="secondary"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      inputProps: {
                        maxLength: 200,
                      },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || 'Opcional'}
                    value={value || ''}
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />
              */}

              <Controller
                name="desLogin"
                control={control}
                render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                  <DmTextField
                    label="Nome de usuário"
                    secondary
                    inputProps={{maxLenght: 200}}
                    error={!!fieldState.error}
                    onChange={(event: any) =>
                      onChange(event.target.value.toLowerCase())
                    }
                    helperText={fieldState.error?.message}
                    ref={ref}
                    rest={rest}
                  />
                )}
              />

              <Controller
                name="desSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <DmTextField
                    label="Senha atual"
                    secondary
                    inputProps={{maxLenght: 128}}
                    error={!!fieldState.error}
                    type="password"
                    helperText={fieldState.error?.message}
                    ref={ref}
                    rest={rest}
                  />
                )}
              />

              <Controller
                name="desNovaSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <DmTextField
                    label="Nova senha"
                    secondary
                    inputProps={{maxLenght: 128}}
                    error={!!fieldState.error}
                    type="password"
                    helperText={fieldState.error?.message}
                    ref={ref}
                    rest={rest}
                  />
                )}
              />

              <Controller
                name="desConfirmaNovaSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <DmTextField
                    label="Confirmar nova senha"
                    secondary
                    inputProps={{maxLenght: 128}}
                    error={!!fieldState.error}
                    type="password"
                    helperText={fieldState.error?.message}
                    ref={ref}
                    rest={rest}
                  />
                )}
              />
              <div className="form-buttons">
              <Button
                  onClick={() => {
                    onCancel();
                    handleClose();
                  }}
                  variant="contained"
                  className="secondary"
                  fullWidth
                >
                  CANCELAR
                </Button>
                <Box sx={{ m: 0, position: 'relative', width: '100%' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={
                      formState.isSubmitting ||
                      changePasswordState === 'request'
                    }
                    type="submit"
                    className={
                      formState.isSubmitting ||
                      changePasswordState === 'request'
                        ? 'secondary'
                        : ''
                    }
                  >
                    SALVAR
                  </Button>
                  {(formState.isSubmitting ||
                    changePasswordState === 'request') && (
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
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProfileMenu;