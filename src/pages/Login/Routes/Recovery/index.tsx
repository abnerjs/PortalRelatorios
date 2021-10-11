import 'src/pages/Login/Routes/Recovery/Styles/index.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Title from 'src/components/Title';

const Recovery: React.FC = (props: any) => {
  return (
    <form className="form" action="">
      <Title content="Recuperação de senha" primaryColor />
      <div className="recoveryinfo">
        <p>Insira algum dado em que sua conta esteja associada</p>
      </div>
      <Input
        autoFocus
        id="login"
        secondary
        placeholder="Matrícula, CPF, CNPJ ou email"
      />
      <Link to="/confirmation">
        <Button content="ENVIAR" />
      </Link>
      <Link to="/">
        <Button secondary content="CANCELAR" />
      </Link>
      <h4 className="hint">
        Caso não tenha acesso a essa informação, entre em contato com um
        administrador do sistema.
      </h4>
    </form>
  );
};

export default Recovery;
