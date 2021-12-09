import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputSwitch from 'src/pages/Cadastros/Perfis/Components/InputSwitch';
import { useAppSelector, useAppDispatch } from 'src/store';
import {
  perfisCancelOperation,
  perfisPostRequest,
  perfisPutRequest,
} from 'src/store/ducks/perfis';
import { Perfil } from 'src/store/ducks/perfis/types';
import { objetosGetFilterRequest } from 'src/store/ducks/objetos';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

interface FormProps {
  data: Perfil | null;
  isFormOpened: boolean;
}

const schema = Yup.object({
  idRelPerfil: Yup.number().notRequired(),
  desPerfil: Yup.string().required('Campo obrigatório!'),
  lstPerfisObjetos: Yup.array(),
});

const defaultValues: Perfil = {
  idRelPerfil: 0,
  desPerfil: '',
  lstPerfisObjetos: [],
};

const Form: React.FC<FormProps> = ({ data, isFormOpened }: FormProps) => {
  const dispatch = useAppDispatch();
  const objetos = useAppSelector((state) => state.objetos.filterList);
  const errors = useAppSelector((state) => state.perfis.operationError);
  const operationState = useAppSelector((state) => state.perfis.operationState);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const { handleSubmit, register, reset, control, formState } = useForm<Perfil>(
    {
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    }
  );

  const onSubmit: SubmitHandler<Perfil> = (values) => {
    dispatch(
      data && data.idRelPerfil > 0
        ? perfisPutRequest(values)
        : perfisPostRequest(values)
    );
    if (errors !== undefined) setErrorCollapseOpened(true);
  };

  const onCancel = () => {
    dispatch(perfisCancelOperation());
    setErrorCollapseOpened(false);
  };

  useEffect(() => {
    dispatch(objetosGetFilterRequest());
  }, [dispatch]);

  useEffect(() => {
    reset(isFormOpened && data ? data : defaultValues);
  }, [data, isFormOpened, reset]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={`FormUser${isFormOpened ? '' : ' invi'}`}
    >
      <DmCollapseHandler
        error={errors}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
      />
      <input type="hidden" {...register('idRelPerfil')} />
      <Controller
        name="desPerfil"
        control={control}
        render={({ field: { ref, ...rest }, fieldState }) => (
          <TextField
            id="desPerfil"
            fullWidth
            label="Descrição do perfil"
            placeholder="Ex.: Acesso aos relatórios"
            color="primary"
            margin="normal"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              inputProps: { tabIndex: isFormOpened ? 0 : -1 },
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            inputRef={ref}
            {...rest}
          />
        )}
      />
      <Controller
        name="lstPerfisObjetos"
        control={control}
        render={({ field }) => (
          <InputSwitch
            options={objetos}
            value={field.value}
            onChange={(event) => field.onChange(event)}
            isFormOpened={isFormOpened}
          />
        )}
      />
      <div className="buttons">
        <Button
          variant="contained"
          tabIndex={isFormOpened ? 0 : -1}
          className="secondary"
          onClick={() => {
            onCancel();
            setErrorCollapseOpened(false);
          }}
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
