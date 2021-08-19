import React from 'react'
import './Checkbox.css'

const Checkbox = (props: {content: string}) => {
    return (
        <div className="Checkbox">
            <input id='checkbox' type="checkbox" className='check' value="rememberme"  />
            <label htmlFor="checkbox" className="checkbox-label"><span className="icon"></span> {props.content}</label>
        </div>
    )
}

export default Checkbox