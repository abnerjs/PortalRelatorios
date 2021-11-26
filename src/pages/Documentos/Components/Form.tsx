import { Icon } from '@iconify/react';
import { DatePicker, DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import brLocale from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import {
  StyledPopper,
  ListboxComponent,
} from 'src/pages/Cadastros/VinculosUsuarios/Components/Autocomplete';
import { TipoArquivo } from 'src/store/ducks/tipoArquivo/types';
import { ArquivoUpload } from 'src/store/ducks/relatoriosUpload/types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { tipoArquivoGetRequest } from 'src/store/ducks/tipoArquivo';
import { relatoriosUploadRequest } from 'src/store/ducks/relatoriosUpload';

type Props = {
  sectionModalController: number;
  setSectionModalController: Function;
  file: File | null;
  setFile: Function;
};

const autocompleteProps = {
  autoComplete: true,
  clearOnBlur: false,
  disableListWrap: true,
  fullWidth: true,
  selectOnFocus: true,
  handleHomeEndKeys: true,
  disableCloseOnSelect: true,
  limitTags: 1,
  openText: '',
  closeText: '',
  clearText: '',
  loadingText: 'Carregando',
  noOptionsText: 'Sem opções',
};

const autocompleteUniqueProps = {
  fullWidth: true,
  blurOnSelect: true,
  clearOnBlur: true,
  selectOnFocus: true,
  handleHomeEndKeys: true,
  disableCloseOnSelect: true,
  filterSelectedOptions: true,
  openText: '',
  closeText: '',
  clearText: '',
  loadingText: 'Carregando',
  noOptionsText: 'Sem opções',
};

const schema = Yup.object({
  idRelTpArquivo: Yup.mixed()
    .nullable()
    .default(null)
    .required('Campo obrigatório!'),
  lstCodFornecedores: Yup.array().required('Campo obrigatório!'),
  lstCodPrestadores: Yup.array().required('Campo obrigatório!'),
  nomArquivo: Yup.string().required('Campo obrigatório!'),
  desObs: Yup.string(),
  codAno: Yup.date()
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? ['A'].includes(value.flgReferencia) : false,
      then: Yup.date().required('Campo obrigatório!'),
    }),
  codMes: Yup.date()
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? ['M'].includes(value.flgReferencia) : false,
      then: Yup.date().required('Campo obrigatório!'),
    }),
  dtaIni: Yup.date()
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? ['D'].includes(value.flgReferencia) : false,
      then: Yup.date().required('Campo obrigatório!'),
    }),
  dtaFim: Yup.date()
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? ['P'].includes(value.flgReferencia) : false,
      then: Yup.date().required('Campo obrigatório!'),
    }),
});

const defaultValues: ArquivoUpload = {
  idRelTpArquivo: null,
  lstCodFornecedores: [],
  lstCodPrestadores: [],
  desObs: '',
  codAno: 0,
  codMes: 0,
  dtaIni: '',
  dtaFim: '',
  nomArquivo: '',
  forcarUpload: false,
  formFile: null,
};

