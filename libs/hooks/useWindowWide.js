import { useEffect, useState } from 'react';

const useWindowWide = size => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
      });
  }, []);
  return width < size;
};

export default useWindowWide;
