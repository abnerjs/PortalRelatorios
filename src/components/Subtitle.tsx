import React from 'react'
import './Subtitle.css'

const Subtitle = (props: {content: string}) => {
    return (
        <div className="Subtitle">
            {props.content}
        </div>
    )
}

export default Subtitle