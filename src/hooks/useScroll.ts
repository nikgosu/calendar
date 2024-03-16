import { useEffect, RefObject } from 'react';

interface UseScrollProps {
  parentRef: RefObject<HTMLDivElement>
  nextCallback: () => void
  prevCallback: () => void
}

const useScroll = ({ parentRef, nextCallback, prevCallback }: UseScrollProps): void => {

  useEffect(() => {
    const handleScroll = () => {
      if (parentRef.current) {
        const parentElement = parentRef.current;
        const nextTriggerPosition = (parentElement.scrollHeight / 100 * 70) - parentElement.clientHeight
        const prevTriggerPosition = parentElement.scrollHeight / 100 * 30

        if (parentElement.scrollTop < prevTriggerPosition) {
          prevCallback()
        }
        if (parentElement.scrollTop > nextTriggerPosition) {
          nextCallback();
        }
      }
    };

    if (parentRef.current) {
      parentRef.current.addEventListener('scroll', handleScroll);

      return () => {
        if (parentRef.current) {
          parentRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [parentRef, nextCallback, prevCallback]);
};

export default useScroll;
