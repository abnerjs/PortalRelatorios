import './Form.css';

import { Icon } from '@iconify/react';
import { DatePicker, DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  TextField,
  Tooltip,
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
import {
  ArquivoUpdate,
  ArquivoUpload,
  ArquivoUploadReceiveFormat,
} from 'src/store/ducks/relatoriosUpload/types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { tipoArquivoGetRequest } from 'src/store/ducks/tipoArquivo';
import {
  arquivosGetRequest,
  arquivosUpdateRequest,
  arquivosUploadError,
  arquivosUploadIdle,
  arquivosUploadRequest,
} from 'src/store/ducks/relatoriosUpload';
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import DmCollapseHandler from 'src/components/DmCollapseHandler/DmCollapseHandler';

type Props = {
  sectionModalController: number;
  setSectionModalController: Function;
  file: File | null;
  setFile: Function;
  setOpen: Function;
  setBlink: Function;
  doc?: ArquivoUploadReceiveFormat;
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
  idRelTpArquivo: Yup.number()
    .nullable()
    .default(null)
    .required('Campo obrigatório!'),
  idRelArquivo: Yup.number(),
  substituirExistentes: Yup.boolean(),
  lstCodFornecedores: Yup.array(),
  lstCodPrestadores: Yup.array(),
  nomArquivo: Yup.string()
    .nullable()
    .default(null)
    .required('Campo obrigatório!'),
  desObs: Yup.string(),
  codAno: Yup.number()
    .nullable()
    .default(null)
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value !== null && value.flgReferencia
          ? 'A' === value.flgReferencia
          : false,
      then: Yup.number()
        .typeError('Campo obrigatório!')
        .required('Campo obrigatório!'),
    }),
  codMes: Yup.number()
    .nullable()
    .default(null)
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? 'M' === value.flgReferencia : false,
      then: Yup.number()
        .typeError('Campo obrigatório!')
        .required('Campo obrigatório!'),
    }),
  dtaIni: Yup.string()
    .nullable()
    .default(null)
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? 'D' === value.flgReferencia : false,
      then: Yup.string()
        .typeError('Campo obrigatório!')
        .required('Campo obrigatório!'),
    }),
  dtaFim: Yup.string()
    .nullable()
    .default(null)
    .typeError('Data inválida!')
    .when('idRelTpArquivo', {
      is: (value: TipoArquivo | null) =>
        value?.flgReferencia ? 'P' === value.flgReferencia : false,
      then: Yup.string()
        .typeError('Campo obrigatório!')
        .required('Campo obrigatório!'),
    }),
}).test(
  'is-optional',
  'É necessário selecionar ao menos um fornecedor ou prestador',
  ({ lstCodFornecedores, lstCodPrestadores }) => {
    if (lstCodPrestadores && lstCodFornecedores) {
      return lstCodFornecedores?.length > 0 || lstCodPrestadores?.length > 0;
    } else return false;
  }
);

interface FormProps {
  idRelTpArquivo: number | null;
  dtaIni: string | null;
  dtaFim: string | null;
  codAno: number | null;
  codMes: number | null;
  lstCodFornecedores: Array<number>;
  lstCodPrestadores: Array<number>;
  desObs: string;
  nomArquivo: string;
  formFile: File | null;
  substituirExistentes?: boolean;
  idRelArquivo?: number;
}

const defaultValues: FormProps = {
  idRelTpArquivo: null,
  lstCodFornecedores: [],
  lstCodPrestadores: [],
  desObs: '',
  codAno: null,
  codMes: null,
  dtaIni: null,
  dtaFim: null,
  nomArquivo: '',
  formFile: null,
  substituirExistentes: undefined,
  idRelArquivo: undefined,
};

