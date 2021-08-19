import React from 'react'
import './Card.css'
import { Icon } from '@iconify/react';

const Card = (props: {date: string, reg: string}) => {
    return (
        <div className="Card">
            <Icon icon="fluent:document-bullet-list-20-regular" />
            <p className="date"> {props.date} </p>
            <h2 className="nameReg">
                {props.reg}
            </h2>
        </div>
    )
}

export default Card