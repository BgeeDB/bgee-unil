import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Table from '../../components/Table';
import Bulma from '../../components/Bulma';
import api from '../../api';
import PATHS from '../../routes/paths';
import LinkExternal from '../../components/LinkExternal/LinkExternal';
import classnames from '../../helpers/classnames';
import copyToClipboard from '../../helpers/copyToClipboard';
import { NotificationContext } from '../../contexts/NotificationsContext';
import random from '../../helpers/random';
import obolibraryLinkFromID from '../../helpers/obolibraryLinkFromID';

const DEFAULT_RESULTS = {
  signature: undefined,
  data: undefined,
};

const AnatEntitiesCell = ({
  multiSpeciesCondition = null,
  condition = null,
}) => {
  if (condition) {
    return (
      <>
        {condition.cellType && (
          <>
            <LinkExternal
              content={condition.cellType.id}
              to={obolibraryLinkFromID(condition.cellType.id)}
            >
              <span>{condition.cellType.name}</span>
            </LinkExternal>
            <i> in </i>
          </>
        )}
        <LinkExternal
          content={condition.anatEntity.id}
          to={obolibraryLinkFromID(condition.anatEntity.id)}
        >
          <span>{condition.anatEntity.name}</span>
        </LinkExternal>
      </>
    );
  }

  if (multiSpeciesCondition) {
    const items = [];
    if (
      multiSpeciesCondition.cellTypes &&
      multiSpeciesCondition.cellTypes.length > 0
    ) {
      multiSpeciesCondition.cellTypes.forEach((cellType, key) => {
        items.push(
          <LinkExternal
            key={cellType.id}
            to={obolibraryLinkFromID(cellType.id)}
          >
            <span>{cellType.name}</span>
          </LinkExternal>
        );
        if (key + 1 !== multiSpeciesCondition.cellTypes.length)
          items.push(<span key={`separator-${cellType.id}`}>, </span>);
      });
      items.push(<i key="separator-in"> in </i>);
    }
    multiSpeciesCondition.anatEntities.forEach((item, key) => {
      items.push(
        <LinkExternal to={obolibraryLinkFromID(item.id)}>
          <span>{item.name}</span>
        </LinkExternal>
      );
      if (key + 1 !== multiSpeciesCondition.anatEntities.length)
        items.push(<span key={`separator-${item.id}`}>, </span>);
    });

    return items;
  }
  return null;
};

const GeneItemNb = ({ itemTab }) => {
  if (itemTab.length > 1) {
    return <span>{itemTab.length} genes</span>;
  }
  return <span>{itemTab.length} gene</span>;
};

const ExpandCell = ({ onClick }) => (
  <a
    className="expand-button"
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    <Bulma.IonIcon name="chevron-down-sharp" />
  </a>
);

