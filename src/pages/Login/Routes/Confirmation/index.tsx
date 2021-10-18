import 'src/pages/Login/Routes/Confirmation/Styles/index.css';

import React from 'react';
import { Link } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';

import Button from 'src/components/Button';
import Title from 'src/components/Title';

const Confirmation: React.FC = (props: any) => {
  return (
    <form className="form Confirmation" action="">
      <Title content="Recuperação de senha" primaryColor />
      <div className="recoveryinfo">
        <p>Um código foi enviado para:</p>
        <span>r●●●●●●●●@gmail.com</span>
      </div>
      <ReactCodeInput fields={6} className="VerifyCodeInput" autoFocus={true} />
      <Link to="/change-password">
        <Button content="CONFIRMAR" />
      </Link>
      <Link to="/">
        <Button secondary content="CANCELAR" />
      </Link>
      <h4 className="hint">
        Caso não tenha acesso a esse email, entre em contato com um
        administrador do sistema.
      </h4>
    </form>
  );
};

export default Confirmation;
