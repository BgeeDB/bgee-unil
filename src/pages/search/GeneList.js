import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import useQuery from '../../hooks/useQuery';
import ComplexTable from '../../components/ComplexTable';

const onRenderCell =
  (search) =>
  ({ cell, key, keyRow }, defaultRender, { expandAction }) => {
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
        return defaultRender('element that match', key);
      default:
        return (
          <p>
            Match: <b>{search}</b>
          </p>
        );
    }
  };

const customHeader = (searchElement, pageSizeElement, showEntriesText) => (
  <div className="columns is-vcentered">
    <div className="column is-6">
      <div className="field has-addons">{searchElement}</div>
    </div>
    <div className="column is-6">
      <div>
        {pageSizeElement}
        <div>{showEntriesText}</div>
      </div>
    </div>
  </div>
);

// TODO onFilter
// TODO onSort
const GeneList = () => {
  const [search, setSearch] = React.useState('');
  const query = useQuery('search');
  const [results, setResults] = React.useState(undefined);

  React.useEffect(() => {
    setSearch(query);
    setResults([
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
      {
        id: '1354654654',
        name: 'azertyuiop',
        description: 'azertyuiop',
        organism: 'azertyuiop',
      },
    ]);
  }, [query]);

  return (
    <div className="section pt-1">
      <div className="content has-text-centered">
        <p className="title is-5">{`${i18n.t('search.genes.title')}`}</p>
      </div>
      <p>{i18n.t('search.genes.description')}</p>
      <div>
        <div className="card search-input mx-auto my-3">
          <div className="card-content">
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-flex is-align-items-center">
                  <button className="button mr-2" type="button">
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
          </div>
        </div>
      </div>
      {results && (
        <div>
          <p className="title is-6 gradient-underline">
            {i18n.t('global.results')}
          </p>
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
              'Match',
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
