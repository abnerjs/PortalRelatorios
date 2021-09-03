import React from "react";
import "./Button.css";

type Props = {
    secondary?: any;
    height?: number;
    content?: string;
    setFormOpened?: Function;
    setFalse?: Function;
    valueOpenForm?: boolean;
    placeholder?: string;
    setSelectSelected?: Function;
    setUserSelected?: Function;
    tabIndex?: number;
};

const Button = (props: Props) => {
    return (
        <button tabIndex={props.tabIndex}
            className={`Button ${props.secondary ? "secondary" : "primary"}`}
            style={{
                height: props.height ? props.height : 50 + "px",
            }}
            onClick={() => {
                if (props.setFormOpened) {
                    props.setFormOpened(false);
                }
                if (props.setFalse) {
                    props.setFalse(false);
                }
                if (props.setSelectSelected) {
                    props.setSelectSelected('');
                }
                if (props.setUserSelected) {
                    props.setUserSelected(-1);
                }
            }}
        >
            {props.content}
        </button>
    );
};

export default Button;
