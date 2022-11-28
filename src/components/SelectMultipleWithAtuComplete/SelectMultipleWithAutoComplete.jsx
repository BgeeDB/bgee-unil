/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './SelectMultipleWithAutoComplete.scss';
import Select, { components } from 'react-select';

const MAX_OPTIONS_LENGTH = 200;

const escapeRegexp = (str) => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

const SelectMultipleWithAutoComplete = ({
  getOptionsFunction,
  label,
  placeholder,
  autoFocus = false,
  minCharToSearch = 1,
  selectedOptions = [], // Tableau des options selectionnées [{label:'', value''}, {label:'', value''}...]
  setSelectedOptions,
  optionActions,
}) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);

  const inputRef = useRef();

  const searchHandler = useCallback(
    (val) => {
      if ((val || !minCharToSearch) && getOptionsFunction) {
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
          setIsLoading(false);
          setAutocompleteList(valueOrPromise);
        }
      } else {
        setAutocompleteList([]);
      }
    },
    [minCharToSearch, getOptionsFunction]
  );

  useEffect(() => {
    if (search.trim().length >= minCharToSearch) {
      searchHandler(search);
    } else {
      setAutocompleteList([]);
    }
  }, [search, searchHandler]);

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
    const optionLabel = data?.label || '';

    // Split la string sur la regexp case insensitive en mode globale
    // Le tableau retourné est donc la MÊME string découpée aux endroits du match
    // Il suffit de colorer les index impaires
    const splitted = search
      ? optionLabel.split(new RegExp(`(${escapeRegexp(search)})`, 'ig'))
      : [optionLabel];

    // Pour le "rare" cas des synonyms retournés par la recherche
    let matchFrom = '';
    if (
      data?.result &&
      data?.result?.matchSource !== 'name' &&
      data?.result?.matchSource !== 'id'
    ) {
      matchFrom += ' - match from ';
      matchFrom += data?.result?.matchSource;
      matchFrom +=
        data?.result?.match != null ? `: ${data?.result?.match}` : '';
    }

    const level = data.level || 0;

    return (
      <components.Option {...otherProps}>
        <div className="is-flex">
          <span className="checkboxLabel" style={{ paddingLeft: level * 16 }}>
            {splitted.map((txt, i) => {
              const isEven = i % 2 === 0;
              return (
                <React.Fragment key={i}>
                  {isEven ? (
                    txt
                  ) : (
                    <strong className="has-text-primary">{txt}</strong>
                  )}
                  {matchFrom}
                </React.Fragment>
              );
            })}
          </span>
          {optionActions ? optionActions(data) : null}
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
          closeMenuOnSelect
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
          onChange={(allSelected) => {
            setSelectedOptions(allSelected);
          }}
          value={selectedOptions}
          onInputChange={onInputChange}
          inputValue={search}
          blurInputOnSelect={false}
        />
      </div>
    </div>
  );
};

export default SelectMultipleWithAutoComplete;