const Form = (props: Props) => {
  const [forns, setFornecedores] = useState<TipoFiltro[]>([]);
  const [prests, setPrestadores] = useState<TipoFiltro[]>([]);
  const [tipoArquivo, setTipoArquivo] = useState<TipoArquivo | null>(null);
  const [yearOnlyDatePicker, setYearOnlyDatePicker] = useState<Date | null>(
    null
  );
  const [yearAndMonthDatePicker, setYearAndMonthDatePicker] =
    useState<Date | null>(null);
  const [datePeriodo, setDatePeriodo] = useState<DateRange<Date>>([null, null]);
  const tiposArquivos = useAppSelector((state) => state.tipoArquivo.data);

  const uploadError = useAppSelector(
    (state) => state.arquivoUpload.uploadError
  );
  const uploadState = useAppSelector(
    (state) => state.arquivoUpload.uploadState
  );
  const [isErrorCollapseOpened, setErrorCollapseOpened] = useState(false);

  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );
  const [nomArqWhenDocExists, setNomArqWhenDocExists] = useState<string | null>(
    null
  );
  const [desObsForm, setDesObsForm] = useState<string | null>(null);

  useEffect(() => {
    if (!props.doc) {
      setValue('substituirExistentes', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.file) {
      setValue('nomArquivo', props.file.name);
      setNomArqWhenDocExists(props.file.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.file]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (props.doc && props.doc.idRelTpArquivo && tiposArquivos) {
      let tipoArquivoWhenEdit =
        tiposArquivos.find(
          (item) => props.doc?.idRelTpArquivo === item.idRelTpArquivo
        ) || null;

      setTipoArquivo(tipoArquivoWhenEdit);

      clearErrors('idRelTpArquivo');
      setValue('idRelTpArquivo', props.doc?.idRelTpArquivo);

      if (props.doc.lstCodFornecedores) {
        setFornecedores(
          lstFornecedores.filter((value) =>
            props.doc?.lstCodFornecedores?.includes(parseInt(value.codigo))
          )
        );
        setValue('lstCodFornecedores', props.doc.lstCodFornecedores);
      }

      if (props.doc.lstCodPrestadores) {
        setValue('lstCodPrestadores', props.doc.lstCodPrestadores);
        setPrestadores(
          lstPrestadores.filter((value) =>
            props.doc?.lstCodPrestadores?.includes(parseInt(value.codigo))
          )
        );
      }

      setNomArqWhenDocExists(props.doc.nomArquivo);
      setValue('nomArquivo', nomArqWhenDocExists || props.doc.nomArquivo);

      if (props.doc.desObs) {
        setDesObsForm(props.doc.desObs);
        setValue('desObs', props.doc.desObs);
      }

      if (props.doc.codMes && props.doc.codAno) {
        let d = new Date();
        d.setMonth(props.doc.codMes);
        d.setFullYear(props.doc.codAno);
        setYearAndMonthDatePicker(d);
        setValue('codMes', props.doc.codMes);
        setValue('codAno', props.doc.codAno);
      } else if (props.doc.codAno) {
        let d = new Date();
        d.setFullYear(props.doc.codAno);
        setYearOnlyDatePicker(d);
        setValue('codAno', props.doc.codAno);
      } else if (props.doc.dtaIni && props.doc.dtaFim) {
        let dtaIni = new Date(props.doc.dtaIni);
        let dtaFim = new Date(props.doc.dtaFim);
        setValue('dtaIni', props.doc.dtaIni);
        setValue('dtaFim', props.doc.dtaFim);
        setDatePeriodo([dtaIni, dtaFim]);
      } else if (props.doc.dtaIni) {
        let dtaIni = new Date(props.doc.dtaIni);
        setYearOnlyDatePicker(dtaIni);
        setValue('dtaIni', props.doc.dtaIni);
      }

      if (props.doc.idRelArquivo)
        setValue('idRelArquivo', props.doc.idRelArquivo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.doc, tiposArquivos]);

  useEffect(() => {
    switch (tipoArquivo?.flgReferencia) {
      case 'A':
        setValue('codMes', null);
        setValue('dtaIni', null);
        setValue('dtaFim', null);
        break;
      case 'M':
        setValue('codAno', null);
        setValue('dtaIni', null);
        setValue('dtaFim', null);
        break;
      case 'P':
        setValue('codMes', null);
        setValue('codAno', null);
        break;
      case 'D':
        setValue('codMes', null);
        setValue('codAno', null);
        setValue('dtaFim', null);
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoArquivo]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
    dispatch(tipoArquivoGetRequest());
  }, [dispatch]);

  const { trigger, clearErrors, handleSubmit, reset, setValue, control } =
    useForm<FormProps>({
      resolver: yupResolver(schema),
      defaultValues: defaultValues,
    });

  const onSubmit: SubmitHandler<ArquivoUpload | ArquivoUpdate> = (values) => {
    if (props.doc) {
      dispatch(arquivosUpdateRequest(values as ArquivoUpdate));
    } else {
      dispatch(arquivosUploadRequest(values as ArquivoUpload));
    }
  };

  const onError = (error: any) => {
    if (error['']?.message)
      dispatch(
        arquivosUploadError({
          desTipo: 'aviso',
          mensagem: error[''].message,
          tipo: 2000,
        })
      );
  };

  useEffect(() => {
    return () => {
      reset(defaultValues);
      dispatch(arquivosUploadIdle());
    };
  }, [reset, dispatch]);

  useEffect(() => {
    if (uploadState === 's') {
      dispatch(arquivosGetRequest());

      setTimeout(() => {
        dispatch(arquivosUploadIdle());
        props.setFile(null);
        props.setOpen(false);
        props.setSectionModalController(0);
      }, 1000);
    }

    setErrorCollapseOpened(uploadError !== undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadState]);

  useEffect(() => {
    if (props.file) {
      setValue('formFile', props.file);
      if (!props.doc) setValue('nomArquivo', props.file.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.file, setValue]);

  const [focusForn, setFocusForn] = useState(false);
  const [focusPrest, setFocusPrest] = useState(false);

  return (
    <>
      <DmCollapseHandler
        error={uploadError}
        isErrorCollapseOpened={isErrorCollapseOpened}
        setErrorCollapseOpened={setErrorCollapseOpened}
        sx={{
          width: 'calc(100% - 40px)',
          margin: isErrorCollapseOpened ? '20px 20px -20px 20px' : 0,
        }}
      />
      <form onSubmit={handleSubmit(onSubmit, onError)} className="formUpload">
        <Card elevation={3}>
          <CardContent>
            <Icon icon="fluent:document-bullet-list-20-regular" width={30} />
            {/* <p className="date">{new Date().toDateString()}</p> */}
            <h2 className="nameReg">
              <Controller
                name="nomArquivo"
                control={control}
                render={({ field: { ref, onChange, ...rest }, fieldState }) => (
                  <TextField
                    id="nomArquivo"
                    placeholder="Descrição do relatório"
                    className="nameRegInput"
                    multiline
                    rows={4}
                    defaultValue={nomArqWhenDocExists || props.file?.name}
                    variant="filled"
                    autoFocus
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    inputRef={ref}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setValue('nomArquivo', e.target.value)}
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
              marginLeft: `-${props.sectionModalController * 581}px`,
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
                  renderInput={(params) => {
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
                                marginBottom: 5,
                                marginLeft: 20,
                                overflowY: 'auto',
                              }}
                            >
                              {startAdornment}
                            </div>
                          ),
                          inputProps: {
                            ...params.inputProps,
                            id: 'lstCodFornecedores',
                            tabIndex:
                              props.sectionModalController === 0 ? 0 : -1,
                          },
                        }}
                        InputLabelProps={{
                          shrink: forns.length > 0 || focusForn,
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={ref}
                        {...rest}
                        onFocus={() => setFocusForn(true)}
                        onBlur={() => setFocusForn(false)}
                      />
                    );
                  }}
                  value={forns}
                  onChange={(_, data) => {
                    setFornecedores(data);
                    setValue(
                      'lstCodFornecedores',
                      data.map((item: TipoFiltro) => {
                        return parseInt(item['codigo']);
                      })
                    );
                  }}
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
                  renderInput={(params) => {
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
                                marginBottom: 5,
                                marginLeft: 20,
                                overflowY: 'auto',
                              }}
                            >
                              {startAdornment}
                            </div>
                          ),
                          inputProps: {
                            ...params.inputProps,
                            id: 'lstCodPrestadores',
                            tabIndex:
                              props.sectionModalController === 0 ? 0 : -1,
                          },
                        }}
                        InputLabelProps={{
                          shrink: prests.length > 0 || focusPrest,
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={ref}
                        {...rest}
                        onFocus={() => setFocusPrest(true)}
                        onBlur={() => setFocusPrest(false)}
                      />
                    );
                  }}
                  value={prests}
                  onChange={(_, data) => {
                    setPrestadores(data);
                    setValue(
                      'lstCodPrestadores',
                      data.map((item: TipoFiltro) => {
                        return parseInt(item['codigo']);
                      })
                    );
                  }}
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
                    setValue('idRelTpArquivo', data?.idRelTpArquivo || null);
                  }}
                />
              )}
            />

            <div className="buttons">
              <Button
                onClick={() => {
                  props.setFile(null);
                  if (props.doc) {
                    props.setOpen(false);
                  }
                }}
                variant="contained"
                className="secondary"
                fullWidth
                tabIndex={props.sectionModalController === 0 ? 0 : -1}
              >
                CANCELAR
              </Button>
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
                {uploadState === 'l' && (
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
                  defaultValue={desObsForm}
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

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={brLocale}
            >
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
                      if (value !== null)
                        setValue('codAno', value.getFullYear());
                      else setValue('codAno', value);
                    }}
                    InputAdornmentProps={{
                      style: {
                        marginRight: '4px',
                      },
                    }}
                    OpenPickerButtonProps={{
                      tabIndex: props.sectionModalController === 1 ? 0 : -1,
                    }}
                    PopperProps={{
                      style: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'A'
                              ? 'block'
                              : 'none',
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
                    value={yearAndMonthDatePicker}
                    onChange={(value: any) => {
                      setYearAndMonthDatePicker(value);
                      if (value !== null) {
                        setValue('codMes', value.getMonth());
                        setValue('codAno', value.getFullYear());
                      } else {
                        setValue('codAno', value);
                        setValue('codMes', value);
                      }
                    }}
                    InputAdornmentProps={{
                      style: {
                        marginRight: '4px',
                      },
                    }}
                    OpenPickerButtonProps={{
                      tabIndex: props.sectionModalController === 1 ? 0 : -1,
                    }}
                    PopperProps={{
                      style: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'M'
                              ? 'block'
                              : 'none',
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
                    className="modalDateRangePicker"
                    PopperProps={{
                      disablePortal: true,
                      className: 'dateRangePickerModal',
                    }}
                    value={datePeriodo}
                    onChange={(value) => {
                      setDatePeriodo(value);
                      if (
                        value[0] instanceof Date &&
                        value[1] instanceof Date &&
                        !isNaN(value[0].getTime()) &&
                        !isNaN(value[1].getTime())
                      ) {
                        setValue(
                          'dtaIni',
                          value[0].toISOString().split('T')[0]
                        );
                        setValue(
                          'dtaFim',
                          value[1].toISOString().split('T')[0]
                        );
                      } else {
                        setValue('dtaIni', null);
                        setValue('dtaFim', null);
                      }
                    }}
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
                            tabIndex:
                              props.sectionModalController === 1 ? 0 : -1,
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
                            tabIndex:
                              props.sectionModalController === 1 ? 0 : -1,
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
                    onChange={(value: any) => {
                      setYearOnlyDatePicker(value);
                      if (value instanceof Date &&
                        !isNaN(value.getTime()))
                        setValue('dtaIni', value.toISOString().split('T')[0]);
                      else setValue('dtaIni', null);
                    }}
                    InputAdornmentProps={{
                      style: {
                        marginRight: '4px',
                      },
                    }}
                    OpenPickerButtonProps={{
                      tabIndex: props.sectionModalController === 1 ? 0 : -1,
                    }}
                    PopperProps={{
                      style: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          display:
                            tipoArquivo?.flgReferencia === 'D'
                              ? 'block'
                              : 'none',
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

            <Tooltip
              title={
                <React.Fragment>
                  Ao fazer o upload de um&nbsp;
                  <b>arquivo </b>
                  com os mesmos dados de um outro&nbsp; existente, será
                  necessário&nbsp;
                  <b>sobrescrevê-lo </b>. Marque a caixa para ativar a
                  funcionalidade.
                </React.Fragment>
              }
              placement="bottom"
            >
              <FormGroup
                style={{
                  display: props.doc ? 'none' : 'flex',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(_, value) => {
                        setValue('substituirExistentes', value);
                      }}
                    />
                  }
                  label="Substituir existentes"
                />
              </FormGroup>
            </Tooltip>

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
                  disabled={uploadState === 'l'}
                  className={
                    uploadState === 'l'
                      ? 'secondary'
                      : uploadState === 's'
                      ? 'success'
                      : ''
                  }
                  tabIndex={props.sectionModalController === 1 ? 0 : -1}
                  type="submit"
                >
                  SALVAR
                </Button>
                {uploadState === 'l' && (
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
    </>
  );
};

export default Form;
