import 'src/pages/Usuarios.css';
import 'src/pages/Relatorios/Styles/index.css';
import 'src/pages/FormUser.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { DateRange, DateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Header from 'src/components/Header/Header';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import {
  relatoriosDownloadIdle,
  relatoriosDownloadRequest,
} from 'src/store/ducks/relatorios';
import { tiposRecursosGetFilterRequest } from 'src/store/ducks/tiposRecursos';
import { usuariosPrestadoresGetFilterRequest } from 'src/store/ducks/usuariosPrestadores';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

interface FormProps {
  dtaInicio: Date | null;
  dtaFim: Date | null;
  codTpRecurso: string;
  lstCodPrestadores: string;
}

const schema = Yup.object({
  dtaInicio: Yup.date()
    .required('Campo obrigatório!')
    .typeError('Data inválida!'),
  dtaFim: Yup.date().typeError('Data inválida!').required('Campo obrigatório!'),
  codTpRecurso: Yup.string().required('Campo obrigatório!'),
  lstCodPrestadores: Yup.string().nullable().default(null).notRequired(),
});

const defaultValues: FormProps = {
  dtaInicio: null,
  dtaFim: null,
  codTpRecurso: '',
  lstCodPrestadores: '',
};

const RelPreRecurso = () => {
  const [date, setDate] = useState<DateRange<Date>>([null, null]);
  const [tipoRecurso, setTipoRecurso] = useState<TipoFiltro | null>(null);
  const [prestadores, setPrestadores] = useState<TipoFiltro[]>([]);
  const dispatch = useAppDispatch();
  const prest = useAppSelector((state) => state.usuariosPrestadores.filterList);
  const tipRec = useAppSelector((state) => state.tiposRecursos.filterList);
  const pdf = useAppSelector((state) => state.relatorios.data);
  const pdfError = useAppSelector((state) => state.relatorios.error);
  const isLoading = useAppSelector((state) => state.relatorios.loading);
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const history = useHistory();

  const { handleSubmit, setValue, formState } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormProps> = (values) => {
    const { dtaInicio, dtaFim, codTpRecurso, lstCodPrestadores } = values;

    if (dtaInicio && dtaFim) {
      let query = '';

      query = query.concat(`?dtaInicio=${format(dtaInicio, 'yyyy-MM-dd')}`);
      query = query.concat(`&dtaFim=${format(dtaFim, 'yyyy-MM-dd')}`);
      query = query.concat(`&codTpRecurso=${codTpRecurso}`);
      query = query.concat(`&lstCodPrestadores=${lstCodPrestadores}`);

      dispatch(
        relatoriosDownloadRequest({
          url: 'RelPreRecurso/v1/downloadRelPreRecurso',
          query: query,
        })
      );
    }
  };

  useEffect(() => {
    if (pdf) global.window.open(pdf);
  }, [pdf]);

  useEffect(() => {
    if (pdfError) setErrorCollapseOpened(true);
  }, [pdfError]);

  useEffect(() => {
    dispatch(usuariosPrestadoresGetFilterRequest());
    dispatch(tiposRecursosGetFilterRequest());
    dispatch(relatoriosDownloadIdle());
  }, [dispatch]);

  return (
    <div className="Usuarios Demonstrativo">
      <div className="content">
        <div className="head">
          <Header title="Produção por Recurso" />
        </div>
        <div className="row" style={{ alignContent: 'flex-start' }}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className={`FormUser`}
          >
            <div className="formFields">
              <Typography variant="h6">Filtrar documento</Typography>
              <DmCollapseHandler
                error={pdfError}
                isErrorCollapseOpened={isErrorCollapseOpened}
                setErrorCollapseOpened={setErrorCollapseOpened}
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={brLocale}
              >
                <DateRangePicker
                  mask="__/__/____"
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                    setValue('dtaInicio', value[0]);
                    setValue('dtaFim', value[1]);
                  }}
                  startText="Data inicial"
                  endText="Data final"
                  disableCloseOnSelect={false}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField
                        {...startProps}
                        margin="dense"
                        variant="filled"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        inputProps={{
                          ...startProps.inputProps,
                          placeholder: 'dd/mm/aaaa',
                        }}
                        error={!!formState.errors.dtaInicio}
                        helperText={formState.errors.dtaInicio?.message}
                      />
                      <Box sx={{ mx: '6px' }} />
                      <TextField
                        {...endProps}
                        margin="dense"
                        variant="filled"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        inputProps={{
                          ...endProps.inputProps,
                          placeholder: 'dd/mm/aaaa',
                        }}
                        error={!!formState.errors.dtaFim}
                        helperText={formState.errors.dtaFim?.message}
                      />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
              <Autocomplete
                fullWidth
                clearOnBlur
                blurOnSelect
                selectOnFocus
                disableListWrap
                handleHomeEndKeys
                disableCloseOnSelect={true}
                filterSelectedOptions
                openText="Abrir"
                closeText="Fechar"
                clearText="Limpar"
                loadingText="Carregando"
                noOptionsText="Sem opções"
                options={tipRec}
                getOptionLabel={(option) => option.descricao}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipos de recursos"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    error={!!formState.errors.codTpRecurso}
                    helperText={formState.errors.codTpRecurso?.message}
                  />
                )}
                value={tipoRecurso}
                onChange={(_, data) => {
                  setValue('codTpRecurso', data?.codigo ?? '');
                  setTipoRecurso(data);
                }}
              />
              <Autocomplete
                multiple
                fullWidth
                clearOnBlur
                blurOnSelect
                selectOnFocus
                disableListWrap
                handleHomeEndKeys
                disableCloseOnSelect={true}
                filterSelectedOptions
                openText="Abrir"
                closeText="Fechar"
                clearText="Limpar"
                loadingText="Carregando"
                noOptionsText="Sem opções"
                options={prest}
                limitTags={1}
                ChipProps={{ size: `small` }}
                getOptionLabel={(option) => option.descricao}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Prestadores"
                    margin="dense"
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    error={!!formState.errors.lstCodPrestadores}
                    helperText={
                      formState.errors.lstCodPrestadores?.message || 'Opcional'
                    }
                  />
                )}
                value={prestadores}
                onChange={(_, data) => {
                  setValue(
                    'lstCodPrestadores',
                    data.map((x) => x.codigo).join(',')
                  );

                  setPrestadores(data);
                }}
              />
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                className="secondary"
                onClick={() => history.goBack()}
                fullWidth
              >
                VOLTAR
              </Button>
              <Box sx={{ m: 0, position: 'relative' }}>
                <Button
                  variant="contained"
                  disabled={formState.isSubmitting || isLoading}
                  type="submit"
                  className={
                    formState.isSubmitting || isLoading ? 'secondary' : ''
                  }
                  fullWidth
                >
                  GERAR
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
            </div>
          </form>
          {/*
            <div className="pdf" style={{ display: pdf ? 'block' : 'none' }}>
              <embed
                width="100%"
                height="100%"
                src={pdf}
                type="application/pdf"
              />
            </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default RelPreRecurso;
