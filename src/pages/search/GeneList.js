import React from 'react';
import { Link } from 'react-router-dom';
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
      case 'organism':
        return (
          <Link
            className="internal-link"
            to={PATHS.SEARCH.GENE_ITEM.replace(':id', cell.id)}
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
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState(undefined);
  const {
    resListeGenes,
    resResultListeGenes,
    searchHandler,
    searchResultHandler,
  } = useGeneSearch(search);

  const formatResultForTable = (initTable) => {
    const res = initTable.map((elem) => {
      const orga = `${elem.gene.species.genus} ${elem.gene.species.speciesName} (${elem.gene.species.name})`;
      return {
        id: elem.gene.geneId,
        name: elem.gene.name,
        description: elem.gene.description,
        organism: orga,
        match: elem.match,
      };
    });
    return res;
  };

  React.useEffect(() => {
    setResults(formatResultForTable(resResultListeGenes));
  }, [resResultListeGenes]);

  const handlerGeneSearch = (val) => {
    setSearch(val);
    searchHandler(val);
  };

  const renderGeneList = () => {
    let redpart = '';
    let firstPart = '';
    let lastPart = '';

    const res = resListeGenes.map((val, index) => {
      if (search) {
        const firstIndex = val.indexOf(search);
        if (firstIndex === 0) {
          redpart = val.substring(firstIndex, search.length);
          lastPart = val.substring(search.length, val.length);
        } else {
          firstPart = val.substring(0, firstIndex);
          redpart = val.substring(firstIndex, search.length + 1);
          lastPart = val.substring(search.length + 1, val.length);
        }
      }
      return (
        <div
          onClick={() => {
            searchResultHandler(val);
            setSearch('');
          }}
          onKeyPress={() => {
            searchResultHandler(val);
            setSearch('');
          }}
          role="button"
          tabIndex={index}
          className="rowSearch"
        >
          {firstPart}
          <strong className="has-text-primary">{redpart}</strong>
          {lastPart}
        </div>
      );
    });
    return res;
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
              {resListeGenes.length > 0 && search.length > 0 && (
                <div className="dropDownSearchForm">{renderGeneList()}</div>
              )}
              <div className="field">
                <div className="control is-flex is-align-items-center">
                  <button
                    className="button mr-2"
                    type="button"
                    onClick={() => searchResultHandler(search)}
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
          />
        </div>
      )}
    </div>
  );
};

export default GeneList;
