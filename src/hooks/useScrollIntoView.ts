import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'

type ScrollIntoViewReturnType = [
  RefObject<HTMLDivElement>,
  RefObject<HTMLDivElement>,
  Dispatch<SetStateAction<boolean>>
];

const useScrollIntoView = (): ScrollIntoViewReturnType => {

  const scrollToElementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldScrollTo, setShouldScrollTo] = useState(false);

  if (scrollToElementRef.current && containerRef.current) {
    const y = scrollToElementRef.current.offsetTop - containerRef.current.getBoundingClientRect().top
  }

  useEffect(() => {
    if (scrollToElementRef.current && containerRef.current && shouldScrollTo) {
      const y = scrollToElementRef.current.offsetTop - containerRef.current.getBoundingClientRect().top
      containerRef.current.scrollTo({ top: y, behavior: 'smooth' })
      scrollToElementRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScrollTo(false);
    }
  }, [shouldScrollTo]);

  return [scrollToElementRef, containerRef, setShouldScrollTo];
}

export default useScrollIntoView
