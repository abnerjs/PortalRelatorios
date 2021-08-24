import React from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import MainTable from '../components/MainTable'
import Subtitle from '../components/Subtitle'
import Title from '../components/Title'
import './Dashboard.css'

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="content">
                <div className="head">
                    <Header title="Início" />
                    <Subtitle content="Últimos relatórios acessados" />
                </div>
                <div className="row">
                    <div className="cards">
                        <Card reg="Nome do registro" date="02/05/2021" />
                        <Card reg="Nome do registro" date="02/05/2021" />
                        <Card reg="Nome do registro" date="02/05/2021" />
                        <Card reg="Nome do registro" date="02/05/2021" />
                        <Card reg="Nome do registro" date="02/05/2021" />
                    </div>
                    <div className="comp">
                        <Title content="Nome da empresa" />
                        <Subtitle content="contact@corporation.com" />
                        <Subtitle content="(16) 98765-4321" />
                    </div>
                </div>
                <div className="row tables">
                    <MainTable title="Novos arquivos" />
                    <MainTable title="Últimas atualizações" />
                </div>
            </div>
        </div>
    )
}

export default Dashboard