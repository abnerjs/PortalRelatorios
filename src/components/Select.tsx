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
    selected: string;
    setSelected: Function;
};

function makeOptions(
    s: string[],
    setPlaceholder: Function,
    setActive: Function,
    placeholder: string,
    defaultPlaceholder: string
) {
    let arr: ReactNode[] = [];

    if (placeholder !== "") {
        arr.push(
            <div
                className="option default"
                onClick={() => {
                    setActive(false);
                    setPlaceholder('');
                }}
            >
                {defaultPlaceholder}
            </div>
        );
    }

    for (let index = 0; index < s.length; index++) {
        arr.push(
            <div
                className="option"
                onClick={() => {
                    setActive(false);
                    setPlaceholder(s[index]);
                }}
            >
                {s[index]}
            </div>
        );
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

    function handleForm(e: any) {
        e.stopPropagation();
    }

    return (
        <div
            className={`Select${active ? " active" : ""}`}
            onFocus={
                active
                    ? handleForm
                    : () => {
                          setActive(true);
                      }
            }
            onMouseUp={
                active
                    ? handleForm
                    : () => {
                          setActive(true);
                      }
            }
            onBlur={
                active
                    ? handleForm
                    : () => {
                          setActive(false);
                      }
            }
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
                        <div
                            className={`placeholder${
                                props.selected !== '' ? " selected" : ""
                            }`}
                        >
                            {
                                props.selected !== ""
                                ? props.selected
                                : props.placeholder
                            }
                        </div>
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
                            ? makeOptions(
                                  props.options,
                                  props.setSelected,
                                  setActive,
                                  props.selected,
                                  props.placeholder
                              )
                            : ""}
                    </div>
                </div>

                <div className="form">
                    {props.children}

                    <div className="buttons">
                        <Button
                            tabIndex={-1}
                            content="SALVAR"
                            setFormOpened={setFormActive}
                        />
                        <Button
                            tabIndex={-1}
                            content="CANCELAR"
                            secondary
                            setFalse={setFormActive}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Select;
