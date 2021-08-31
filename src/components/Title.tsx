import React from "react";
import "./Title.css";

type Props = {
    primaryColor?: any;
    subsection?: any;
    content?: string;
    width?: number;
};

const Title = (props: Props) => {
    return (
        <div
            className={`Title${props.primaryColor ? " primary" : ""}${
                props.subsection ? " subsection" : ""
            }`}
            style={{
                fontSize: props.width? props.width  + 'px': 24 + 'px'
            }}
        >
            {props.content}
        </div>
    );
};

export default Title;
