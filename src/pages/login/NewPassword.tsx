import React from 'react'
import './NewPassword.css'
import Button from '../../components/Button'
import Title from '../../components/Title'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

const NewPassword: React.FC = (props: any) => {
    return (
        <form className="form NewPassword" action="">
            <Title content="Recuperação de senha" primaryColor />
            <Input secondary type="password" placeholder="Nova senha" />
            <Input secondary type="password" placeholder="Confirmar senha" error />
            <Link to='/'><Button content="SALVAR" /></Link>
            <Link to='/'><Button secondary content="CANCELAR" /></Link>
        </form>
    )
}

export default NewPassword