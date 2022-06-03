import 'src/pages/Login/Components/Left/Styles/index.css';

import React from 'react';

import DatamobIcon from 'src/assets/DatamobIcon';
import desktop1 from 'src/assets/carousel/1-desktop.png';
import desktop2 from 'src/assets/carousel/2-desktop.png';
import desktop3 from 'src/assets/carousel/3-desktop.png';
import mobile1 from 'src/assets/carousel/1-mobile.png';
import mobile2 from 'src/assets/carousel/2-mobile.png';
import mobile3 from 'src/assets/carousel/3-mobile.png';

import Carousel from './Carousel/Carousel';
import { Typography } from '@mui/material';

const Left: React.FC = (props: any) => {
  return (
    <div className="left">
      <div className="iconified">
        <DatamobIcon width={49} height={52} />
        <Typography variant="h5" className="primary">
          PORTAL DE RELATÓRIOS
        </Typography>
      </div>
      <Carousel>
        <div className="item">
          <div className="images">
            <img src={mobile1} alt="Dashboard limpa" />
            <img src={desktop1} alt="Dashboard limpa" />
          </div>
          <h2>Dashboard limpa e intuitiva</h2>
          <p>Com design responsivo, é possível acessar tanto no seu computador quanto no seu celular!</p>
        </div>
        <div className="item">
          <div className="images">
            <img src={mobile2} alt="Acesso fácil" />
            <img src={desktop2} alt="Acesso fácil" />
          </div>
          <h2>Acesso fácil aos arquivos</h2>
          <p>Um sistema de arrastar e soltar que vai facilitar demais a sua vida!</p>
        </div>
        <div className="item">
          <div className="images">
            <img src={mobile3} alt="Dashboard limpa" />
            <img src={desktop3} alt="Dashboard limpa" />
          </div>
          <h2>Fique por dentro de tudo o que aconteceu</h2>
          <p>Com os logs de acesso, é possível monitorar a atividade de todos os colaboradores!</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Left;
