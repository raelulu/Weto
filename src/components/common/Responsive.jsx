import { useMediaQuery } from 'react-responsive';

const Pc = ({ children }) => {
  const isPc = useMediaQuery({ minWidth: 1024 });
  return isPc ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1023,
  });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export { Pc, Tablet, Mobile };
