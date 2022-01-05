import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import {
  ListboxComponent,
  StyledPopper,
} from 'src/pages/Cadastros/VinculosUsuarios/Components/Autocomplete';
import { useAppDispatch, useAppSelector } from 'src/store';
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { TipoFiltro } from 'src/store/ducks/base/types';
import './ModalFiltros.css';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import brLocale from 'date-fns/locale/pt-BR';
import { FiltrosRelatorios } from '../Gerenciamento';
import { usuariosGetFilterRequest } from 'src/store/ducks/usuarios';
import { prestadoresGetFilterRequest } from 'src/store/ducks/prestadores';
import { fornecedoresGetFilterRequest } from 'src/store/ducks/fornecedores';

type Props = {
  open: boolean;
  setOpen: Function;
  filtros: FiltrosRelatorios;
  setFiltros: Function;
  admin?: boolean;
};

const ModalUpload = (props: Props) => {
  const [focusForn, setFocusForn] = useState(false);
  const [focusPrest, setFocusPrest] = useState(false);
  const [focusUsers, setFocusUsers] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fornecedoresGetFilterRequest());
    dispatch(prestadoresGetFilterRequest());
    dispatch(usuariosGetFilterRequest());
  }, [dispatch]);

  const lstFornecedores = useAppSelector(
    (state) => state.fornecedores.filterList
  );
  const lstPrestadores = useAppSelector(
    (state) => state.prestadores.filterList
  );
  const lstUsuarios = useAppSelector((state) => state.usuarios.filterList);

  const [users, setUsers] = useState<TipoFiltro[]>([]);
  const [forns, setFornecedores] = useState<TipoFiltro[]>([]);
  const [prests, setPrestadores] = useState<TipoFiltro[]>([]);
  const [isDatePickerOpened, setDatePickerOpened] = useState(false);
  const [datePeriodoRef, setDatePeriodoRef] = useState<DateRange<Date>>([
    null,
    null,
  ]);
  const [datePeriodoUp, setDatePeriodoUp] = useState<DateRange<Date>>([
    null,
    null,
  ]);

  useEffect(() => {
    console.log(lstFornecedores);
  }, [lstFornecedores])

  return (
    <Modal
      aria-labelledby="form-upload-reports"
      aria-describedby="dnd-reports"
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={props.open}>
        <Box
          className={`modalBox-root filter${
            isDatePickerOpened ? ' dateOpened' : ' teste'
          }`}
        >
          <Autocomplete
            multiple
            fullWidth
            style={{
              display: props.admin ? 'flex' : 'none',
            }}
            ChipProps={{ size: 'small' }}
            PopperComponent={StyledPopper}
            ListboxComponent={ListboxComponent}
            noOptionsText="Nenhum usuário"
            options={lstUsuarios}
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
                          marginLeft: 8,
                          overflowY: 'auto',
                        }}
                      >
                        {startAdornment}
                      </div>
                    ),
                    inputProps: {
                      ...params.inputProps,
                      id: 'idRelUsuarioUpload',
                    },
                  }}
                  InputLabelProps={{
                    shrink: users.length > 0 || focusUsers,
                  }}
                  onFocus={() => setFocusUsers(true)}
                  onBlur={() => setFocusUsers(false)}
                />
              );
            }}
            value={users}
            onChange={(_, data) => {
              setUsers(data);
            }}
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
          />

          <Autocomplete
            multiple
            fullWidth
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
                          marginLeft: 8,
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
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
          />

          <Autocomplete
            multiple
            fullWidth
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
                          marginLeft: 8,
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
            isOptionEqualToValue={(option, value) =>
              option.codigo === value.codigo
            }
          />

          <div className="row">
            <Typography variant="body1" className="label-tooltip">
              Período da referência
            </Typography>
            <div className="tooltip">
              <Icon icon="fluent:question-16-filled" width={15} />
            </div>
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
            <DateRangePicker
              startText="Data inicial"
              endText="Data final"
              mask="__/__/____"
              className="modalDateRangePicker"
              onOpen={() => setDatePickerOpened(true)}
              onClose={() => setDatePickerOpened(false)}
              PopperProps={{
                disablePortal: true,
                className: 'dateRangePickerModal',
              }}
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
                    className="secondary"
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
                    className="secondary"
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
              mask="__/__/____"
              className="modalDateRangePicker"
              onOpen={() => setDatePickerOpened(true)}
              onClose={() => setDatePickerOpened(false)}
              PopperProps={{
                disablePortal: true,
                className: 'dateRangePickerModal',
                placement: 'auto',
                popperOptions: {
                  strategy: 'absolute',
                },
              }}
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
                    className="secondary"
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
                    className="secondary"
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

          <div className="modal buttons">
            <Button
              variant="contained"
              className="secondary"
              fullWidth
              onClick={() => props.setOpen(false)}
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
                disabled={false}
                className={false ? 'secondary' : false ? 'success' : ''}
                type="submit"
                onClick={() => {
                  props.setFiltros({
                    descricao: props.filtros.descricao,
                    usuarioUpload: props.admin ? props.filtros.usuarioUpload : users,
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalUpload;
