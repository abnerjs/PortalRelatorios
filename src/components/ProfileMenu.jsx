import React from 'react'
import './ProfileMenu.css'
import { Icon } from '@iconify/react';

const ProfileMenu = props => {
    return (
        <div className="ProfileMenu">
            <div className="image">

            </div>
            <Icon icon="fluent:chevron-down-20-filled" />

            <div className="menuCollapse">
                <div className="item"><p>MEU PERFIL</p></div>
                <div className="item"><p>SAIR</p></div>
            </div>
        </div>
    )
}

export default ProfileMenu