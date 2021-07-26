import React from 'react'
import './Input.css'

const Input = props => {
    return (
        <input type="text" className={`Input ${props.secondary ? ' secondary' : ''}`}
            style={{
                height: props.height ? props.height : 50 + "px"
            }}
            placeholder={props.placeholder}
        />
    )
}

export default Input