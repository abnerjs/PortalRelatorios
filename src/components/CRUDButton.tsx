import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import './CRUDButton.css'

const CRUDButton = (props: {content?:string}) => {
    const [active, setActive] = useState(false)

    return (
        <button className={`CRUDButton${active?' active':''}`} onClick={() => setActive(true)} >
            <Icon icon="fluent:add-16-regular" width={25} className="icon" />
            {props.content}
        </button>
    );
}

export default CRUDButton;