import React from 'react'
import './Confirmation.css'
import Button from '../../components/Button'
import Title from '../../components/Title'
import VerifyCodeInput from '../../components/VerifyCodeInput'
import { Link } from 'react-router-dom'

const Confirmation = props => {
    return (
        <form className="form Confirmation" action="">
            <Title content="Recuperação de senha" primaryColor />
            <div className="recoveryinfo">
                <p>Um código foi enviado para:</p>
                <span>r●●●●●●●●@gmail.com</span>
            </div>
            <VerifyCodeInput />
            <Button content="CONFIRMAR" />
            <Link to='/'><Button secondary content="CANCELAR" /></Link>
            <h4 className="hint">
                Caso não tenha acesso a esse email, entre em
                contato com um administrador do sistema.
            </h4>
        </form>
    )
}

export default Confirmation