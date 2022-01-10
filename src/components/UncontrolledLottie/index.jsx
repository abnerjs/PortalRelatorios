import React from 'react';

import Lottie from 'lottie-web';

import animationData from 'src/assets/noResult.json';
import './UncontrolledLottie.css';

const UncontrolledLottie = (props) => {
  React.useEffect(() => {
    Lottie.loadAnimation({
      container: document.querySelector(
        `#lottie${props.loadingIndex ? props.loadingIndex : ''}`
      ),
      animationData: animationData,
    });
  }, []);

  return (
    <div
      className="lottie"
      id={`lottie${props.loadingIndex ? props.loadingIndex : ''}`}
    ></div>
  );
};

export default UncontrolledLottie;