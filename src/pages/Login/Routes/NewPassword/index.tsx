import 'src/pages/Login/Routes/NewPassword/Styles/index.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Title from 'src/components/Title';

const NewPassword: React.FC = (props: any) => {
  return (
    <form className="form NewPassword" action="">
      <Title content="Recuperação de senha" primaryColor />
      <Input
        autoFocus
        id="senha"
        secondary
        type="password"
        placeholder="Nova senha"
      />
      <Input
        id="c-senha"
        secondary
        type="password"
        placeholder="Confirmar senha"
        error
      />
      <Link to="/">
        <Button content="SALVAR" />
      </Link>
      <Link to="/">
        <Button secondary content="CANCELAR" />
      </Link>
    </form>
  );
};

export default NewPassword;