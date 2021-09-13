const hasOwn = {}.hasOwnProperty;
/**
 * JavaScript utility for conditionally joining classNames together
 * Copy of https://www.npmjs.com/package/classnames
 * @param {(string | {[key: string]: boolean})[]} args
 * @return {string} css classes concatenated.
 */
const classnames = (...args) => {
  const classes = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    // eslint-disable-next-line no-continue
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        // eslint-disable-next-line prefer-spread
        const inner = classnames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
};

export default classnames;
