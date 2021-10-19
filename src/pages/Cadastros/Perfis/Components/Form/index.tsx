import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputSwitch from 'src/pages/Cadastros/Perfis/Components/InputSwitch';
import { useAppSelector, useAppDispatch } from 'src/store';
import { perfisPostRequest, perfisPutRequest } from 'src/store/ducks/perfis';
import { Perfil } from 'src/store/ducks/perfis/types';
import { objetosGetFilterRequest } from 'src/store/ducks/objetos';

interface FormProps {
  data: Perfil | null;
  isFormOpened: boolean;
  onSuccess(): void;
  onCancel(): void;
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

const Form: React.FC<FormProps> = ({
  data,
  isFormOpened,
  onSuccess,
  onCancel,
}: FormProps) => {
  const dispatch = useAppDispatch();
  const objetos = useAppSelector((state) => state.objetos.filterList);

  const { handleSubmit, register, reset, control } = useForm<Perfil>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Perfil> = (values) => {
    if (data && data.idRelPerfil > 0) {
      dispatch(perfisPutRequest(values));
    } else {
      dispatch(perfisPostRequest(values));
    }

    onSuccess();
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
          onClick={onCancel}
        >
          CANCELAR
        </Button>
        <Button
          type="submit"
          variant="contained"
          tabIndex={isFormOpened ? 0 : -1}
        >
          SALVAR
        </Button>
      </div>
    </form>
  );
};

export default Form;
