import { useEffect, useRef } from 'react';
/*
This hook is similar to useMemo, but instead of passing an array of dependencies
 we pass a custom compare function that receives the previous and new value.
 The compare function can then compare nested properties, call object methods,
  or anything else to determine equality. If the compare function returns true
  then the hook returns the old object reference.

It's worth noting that, unlike useMemo, this hook isn't meant to avoid expensive
calculations. It needs to be passed a computed value so that it can compare it to
the old value. Where this comes in handy is if you want to offer a library to
other developers and it would be annoying to force them to memoize an object
before passing it to your library. If that object is created in the component
body (often the case if it's based on props) then it's going to be a new object
on every render. If that object is a useEffect dependency then it's going to
cause the effect to fire on every render, which can lead to problems or even an
infinite loop. This hook allows you to avoid that scenario by using the old object
reference instead of the new one if your custom comparison function deems
them equal.

Read through the recipe and comments below. For a more practical example be
sure to check out our useFirestoreQuery hook.
 */

function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}

export default useMemoCompare;
