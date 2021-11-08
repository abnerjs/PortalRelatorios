import 'src/pages/Usuarios.css';
import 'src/pages/Relatorios/Styles/index.css';
import 'src/pages/FormUser.css';
import 'src/pages/SectionizedTable.css';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Header from 'src/components/Header';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { usuariosFornecedoresGetFilterRequest } from 'src/store/ducks/usuariosFornecedores';
import { relatoriosDownloadRequest } from 'src/store/ducks/relatorios';
import { Icon } from '@iconify/react';

interface FormProps {
  dtaInicio: Date | null;
  dtaFim: Date | null;
  lstCodFornecedores: string;
}

const schema = Yup.object({
  dtaInicio: Yup.date()
    .typeError('Data inválida!')
    .required('Campo obrigatório!'),
  dtaFim: Yup.date().typeError('Data inválida!').required('Campo obrigatório!'),
  lstCodFornecedores: Yup.string().nullable().default(null).notRequired(),
});

const defaultValues: FormProps = {
  dtaInicio: null,
  dtaFim: null,
  lstCodFornecedores: '',
};

const RelForPagamento = () => {
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [fornecedores, setFornecedores] = useState<TipoFiltro[]>([]);

  const dispatch = useAppDispatch();
  const forn = useAppSelector((state) => state.usuariosFornecedores.filterList);
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
    const { dtaInicio, dtaFim, lstCodFornecedores } = values;

    if (dtaInicio && dtaFim) {
      let query = '';

      query = query.concat(`?dtaInicio=${format(dtaInicio, 'yyyy-MM-dd')}`);
      query = query.concat(`&dtaFim=${format(dtaFim, 'yyyy-MM-dd')}`);
      query = query.concat(`&lstCodFornecedores=${lstCodFornecedores}`);

      dispatch(
        relatoriosDownloadRequest({
          url: 'RelForPagamento/v1/downloadRelForPagamento',
          query: query,
        })
      );

      if (pdf) global.window.open(pdf);
      else setErrorCollapseOpened(true);
    }
  };

  useEffect(() => {
    dispatch(usuariosFornecedoresGetFilterRequest());
  }, [dispatch]);

  return (
    <div className="Usuarios Demonstrativo">
      <div className="content">
        <div className="head">
          <Header title="Demonstrativo Folha de Pagamento Fornecedores" />
        </div>
        <div className="row" style={{ alignContent: 'flex-start' }}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className={`FormUser`}
          >
            <Typography variant="h6">Filtrar documento</Typography>
            <Collapse in={pdfError !== undefined && isErrorCollapseOpened}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorCollapseOpened(false);
                    }}
                  >
                    <Icon icon="fluent:dismiss-20-regular" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {pdfError}
              </Alert>
            </Collapse>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
              <Stack direction="row">
                <DatePicker
                  label="Data inicial"
                  openTo="year"
                  mask="__/____"
                  inputFormat="MM/yyyy"
                  views={['year', 'month']}
                  disableFuture
                  disableMaskedInput={false}
                  value={initialDate}
                  onChange={(newValue) => {
                    setValue('dtaInicio', newValue);
                    setInitialDate(newValue);
                  }}
                  InputAdornmentProps={{
                    style: {
                      marginRight: '4px',
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      variant="filled"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'mm/aaaa',
                      }}
                      error={!!formState.errors.dtaInicio}
                      helperText={formState.errors.dtaInicio?.message}
                    />
                  )}
                />
                <Box sx={{ mx: '6px' }} />
                <DatePicker
                  label="Data final"
                  openTo="year"
                  mask="__/____"
                  inputFormat="MM/yyyy"
                  views={['year', 'month']}
                  disableFuture
                  disableMaskedInput={false}
                  value={finalDate}
                  onChange={(newValue) => {
                    setValue('dtaFim', newValue);
                    setFinalDate(newValue);
                  }}
                  InputAdornmentProps={{
                    style: {
                      marginRight: '4px',
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      variant="filled"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'mm/aaaa',
                      }}
                      error={!!formState.errors.dtaFim}
                      helperText={formState.errors.dtaFim?.message}
                    />
                  )}
                />
              </Stack>
            </LocalizationProvider>
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
              options={forn}
              limitTags={1}
              ChipProps={{ size: `small` }}
              getOptionLabel={(option) => option.descricao}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fornecedores"
                  margin="dense"
                  variant="filled"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  error={!!formState.errors.lstCodFornecedores}
                  helperText={
                    formState.errors.lstCodFornecedores?.message || 'Opcional'
                  }
                />
              )}
              value={fornecedores}
              onChange={(_, data) => {
                setValue(
                  'lstCodFornecedores',
                  data.map((x) => x.codigo).join(',')
                );

                setFornecedores(data);
              }}
            />
            <div className="buttons">
              <Button
                variant="contained"
                className="secondary"
                onClick={() => history.goBack()}
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

export default RelForPagamento;
