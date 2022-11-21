/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SelectMultipleWithAutoComplete.scss';
import Select, { components } from 'react-select';

const MAX_OPTIONS_LENGTH = 200;

const SelectMultipleWithAutoComplete = ({
  getOptionsFunction,
  label,
  placeholder,
  autoFocus = false,
  minCharToSearch = 1,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);

  const inputRef = useRef();

  const searchHandler = useCallback(
    (val) => {
      if (val && getOptionsFunction) {
        setIsLoading(true);

        /**
         * Les valeurs sont a mapper correctement dans la getOptionsFunction;
         * Pour un affichage correct voici ce qu'il faut renvoyer :
         * - label: Label à afficher dans les options
         * - value: id de la valeur
         */
        const valueOrPromise = getOptionsFunction(val);
        if (
          valueOrPromise &&
          typeof valueOrPromise.then === 'function' &&
          valueOrPromise[Symbol.toStringTag] === 'Promise'
        ) {
          valueOrPromise.then((options) => {
            setIsLoading(false);
            let list = [...options];
            if (list.length > MAX_OPTIONS_LENGTH) {
              console.warn(
                'WARNING Options list length > ',
                MAX_OPTIONS_LENGTH
              );
              list = list.slice(0, MAX_OPTIONS_LENGTH);
            }
            setAutocompleteList(list);
          });
        } else {
          setAutocompleteList(valueOrPromise);
        }
      } else {
        setAutocompleteList([]);
      }
    },
    [getOptionsFunction]
  );

  useEffect(() => {
    if (search.trim().length >= minCharToSearch) {
      searchHandler(search);
    } else {
      setAutocompleteList([]);
    }
  }, [search]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const renderNoOptions = () => {
    if (search.trim().length < minCharToSearch) {
      return `Enter at least ${minCharToSearch} char`;
    }
    return 'No options available';
  };

  const onInputChange = (query, { action }) => {
    if (action !== 'set-value') {
      setSearch(query);
    }
  };

  const renderOptionWithCheckbox = ({ data, ...otherProps }) => {
    const optionLabel = data?.label?.toLowerCase() || '';
    const searchedTxt = search.toLowerCase();
    let firstPart = optionLabel;
    let redPart;
    let lastPart;

    if (searchedTxt.length > 0) {
      const firstIndex = optionLabel.indexOf(searchedTxt);
      if (firstIndex > -1) {
        firstPart = optionLabel.substring(0, firstIndex);
        redPart = optionLabel.substring(
          firstIndex,
          firstIndex + searchedTxt.length
        );
        lastPart = optionLabel.substring(
          firstIndex + searchedTxt.length,
          optionLabel.length
        );
      }
    }
    const isSelected = selectedOptions.some((o) => o.value === data.value);
    return (
      <components.Option {...otherProps}>
        <div className="is-flex">
          <input type="checkbox" checked={isSelected} onChange={() => null} />
          <span className="checkboxLabel">
            {firstPart}
            <strong className="has-text-primary">{redPart}</strong>
            {lastPart}
          </span>
        </div>
      </components.Option>
    );
  };

  return (
    <div className="content">
      <div className="field">
        {!!label && (
          <label className="label" htmlFor="autocomplete-search">
            {label}
          </label>
        )}
        <Select
          classNamePrefix="react-select"
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          options={autocompleteList}
          components={{
            Option: renderOptionWithCheckbox,
          }}
          noOptionsMessage={renderNoOptions}
          isLoading={isLoading}
          allowSelectAll
          isMulti
          placeholder={placeholder}
          ref={inputRef}
          onChange={(newValue) => {
            setSelectedOptions(newValue);
          }}
          onInputChange={onInputChange}
          inputValue={search}
          blurInputOnSelect={false}
          input
        />
      </div>
    </div>
  );
};

export default SelectMultipleWithAutoComplete;
