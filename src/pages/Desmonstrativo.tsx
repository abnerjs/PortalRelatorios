import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Header from 'src/components/Header';
import Select from 'src/components/Select';
import Title from 'src/components/Title';
import { getInitialsFromString } from 'src/utils/StringUtils';
import './Usuarios.css';
import './FormUser.css';
import './SectionizedTable.css';
import jsonFile from 'src/testing/fakeData/users.json';
import DmIconifiedSwitch from 'src/components/DmIconifiedSwitch/DmIconifiedSwitch';

interface Usuario {
  idRelUsuario: number;
  idRelPerfil: number;
  desNome: string;
  desEmail: string;
  desLogin: string;
  desSenha: string;
  desCpfCnpj: string;
  codColaborador: string;
  flgTipo: string;
  flgAtivo: string;
}

const Demonstrativo = () => {
  const [isFormOpened, setFormOpened] = useState(false);

  const arr: string[] = ['teste1', 'teste2', 'teste3', 'teste4'];

  const [open, setOpen] = React.useState(false);

  return (
    <div className="Usuarios">
      <div className="content">
        <div className="head">
          <Header title="Usuários" />
          <Typography variant="subtitle1">
            Todos os usuários do sistema
          </Typography>
        </div>

        <div className="row">
          <div className={`SectionizedTable formInvi`}>
          <TextField
              id="email"
              fullWidth
              color="primary"
              label="E-mail"
              autoComplete="none"
              type="email"
              InputProps={{
                disableUnderline: true,
                inputProps: { tabIndex: isFormOpened ? 0 : -1 },
              }}
              variant="filled"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demonstrativo;
