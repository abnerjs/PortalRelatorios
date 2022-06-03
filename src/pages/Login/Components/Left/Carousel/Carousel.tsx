import React, { useState } from 'react';
import './Carousel.css';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import desktop1 from 'src/assets/carousel/1-desktop.png';
import desktop2 from 'src/assets/carousel/2-desktop.png';
import desktop3 from 'src/assets/carousel/3-desktop.png';
import mobile1 from 'src/assets/carousel/1-mobile.png';
import mobile2 from 'src/assets/carousel/2-mobile.png';
import mobile3 from 'src/assets/carousel/3-mobile.png';
import { Box } from '@mui/material';

type Props = {
  children: React.ReactChild[];
};

interface CarouselContent {
  label: string;
  message: string;
  desktop: any;
  mobile: any;
}

const images: Array<CarouselContent> = [
  {
    label: 'Dashboard limpa e intuitiva',
    message: 'Com design responsivo, é possível acessar tanto no seu computador quanto no seu celular!',
    desktop: desktop1,
    mobile: mobile1,
  },
  {
    label: 'Acesso fácil aos arquivos',
    message: 'Um sistema de arrastar e soltar que vai facilitar demais a sua vida!',
    desktop: desktop2,
    mobile: mobile2,
  },
  {
    label: 'Fique por dentro de tudo o que aconteceu',
    message: 'Com os logs de acesso, é possível monitorar a atividade de todos os colaboradores!',
    desktop: desktop3,
    mobile: mobile3,
  },
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel: React.FC<Props> = ({ children }: Props) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleStepChange = (step: number) => {
    setCarouselIndex(step);
  };

  var arr = [];
  for (let i = 0; i < children.length; i++) {
    arr.push(
      <button
        key={`carousel-item-${i}`}
        className={`controller${carouselIndex === i ? ' active' : ''}`}
        onClick={() => setCarouselIndex(i)}
      ></button>
    );
  }

  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarouselIndex((carouselIndex + 1) % 3);
    }, 7000);
    return () => clearTimeout(timer);
  }, [carouselIndex]);
  
  */

  return (
    <>
      <div className="Carousel">
        <AutoPlaySwipeableViews axis="x" index={carouselIndex} onChangeIndex={handleStepChange} enableMouseEvents>
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(carouselIndex - index) <= 2 ? (
                <>
                  <div
                    className="item"
                    style={{
                      display: 'flex',
                      height: '35vh',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        display: 'block',
                        maxWidth: 400,
                        overflow: 'hidden',
                        width: '100%',
                        position: 'absolute',
                        zIndex: 1002,
                        top: '20%',
                        transform: 'scale(0.7)',
                        transformOrigin: 'bottom right',
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
                      }}
                      src={step.desktop}
                      alt={step.label}
                    />
                    <Box
                      component="img"
                      sx={{
                        height: '35vh',
                        display: 'block',
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: 1001,
                        transform: 'scale(0.8) translateX(-100px)',
                        transformOrigin: 'top left',
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
                      }}
                      src={step.mobile}
                      alt={step.label}
                    />
                  </div>
                  <div className="textual">
                    <h2>{step.label}</h2>
                    <p>{step.message}</p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

        <div className="controllers">{arr}</div>
      </div>
    </>
  );
};

export default Carousel;
