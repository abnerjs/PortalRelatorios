import React from 'react'
import './Input.css'

type Props = {
    type?: string;
    secondary?: any;
    error?: any;
    height?: number;
    placeholder?: string;
    iconified?: any;
}

const Input = (props: Props) => {
    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("error");
    }

    return (
        <input type={props.type ? props.type : 'text'}
            className={`Input${props.secondary ? ' secondary' : ''}${props.error ? ' error' : ''}`}
            style={{
                height: props.height ? props.height : 50 + "px",
                padding: props.iconified ? '0 25px 0 45px' : '0 25px'
            }}
            placeholder={props.placeholder}
            onFocus={handleFocus}
        />
    )
}

export default Input