import React from "react";
import { ReactNode } from "react";
import "./Select.css";

type Props = {
    options?: string[];
    placeholder?: string;
};

function makeOptions(s: string[]) {
    let arr: ReactNode[] = [];
    for (let index = 0; index < s.length; index++) {
        arr.push(<option value={s[index].toLowerCase()}>{s[index]}</option>);
    }

    return <div></div>;
}

const Select: React.FC<Props> = (props: Props) => {
    return (
        <>  
            <label htmlFor="cars">Choose a car:</label>
            <select name='select' className="Select">
                {props.options ? makeOptions(props.options) : ""}
            </select>
        </>
    );
};

export default Select;
