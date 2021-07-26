import React from 'react'
import './Button.css'

const Button = props => {
    return (
        <button className={`Button ${props.secondary ? "secondary" : "primary"}`}
            style={{
                height: props.height ? props.height : 50 + "px"
            }}
        >
            {props.content}
        </button>
    )
}

export default Button