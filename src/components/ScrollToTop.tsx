import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopOnMountProps {
  children: ReactNode;
}

function ScrollToTopOnMount({ children }: ScrollToTopOnMountProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}

export default ScrollToTopOnMount;
