import { useEffect, useState } from 'react'

const useResponsivity = () => {
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 1255);
    };
    handleResize();

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return isMobileView;
}

export const useMenuResponsivity = () => {
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth >= 1445);
    };
    handleResize();

    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return isMobileView;
}

export default useResponsivity;