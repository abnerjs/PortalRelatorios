import React from 'react'
import './Subtitle.css'

const Subtitle = props => {
    return (
        <div className="Subtitle">
            {props.content}
        </div>
    )
}

export default Subtitle