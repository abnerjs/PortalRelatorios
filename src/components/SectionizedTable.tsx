import { Icon } from "@iconify/react";
import React, { useState } from "react";
import CRUDButton from "./CRUDButton";
import Input from "./Input";
import "./SectionizedTable.css";

function rows(rowsNum: number) {
    let arr: any[] = [];

    for (let index = 0; index < rowsNum; index++) {
        arr.push(
            <div className="row">
                {
                    //se o usuario tiver foto, mostra ela, se não, mostra as iniciais
                    //arr[index].img? <img src="" alt="" /> : <div className="img"></div>
                }
                <div className="header">
                    <div className="image">
                        <div className="img">AS</div>
                    </div>
                    <div className="nome">Abner José da Silva</div>
                    <div className="matricula">1020305</div>
                    <div className="email">abner@datamob.com.br</div>
                    <Icon
                        icon="fluent:chevron-right-16-filled"
                        width={16}
                        className="icon"
                    />
                </div>
            </div>
        );
    }

    return arr;
}

const SectionizedTable = () => {
    const [tipoUsuario, setTipoUsuario] = useState("interno");
    return (
        <div className="SectionizedTable">
            <div className="tabs">
                <div
                    className={`option${
                        tipoUsuario === "interno" ? " active" : ""
                    }`}
                    onClick={() => setTipoUsuario("interno")}
                >
                    INTERNO
                </div>
                <div
                    className={`option${
                        tipoUsuario === "externo" ? " active" : ""
                    }`}
                    onClick={() => setTipoUsuario("externo")}
                >
                    EXTERNO
                </div>
                <div
                    className={`selector${
                        tipoUsuario === "externo" ? " active" : ""
                    }`}
                ></div>
            </div>
            <div className="search">
                <Input
                    placeholder={
                        tipoUsuario === "interno"
                            ? "Nome, matrícula ou e-mail"
                            : "Nome, CPF, CPNJ ou e-mail"
                    }
                    iconified
                />
                <Icon
                    icon="fluent:search-12-regular"
                    width={25}
                    className="icon"
                />
            </div>
            <CRUDButton content="novo usuário" />
            <div className="rows">{rows(25)}</div>
        </div>
    );
};

export default SectionizedTable;
