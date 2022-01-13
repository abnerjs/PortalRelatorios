import 'src/pages/Login/Routes/NewPassword/Styles/index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const NewPassword: React.FC = (props: any) => {
  return (
    <form className="form NewPassword" action="">
      <Typography variant="h5" className="primary">
        Recuperação de senha
      </Typography>
      <TextField
        id="desNovaSenha"
        fullWidth
        label="Nova senha"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
      />
      <TextField
        id="desConfirmarSenha"
        fullWidth
        label="Confirmar senha"
        color="primary"
        margin="dense"
        variant="filled"
        className="secondary"
        type="password"
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Link to="/">
        <Button type="submit" variant="contained">
          SALVAR
        </Button>
      </Link>
      <Link to="/">
        <Button
          variant="contained"
          className="secondary"
          style={{ marginTop: 8 }}
        >
          CANCELAR
        </Button>
      </Link>
    </form>
  );
};

export default NewPassword;
