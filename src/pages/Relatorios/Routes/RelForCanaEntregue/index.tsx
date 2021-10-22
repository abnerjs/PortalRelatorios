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
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { DateRange, DateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Header from 'src/components/Header';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { fazendasGetFilterRequest } from 'src/store/ducks/fazendas';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { relatoriosDownloadRequest } from 'src/store/ducks/relatorios';

interface FormProps {
  dtaInicio: Date | null;
  dtaFim: Date | null;
  lstCodFazendas: string;
  lstCodFornecedores: string;
}

const schema = Yup.object({
  dtaInicio: Yup.date()
    .typeError('Data inválida!')
    .required('Campo obrigatório!'),
  dtaFim: Yup.date().typeError('Data inválida!').required('Campo obrigatório!'),
  lstCodFazendas: Yup.string().required('Campo obrigatório!'),
  lstCodFornecedores: Yup.string().required('Campo obrigatório!'),
});

const defaultValues: FormProps = {
  dtaInicio: null,
  dtaFim: null,
  lstCodFazendas: '',
  lstCodFornecedores: '',
};

const RelForCanaEntregue = () => {
  const [date, setDate] = useState<DateRange<Date>>([null, null]);
  const [fazendas, setFazendas] = useState<TipoFiltro[]>([]);
  const [fornecedores, setFornecedores] = useState<TipoFiltro[]>([]);

  const dispatch = useAppDispatch();
  const forn = useAppSelector((state) => state.fornecedores.filterList);
  const faz = useAppSelector((state) => state.fazendas.filterList);
  // const pdf = useAppSelector((state) => state.relatorios.data);
  const history = useHistory();

  const { handleSubmit, setValue, formState } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormProps> = (values) => {
    const { dtaInicio, dtaFim, lstCodFazendas, lstCodFornecedores } = values;

    if (dtaInicio && dtaFim) {
      let query = '';

      query = query.concat(`?dtaInicio=${format(dtaInicio, 'yyyy-MM-dd')}`);
      query = query.concat(`&dtaFim=${format(dtaFim, 'yyyy-MM-dd')}`);
      query = query.concat(`&lstCodFazendas=${lstCodFazendas}`);
      query = query.concat(`&lstCodFornecedores=${lstCodFornecedores}`);

      dispatch(
        relatoriosDownloadRequest({
          url: 'RelForCanaEntregue/v1/downloadRelForCanaEntregue',
          query: query,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
  }, [dispatch]);

  useEffect(() => {
    const fornec = fornecedores.map((x) => x.codigo).join(',');
    const query = `?lstCodFornecedores=${fornec}`;

    setFazendas([]);
    setValue('lstCodFazendas', '');
    dispatch(fazendasGetFilterRequest(query));
  }, [dispatch, setValue, fornecedores]);

  return (
    <div className="Usuarios Demonstrativo">
      <div className="content">
        <div className="head">
          <Header title="Posição Geral da Entrega de Matéria Prima" />
        </div>
        <div className="row" style={{ alignContent: 'flex-start' }}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className={`FormUser`}
          >
            <Typography variant="h6">Filtrar documento</Typography>
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
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      {...startProps}
                      margin="dense"
                      variant="filled"
                      InputProps={{ disableUnderline: true }}
                      error={!!formState.errors.dtaInicio}
                      helperText={formState.errors.dtaInicio?.message}
                    />
                    <Box sx={{ mx: '6px' }} />
                    <TextField
                      {...endProps}
                      margin="dense"
                      variant="filled"
                      InputProps={{ disableUnderline: true }}
                      error={!!formState.errors.dtaFim}
                      helperText={formState.errors.dtaFim?.message}
                    />
                  </React.Fragment>
                )}
              />
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
                  helperText={formState.errors.lstCodFornecedores?.message}
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
              options={faz}
              limitTags={1}
              ChipProps={{ size: `small` }}
              getOptionLabel={(option) => option.descricao}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fazendas"
                  margin="dense"
                  variant="filled"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  error={!!formState.errors.lstCodFazendas}
                  helperText={formState.errors.lstCodFazendas?.message}
                />
              )}
              value={fazendas}
              onChange={(_, data) => {
                setValue('lstCodFazendas', data.map((x) => x.codigo).join(','));
                setFazendas(data);
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
              <Button variant="contained" type="submit">
                GERAR
              </Button>
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

export default RelForCanaEntregue;
