import { Icon } from "@iconify/react";
import React, { useState } from "react";
import CRUDButton from "./CRUDButton";
import Input from "./Input";
import "./SectionizedTable.css";

function rows(
    rowsNum: number,
    searchText: string,
    setFormOpened: Function,
    indexSelected: number,
    setIndexSelected: Function
) {
    let arr: any[] = [];

    for (let index = 0; index < rowsNum; index++) {
        arr.push(
            <div
                className={`row${indexSelected === index ? " selected" : ""}`}
                onClick={() => {
                    setFormOpened(true);
                    setIndexSelected(index);
                }}
            >
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

type Props = {
    setFormOpened: Function;
    isFormOpened: boolean;
    setUserSelected: Function;
    userSelected?: any;
    setNewUserSection: Function;
    newUserSection?: boolean;
};

const SectionizedTable = (props: Props) => {
    const [tipoUsuario, setTipoUsuario] = useState("interno");
    const [searchText, setSearchText] = useState("");

    return (
        <div
            className={`SectionizedTable${
                props.isFormOpened ? "" : " formInvi"
            }`}
        >
            <div className={`tabs${props.isFormOpened ? "" : " middle"}`}>
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
                    id="searchField"
                    placeholder={
                        tipoUsuario === "interno"
                            ? "Nome, matrícula ou e-mail"
                            : "Nome, CPF, CPNJ ou e-mail"
                    }
                    iconified
                    icon="fluent:search-12-regular"
                    changeSearch={setSearchText}
                />
            </div>
            <CRUDButton
                newUserSection={props.newUserSection}
                setNewUserSection={props.setNewUserSection}
                setFormOpened={props.setFormOpened}
                isFormOpened={props.isFormOpened}
                content="novo usuário"
            />
            <div className="rows">
                {rows(
                    25,
                    searchText,
                    props.setFormOpened,
                    props.userSelected,
                    props.setUserSelected
                )}
            </div>
        </div>
    );
};

export default SectionizedTable;
