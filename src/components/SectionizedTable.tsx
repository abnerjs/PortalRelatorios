import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import CRUDButton from './CRUDButton';
import Input from './Input';
import './SectionizedTable.css'

const SectionizedTable = () => {
    const [tipoUsuario, setTipoUsuario] = useState('interno');
    return (
        <div className="SectionizedTable">
            <div className="tabs">
                <div className={`option${tipoUsuario === 'interno'? ' active' : ''}`} onClick={() => setTipoUsuario('interno')}>
                    INTERNO
                </div>
                <div className={`option${tipoUsuario === 'externo'? ' active' : ''}`} onClick={() => setTipoUsuario('externo')}>
                    EXTERNO
                </div>
                <div className={`selector${tipoUsuario === 'externo'? ' active' : ''}`}></div>
            </div>
            <div className="search">
                <Input placeholder={tipoUsuario === 'interno'? 'Nome, matrícula ou e-mail' : 'Nome, CPF, CPNJ ou e-mail'} iconified />
                <Icon icon="fluent:search-12-regular" width={25} className="icon" />
            </div>
            <CRUDButton content="novo usuário" />
        </div>
    );
}

export default SectionizedTable;