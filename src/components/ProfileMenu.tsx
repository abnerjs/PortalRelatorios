import React, { useRef, useState } from 'react';
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
import { loginRequest } from 'src/store/ducks/login';
import { Usuario } from 'src/store/ducks/usuarios/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { usuariosCancelOperation } from 'src/store/ducks/usuarios';

interface ProfileMenuProps {
  onLogout?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const schema = Yup.object({
  idRelPerfil: Yup.number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .moreThan(0, 'Campo obrigatório!'),
  desEmail: Yup.string()
    .email('O e-mail fornecido não é válido')
    .nullable()
    .default(null)
    .max(200, (params) => `Máximo de ${params.max} caracteres!`)
    .notRequired(),
  desLogin: Yup.string()
    .max(200, (params) => `Máximo de ${params.max} caracteres!`)
    .required(`Campo obrigatório!`),
  desSenha: Yup.string()
    .max(128, (params) => `Máximo de ${params.max} caracteres!`)
    .required(`Campo obrigatório!`),
});

interface FormInputs {
  desLogin: string;
  desSenha: string;
}

const ProfileMenu = (props: ProfileMenuProps) => {
  const user = useAppSelector((state) => state.session.user);

  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setCollapsed(false);
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loginError = useAppSelector((state) => state.session.error);
  const isLoading = useAppSelector((state) => state.session.loading);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);
  const errors = useAppSelector((state) => state.usuarios.operationError);
  const operationState = useAppSelector(
    (state) => state.usuarios.operationState
  );

  const dispatch = useAppDispatch();

  const onCancel = () => {
    dispatch(usuariosCancelOperation());
    setErrorCollapseOpened(false);
  };

  const defaultValues: Usuario = {
    idRelUsuario: 0,
    idRelPerfil: 0,
    desNome: '',
    desEmail: '',
    desLogin: user ? user.desLogin : '',
    desSenha: '',
    desCpfCnpj: '',
    codColaborador: '',
    flgTipo: 'I',
    flgAtivo: 'S',
  };

  const {
    clearErrors,
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState,
  } = useForm<Usuario>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    dispatch(loginRequest(data));

    if (loginError) setErrorCollapseOpened(true);
  };

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
          <p>EDITAR PERFIL</p>
        </div>
        <div className="item" onClick={props.onLogout}>
          <p>SAIR</p>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="profile-modal">
            <Typography variant="h6" component="h2">
              Editar perfil
            </Typography>
            <Avatar
              sx={{ bgcolor: '#1878a1' }}
              children={getInitialsFromString(user?.nomUsuario || '')}
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

              <Controller
                name="desLogin"
                control={control}
                render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                  <TextField
                    id="desLogin"
                    fullWidth
                    label="Nome de usuário"
                    placeholder="Ex.: joao_silva"
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
                    helperText={fieldState.error?.message}
                    onChange={(event) =>
                      onChange(event.target.value.toLowerCase())
                    }
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />

              <Controller
                name="desSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <TextField
                    id="desSenha"
                    fullWidth
                    label="Senha atual"
                    type="password"
                    className="secondary"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      inputProps: {
                        maxLength: 128,
                      },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />

              <Controller
                name="desSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <TextField
                    id="desSenha"
                    fullWidth
                    label="Nova senha"
                    type="password"
                    className="secondary"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      inputProps: {
                        maxLength: 128,
                      },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />

              <Controller
                name="desSenha"
                control={control}
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <TextField
                    id="desSenha"
                    fullWidth
                    label="Confirmar nova senha"
                    type="password"
                    className="secondary"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      disableUnderline: true,
                      inputProps: {
                        maxLength: 128,
                      },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    inputRef={ref}
                    {...rest}
                  />
                )}
              />
              <Stack direction="row" sx={{mt: 1}}>
                <Button
                  onClick={() => {
                    onCancel();
                  }}
                  variant="contained"
                  className="secondary"
                  fullWidth
                >
                  CANCELAR
                </Button>
                <Box sx={{ mx: '6px' }} />
                <Box sx={{ m: 0, position: 'relative', width: "100%" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={
                      formState.isSubmitting || operationState === 'request'
                    }
                    type="submit"
                    className={
                      formState.isSubmitting || operationState === 'request'
                        ? 'secondary'
                        : ''
                    }
                  >
                    SALVAR
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
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProfileMenu;
