import { useEffect, useRef, RefObject } from 'react';

interface UseScrollProps {
  shouldRunObserver: boolean
  parentRef: RefObject<HTMLDivElement>;
  childRef: RefObject<HTMLDivElement>;
  callback: () => void;
}

const useScroll = ({ shouldRunObserver, parentRef, childRef, callback }: UseScrollProps): void => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (parentRef.current && childRef.current) {
      const options = {
        root: parentRef.current,
        rootMargin: '0px',
        threshold: 0,
      };

      observer.current = new IntersectionObserver(([target]) => {
        if (target.isIntersecting && shouldRunObserver) {
          callback();
        }
      }, options);

      observer.current.observe(childRef.current);

      return () => {
        if (observer.current && childRef.current) {
          observer.current.unobserve(childRef.current);
        }
      };
    }
  }, [parentRef, childRef, callback]);
};

export default useScroll;
