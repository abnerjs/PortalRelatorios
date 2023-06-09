import 'src/pages/Login/Routes/Confirmation/Styles/index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';
import { Button, Typography } from '@mui/material';

const Confirmation: React.FC = (props: any) => {
  return (
    <form className="form Confirmation" action="">
      <Typography variant="h5" className="primary">
        Recuperação de senha
      </Typography>
      <div className="recoveryinfo">
        <p>Um código foi enviado para:</p>
        <span>r●●●●●●●●@gmail.com</span>
      </div>
      <ReactCodeInput fields={6} className="VerifyCodeInput" autoFocus={true} />
      <Link to="/change-password">
        <Button type="submit" variant="contained" fullWidth>
          CONFIRMAR
        </Button>
      </Link>
      <Link to="/">
        <Button variant="contained" className="secondary" style={{ marginTop: 8 }} fullWidth>
          CANCELAR
        </Button>
      </Link>
      <h4 className="hint">Caso não tenha acesso a esse email, entre em contato com um administrador do sistema.</h4>
    </form>
  );
};

export default Confirmation;