const Form = (props: Props) => {
  const [flag, setFlag] = useState('');
  const [forns, setFornecedores] = useState<TipoFiltro[]>([]);
  const [prests, setPrestadores] = useState<TipoFiltro[]>([]);
  const [tipoArquivo, setTipoArquivo] = useState<TipoArquivo | null>(null);
  const [yearOnlyDatePicker, setYearOnlyDatePicker] = useState<Date | null>(null);
  const tiposArquivos = useAppSelector((state) => state.tipoArquivo.data);
  
  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
    dispatch(tipoArquivoGetRequest());
  }, [dispatch]);

  const {
    trigger,
    clearErrors,
    handleSubmit,
    reset,
    setValue,
    control,
    formState,
  } = useForm<ArquivoUpload>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<ArquivoUpload> = (values) => {
    dispatch(relatoriosUploadRequest(values));
    //if (errors !== undefined) setErrorCollapseOpened(true);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formUpload">
      <Card sx={{ mr: '20px' }}>
        <CardContent>
          <Icon icon="fluent:document-bullet-list-20-regular" width={30} />
          {/* <p className="date">{new Date().toDateString()}</p> */}
          <h2 className="nameReg">
            <Controller
              name="nomArquivo"
              control={control}
              render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                <textarea
                  name=""
                  id="nameReg"
                  className="nameRegInput"
                  wrap="hard"
                  placeholder="Descrição do relatório"
                  autoFocus
                  defaultValue={props.file?.name}
                />
              )}
            />
          </h2>
        </CardContent>
      </Card>

      <div className="sectionController">
        <div
          className="sectionModal"
          style={{
            marginLeft: `-${props.sectionModalController * 541}px`,
          }}
        >
          <Controller
            name="lstCodFornecedores"
            control={control}
            render={({ field: { ref, onChange, ...rest }, fieldState }) => (
              <Autocomplete
                {...autocompleteProps}
                multiple
                ChipProps={{ size: 'small' }}
                PopperComponent={StyledPopper}
                ListboxComponent={ListboxComponent}
                noOptionsText="Nenhum fornecedor"
                options={lstFornecedores}
                getOptionLabel={(option) => option.descricao}
                // renderTags={() => undefined}
                renderOption={(props, option, state) => {
                  return [
                    props,
                    <React.Fragment>
                      <span
                        style={{
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {option.descricao}
                      </span>
                      {state.selected && <CheckIcon color="primary" />}
                    </React.Fragment>,
                  ];
                }}
                renderInput={(params: any) => {
                  const { InputProps, ...restParams } = params;
                  const { startAdornment, ...restInputProps } = InputProps;
                  return (
                    <TextField
                      {...restParams}
                      label="Fornecedores"
                      variant="filled"
                      margin="normal"
                      className="secondary"
                      InputProps={{
                        ...restInputProps,
                        disableUnderline: true,
                        startAdornment: (
                          <div
                            style={{
                              maxHeight: 50,
                              marginTop: 10,
                              overflowY: 'auto',
                            }}
                          >
                            {startAdornment}
                          </div>
                        ),
                        inputProps: {
                          ...params.inputProps,
                          tabIndex: props.sectionModalController === 0 ? 0 : -1,
                        },
                      }}
                      InputLabelProps={{ shrink: forns.length > 0 }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                    />
                  );
                }}
                value={forns}
                onChange={(_, data) => setFornecedores(data)}
                isOptionEqualToValue={(option, value) =>
                  option.codigo === value.codigo
                }
              />
            )}
          />

          <Controller
            name="lstCodPrestadores"
            control={control}
            render={({ field: { ref, onChange, ...rest }, fieldState }) => (
              <Autocomplete
                {...autocompleteProps}
                multiple
                noOptionsText="Nenhum prestador"
                PopperComponent={StyledPopper}
                ListboxComponent={ListboxComponent}
                options={lstPrestadores}
                getOptionLabel={(option) => option.descricao}
                ChipProps={{ size: 'small' }}
                // renderTags={() => undefined}
                renderOption={(props, option, state) => {
                  return [
                    props,
                    <React.Fragment>
                      <span
                        style={{
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {option.descricao}
                      </span>
                      {state.selected && <CheckIcon color="primary" />}
                    </React.Fragment>,
                  ];
                }}
                renderInput={(params: any) => {
                  const { InputProps, ...restParams } = params;
                  const { startAdornment, ...restInputProps } = InputProps;
                  return (
                    <TextField
                      {...restParams}
                      label="Prestadores"
                      variant="filled"
                      margin="normal"
                      className="secondary"
                      InputProps={{
                        ...restInputProps,
                        disableUnderline: true,
                        startAdornment: (
                          <div
                            style={{
                              maxHeight: 50,
                              marginTop: 10,
                              overflowY: 'auto',
                            }}
                          >
                            {startAdornment}
                          </div>
                        ),
                        inputProps: {
                          ...params.inputProps,
                          tabIndex: props.sectionModalController === 0 ? 0 : -1,
                        },
                      }}
                      InputLabelProps={{ shrink: prests.length > 0 }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                    />
                  );
                }}
                value={prests}
                onChange={(_, data) => setPrestadores(data)}
                isOptionEqualToValue={(option, value) =>
                  option.codigo === value.codigo
                }
              />
            )}
          />

          <Controller
            name="idRelTpArquivo"
            control={control}
            render={({ field: { ref, onChange, ...rest }, fieldState }) => (
              <Autocomplete
                {...autocompleteUniqueProps}
                options={tiposArquivos}
                getOptionLabel={(option) => option.desTpArquivo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecione o tipo de arquivo"
                    placeholder="Procurar"
                    margin="normal"
                    variant="filled"
                    className="secondary"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      inputProps: {
                        ...params.inputProps,
                        tabIndex: props.sectionModalController === 0 ? 0 : -1,
                      },
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    inputRef={ref}
                    {...rest}
                  />
                )}
                value={tipoArquivo}
                onChange={(_, data) => {
                  clearErrors('idRelTpArquivo');
                  setTipoArquivo(data);
                  setValue('idRelTpArquivo', data);
                }}
              />
            )}
          />

          <div className="buttons">
            <Button
              onClick={() => {
                props.setFile(null);
              }}
              variant="contained"
              className="secondary"
              fullWidth
              tabIndex={props.sectionModalController === 0 ? 0 : -1}
            >
              CANCELAR
            </Button>
            <Box sx={{ width: '20px' }} />
            <Box
              sx={{
                m: 0,
                position: 'relative',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                fullWidth
                disabled={flag === 'request'}
                className={flag === 'request' ? 'secondary' : ''}
                tabIndex={props.sectionModalController === 0 ? 0 : -1}
                onClick={async () => {
                  const result = await trigger([
                    'idRelTpArquivo',
                    'lstCodFornecedores',
                    'lstCodPrestadores',
                  ]);

                  if (result) {
                    props.setSectionModalController(1);
                  }
                }}
              >
                PRÓXIMO
              </Button>
              {flag === 'request' && (
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
        </div>
        <div className="sectionModal">
          <Controller
            name="desObs"
            control={control}
            render={({ field: { ref, value, ...rest }, fieldState }) => (
              <TextField
                id="desObs"
                fullWidth
                label="Observação"
                color="primary"
                margin="normal"
                variant="filled"
                className="secondary"
                InputProps={{
                  disableUnderline: true,
                  inputProps: {
                    tabIndex: props.sectionModalController === 1 ? 0 : -1,
                  },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                value={value || ''}
                inputRef={ref}
                {...rest}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
            <Controller
              name="codAno"
              control={control}
              render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                <DatePicker
                  label="Ano"
                  openTo="year"
                  mask="____"
                  inputFormat="yyyy"
                  views={['year']}
                  disableMaskedInput={false}
                  value={yearOnlyDatePicker}
                  onChange={(value: any) => {
                    setYearOnlyDatePicker(value);
                  }}
                  InputAdornmentProps={{
                    style: {
                      marginRight: '4px',
                    },
                  }}
                  OpenPickerButtonProps={{
                    tabIndex: props.sectionModalController === 1 ? 0 : -1,
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        display:
                          tipoArquivo?.flgReferencia === 'A' ? 'block' : 'none',
                      }}
                      margin="normal"
                      variant="filled"
                      className="secondary"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'aaaa',
                        tabIndex: props.sectionModalController === 1 ? 0 : -1,
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="codMes"
              control={control}
              render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                <DatePicker
                  label="Mês/Ano"
                  openTo="year"
                  mask="__/____"
                  inputFormat="MM/yyyy"
                  views={['year', 'month']}
                  disableFuture
                  disableMaskedInput={false}
                  value={null}
                  onChange={(e: any) => {}}
                  InputAdornmentProps={{
                    style: {
                      marginRight: '4px',
                    },
                  }}
                  OpenPickerButtonProps={{
                    tabIndex: props.sectionModalController === 1 ? 0 : -1,
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        display:
                          tipoArquivo?.flgReferencia === 'M' ? 'block' : 'none',
                      }}
                      margin="normal"
                      variant="filled"
                      className="secondary"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'mm/aaaa',
                        tabIndex: props.sectionModalController === 1 ? 0 : -1,
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="dtaFim"
              control={control}
              render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                <DateRangePicker
                  startText="Data inicial"
                  endText="Data final"
                  mask="__/__/____"
                  value={[null, null]}
                  onChange={(e: any) => {}}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField
                        {...startProps}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'P'
                              ? 'block'
                              : 'none',
                        }}
                        margin="normal"
                        variant="filled"
                        fullWidth
                        className="secondary"
                        InputProps={{
                          ...startProps.InputProps,
                          disableUnderline: true,
                        }}
                        inputProps={{
                          ...startProps.inputProps,
                          placeholder: 'dd/mm/aaaa',
                          tabIndex: props.sectionModalController === 1 ? 0 : -1,
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={ref}
                        {...rest}
                      />
                      <Box
                        sx={{ mx: '4px' }}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'P'
                              ? 'block'
                              : 'none',
                        }}
                      />
                      <TextField
                        {...endProps}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'P'
                              ? 'block'
                              : 'none',
                        }}
                        margin="normal"
                        variant="filled"
                        fullWidth
                        className="secondary"
                        InputProps={{
                          ...endProps.InputProps,
                          disableUnderline: true,
                        }}
                        inputProps={{
                          ...endProps.inputProps,
                          placeholder: 'dd/mm/aaaa',
                          tabIndex: props.sectionModalController === 1 ? 0 : -1,
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={ref}
                        {...rest}
                      />
                    </React.Fragment>
                  )}
                />
              )}
            />

            <Controller
              name="dtaIni"
              control={control}
              render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                <DatePicker
                  label="Data do documento"
                  openTo="year"
                  disableFuture
                  disableMaskedInput={false}
                  value={null}
                  onChange={(e: any) => {}}
                  InputAdornmentProps={{
                    style: {
                      marginRight: '4px',
                    },
                  }}
                  OpenPickerButtonProps={{
                    tabIndex: props.sectionModalController === 1 ? 0 : -1,
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        display:
                          tipoArquivo?.flgReferencia === 'D' ? 'block' : 'none',
                      }}
                      margin="normal"
                      variant="filled"
                      className="secondary"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'dd/mm/aaaa',
                        tabIndex: props.sectionModalController === 1 ? 0 : -1,
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>

          <div className="buttons">
            <Button
              onClick={() => {
                props.setSectionModalController(0);
              }}
              variant="contained"
              className="secondary"
              fullWidth
              tabIndex={props.sectionModalController === 1 ? 0 : -1}
            >
              ANTERIOR
            </Button>
            <Box sx={{ width: '20px' }} />
            <Box
              sx={{
                m: 0,
                position: 'relative',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                fullWidth
                disabled={flag === 'request'}
                className={flag === 'request' ? 'secondary' : ''}
                tabIndex={props.sectionModalController === 1 ? 0 : -1}
                type="submit"
              >
                SALVAR
              </Button>
              {flag === 'request' && (
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
        </div>
      </div>
    </form>
  );
};

export default Form;
