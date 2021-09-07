import React from 'react';

/*
initialValue {Object}
onSubmit
validations {Object}
    [key]:
      required: {
        value: boolean,
        message: string,
      },
      pattern: {
        value: string,
        message: string,
      },
      custom: {
        isValid: (any) => boolean,
        message: string,
      },
 */
const useForm = (opts) => {
  const [data, setData] = React.useState(opts?.initialValue || {});
  const [errors, setErrors] = React.useState({});

  const handleChange = (key, sanitizeFn) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e) : e.target.value;
    setData({ ...data, [key]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = opts?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      // eslint-disable-next-line guard-for-in,no-restricted-syntax

      const valArray = Object.entries(validations);
      for (let idx = 0; idx < valArray.length; idx += 1) {
        const key = valArray[idx][0];
        const validation = valArray[idx][1];
        const value = data[key];

        if (
          validation?.required?.value &&
          (value === null || value === undefined || value === '')
        ) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (opts?.onSubmit) opts.onSubmit(data);
    console.log(data);
  };

  return { data, handleChange, handleSubmit, errors };
};

export default useForm;
