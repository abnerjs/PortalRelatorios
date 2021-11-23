import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import brLocale from 'date-fns/locale/pt-BR';
import React, { useState } from 'react';
import Header from '../components/Header';
import Table, { LinkProps } from '../components/Table';
import './Dashboard.css';
import './Documentos.css';

import { useAppSelector } from 'src/store';
import Dropzone from 'react-dropzone';
import { Icon } from '@iconify/react';
import { TipoFiltro } from 'src/store/ducks/base/types';
import { Box } from '@mui/system';
import { DatePicker, DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Documentos = () => {
  const user = useAppSelector((state) => state.session.user);
  const [sectionModalController, setSectionModalController] = useState(0);
  const perfis = useAppSelector((state) => state.perfis.filterList);
  const [perfil, setPerfil] = useState<TipoFiltro | null>(null);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [file, setFile] = useState<File | null>(null);

  const [flag, setFlag] = useState('');

  function getObjetos(flgFiltro: string): Array<LinkProps> {
    const objetos: Array<LinkProps> = [];

    user?.lstSistemas?.forEach((sistema) =>
      sistema.lstTiposObjetos?.forEach((tipoObjeto) => {
        if (tipoObjeto.flgTipo === flgFiltro)
          tipoObjeto.lstObjetos?.forEach((objeto) => {
            objetos.push({
              name: objeto.desObjeto,
              linkTo: `/${objeto.nomPagina.toLowerCase()}`,
            });
          });
      })
    );

    return objetos;
  }

  const prestadores = getObjetos('P');
  const fornecedores = getObjetos('F');

  return (
    <div className="Dashboard">
      <div className="content">
        <div className="head">
          <Header title="Relatórios" />
          <Typography variant="subtitle1">
            Relatórios e demonstrativos disponíveis para consulta
          </Typography>
        </div>

        <Box sx={{ m: 0, position: 'relative' }} className="btnUpload">
          <Button
            variant="contained"
            type="submit"
            className={false ? 'secondary' : ''}
            style={{ marginTop: 8 }}
            onClick={() => {
              handleOpen();
            }}
          >
            UPLOAD DE RELATÓRIOS
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

        <Modal
          aria-labelledby="form-upload-reports"
          aria-describedby="dnd-reports"
          open={open}
          onClose={() => {
            handleClose();
            setFile(null);
            setSectionModalController(0);
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className="modalBox-root">
              <Typography variant="h6" component="h2">
                Upload de relatórios
              </Typography>

              <div className="dropfiles">
                <Dropzone
                  onDrop={(files) => {
                    setFile(files[files.length - 1]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="dropfilesContainer">
                      {file !== null ? (
                        <div className="dropzone dropzoneFilled">
                          <Card sx={{ ml: '20px' }}>
                            <CardContent>
                              <Icon
                                icon="fluent:document-bullet-list-20-regular"
                                width={30}
                              />
                              {/* <p className="date">{new Date().toDateString()}</p> */}
                              <h2 className="nameReg">
                                <textarea
                                  name=""
                                  id="nameReg"
                                  className="nameRegInput"
                                  wrap="hard"
                                  placeholder="Descrição do relatório"
                                  autoFocus
                                >
                                  {file.name}
                                </textarea>
                              </h2>
                            </CardContent>
                          </Card>

                          <form
                            onSubmit={(e) => {
                              setFile(null);
                              e.preventDefault();
                            }}
                            className="formUpload"
                          >
                            <div className="sectionController">
                              <div
                                className="sectionModal"
                                style={{
                                  marginLeft: `-${
                                    sectionModalController * 566
                                  }px`,
                                }}
                              >
                                <Autocomplete
                                  fullWidth
                                  blurOnSelect
                                  clearOnBlur
                                  selectOnFocus
                                  handleHomeEndKeys
                                  disableCloseOnSelect
                                  filterSelectedOptions
                                  openText="Abrir"
                                  closeText="Fechar"
                                  clearText="Limpar"
                                  loadingText="Carregando"
                                  noOptionsText="Sem opções"
                                  options={perfis}
                                  getOptionLabel={(option) => option.descricao}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Fornecedores"
                                      placeholder="Procurar..."
                                      margin="normal"
                                      variant="filled"
                                      className="secondary"
                                      InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                        inputProps: {
                                          ...params.inputProps,
                                          tabIndex:
                                            sectionModalController === 0
                                              ? 0
                                              : -1,
                                        },
                                      }}
                                    />
                                  )}
                                  value={perfil}
                                  onChange={(_, data) => {}}
                                />

                                <Autocomplete
                                  fullWidth
                                  blurOnSelect
                                  clearOnBlur
                                  selectOnFocus
                                  handleHomeEndKeys
                                  disableCloseOnSelect
                                  filterSelectedOptions
                                  openText="Abrir"
                                  closeText="Fechar"
                                  clearText="Limpar"
                                  loadingText="Carregando"
                                  noOptionsText="Sem opções"
                                  options={perfis}
                                  getOptionLabel={(option) => option.descricao}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Prestadores"
                                      placeholder="Procurar..."
                                      margin="normal"
                                      variant="filled"
                                      className="secondary"
                                      InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                        inputProps: {
                                          ...params.inputProps,
                                          tabIndex:
                                            sectionModalController === 0
                                              ? 0
                                              : -1,
                                        },
                                      }}
                                    />
                                  )}
                                  value={perfil}
                                  onChange={(_, data) => {}}
                                />

                                <Autocomplete
                                  fullWidth
                                  blurOnSelect
                                  clearOnBlur
                                  selectOnFocus
                                  handleHomeEndKeys
                                  disableCloseOnSelect
                                  filterSelectedOptions
                                  openText="Abrir"
                                  closeText="Fechar"
                                  clearText="Limpar"
                                  loadingText="Carregando"
                                  noOptionsText="Sem opções"
                                  options={perfis}
                                  getOptionLabel={(option) => option.descricao}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Selecione o tipo de arquivo"
                                      placeholder="Procurar..."
                                      margin="normal"
                                      variant="filled"
                                      className="secondary"
                                      InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                        inputProps: {
                                          ...params.inputProps,
                                          tabIndex:
                                            sectionModalController === 0
                                              ? 0
                                              : -1,
                                        },
                                      }}
                                    />
                                  )}
                                  value={perfil}
                                  onChange={(_, data) => {}}
                                />

                                <div className="buttons">
                                  <Button
                                    onClick={() => {
                                      setFile(null);
                                    }}
                                    variant="contained"
                                    className="secondary"
                                    fullWidth
                                    tabIndex={
                                      sectionModalController === 0 ? 0 : -1
                                    }
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
                                      className={
                                        flag === 'request' ? 'secondary' : ''
                                      }
                                      tabIndex={
                                        sectionModalController === 0 ? 0 : -1
                                      }
                                      onClick={() =>
                                        setSectionModalController(1)
                                      }
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
                                      tabIndex:
                                        sectionModalController === 1 ? 0 : -1,
                                    },
                                  }}
                                />

                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                  locale={brLocale}
                                >
                                  <DatePicker
                                    label="Ano"
                                    openTo="year"
                                    mask="____"
                                    inputFormat="yyyy"
                                    views={['year']}
                                    disableFuture
                                    disableMaskedInput={false}
                                    value={new Date()}
                                    onChange={(e: any) => {}}
                                    InputAdornmentProps={{
                                      style: {
                                        marginRight: '4px',
                                      },
                                    }}
                                    OpenPickerButtonProps={{
                                      tabIndex:
                                        sectionModalController === 1 ? 0 : -1,
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
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
                                          tabIndex:
                                            sectionModalController === 1
                                              ? 0
                                              : -1,
                                        }}
                                      />
                                    )}
                                  />
                                  <DatePicker
                                    label="Mês/Ano"
                                    openTo="year"
                                    mask="__/____"
                                    inputFormat="MM/yyyy"
                                    views={['year', 'month']}
                                    disableFuture
                                    disableMaskedInput={false}
                                    value={new Date()}
                                    onChange={(e: any) => {}}
                                    InputAdornmentProps={{
                                      style: {
                                        marginRight: '4px',
                                      },
                                    }}
                                    OpenPickerButtonProps={{
                                      tabIndex:
                                        sectionModalController === 1 ? 0 : -1,
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
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
                                          tabIndex:
                                            sectionModalController === 1
                                              ? 0
                                              : -1,
                                        }}
                                      />
                                    )}
                                  />

                                  <DateRangePicker
                                    mask="__/__/____"
                                    value={[null, null]}
                                    onChange={(e: any) => {}}
                                    startText="Data inicial"
                                    endText="Data final"
                                    renderInput={(startProps, endProps) => (
                                      <React.Fragment>
                                        <TextField
                                          {...startProps}
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
                                          }}
                                        />
                                        <Box sx={{ mx: '4px' }} />
                                        <TextField
                                          {...endProps}
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
                                          }}
                                        />
                                      </React.Fragment>
                                    )}
                                  />

                                  <DatePicker
                                    label="Data inicial"
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
                                      tabIndex:
                                        sectionModalController === 1 ? 0 : -1,
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
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
                                          tabIndex:
                                            sectionModalController === 1
                                              ? 0
                                              : -1,
                                        }}
                                      />
                                    )}
                                  />
                                </LocalizationProvider>

                                <div className="buttons">
                                  <Button
                                    onClick={() => {
                                      setSectionModalController(0);
                                    }}
                                    variant="contained"
                                    className="secondary"
                                    fullWidth
                                    tabIndex={
                                      sectionModalController === 1 ? 0 : -1
                                    }
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
                                      className={
                                        flag === 'request' ? 'secondary' : ''
                                      }
                                      tabIndex={
                                        sectionModalController === 1 ? 0 : -1
                                      }
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
                        </div>
                      ) : (
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <Icon
                            icon="fluent:arrow-upload-16-regular"
                            width={25}
                          />
                          <p>
                            CLIQUE OU ARRASTE UM ARQUIVO PARA EFETUAR UPLOAD
                          </p>
                        </div>
                      )}
                    </section>
                  )}
                </Dropzone>
              </div>
            </Box>
          </Fade>
        </Modal>

        <div className="row tables">
          <div className="column">
            {fornecedores.length !== 0 && (
              <Table arr={fornecedores} title="Para fornecedores" />
            )}
            {prestadores.length !== 0 && (
              <Table arr={prestadores} title="Para prestadores" />
            )}
          </div>
          <div className="column">
            <div className="filesTypes">
              {prestadores.length !== 0 && (
                <Table arr={prestadores} title="Tipo de arquivo X" />
              )}
              {prestadores.length !== 0 && (
                <Table arr={prestadores} title="Tipo de arquivo X" />
              )}
              {prestadores.length !== 0 && (
                <Table arr={prestadores} title="Tipo de arquivo X" />
              )}
              {prestadores.length !== 0 && (
                <Table arr={prestadores} title="Tipo de arquivo X" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
