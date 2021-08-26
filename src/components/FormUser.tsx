import { Icon } from "@iconify/react";
import React from "react";
import Button from "./Button";
import "./FormUser.css";
import Input from "./Input";

const FormUser = () => {
    return (
        <form className="FormUser">
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
                        <div className="initial">RL</div>
                        <Icon
                            icon="fluent:person-16-filled"
                            width={120}
                            className="icon"
                        />
                    </div>
                </div>
                <div className="inputs">
                    <Input placeholder="Nome" />
                    <Input placeholder="Matrícula" />
                </div>
            </div>
            <Input type="email" placeholder="E-mail" />
            <Input type="password" placeholder="Senha" />
            <Input type="password" placeholder="Repita a senha" />
            <div className="buttons">
                <Button content="SALVAR" />
                <Button secondary content="CANCELAR" />
            </div>
        </form>
    );
};

export default FormUser;
