import React from 'react'
import './Header.css'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import ProfileMenu from './ProfileMenu'

const Header = props => {
    return (
        <div className="Header">
            <Title content="Início" />
            <div className="right">
                <div className="acesso">
                    <Subtitle content="Último acesso" />
                    <Subtitle content="30/06/2021 17:36" />
                </div>
                <ProfileMenu />
            </div>
        </div>
    )
}

export default Header