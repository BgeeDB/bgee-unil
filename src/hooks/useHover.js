import React from 'react';

function useHover() {
  const [value, setValue] = React.useState(false);
  const ref = React.useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  React.useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

export default useHover;
