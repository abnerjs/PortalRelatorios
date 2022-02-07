import 'src/pages/Usuarios.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';
import 'src/pages/ModalDelete.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from 'src/store';
import {
  tipoArquivoCancelOperation,
  tipoArquivoPostRequest,
  tipoArquivoPutRequest,
} from 'src/store/ducks/tipoArquivo';
import { objetosGetFilterRequest } from 'src/store/ducks/objetos';
import {
  Autocomplete,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';
import DmAutocomplete, { AutocompleteOptions } from 'src/components/DmAutocomplete/DmAutocomplete';
import DmTextField from 'src/components/DmTextField/DmTextField';

interface FormProps {
  data: TipoArquivo | null;
  isFormOpened: boolean;
}

const schema = Yup.object({
  idRelTpArquivo: Yup.number().notRequired(),
  desTpArquivo: Yup.string().nullable().required('Campo obrigatório!'),
  flgReferencia: Yup.string().nullable().required('Campo obrigatório!'),
});

const defaultValues: TipoArquivo = {
  idRelTpArquivo: 0,
  desTpArquivo: '',
  flgReferencia: null,
};

const referencias = ['A', 'M', 'D', 'P'];

const referenciaToStringLabel = (referencia: string | null) => {
  switch (referencia) {
    case 'A':
      return 'Ano';
    case 'M':
      return 'Ano e mês';
    case 'D':
      return 'Data do documento';
    case 'P':
      return 'Período de datas';
    default:
      return '';
  }
};

const Form: React.FC<FormProps> = ({ data, isFormOpened }: FormProps) => {
  const dispatch = useAppDispatch();
  const [referencia, setReferencia] = useState<string | null>(null);
  const [focusRef, setFocusRef] = useState(false);
  const errors = useAppSelector((state) => state.tipoArquivo.operationError);
  const operationState = useAppSelector(
    (state) => state.tipoArquivo.operationState
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
  } = useForm<TipoArquivo>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<TipoArquivo> = (values) => {
    dispatch(
      data && data.idRelTpArquivo > 0
        ? tipoArquivoPutRequest(values)
        : tipoArquivoPostRequest(values)
    );
    if (errors !== undefined) setErrorCollapseOpened(true);
  };

  const onCancel = () => {
    dispatch(tipoArquivoCancelOperation());
    setErrorCollapseOpened(false);
  };

  useEffect(() => {
    dispatch(objetosGetFilterRequest());
  }, [dispatch]);

  useEffect(() => {
    const newValue = data ?? defaultValues;
    setReferencia(newValue.flgReferencia);
    reset(newValue);
  }, [data, reset]);

  useEffect(() => {
    if (!isFormOpened) {
      reset();
      setReferencia(null);
    }
  }, [isFormOpened, reset]);

  useEffect(() => {
    if (!data) clearErrors();
  }, [data, clearErrors, setValue]);

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
      <input type="hidden" {...register('idRelTpArquivo')} />

      <Controller
        name="desTpArquivo"
        control={control}
        render={({ field: { ref, ...rest }, fieldState }) => (
          <DmTextField
            label="Descrição do tipo de arquivo"
            tabIndex={isFormOpened ? 0 : -1}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            ref={ref}
            rest={rest}
          />
        )}
      />
      <DmAutocomplete
        options={referencias.map((item) => {
          return {
            optionLabel: referenciaToStringLabel(item),
            codigo: item,
            value: item,
          }
        })}
        value={(referencia) ?
          {
            optionLabel: referenciaToStringLabel(referencia),
            codigo: referencia,
            value: referencia,
          } :
          null
        }
        onChange={(_: any, data: AutocompleteOptions) => {
          clearErrors('flgReferencia');
          setValue('flgReferencia', data.value);
          setReferencia(data.value);
        }}
        label="Selecione o tipo de referência de datas"
        error={!!formState.errors.flgReferencia}
        helperText={formState.errors.flgReferencia?.message}
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
