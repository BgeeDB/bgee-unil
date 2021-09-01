import React from 'react';

const Input = ({
  type = 'text',
  classNames = '',
  defaultValue = '',
  placeholder = '',
  onChange,
}) => {
  const [v, setV] = React.useState(defaultValue);
  const onChangeInput = React.useCallback(
    (e) => {
      setV(e.target.value);
      if (onChange) onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <input
      className={`input ${classNames}`}
      type={type}
      placeholder={placeholder}
      value={v}
      onChange={onChangeInput}
    />
  );
};

export default Input;
