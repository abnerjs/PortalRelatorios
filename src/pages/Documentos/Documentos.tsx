import {
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import Header from 'src/components/Header';
import Table, { LinkProps } from 'src/components/Table';
import '../Dashboard.css';
import './Documentos.css';
import { useAppSelector } from 'src/store';
import { Box } from '@mui/system';
import ModalUpload from './Components/ModalUpload';





const Documentos = () => {
  const user = useAppSelector((state) => state.session.user);
  const [open, setOpen] = React.useState(false);

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
              setOpen(true);
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

        <ModalUpload open={open} setOpen={setOpen} />

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
