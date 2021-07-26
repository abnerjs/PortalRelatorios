import React from 'react'
import './Title.css'

const Title = props => {
    return (
        <div className={`Title ${props.primaryColor ? 'primary' : ''}`}>
            {props.content}
        </div>
    )
}

export default Title