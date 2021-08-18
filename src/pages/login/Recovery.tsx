import React from 'react'
import './Recovery.css'
import Button from '../../components/Button'
import Title from '../../components/Title'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

const Recovery: React.FC = (props: any) => {
    return (
        <form className="form" action="">
            <Title content="Recuperação de senha" primaryColor />
            <div className="recoveryinfo">
                <p>Insira algum dado em que sua conta esteja associada</p>
            </div>
            <Input secondary placeholder="Matrícula, CPF, CNPJ ou email" />
            <Link to='/confirmation'><Button content="ENVIAR" /></Link>
            <Link to='/'><Button secondary content="CANCELAR" /></Link>
            <h4 className="hint">
                Caso não tenha acesso a essa informação, entre em
                contato com um administrador do sistema.
            </h4>
        </form>
    )
}

export default Recovery