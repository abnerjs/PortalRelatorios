import React from 'react'
import './Checkbox.css'

const Checkbox = props => {
    return (
        <div className="Checkbox">
            <input id='checkbox' type="checkbox" className='check' value="rememberme"  />
            <label for="checkbox" className="checkbox-label"><span class="icon"></span> {props.content}</label>
        </div>
    )
}

export default Checkbox