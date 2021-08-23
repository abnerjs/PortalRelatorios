import React from 'react'
import './Title.css'

type Props = {
    primaryColor?: any;
    subsection?: any;
    content?: string;
}

const Title = (props: Props) => {
    return (
        <div className={`Title${props.primaryColor ? ' primary' : ''}${props.subsection ? ' subsection' : ''}`}>
            {props.content}
        </div>
    )
}

export default Title