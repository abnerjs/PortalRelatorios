import React from 'react'
import './Login.css'
import Button from '../../components/Button'
import Title from '../../components/Title'
import Input from '../../components/Input'
import Checkbox from '../../components/Checkbox'
import { Link } from 'react-router-dom'

const Login: React.FC = (props: any) => {
    return (
        <form className="form Login" action="">
            <Title content="Acessar" primaryColor />
            <Input secondary placeholder="Matrícula, CPF, CNPJ ou email" />
            <Input secondary type="password" placeholder="Senha" />
            <Checkbox content='Manter conectado' />
            <Button content="ENTRAR" />
            <Link className='forgot' to="/recovery">Esqueceu a senha?</Link>
        </form>
    )
}

export default Login