const GenesCell = ({ genes }) => (
  <div style={{}}>
    <GeneItemNb itemTab={genes} />
    <div className="expand-content">
      {genes.map((item) => (
        <div key={item.geneId} className="is-flex is-flex-wrap-wrap">
          <Link
            className="internal-link"
            content={item.geneId}
            to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES.replace(
              ':geneId',
              item.geneId
            ).replace(':speciesId', item.species.id)}
          >
            <span style={{ fontSize: 12 }}>{item.geneId}</span>
          </Link>
          <span style={{ marginLeft: 3, fontSize: 12 }}>{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SpeciesCell = ({ genes }) => {
  const speciesList = [];
  genes.forEach((item) => {
    if (speciesList.length === 0) {
      speciesList.push(item.species);
    } else if (
      speciesList.find((element) => element.id === item.species.id) ===
      undefined
    ) {
      speciesList.push(item.species);
    }
  });

  return (
    <div
      style={{
        width: '160px',
      }}
    >
      <span>{speciesList.length} species</span>
      <div className="expand-content">
        {speciesList.map((item) => (
          <div key={item.id}>
            <Link
              className="internal-link"
              content={item.id}
              to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', item.id)}
            >
              <span style={{ fontSize: 12 }}>
                {item.genus} {item.speciesName}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const onRenderCell = ({ cell, key }, defaultRender, { expandAction }) => {
  switch (key) {
    case 'anat-entities':
      return <AnatEntitiesCell {...cell} />;
    case 'xpr-score':
      return <span>{cell.conservationScore}</span>;
    case 'max-xpr-score':
      return <span>{cell.maxExpressionScore}</span>;
    case 'gene-present':
      return <GenesCell genes={cell.genesExpressionPresent} />;
    case 'gene-absent':
      return <GenesCell genes={cell.genesExpressionAbsent} />;
    case 'gene-no-data':
      return <GenesCell genes={cell.genesNoData} />;
    case 'species-present':
      return <SpeciesCell genes={cell.genesExpressionPresent} />;
    case 'species-absent':
      return <SpeciesCell genes={cell.genesExpressionAbsent} />;
    case 'details':
      return <ExpandCell key={key} onClick={expandAction} />;
    default:
      return null;
  }
};
const dataToTsv = (data) => {
  let tsv =
    'Anatomical entities\tConservation score\tMax expression score\tGenes with presence of expression\tGenes with absence of expression\tGenes with no data\tSpecies with presence of expression\tSpecies with absence of expression\tAnatomical entity IDs\tGene count with presence of expression\tGene count with absence of expression\tGene count with no data\tSpecies count with presence of expression\tSpecies count with absence of expression\r\n';

  data.forEach((d) => {
    let ids = '';
    if (d.multiSpeciesCondition) {
      if (d.multiSpeciesCondition.cellTypes)
        ids = `${d.multiSpeciesCondition.cellTypes
          .map((a) => a.id)
          .join(', ')} in `;
      ids += d.multiSpeciesCondition.anatEntities.map((a) => a.id).join(', ');
    } else if (d.condition) {
      if (d.condition.cellType) ids = `${d.condition.cellType.id} in `;
      ids += d.condition.anatEntity.id;
    }
    tsv += `${[
      d.filterAnatEntities,
      d.conservationScore,
      d.maxExpressionScore,
      d.genesExpressionPresent.map((g) => g.geneId).join(', '),
      d.genesExpressionAbsent.map((g) => g.geneId).join(', '),
      d.genesNoData.map((g) => g.geneId).join(', '),
      d.genesExpressionPresent
        .map((g) => `${g.species.genus} ${g.species.speciesName}`)
        .join(', '),
      d.genesExpressionAbsent
        .map((g) => `${g.species.genus} ${g.species.speciesName}`)
        .join(', '),
      ids,
      d.countGenesExprPresent,
      d.countGenesExprAbsent,
      d.countGenesNoData,
      d.countSpeciesExprPresent,
      d.countSpeciesExprAbsent,
    ].join('\t')}\r\n`;
  });

  return tsv;
};
const customHeader =
  (addNotification) => (searchElement, pageSizeElement, data) => {
    const copyIntoClipboard = () => {
      const table = `Expression Comparison\n\n${dataToTsv(data)}`;
      copyToClipboard(table);
      addNotification({
        id: random.toString(),
        children: <p>Copied {data.length} rows to clipboard.</p>,
        className: `is-success`,
      });
    };
    const exportTSV = `data:text/tab-separated-values;charset=utf-8,${dataToTsv(
      data
    )}`;
    return (
      <Bulma.Columns vCentered>
        <Bulma.C size={9}>
          <div className="tablet-flex-direction-column is-flex is-flex-direction-row is-align-items-center">
            <div>{searchElement}</div>
            <Bulma.Button className="ml-2 py-0" onClick={copyIntoClipboard}>
              Copy to clipboard
              <span className="icon is-small ml-1">
                <ion-icon name="clipboard-outline" />
              </span>
            </Bulma.Button>
            <Bulma.Button
              className="ml-2 py-0"
              href={exportTSV}
              renderAs="a"
              download="expression comparison.tsv"
              target="_blank"
              rel="noreferrer"
            >
              TSV
              <span className="icon is-small ml-1">
                <ion-icon name="download-outline" />
              </span>
            </Bulma.Button>
          </div>
        </Bulma.C>
        <Bulma.C size={3}>
          <div>{pageSizeElement}</div>
        </Bulma.C>
      </Bulma.Columns>
    );
  };

const onFilter = (search) => (element) => {
  const regExp = new RegExp(search, 'i');
  let hasMatch =
    regExp.test(element.conservationScore) ||
    regExp.test(element.maxExpressionScore);

  if (element.multiSpeciesCondition) {
    for (
      let i = 0;
      i < element.multiSpeciesCondition.anatEntities.length && !hasMatch;
      i += 1
    ) {
      if (regExp.test(element.multiSpeciesCondition.anatEntities[i].name))
        hasMatch = true;
    }
    for (
      let i = 0;
      i < element.multiSpeciesCondition.cellTypes.length && !hasMatch;
      i += 1
    ) {
      if (regExp.test(element.multiSpeciesCondition.cellTypes[i].name))
        hasMatch = true;
    }
  } else if (element.condition) {
    hasMatch =
      regExp.test(element.condition.anaEntity.name) ||
      regExp.test(element.condition.cellType.name);
  }

  for (
    let i = 0;
    i < element.genesExpressionAbsent.length && !hasMatch;
    i += 1
  ) {
    if (
      regExp.test(
        `${element.genesExpressionAbsent[i].geneId} ${element.genesExpressionAbsent[i].name}`
      ) ||
      regExp.test(
        `${element.genesExpressionAbsent[i].species.genus} ${element.genesExpressionAbsent[i].species.speciesName}`
      )
    )
      hasMatch = true;
  }
  for (
    let i = 0;
    i < element.genesExpressionPresent.length && !hasMatch;
    i += 1
  ) {
    if (
      regExp.test(
        `${element.genesExpressionPresent[i].geneId} ${element.genesExpressionPresent[i].name}`
      ) ||
      regExp.test(
        `${element.genesExpressionPresent[i].species.genus} ${element.genesExpressionPresent[i].species.speciesName}`
      )
    )
      hasMatch = true;
  }
  for (let i = 0; i < element.genesNoData.length && !hasMatch; i += 1) {
    if (
      regExp.test(
        `${element.genesNoData[i].geneId} ${element.genesNoData[i].name}`
      )
    ) {
      console.log(element.genesNoData[i]);
      hasMatch = true;
    }
  }

  return hasMatch;
};

const mappingKey = {
  'anat-entities': 'filterAnatEntities',
  'xpr-score': 'conservationScore',
  'max-xpr-score': 'maxExpressionScore',
  'gene-absent': 'countGenesExprAbsent',
  'gene-present': 'countGenesExprPresent',
  'gene-no-data': 'countGenesNoData',
  'species-absent': 'countSpeciesExprAbsent',
  'species-present': 'countSpeciesExprPresent',
};
const onSortField = ({ key, sort }, aEl, bEl) => {
  let a = aEl[mappingKey[key]];
  let b = bEl[mappingKey[key]];
  if (key === 'xpr-score' || key === 'max-xpr-score') {
    a = Number(a);
    b = Number(b);
  }
  if (key === 'anat-entities') {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  if (a === b) return 0;
  if (sort === 'ascending') return a > b ? 1 : -1;
  if (sort === 'descending') return a < b ? 1 : -1;
  return 0;
};
const onSort = (sortOpts) => (a, b) => {
  if (Array.isArray(sortOpts)) {
    for (let i = 0; i < sortOpts.length; i += 1) {
      const diff = onSortField(sortOpts[i], a, b);
      if (diff !== 0) return diff;
    }
  } else {
    return onSortField(sortOpts, a, b);
  }
  return 0;
};

const ExpComp = () => {
  const history = useHistory();
  const [error, setError] = React.useState(false);
  const { addNotification } = React.useContext(NotificationContext);
  const [loading, setLoading] = React.useState(false);
  const [results, set] = React.useState(DEFAULT_RESULTS);
  const [unknownGenes, setUnknownGenes] = React.useState();
  const { search: searchParams } = useLocation();

  const setResults = React.useCallback((d) => {
    set(d || DEFAULT_RESULTS);
  }, []);

  const [searchValue, setSearchValue] = useState('');

  React.useEffect(() => {
    if (searchValue !== '') {
      api.topAnat.autoCompleteGenes(searchValue).then((res) => {
        setUnknownGenes(res.data.fg_list.undeterminedGeneIds);
      });
    } else setUnknownGenes();
  }, [searchValue]);

  const handlerClickSearch = () => {
    if (searchValue && searchValue !== '') {
      if (searchValue.split('\n').filter((a) => a !== '').length < 2) {
        setError(true);
        return;
      }
      setError(false);
      setLoading(true);
      api.expressionComparison
        .getResults({ type: 'form', data: searchValue })
        .then(({ data, storableParams }) => {
          setResults({
            signature: storableParams?.queryString,
            data,
          });
          if (storableParams?.queryString) {
            history.replace(`?${storableParams?.queryString}`);
          }
        })
        .catch((err) => {
          console.error(err);
          setResults();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    if (searchParams && searchParams.replace('?', '') !== results?.signature) {
      setLoading(true);
      api.expressionComparison
        .getResults({ type: 'query', data: searchParams })
        .then(
          ({ data, storableParams: { queryString }, requestParameters }) => {
            setResults({
              signature: queryString,
              data,
            });
            setSearchValue(requestParameters?.gene_list.join('\n'));
          }
        )
        .catch((err) => {
          console.error(err);
          setResults({
            ...DEFAULT_RESULTS,
            signature: searchParams.replace('?', ''),
          });
          if (err.data.requestParameters?.gene_list)
            setSearchValue(err.data.requestParameters?.gene_list.join('\n'));
          else setSearchValue('');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams, results]);

  return (
    <>
      <div>
        <div className="content has-text-centered">
          <p className="title is3">Expression comparison</p>
        </div>
        <p className="is-size-5">
          Compare expression of several genes. If genes belong to several
          species, comparisons will be performed in homologous organs. Please
          enter one gene ID per line.
        </p>
        <div className="is-flex is-justify-content-center my-3">
          <Bulma.Card className={classnames('form')}>
            <Bulma.Card.Body>
              <div className="content">
                <div className="field">
                  <label className="has-text-weight-semibold">Gene list</label>
                  <div className="control">
                    <textarea
                      className="textarea is-small"
                      placeholder="Enter a list of gene IDs (one ID per line or separated by a comma)"
                      rows="10"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  {error && (
                    <span className="has-text-danger">
                      At least two IDs should be provided
                    </span>
                  )}
                  <div className="control">
                    <button
                      className="button search-form"
                      type="button"
                      disabled={loading}
                      onClick={handlerClickSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="field">
                  <p>
                    Examples:{' '}
                    <Link className="internal-link" to="?data=8798798749849841">
                      SRRM4 (brain specific genes)
                    </Link>
                    {', '}
                    <Link
                      className="internal-link"
                      to="?gene_list=ENSDARG00000059263%0D%0AENSG00000170178%0D%0AENSMUSG00000001823"
                    >
                      Hoxd12 (development pattern genes)
                    </Link>
                  </p>
                </div>
              </div>
            </Bulma.Card.Body>
          </Bulma.Card>
        </div>
      </div>
      {unknownGenes && unknownGenes.length > 0 && (
        <p>
          Unknown Ensembl IDs:{' '}
          {unknownGenes.map((g, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`UG-${key}`}>{`'${g}'${
              key + 1 !== unknownGenes.length ? ', ' : ''
            }`}</React.Fragment>
          ))}
        </p>
      )}
      {loading && (
        <Bulma.Notification color="info" className="mt-5">
          <p className="has-text-centered">Loading</p>
          <progress
            className="progress is-small"
            max="100"
            style={{ animationDuration: '3s', marginBottom: 12 }}
          >
            80%
          </progress>
        </Bulma.Notification>
      )}
      {!loading && results.signature && results.data && (
        <div>
          <div className="mb-2">
            <h1 className="gradient-underline title is-size-4 has-text-primary        ">
              Results
            </h1>
            <div className="">
              <p className="">
                Results are ordered by default by descendant &quot;Conservation
                score&quot;, then ascendant &quot;Genes with absence of
                expression&quot;, then descendant &quot;Max expression
                score&quot;. The order could be changed by clicking on one
                column, then press shift and click on another column.
              </p>
            </div>
          </div>
          <Table
            sortable
            multiSortable
            pagination
            classNamesTable="is-striped"
            onFilter={onFilter}
            onSortCustom={onSort}
            initialSorting={[
              { key: 'xpr-score', sort: 'descending' },
              { key: 'gene-absent', sort: 'ascending' },
              { key: 'max-xpr-score', sort: 'descending' },
            ]}
            columns={[
              {
                key: 'anat-entities',
                text: 'Anatomical entities',
              },
              {
                key: 'xpr-score',
                text: 'Conservation score',
                style: { width: 80 },
              },
              {
                key: 'max-xpr-score',
                text: 'Max expression score',
                style: { width: 100 },
              },
              {
                key: 'gene-present',
                text: 'Genes with presence of expression',
                style: { minWidth: 75, maxWidth: 150 },
              },
              {
                key: 'gene-absent',
                text: 'Genes with absence of expression',
                style: { minWidth: 75, maxWidth: 150 },
              },
              {
                key: 'gene-no-data',
                text: 'Genes with no data',
                style: { minWidth: 75, maxWidth: 150 },
              },
              {
                key: 'species-present',
                text: 'Species with presence of expression',
                style: { minWidth: 75, maxWidth: 150 },
              },
              {
                key: 'species-absent',
                text: 'Species with absence of expression',
                style: { minWidth: 75, maxWidth: 150 },
              },
              {
                key: 'details',
                text: 'See details',
              },
            ]}
            data={results?.data?.comparisonResults || []}
            customHeader={customHeader(addNotification)}
            onRenderCell={onRenderCell}
          />
        </div>
      )}
    </>
  );
};

export default ExpComp;
