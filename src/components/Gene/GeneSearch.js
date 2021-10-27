/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import classnames from '../../helpers/classnames';
import api from '../../api';
import PATHS from '../../routes/paths';

const GeneSearch = ({ classNames, children, title = true }) => {
  const history = useHistory();
  const [search, setSearch] = React.useState('');
  const [autocompleteList, setAutocompleteList] = React.useState([]);

  const onSubmitGene = React.useCallback(
    (geneStr) => () => {
      if (geneStr === '') return;
      history.push(`${PATHS.SEARCH.GENE}?search=${geneStr}`);
      setAutocompleteList([]);
    },
    []
  );
  const GeneList = React.useMemo(() => {
    let redPart;
    let firstPart;
    let lastPart;

    return autocompleteList.map((val, index) => {
      if (search) {
        // todo improve split
        const firstIndex = val.indexOf(search);
        if (firstIndex === 0) {
          redPart = val.substring(firstIndex, search.length);
          lastPart = val.substring(search.length, val.length);
        } else {
          firstPart = val.substring(0, firstIndex);
          redPart = val.substring(firstIndex, search.length + 1);
          lastPart = val.substring(search.length + 1, val.length);
        }
      }
      return (
        <div
          key={val}
          onClick={onSubmitGene(val)}
          role="button"
          tabIndex={index}
          className="rowSearch"
        >
          {firstPart}
          <strong className="has-text-primary">{redPart}</strong>
          {lastPart}
        </div>
      );
    });
  }, [autocompleteList]);
  const hasResults = React.useMemo(
    () => autocompleteList.length > 0 && search.length > 0,
    [autocompleteList, search]
  );
  const searchHandler = React.useCallback((val) => {
    if (val !== '') {
      api.geneSearch.autoCompleteSearchGenes(val).then((resp) => {
        if (resp.code === 200 && resp.data.matchCount !== 0) {
          setAutocompleteList(resp.data.match);
        } else {
          setAutocompleteList([]);
        }
      });
    } else {
      setAutocompleteList([]);
    }
  }, []);
  const handlerGeneSearch = React.useCallback(({ target: { value } }) => {
    setSearch(value);
    searchHandler(value);
  }, []);

  React.useEffect(() => {
    const onClick = () => {
      setAutocompleteList([]);
    };
    document.getElementById('root').addEventListener('click', onClick);
    const onClickInput = (e) => {
      e.stopPropagation();
    };
    document
      .getElementById('gene-input')
      .addEventListener('click', onClickInput);
    return () => {
      document.getElementById('root').removeEventListener('click', onClick);
      document
        .getElementById('gene-input')
        .removeEventListener('click', onClickInput);
    };
  }, []);

  return (
    <Bulma.Card className={classnames(classNames)}>
      <Bulma.Card.Body>
        <div className="content">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className="field">
            {title && (
              <label className="label" htmlFor="search-species">
                {i18n.t('search.genes.search-gene')}
              </label>
            )}
            <div className="control">
              <input
                id="gene-input"
                className="input"
                type="text"
                name="search-species"
                placeholder="Search Gene"
                value={search}
                onChange={handlerGeneSearch}
              />
            </div>
          </div>
          {hasResults && <div className="dropDownSearchForm">{GeneList}</div>}
          <div className="field">
            <div className="control is-flex is-align-items-center">
              <button
                className="button mr-2"
                type="button"
                onClick={onSubmitGene(search)}
              >
                {i18n.t('global.search')}
              </button>
              {children}
            </div>
          </div>
        </div>
      </Bulma.Card.Body>
    </Bulma.Card>
  );
};

export default GeneSearch;
