/* eslint-disable no-case-declarations,react/no-array-index-key */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import ComplexTable from '../../components/ComplexTable';
import Bulma from '../../components/Bulma';
import useGeneSearch from '../../hooks/useGeneSearch';
import GeneSearch from '../../components/Gene/GeneSearch';
import splitWithOccurrences from '../../helpers/splitWithOccurrences';

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
            ).replace(':speciesId', cell.onlySpecies ? '' : cell.speciesId)}
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
      case 'match':
        const match = splitWithOccurrences(cell.match, search);
        return (
          <span>
            {match.map((v, keyMatch) =>
              typeof v === 'string' ? (
                <React.Fragment key={keyMatch}>{v}</React.Fragment>
              ) : (
                <strong key={v.key} className="has-text-primary">
                  {v.text}
                </strong>
              )
            )}{' '}
            ({cell.matchSource})
          </span>
        );
      case 'description':
      default:
        return defaultRender(cell[key]);
    }
  };

const customHeader = (searchElement, pageSizeElement) => (
  <Bulma.Columns vCentered>
    <Bulma.C size={6}>
      <div className="field has-addons">{searchElement}</div>
    </Bulma.C>
    <Bulma.C size={6}>
      <div>{pageSizeElement}</div>
    </Bulma.C>
  </Bulma.Columns>
);

const GeneList = () => {
  const { search: queryParams } = useLocation();
  const [search, setSearch] = React.useState('');
  const {
    resResultListGenes: results,
    searchResultHandler,
    setResults,
  } = useGeneSearch(search);

  const objMapping = React.useCallback(
    (element) => ({
      id: element.gene.geneId,
      speciesId: element.gene.species.id,
      name: element.gene.name,
      description: element.gene.description,
      organism: `${element.gene.species.genus} ${element.gene.species.speciesName} (${element.gene.species.name})`,
      match: element.match,
      matchSource: element.matchSource,
      onlySpecies: element.gene.geneMappedToSameGeneIdCount === 1,
    }),
    []
  );

  const onFilter = React.useCallback(
    (searchReg) => (element) => {
      const regExp = new RegExp(searchReg, 'gi');
      return (
        Boolean(regExp.test(element.gene.geneId)) ||
        Boolean(
          regExp.test(
            `${element.gene.species.genus} ${element.gene.species.speciesName} (${element.gene.species.name})`
          )
        ) ||
        Boolean(regExp.test(element.gene.description)) ||
        Boolean(regExp.test(element.gene.name))
      );
    },
    []
  );

  React.useEffect(() => {
    const params = new URLSearchParams(queryParams);

    if (params.get('search')) {
      setSearch(params.get('search'));
      setResults();
      searchResultHandler(params.get('search'));
    }
  }, [queryParams]);

  return (
    <>
      <div className="content has-text-centered">
        <Bulma.Title size={5}>{`${i18n.t('search.genes.title')}`}</Bulma.Title>
      </div>
      <p>{i18n.t('search.genes.description')}</p>
      <div>
        <GeneSearch classNames="search-input mx-auto my-3">
          <p>
            {`Example: `}
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
        </GeneSearch>
      </div>
      {results && (
        <div>
          <p className="has-text-centered my-5 has-text-weight-semibold">
            {results.totalMatchCount > 10000
              ? `About ${results.totalMatchCount} gene(s) found for '${search}' (only the first 10000 genes are displayed)`
              : `${results.totalMatchCount} ${i18n.t(
                  'search.genes.genes-found'
                )} '${search}'`}
          </p>
          <ComplexTable
            pagination
            scrollable
            sortable
            classNamesTable="is-striped"
            columns={[
              { text: 'Gene ID', key: 'id' },
              { text: 'Name', key: 'name' },
              { text: 'Description', key: 'description' },
              { text: 'Organism', key: 'organism' },
              { text: 'Match', key: 'match' },
            ]}
            data={results.geneMatches}
            onFilter={onFilter}
            customHeader={customHeader}
            onRenderCell={onRenderCell(search)}
            mappingObj={objMapping}
          />
        </div>
      )}
    </>
  );
};

export default GeneList;
