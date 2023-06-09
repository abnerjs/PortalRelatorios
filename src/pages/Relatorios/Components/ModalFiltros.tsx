import { Icon } from '@iconify/react';
import {
  Box,
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
import { ListboxComponent, StyledPopper } from 'src/pages/Cadastros/VinculosUsuarios/Components/Autocomplete';
import { TipoFiltro } from 'src/store/ducks/base/types';
import './ModalFiltros.css';
import { DateRange, DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import { FiltrosRelatorios } from '../Gerenciamento';
import useResponsivity from 'src/hooks/useResponsivity';

type Props = {
  open: boolean;
  setOpen: Function;
  filtros: FiltrosRelatorios;
  setFiltros: Function;
  lstFornecedores: TipoFiltro[];
  lstPrestadores: TipoFiltro[];
  lstUsuarios?: TipoFiltro[];
  admin?: boolean;
};

const ModalUpload = (props: Props) => {
  const [focusForn, setFocusForn] = useState(false);
  const [focusPrest, setFocusPrest] = useState(false);

  const [users, setUsers] = useState<TipoFiltro | null>(null);
  const [forns, setFornecedores] = useState<TipoFiltro[]>([]);
  const [prests, setPrestadores] = useState<TipoFiltro[]>([]);
  const [isDatePickerOpened, setDatePickerOpened] = useState(false);
  const [datePeriodoRef, setDatePeriodoRef] = useState<DateRange<Date>>([null, null]);
  const [datePeriodoUp, setDatePeriodoUp] = useState<DateRange<Date>>([null, null]);
  const isMobileView = useResponsivity();

  return (
    <Modal
      aria-labelledby="form-upload-reports"
      aria-describedby="dnd-reports"
      open={props.open}
      onClose={() => {
        props.setOpen(false);
        setFornecedores(props.filtros.fornecedores || []);
        setPrestadores(props.filtros.prestadores || []);
        setDatePeriodoRef(props.filtros.periodoRef || [null, null]);
        setDatePeriodoUp(props.filtros.periodoUp || [null, null]);
        setUsers(props.lstUsuarios?.find((item) => item.codigo === `${props.filtros.usuarioUpload}`) || null);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={props.open}>
        <Box className={`modalBox-root filter${isDatePickerOpened ? ' dateOpened' : ''}`}>
          <div className="formFields">
            <Autocomplete
              fullWidth
              style={{
                display: props.admin ? 'flex' : 'none',
              }}
              ChipProps={{ size: 'small' }}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              noOptionsText="Nenhum usuário"
              options={props.lstUsuarios || []}
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
                    label="Responsável pelo upload"
                    variant="filled"
                    margin="none"
                    className="secondary DmTextField"
                    InputProps={{
                      ...restInputProps,
                      disableUnderline: true,
                      inputProps: {
                        ...params.inputProps,
                        id: 'idRelUsuarioUpload',
                      },
                    }}
                  />
                );
              }}
              value={users}
              onChange={(_, data) => {
                setUsers(data);
              }}
              isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            />

            <Autocomplete
              multiple
              fullWidth
              ChipProps={{ size: 'small' }}
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              noOptionsText="Nenhum fornecedor"
              options={props.lstFornecedores}
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
                    style={{
                      marginBottom: 0,
                    }}
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
                      },
                    }}
                    InputLabelProps={{
                      shrink: forns.length > 0 || focusForn,
                    }}
                    onFocus={() => setFocusForn(true)}
                    onBlur={() => setFocusForn(false)}
                  />
                );
              }}
              value={forns}
              onChange={(_, data) => {
                setFornecedores(data);
              }}
              isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            />

            <Autocomplete
              multiple
              fullWidth
              noOptionsText="Nenhum prestador"
              PopperComponent={StyledPopper}
              ListboxComponent={ListboxComponent}
              options={props.lstPrestadores}
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
                    fullWidth
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
                      },
                    }}
                    InputLabelProps={{
                      shrink: prests.length > 0 || focusPrest,
                    }}
                    onFocus={() => setFocusPrest(true)}
                    onBlur={() => setFocusPrest(false)}
                  />
                );
              }}
              value={prests}
              onChange={(_, data) => {
                setPrestadores(data);
              }}
              isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            />

            <div className="row">
              <Typography variant="body1" className="label-tooltip">
                Período da referência
              </Typography>
              <div className="tooltip">
                <Tooltip
                  title={
                    <React.Fragment>
                      Ao selecionar uma data do tipo&nbsp;
                      <b>
                        <em>{'dia/mês/ano'}</em>
                      </b>
                      ,&nbsp; referências do tipo{' '}
                      <b>
                        <em>{'mês/ano'}</em>
                      </b>
                      &nbsp;e{' '}
                      <b>
                        <em>{'ano'}</em>
                      </b>
                      &nbsp; também serão incluídas.
                    </React.Fragment>
                  }
                  placement={isMobileView ? 'top' : 'right'}
                  enterTouchDelay={75}
                >
                  <IconButton>
                    <Icon icon="fluent:question-16-filled" width={15} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
              <DateRangePicker
                startText="Data inicial"
                endText="Data final"
                cancelText="CANCELAR"
                clearText="Limpar"
                okText="OK"
                toolbarTitle="SELECIONAR PERÍODO"
                desktopModeMediaQuery="@media (min-height: 770px) and (min-width: 1255px)"
                mask="__/__/____"
                className="modalDateRangePicker"
                onOpen={() => setDatePickerOpened(true)}
                onClose={() => setDatePickerOpened(false)}
                value={datePeriodoRef}
                onChange={(value) => {
                  setDatePeriodoRef(value);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      {...startProps}
                      margin="none"
                      variant="filled"
                      fullWidth
                      className="secondary DmTextField"
                      InputProps={{
                        ...startProps.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...startProps.inputProps,
                        placeholder: 'dd/mm/aaaa',
                      }}
                    />
                    <Box sx={{ width: '20px' }} />
                    <TextField
                      {...endProps}
                      margin="none"
                      variant="filled"
                      fullWidth
                      className="secondary DmTextField"
                      InputProps={{
                        ...endProps.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...endProps.inputProps,
                        placeholder: 'dd/mm/aaaa',
                      }}
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>

            <div className="row">
              <Typography variant="body1">Período do upload</Typography>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
              <DateRangePicker
                startText="Data inicial"
                endText="Data final"
                cancelText="CANCELAR"
                clearText="Limpar"
                okText="OK"
                toolbarTitle="SELECIONAR PERÍODO"
                desktopModeMediaQuery="@media (min-height: 770px) and (min-width: 1255px)"
                mask="__/__/____"
                className="modalDateRangePicker"
                onOpen={() => setDatePickerOpened(true)}
                onClose={() => setDatePickerOpened(false)}
                value={datePeriodoUp}
                onChange={(value) => {
                  setDatePeriodoUp(value);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField
                      {...startProps}
                      margin="none"
                      variant="filled"
                      fullWidth
                      className="secondary DmTextField"
                      InputProps={{
                        ...startProps.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...startProps.inputProps,
                        placeholder: 'dd/mm/aaaa',
                      }}
                    />
                    <Box sx={{ width: '20px' }} />
                    <TextField
                      {...endProps}
                      margin="none"
                      variant="filled"
                      fullWidth
                      className="secondary DmTextField"
                      InputProps={{
                        ...endProps.InputProps,
                        disableUnderline: true,
                      }}
                      inputProps={{
                        ...endProps.inputProps,
                        placeholder: 'dd/mm/aaaa',
                      }}
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="modal buttons">
            <Button
              variant="contained"
              className="secondary"
              fullWidth
              onClick={() => {
                props.setOpen(false);
                setFornecedores(props.filtros.fornecedores || []);
                setPrestadores(props.filtros.prestadores || []);
                setDatePeriodoRef(props.filtros.periodoRef || [null, null]);
                setDatePeriodoUp(props.filtros.periodoUp || [null, null]);
                setUsers(props.lstUsuarios?.find((item) => item.codigo === `${props.filtros.usuarioUpload}`) || null);
              }}
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
                disabled={false}
                className={false ? 'secondary' : false ? 'success' : ''}
                type="submit"
                onClick={() => {
                  props.setFiltros({
                    ...props.filtros,
                    descricao: props.filtros.descricao,
                    usuarioUpload: !props.admin ? props.filtros.usuarioUpload : users?.codigo,
                    fornecedores: forns,
                    prestadores: prests,
                    periodoRef: datePeriodoRef,
                    periodoUp: datePeriodoUp,
                  });
                  props.setOpen(false);
                }}
              >
                SALVAR
              </Button>
              {false && (
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
          <div className="btnLimparFiltros">
            <Button
              variant="contained"
              className="default"
              fullWidth
              onClick={() => {
                props.setOpen(false);
                setFornecedores([]);
                setPrestadores([]);
                setDatePeriodoRef([null, null]);
                setDatePeriodoUp([null, null]);
                setUsers(null);
                props.setFiltros({
                  ...props.filtros,
                  descricao: props.filtros.descricao,
                  usuarioUpload: !props.admin ? props.filtros.usuarioUpload : undefined,
                  fornecedores: [],
                  prestadores: [],
                  periodoRef: [null, null],
                  periodoUp: [null, null],
                });
              }}
            >
              limpar filtros
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpload;
