import React from 'react';

/*
options {Array} of string or {value, text}
 */
const Select = ({ defaultValue, options, onChange }) => {
  const [active, setActive] = React.useState(defaultValue || '');
  const onChangeSelect = React.useCallback((e) => {
    setActive(e.target.value);
    if (onChange) onChange(e.target.value);
  }, []);

  return (
    <div className="select">
      <select value={active} onChange={onChangeSelect}>
        {options.map((opt) =>
          // eslint-disable-next-line valid-typeof
          ['string', 'number'].find((t) => t === typeof opt) ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.text}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;
