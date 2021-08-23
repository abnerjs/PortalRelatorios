import React from 'react'
import { Link } from 'react-router-dom'
import DatamobIcon from '../assets/DatamobIcon'
import './Menu.css'
import { Icon } from '@iconify/react';

const Menu = () => {
    return (
        <div className="Menu">
            <Link to='/'>
                <div className="logo">
                    <DatamobIcon width={39} />
                </div>
            </Link>

            <div className="links">
                <div className="menuButton active">
                    <Icon icon="fluent:home-16-regular" />
                </div>
                <div className="menuButton">
                    <Icon icon="fluent:document-bullet-list-20-regular" />
                </div>
                <div className="menuButton">
                    <Icon icon="fluent:person-20-regular" />
                </div>
                <div className="menuButton">
                    <Icon icon="fluent:notebook-24-regular" />
                </div>
            </div>
        </div>
    )
}

export default Menu