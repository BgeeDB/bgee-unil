import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import ComplexTable from '../../components/ComplexTable';
import Bulma from '../../components/Bulma';
import useGeneSearch from '../../hooks/useGeneSearch';
import './GeneList.css';

const onRenderCell =
  (search) =>
  ({ cell, key }, defaultRender) => {
    switch (key) {
      case 'id':
      case 'name':
        return (
          <Link
            className="internal-link"
            to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES.replace(
              ':geneId',
              cell.id
            ).replace(':speciesId', cell.speciesId)}
          >
            {cell[key]}
          </Link>
        );
      case 'organism':
        return (
          <Link
            className="internal-link"
            to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', cell.speciesId)}
          >
            {cell[key]}
          </Link>
        );
      case 'description':
        return defaultRender(cell[key]);
      case 'match':
        return defaultRender(cell[key]);
      default:
        return (
          <p>
            Match: <b>{search}</b>
          </p>
        );
    }
  };

const customHeader = (searchElement, pageSizeElement, showEntriesText) => (
  <Bulma.Columns vCentered>
    <Bulma.C size={6}>
      <div className="field has-addons">{searchElement}</div>
    </Bulma.C>
    <Bulma.C size={6}>
      <div>
        {pageSizeElement}
        <div>{showEntriesText}</div>
      </div>
    </Bulma.C>
  </Bulma.Columns>
);

const GeneList = () => {
  const history = useHistory();
  const { search: queryParams } = useLocation();
  const [search, setSearch] = React.useState('');
  const {
    resListGenes,
    resResultListGenes: results,
    searchHandler,
    searchResultHandler,
    setResults,
  } = useGeneSearch(search);
  const [openModal, setOpenModal] = React.useState(false);

  const isDisplayDropDownlist = resListGenes.length > 0 && search.length > 0;
  React.useEffect(() => {
    const params = new URLSearchParams(queryParams);

    if (params.get('search')) {
      setSearch(params.get('search'));
      setResults();
      searchResultHandler(params.get('search'));
    }
  }, [queryParams]);

  const objMapping = React.useCallback(
    (element) => ({
      id: element.gene.geneId,
      speciesId: element.gene.species.id,
      name: element.gene.name,
      description: element.gene.description,
      organism: `${element.gene.species.genus} ${element.gene.species.speciesName} (${element.gene.species.name})`,
      match: element.match,
    }),
    []
  );
  const handlerGeneSearch = React.useCallback((val) => {
    setSearch(val);
    searchHandler(val);
    if (val) {
      setOpenModal(true);
    }
  }, []);

  const renderGeneList = () => {
    let redPart;
    let firstPart;
    let lastPart;

    return resListGenes.map((val, index) => {
      if (search) {
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
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          onClick={() => {
            if (val !== '') history.push(`?search=${val}`);
            setOpenModal(false);
          }}
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
  };

  return (
    <div className="section pt-5">
      <div className="content has-text-centered">
        <Bulma.Title size={5}>{`${i18n.t('search.genes.title')}`}</Bulma.Title>
      </div>
      <p>{i18n.t('search.genes.description')}</p>
      <div>
        <Bulma.Card className="search-input mx-auto my-3">
          <Bulma.Card.Body>
            <div className="content">
              <div className="field">
                <label className="label" htmlFor="search-species">
                  {i18n.t('search.genes.search-gene')}
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="search-species"
                    value={search}
                    onChange={(e) => handlerGeneSearch(e.target.value)}
                  />
                </div>
              </div>
              {isDisplayDropDownlist && openModal && (
                <div className="dropDownSearchForm">{renderGeneList()}</div>
              )}
              <div className="field">
                <div className="control is-flex is-align-items-center">
                  <button
                    className="button mr-2"
                    type="button"
                    onClick={() => history.push(`?search=${search}`)}
                  >
                    {i18n.t('global.search')}
                  </button>
                  <p>
                    {`${i18n.t('global.example')}: `}
                    <Link className="internal-link" to="?search=HBB">
                      HBB
                    </Link>
                    {', '}
                    <Link className="internal-link" to="?search=Apoc1">
                      Apoc1
                    </Link>
                    {', '}
                    <Link className="internal-link" to="?search=PDE4DIP">
                      PDE4DIP
                    </Link>
                    {', '}
                    <Link className="internal-link" to="?search=insulin">
                      insulin
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Bulma.Card.Body>
        </Bulma.Card>
      </div>
      {results && (
        <div>
          <Bulma.Title size={5} className="gradient-underline">
            {i18n.t('global.results')}
          </Bulma.Title>
          <p className="has-text-centered my-5">{`${results.length} ${i18n.t(
            'search.genes.genes-found'
          )} '${search}'`}</p>
          <ComplexTable
            pagination
            scrollable
            sortable
            classNamesTable="is-striped"
            columns={[
              { text: 'Ensembl ID', key: 'id' },
              { text: 'Name', key: 'name' },
              { text: 'Description', key: 'description' },
              { text: 'Organism', key: 'organism' },
              { text: 'Match', key: 'match' },
            ]}
            data={results}
            customHeader={customHeader}
            onRenderCell={onRenderCell(search)}
            mappingObj={objMapping}
          />
        </div>
      )}
    </div>
  );
};

export default GeneList;
