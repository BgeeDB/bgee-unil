import { useState, useEffect } from 'react';
/*
This hook allows you to easily detect when an element is visible on the screen as
well as specify how much of the element should be visible before being
considered on screen. Perfect for lazy loading images or triggering animations
when the user has scrolled down to a particular section.
 */
function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}

export default useOnScreen;
