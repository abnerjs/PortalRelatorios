import React from 'react'
import './VerifyCodeInput.css'

const VerifyCodeInput = props => {
    return (
        <div className="VerifyCodeInput">
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
        </div>
    )
}

export default VerifyCodeInput