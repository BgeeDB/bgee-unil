import { useState, useEffect } from 'react';
/*
This hook makes it super easy to dynamically load an external script and know
when its loaded. This is useful when you need to interact with a 3rd party library
(Stripe, Google Analytics, etc) and you'd prefer to load the script when needed
rather then include it in the document head for every page request. In the
example below we wait until the script has loaded successfully before calling a
function declared in the script. If you're interested in seeing how this would
look if implemented as a Higher Order Component then check out the source of
react-script-loader-hoc. I personally find it much more readable as a hook.
Another advantage is because you can use this hook multiple times within a
component, we don't need to add support for loading multiple scripts and we can
keep our hook logic nice and simple.
 */
// Hook
function useScript(src) {
  // Keep track of script status ("idle", "loading", "ready", "error")
  const [status, setStatus] = useState(src ? 'loading' : 'idle');
  useEffect(
    () => {
      // Allow falsy src value if waiting on other data needed for
      // constructing the script URL passed to this hook.
      if (!src) {
        setStatus('idle');
        return;
      }
      // Fetch existing script element by src
      // It may have been added by another intance of this hook
      let script = document.querySelector(`script[src="${src}"]`);
      if (!script) {
        // Create script
        script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.setAttribute('data-status', 'loading');
        // Add script to document body
        document.body.appendChild(script);
        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          );
        };
        script.addEventListener('load', setAttributeFromEvent);
        script.addEventListener('error', setAttributeFromEvent);
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status'));
      }
      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event) => {
        setStatus(event.type === 'load' ? 'ready' : 'error');
      };
      // Add event listeners
      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
      // Remove event listeners on cleanup
      // eslint-disable-next-line consistent-return
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );
  return status;
}

export default useScript;
