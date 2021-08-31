import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { ReactNode } from "react";
import useOutsideClick from "src/hooks/useOutsideClick";
import Button from "./Button";
import "./Select.css";
import SelectButton from "./SelectButton";

type Props = {
    options?: string[];
    placeholder: string;
    children: React.ReactChild[];
};

function makeOptions(s: string[], placeholder: string, setActive: Function) {
    let arr: ReactNode[] = [];
    for (let index = 0; index < s.length; index++) {
        arr.push(<div className="option"
            onClick={() => setActive(false)}
        >
            {s[index]}
        </div>);
    }

    return arr;
}

const Select: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState(false);
    const ref = useRef(null);
    const [formActive, setFormActive] = useState(false);

    useOutsideClick(ref, () => {
        setActive(false);
        setFormActive(false);
    });

    function handleSubmit() {
    }

    return (
        <div
            className={`Select${active ? " active" : ""}`}
            onClick={active?handleSubmit:() => {
                setActive(true);
            }}
            ref={ref}
        >
            <div className="cardsController">
                <div className={`mainSection${formActive ? " inactive" : ""}`}>
                    <div className="controller">
                        <div className="newprofile">
                            <SelectButton
                                active={active}
                                content="Novo perfil"
                                onclick={active ? setFormActive : setActive}
                            />
                        </div>
                        <div className="placeholder">{props.placeholder}</div>
                        <Icon
                            icon="fluent:chevron-right-16-filled"
                            width={25}
                            className={`SelectWrapper${
                                active ? " active" : ""
                            }`}
                        />
                    </div>
                    <div
                        className="options"
                        style={{
                            height:
                                (props.children.length - 1) * 29 + 70 + "px",
                        }}
                    >
                        {props.options
                            ? makeOptions(props.options, props.placeholder, setActive)
                            : ""}
                    </div>
                </div>

                <div className="form">
                    {props.children}

                    <div className="buttons">
                        <Button content="SALVAR"
                            setFormOpened={setFormActive}
                        />
                        <Button content="CANCELAR" secondary
                            setFalse={setFormActive}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Select;
