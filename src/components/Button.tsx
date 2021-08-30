import React from 'react'
import './Button.css'

type Props = {
    secondary?: any;
    height?: number;
    content?: string;
    setFormOpened?: Function;
    valueOpenForm?: boolean;
}

const Button = (props: Props) => {
    return (
        <button className={`Button ${props.secondary ? "secondary" : "primary"}`}
            style={{
                height: props.height ? props.height : 50 + "px"
            }}
            onClick={() => {
                if(props.setFormOpened){props.setFormOpened(false)}
            }}
        >
            {props.content}
        </button>
    )
}

export default Button