/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';

/**
 *
 * @param {{
 * children?: React.ReactNode | JSX.Element | string;
 * renderOption?: (option: any, search: string) => React.ReactNode | JSX.Element;
 * getOptionsFunction?: (search: string) => Promise<any[]>;
 * onSelectOption?: (option: any) => void;
 * searchTerm?: string;
 * label?: string;
 * hasSearchButton?: boolean;
 * placeholder?: string; }} param0
 */
const AutoCompleteSearch = ({
  renderOption,
  getOptionsFunction,
  onSelectOption,
  label,
  searchTerm = '',
  placeholder,
  hasSearchButton,
  children,
}) => {
  const [search, setSearch] = useState('');
  const [autocompleteList, setAutocompleteList] = useState([]);

  const inputRef = useRef();

  const onSelectChoice = useCallback(
    (option) => () => {
      if (option === '') return;

      if (onSelectOption) {
        onSelectOption(option);
      }

      setAutocompleteList([]);
    },
    []
  );

  const searchHandler = useCallback(
    (val) => {
      if (val && getOptionsFunction) {
        getOptionsFunction(val).then((options) => {
          setAutocompleteList(options);
        });
      } else {
        setAutocompleteList([]);
      }
    },
    [getOptionsFunction]
  );

  const handleSearchChange = useCallback(({ target: { value } }) => {
    setSearch(value);
    searchHandler(value);
  }, []);

  const hasResults = useMemo(
    () => autocompleteList.length > 0 && search.length > 0,
    [autocompleteList, search]
  );

  const GeneList = useMemo(
    () =>
      autocompleteList.map((option, index) => (
        <div
          key={option}
          onClick={onSelectChoice(option)}
          role="button"
          tabIndex={index}
          className="rowSearch"
        >
          {renderOption ? renderOption(option, search) : option}
        </div>
      )),
    [autocompleteList, renderOption]
  );

  useEffect(() => {
    if (searchTerm !== '') {
      setSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (inputRef.current) inputRef.current?.focus();

    const onClick = () => {
      setAutocompleteList([]);
    };
    document.getElementById('root').addEventListener('click', onClick);
    const onClickInput = (e) => {
      e.stopPropagation();
    };
    document
      .getElementById('autocomplete-search')
      .addEventListener('click', onClickInput);
    return () => {
      document.getElementById('root').removeEventListener('click', onClick);
      document
        .getElementById('autocomplete-search')
        ?.removeEventListener('click', onClickInput);
    };
  }, []);

  return (
    <div className="content">
      <div className="field">
        {!!label && (
          <label className="label" htmlFor="autocomplete-search">
            {label}
          </label>
        )}
        <div className="control">
          <input
            ref={inputRef}
            id="autocomplete-search"
            className="input"
            type="text"
            name="autocomplete-search"
            placeholder={placeholder}
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSelectChoice(search)();
              }
            }}
          />
        </div>
      </div>
      {hasResults && <div className="dropDownSearchForm">{GeneList}</div>}
      {hasSearchButton && (
        <div className="field">
          <div className="control is-flex is-align-items-center">
            <button
              className="button mr-2 search-form"
              type="button"
              onClick={onSelectChoice(search)}
            >
              Search
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
