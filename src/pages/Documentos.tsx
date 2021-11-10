import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
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

const Documentos = () => {
  const user = useAppSelector((state) => state.session.user);

  const perfis = useAppSelector((state) => state.perfis.filterList);
  const [perfil, setPerfil] = useState<TipoFiltro | null>(null);

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
                      <Card sx={{ ml: '10px', mr: '20px' }}>
                        <CardContent>
                          <Icon
                            icon="fluent:document-bullet-list-20-regular"
                            width={30}
                          />
                          {/* <p className="date">{new Date().toDateString()}</p> */}
                          <h2 className="nameReg">
                            {'Demonstrativo Folha de Pagamento Fornecedores'}
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
                        <TextField
                          id="desPerfil"
                          fullWidth
                          label="Destinatário"
                          color="primary"
                          margin="normal"
                          variant="filled"
                          InputProps={{
                            disableUnderline: true,
                          }}
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
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                                inputProps: {
                                  ...params.inputProps,
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
                          >
                            CANCELAR
                          </Button>
                          <Box sx={{ width: '20px' }} />
                          <Box
                            sx={{ m: 0, position: 'relative', width: '100%' }}
                          >
                            <Button
                              variant="contained"
                              fullWidth
                              disabled={flag === 'request'}
                              type="submit"
                              className={flag === 'request' ? 'secondary' : ''}
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
                      </form>
                    </div>
                  ) : (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <Icon icon="fluent:arrow-upload-16-regular" width={25} />
                      <p>CLIQUE OU ARRASTE UM ARQUIVO PARA EFETUAR UPLOAD</p>
                    </div>
                  )}
              </section>
            )}
          </Dropzone>
        </div>

        <div className="row tables">
          {prestadores.length !== 0 && (
            <Table arr={prestadores} title="Para prestadores" />
          )}
          {fornecedores.length !== 0 && (
            <Table arr={fornecedores} title="Para fornecedores" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentos;
