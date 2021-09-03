import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import "./FormUser.css";
import Input from "./Input";
import Select from "./Select";
import Title from "./Title";

type Props = {
    visible: boolean;
    setFormOpened: Function;
    userSelected?: any;
    setUserSelected: Function;
    setNewUserSection?: Function;
};

const FormUser = (props: Props) => {
    const [initial, setInitial] = useState("");
    const [selected, setSelected] = useState('');

    const arr: string[] = ["teste1", "teste2", "teste3", "teste4"];

    function handleSubmit(e: any) {
        e.preventDefault();
    }

    return (
        <form
            className={`FormUser${props.visible ? "" : " invi"}`}
            onSubmit={handleSubmit}
        >
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
                        <div
                            className={`initial${
                                initial !== "" ? " active" : ""
                            }`}
                        >
                            {initial}
                        </div>
                        <Icon
                            icon="fluent:person-16-filled"
                            width={120}
                            className="icon"
                        />
                    </div>
                </div>
                <div className="inputs">
                    <Input
                        id="nome"
                        placeholder="Nome"
                        onchange={setInitial}
                    />
                    <Input id="matricula" placeholder="Matrícula" />
                </div>
            </div>
            <Input id="email" type="email" placeholder="E-mail" />
            <Select placeholder="Selecione o perfil"
                options={arr}
                selected={selected}
                setSelected={setSelected}
            >
                <Input id="perfil" tabIndex={-1} placeholder="Descrição do perfil" secondary />
                <Checkbox
                    uppercase
                    id="usuarios"
                    content="Cadastro de usuários"
                />
                <Checkbox uppercase id="logs" content="Acesso aos logs" />
                <Checkbox
                    uppercase
                    id="arquivos"
                    content="Upload de arquivos"
                />
                <Title width={18} content="Tipos de arquivos" />
            </Select>
            <Input id="senha" type="password" placeholder="Senha" />
            <Input id="r-senha" type="password" placeholder="Repita a senha" />
            <div className="buttons">
                <Button content="SALVAR" />
                <Button
                    secondary
                    valueOpenForm={false}
                    setFormOpened={props.setFormOpened}
                    content="CANCELAR"
                    setSelectSelected={setSelected}
                    setUserSelected={props.setUserSelected}
                />
            </div>
        </form>
    );
};

export default FormUser;
