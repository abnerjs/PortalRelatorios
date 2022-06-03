import { useEffect, useState } from 'react';

const useResponsivity = () => {
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 1255);
    };
    handleResize();

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return isMobileView;
};

export const useMenuResponsivity = () => {
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth >= 1445);
    };
    handleResize();

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  return isMobileView;
};

export default useResponsivity;
