import React, { useEffect, useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  debounce,
  TextField,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { perfisGetFilterRequest } from 'src/store/ducks/perfis';
import {
  usuariosCancelOperation,
  usuariosPostRequest,
  usuariosPutRequest,
} from 'src/store/ducks/usuarios';
import { Usuario } from 'src/store/ducks/usuarios/types';
import { getInitialsFromString } from 'src/utils/StringUtils';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';
import DmTextField from 'src/components/DmTextField/DmTextField';

const maskCpfCnpj = (value: string) => {
  value = value.replace(/\D/g, '');

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  }

  return value;
};

interface FormProps {
  data: Usuario | null;
  tipoUsuario: string;
  isFormOpened: boolean;
}

const schema = Yup.object({
  idRelUsuario: Yup.number().notRequired(),
  idRelPerfil: Yup.number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .moreThan(0, 'Campo obrigatório!'),
  desNome: Yup.string()
    .max(100, (params) => `Máximo de ${params.max} caracteres!`)
    .required('Campo obrigatório!'),
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
    .min(4, (params) => `Mínimo de ${params.min} caracteres!`)
    .required(`Campo obrigatório!`),
  desCpfCnpj: Yup.string()
    .nullable()
    .default(null)
    .transform((value) => value || null)
    .test({
      message: 'O campo deve conter 14 ou 18 caracteres!',
      test: (value) =>
        value?.length === 14 || value?.length === 18 || value === null,
    })
    .when('flgTipo', {
      is: (value: string) => value === 'I',
      then: Yup.string()
        .nullable()
        .default(null)
        .length(
          14,
          (params) => `O campo deve conter ${params.length} caracteres!`
        ),
    })
    .notRequired(),
  codColaborador: Yup.string()
    .nullable()
    .default(null)
    .max(10, (params) => `Máximo de ${params.max} caracteres!`)
    .notRequired(),
  flgTipo: Yup.string().required('Campo obrigatório!'),
  flgAtivo: Yup.string().required('Campo obrigatório!'),
});

const defaultValues: Usuario = {
  idRelUsuario: 0,
  idRelPerfil: 0,
  desNome: '',
  desEmail: '',
  desLogin: '',
  desSenha: '',
  desCpfCnpj: '',
  codColaborador: '',
  flgTipo: 'I',
  flgAtivo: 'S',
};

