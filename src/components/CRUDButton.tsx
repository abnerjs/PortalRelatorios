import { Icon } from '@iconify/react';
import React from 'react'
import './CRUDButton.css'

const CRUDButton = (props: {content?:string}) => {
    return (
        <button className="CRUDButton">
            <Icon icon="fluent:add-16-regular" width={25} className="icon" />
            {props.content}
        </button>
    );
}

export default CRUDButton;