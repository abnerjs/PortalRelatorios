import React from 'react'
import './MainTable.css'
import Subtitle from './Subtitle'
import Table from './Table'
import Title from './Title'

const MainTable = props => {
    return (
        <div className="MainTable">
            <Title subsection content={props.title} />
            <Subtitle content="Tudo o que você não viu desde o seu último acesso" />

            <Table />
        </div>
    )
}

export default MainTable