const Form: React.FC<FormProps> = ({
  data,
  tipoUsuario,
  isFormOpened,
}: FormProps) => {
  const [initials, setInitials] = useState('');
  const [flgTipo, setFlgTipo] = useState('I');
  const [perfil, setPerfil] = useState<TipoFiltro | null>(null);
  const [focusPerfil, setFocusPerfil] = useState(false);

  const dispatch = useAppDispatch();
  const perfis = useAppSelector((state) => state.perfis.filterList);
  const errors = useAppSelector((state) => state.usuarios.operationError);
  const operationState = useAppSelector(
    (state) => state.usuarios.operationState
  );
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

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

  const handleInitials = debounce((value: string) => {
    setInitials(getInitialsFromString(value));
  }, 400);

  const onSubmit: SubmitHandler<Usuario> = (values) => {
    dispatch(
      data && data.idRelUsuario > 0
        ? usuariosPutRequest(values)
        : usuariosPostRequest(values)
    );
    if (errors !== undefined) setErrorCollapseOpened(true);
  };

  const onCancel = () => {
    dispatch(usuariosCancelOperation());
    setErrorCollapseOpened(false);
  };

  useEffect(() => {
    setErrorCollapseOpened(errors !== undefined);
  }, [errors]);

  useEffect(() => {
    dispatch(perfisGetFilterRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      setFlgTipo(tipoUsuario);
      setValue('codColaborador', '');
      setValue('flgTipo', tipoUsuario);
      clearErrors();
    } else {
      setFlgTipo(tipoUsuario);
      setValue('flgTipo', tipoUsuario);
    }
  }, [data, tipoUsuario, clearErrors, setValue]);

  useEffect(() => {
    const newValue = data ?? defaultValues;
    const novoPerfil =
      perfis.find((item) => item.codigo === `${newValue.idRelPerfil}`) || null;

    setPerfil(novoPerfil);
    setInitials(getInitialsFromString(newValue.desNome));

    reset(newValue);
  }, [data, perfis, reset]);

  useEffect(() => {
    if (!isFormOpened) {
      reset();
      setValue('flgTipo', flgTipo);

      setPerfil(null);
      setInitials('');
    }
  }, [isFormOpened, flgTipo, setValue, reset]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={`FormUser${isFormOpened ? '' : ' invi'}`}
    >
      <div className="formFields">
      <DmCollapseHandler
        error={errors}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
      />
      <div className="sectionImage">
        <div className="image">
          <div className="text"></div>
          <div className="img">
            <div className={`initial${initials !== '' ? ' active' : ''}`}>
              {initials}
            </div>
            <Icon icon="fluent:person-16-filled" width={120} className="icon" />
          </div>
        </div>
        <div className="inputs">
          <input type="hidden" {...register('idRelUsuario')} />
          <Controller
            name="desNome"
            control={control}
            render={({ field: { ref, onChange, ...rest }, fieldState }) => (
              <DmTextField
                label="Nome completo"
                tabIndex={isFormOpened ? 0 : -1}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                ref={ref}
                rest={rest}
                onChange={(event: any) => {
                  onChange(event);
                  handleInitials(event.target.value);
                }}
                inputProps={{
                  maxLength: 100,
                }}
              />
            )}
          />
          <Controller
            name="desCpfCnpj"
            control={control}
            render={({
              field: { value, ref, onChange, ...rest },
              fieldState,
            }) => (
              <DmTextField
                label={flgTipo === 'E' ? 'CPF/CNPJ' : 'CPF'}
                tabIndex={isFormOpened ? 0 : -1}
                error={!!fieldState.error}
                helperText={fieldState.error?.message || 'Opcional'}
                ref={ref}
                rest={rest}
                onChange={(event: any) =>
                  onChange(maskCpfCnpj(event.target.value))
                }
                inputProps={{
                  maxLength: flgTipo === 'E' ? 18 : 14,
                }}
              />
            )}
          />
        </div>
      </div>
      <Controller
        name="codColaborador"
        control={control}
        render={({ field: { value, ref, ...rest }, fieldState }) => (
          <DmTextField
            label="Matrícula"
            tabIndex={isFormOpened ? 0 : -1}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || 'Opcional'}
            ref={ref}
            rest={rest}
            inputProps={{
              maxLength: 10,
            }}
            style={{ display: flgTipo === 'I' ? 'flex' : 'none' }}
            value={value || ''}
          />
        )}
      />
      <Controller
        name="desEmail"
        control={control}
        render={({ field: { ref, value, ...rest }, fieldState }) => (
          <DmTextField
            label="E-mail"
            type="email"
            tabIndex={isFormOpened ? 0 : -1}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || 'Opcional'}
            ref={ref}
            rest={rest}
            inputProps={{
              maxLength: 200,
            }}
            value={value || ''}
          />
        )}
      />
      <Autocomplete
        fullWidth
        blurOnSelect
        clearOnBlur
        selectOnFocus
        handleHomeEndKeys
        disableCloseOnSelect
        filterSelectedOptions
        openText="Abrir"
        closeText="Fechar"
        clearText="Limpar"
        loadingText="Carregando"
        noOptionsText="Sem opções"
        options={perfis}
        getOptionLabel={(option) => option.descricao}
        renderInput={(params) => {
          const { InputProps, ...restParams } = params;
          const { startAdornment, ...restInputProps } = InputProps;
          return (
            <TextField
              {...restParams}
              label="Selecione o perfil"
              placeholder="Procurar..."
              margin="dense"
              variant="filled"
              InputProps={{
                ...restInputProps,
                disableUnderline: true,
                inputProps: {
                  ...restParams.inputProps,
                  tabIndex: isFormOpened ? 0 : -1,
                },
                startAdornment: (
                  <div
                    style={{
                      maxHeight: 50,
                      marginTop: 10,
                      marginBottom: 5,
                      marginLeft: 8,
                      overflowY: 'auto',
                    }}
                  >
                    {startAdornment}
                  </div>
                ),
              }}
              InputLabelProps={{
                shrink: perfil !== null || focusPerfil,
              }}
              onFocus={() => setFocusPerfil(true)}
              onBlur={() => setFocusPerfil(false)}
              error={!!formState.errors.idRelPerfil}
              helperText={formState.errors.idRelPerfil?.message}
            />
          );
        }}
        value={perfil}
        onChange={(_, data) => {
          clearErrors('idRelPerfil');
          setValue('idRelPerfil', parseInt(data?.codigo || ''));
          setPerfil(data);
        }}
      />
      <Controller
        name="desLogin"
        control={control}
        render={({ field: { ref, onChange, ...rest }, fieldState }) => (
          <DmTextField
            label="Nome de usuário"
            tabIndex={isFormOpened ? 0 : -1}
            error={!!fieldState.error}
            ref={ref}
            rest={rest}
            onChange={(event: any) => onChange(event.target.value.toLowerCase())}
            inputProps={{
              maxLength: 200,
            }}
          />
        )}
      />
      <Controller
        name="desSenha"
        control={control}
        render={({ field: { ref, ...rest }, fieldState }) => (
          <DmTextField
            label="Senha"
            type="password"
            tabIndex={isFormOpened ? 0 : -1}
            error={!!fieldState.error}
            ref={ref}
            rest={rest}
            inputProps={{
              maxLength: 128,
            }}
          />
        )}
      />
      </div>
      <div className="buttons">
        <Button
          onClick={() => {
            onCancel();
          }}
          tabIndex={isFormOpened ? 0 : -1}
          variant="contained"
          className="secondary"
          fullWidth
        >
          CANCELAR
        </Button>

        <Box sx={{ m: 0, position: 'relative' }}>
          <Button
            variant="contained"
            tabIndex={isFormOpened ? 0 : -1}
            disabled={formState.isSubmitting || operationState === 'request'}
            type="submit"
            className={
              formState.isSubmitting || operationState === 'request'
                ? 'secondary'
                : ''
            }
            fullWidth
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
      </div>
    </form>
  );
};

export default Form;
