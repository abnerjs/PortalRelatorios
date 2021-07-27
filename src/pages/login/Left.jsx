import React from 'react'
import './Left.css'
import Carousel from '../../components/Carousel';
import mobile1 from '../../assets/carousel/1-mobile.png'
import desktop1 from '../../assets/carousel/1-desktop.png'
import mobile2 from '../../assets/carousel/2-mobile.png'
import desktop2 from '../../assets/carousel/2-desktop.png'
import mobile3 from '../../assets/carousel/3-mobile.png'
import desktop3 from '../../assets/carousel/3-desktop.png'
import Title from '../../components/Title'
import DatamobIcon from '../../assets/carousel/DatamobIcon';

const Left = props => {
    return (
        <div className="left">
                <div className="iconified">
                    <DatamobIcon width='49' height='52' />
                    <Title content="PORTAL DE RELATÓRIOS" primaryColor />
                </div>
                <Carousel>
                    <div className="item">
                        <div className="images">
                            <img src={mobile1} alt="Dashboard limpa" />
                            <img src={desktop1} alt="Dashboard limpa" />
                        </div>
                        <h2>Dashboard limpa e intuitiva</h2>
                        <p>
                            Com design responsivo, é possível acessar tanto no seu computador quanto no seu celular!
                        </p>
                    </div>
                    <div className="item">
                        <div className="images">
                            <img src={mobile2} alt="Acesso fácil" />
                            <img src={desktop2} alt="Acesso fácil" />
                        </div>
                        <h2>Acesso fácil aos arquivos</h2>
                        <p>
                            Um sistema de arrastar e soltar que vai facilitar demais a sua vida!
                        </p>
                    </div>
                    <div className="item">
                        <div className="images">
                            <img src={mobile3} alt="Dashboard limpa" />
                            <img src={desktop3} alt="Dashboard limpa" />
                        </div>
                        <h2>Fique por dentro de tudo o que aconteceu</h2>
                        <p>
                            Com os logs de acesso, é possível monitorar a atividade de todos os colaboradores!
                        </p>
                    </div>
                </Carousel>
            </div>
    )
}

export default Left