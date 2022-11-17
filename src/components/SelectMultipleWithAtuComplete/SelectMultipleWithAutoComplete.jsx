/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import './SelectMultipleWithAutoComplete.scss';
import Select, { components } from 'react-select';

const MAX_OPTIONS_LENGTH = 800;

const SelectMultipleWithAutoComplete = ({
  getOptionsFunction,
  label,
  placeholder,
  autoFocus = false,
  minCharToSearch = 2,
  setValue,
  selectedOptions,
}) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState([]);

  const inputRef = useRef();

  const searchHandler = useCallback(
    (val) => {
      if (val && getOptionsFunction) {
        if (getOptionsFunction?.constructor?.name === 'AsyncFunction') {
          setIsLoading(true);
          getOptionsFunction(val).then((options) => {
            setIsLoading(false);
            let list = options.map((o) => ({
              label: o.gene.name,
              value: o.gene.geneId,
              match: o.match,
            }));
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
          let list = getOptionsFunction(val);
          if (list.length > MAX_OPTIONS_LENGTH) {
            console.warn('WARNING Options list length > ', MAX_OPTIONS_LENGTH);
            list = list.slice(0, MAX_OPTIONS_LENGTH);
          }
          setAutocompleteList(list);
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
    }
  }, [search]);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current?.focus();
  }, []);

  const renderNoOptions = () => {
    if (search.trim().length < minCharToSearch) {
      return `Enter at least ${minCharToSearch} char`;
    }
    return 'No options available';
  };

  const renderOptionWithCheckbox = ({ data, ...otherProps }) => {
    const optionLabel = data.label.toLowerCase();
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
      <div>
        <components.Option {...otherProps}>
          <input type="checkbox" checked={isSelected} onChange={() => null} />{' '}
          <span>
            {firstPart}
            <strong className="has-text-primary">{redPart}</strong>
            {lastPart}
          </span>
        </components.Option>
      </div>
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
            setValue(newValue);
          }}
          onInputChange={(txt) => setSearch(txt)}
        />
      </div>
    </div>
  );
};

export default SelectMultipleWithAutoComplete;
