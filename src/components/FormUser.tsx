import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Button from "./Button";
import "./FormUser.css";
import Input from "./Input";
import Select from "./Select";

function getInitialsFromName(s: string) {
    var arr: string[];
    arr = s.trim().split(' ');
    var aux: string = '';
    aux += arr[0].charAt(0);
    

    if(arr.length > 1)
        aux += arr[arr.length - 1].charAt(0);
    
    return aux;
}

type Props = {
    visible: boolean;
    setFormOpened: Function;
};

const FormUser = (props: Props) => {
    const [initial, setInitial] = useState('')

    const arr: string[] = ['teste1','teste2','teste3','teste4']

    function handleSubmit(e: any) {
        e.preventDefault();
    }

    return (
        <form className={`FormUser${props.visible?'':' invi'}`} onSubmit={handleSubmit}>
            <div className="sectionImage">
                <div className="image">
                    <div className="text"></div>
                    <div className="img">
                        {/*
                            <div
                                className="picture"
                                style={{
                                    backgroundImage:
                                        "url(https://picsum.photos/200)",
                                }}
                            ></div>
                        */}
                        <div className={`initial${initial !== '' ? ' active':''}`}>{initial}</div>
                        <Icon
                            icon="fluent:person-16-filled"
                            width={120}
                            className="icon"
                        />
                    </div>
                </div>
                <div className="inputs">
                    <Input placeholder="Nome"
                        onchange={(e: any) => {setInitial(getInitialsFromName(e.target.value))}}
                    />
                    <Input placeholder="Matrícula" />
                </div>
            </div>
            <Input type="email" placeholder="E-mail" />
            <Select placeholder='Selecione o perfil' options={arr}>
                <Input placeholder='Descrição do perfil' secondary />
                <div className="teste">
                    <div></div>
                </div>
                <div>blabala</div>
            </Select>
            <Input type="password" placeholder="Senha" />
            <Input type="password" placeholder="Repita a senha" />
            <div className="buttons">
                <Button content="SALVAR" />
                <Button secondary valueOpenForm={false} setFormOpened={props.setFormOpened} content="CANCELAR" />
            </div>
        </form>
    );
};

export default FormUser;
