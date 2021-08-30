import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { ReactNode } from "react";
import "./Select.css";

type Props = {
    options?: string[];
    placeholder: string;
};

function makeOptions(s: string[], placeholder: string) {
    let arr: ReactNode[] = [];
    for (let index = 0; index < s.length; index++) {
        arr.push(<div>{s[index]}</div>);
    }

    return arr;
}

const Select: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState(false);

    return (
        <div
            className={`Select${active ? " active" : ""}`}
            onClick={() => {
                setActive(!active);
            }}
        >
            <div className="controller">
                <div className="placeholder">{props.placeholder}</div>
                <Icon
                    icon="fluent:chevron-right-16-filled"
                    width={25}
                    className={`SelectWrapper${active ? " active" : ""}`}
                />
            </div>
            <div className="options">
                {props.options
                    ? makeOptions(props.options, props.placeholder)
                    : ""}
            </div>
        </div>
    );
};

export default Select;
