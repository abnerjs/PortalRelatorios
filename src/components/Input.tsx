import { Icon } from "@iconify/react";
import React, { useState } from "react";
import "./Input.css";

function getInitialsFromName(s: string) {
    var arr: string[];
    arr = s.trim().split(" ");
    var aux: string = "";
    aux += arr[0].charAt(0);

    if (arr.length > 1) aux += arr[arr.length - 1].charAt(0);

    return aux;
}

type Props = {
    type?: string;
    secondary?: any;
    error?: any;
    height?: number;
    placeholder?: string;
    iconified?: any;
    onchange?: Function;
    changeSearch?: Function;
    icon?: string;
    tabIndex?: number;
};

function setIcon(b: boolean, focused: boolean, icon?: string) {
    return b ? (
        <Icon
            icon={icon ? icon : ""}
            width={25}
            className={`icon${focused ? " active" : ""}`}
        />
    ) : (
        ""
    );
}

const Input = (props: Props) => {
    const [focused, setFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("error");
        setFocused(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onchange) {props.onchange(getInitialsFromName(e.target.value))};
        (e.target.value!=='') ? setHasContent(true) : setHasContent(false);
        if (props.changeSearch) {props.changeSearch(e.target.value)};
    };

    return (
        <div className="form-group">
            {setIcon(props.iconified, focused, props.icon)}
            <label className="group">
                <div className={`label${props.iconified?' iconified':''}${focused?' focused':''}${hasContent?' hasContent':''}`}>{props.placeholder}</div>
                <input
                    tabIndex={props.tabIndex}
                    type={props.type ? props.type : "text"}
                    className={`Input${props.secondary ? " secondary" : ""}${
                        props.error ? " error" : ""
                    }`}
                    style={{
                        height: props.height ? props.height : 50 + "px",
                        padding: props.iconified ? "0 25px 0 45px" : "0 25px",
                        width: props.iconified
                            ? "calc(100% - 70px)"
                            : "calc(100% - 50px)",
                    }}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={() => setFocused(false)}
                />
            </label>
        </div>
    );
};

export default Input;
