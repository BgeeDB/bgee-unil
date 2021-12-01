/* eslint-disable no-nested-ternary,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Bulma from '../Bulma';
import api from '../../api';
import classnames from '../../helpers/classnames';
import LinkExternal from '../LinkExternal';
import useQuery from '../../hooks/useQuery';
import schemaDotOrg from '../../helpers/schemaDotOrg';
import { MEDIA_QUERIES } from '../../helpers/constants/mediaQueries';
import GENE_DETAILS_HTML_IDS from '../../helpers/constants/GeneDetailsHtmlIds';
import Table from '../Table';

const CUSTOM_FIELDS = [
  {
    key: 'anat',
    text: 'Anat. entity and cell types',
  },
  {
    key: 'devStage',
    text: 'Dev. stage',
  },
  {
    key: 'sex',
    text: 'Sex',
  },
  {
    key: 'strain',
    text: 'Strain',
  },
];

const columnsGenerator = (cFields, data) => () => {
  let c = [];
  if (!data) return null;

  if (data.requestedConditionParameters.find((r) => r === 'Anat. entity')) {
    c.push({
      key: 'anatEntity',
      text: 'Anatomical entity',
    });
  }
  if (data.requestedConditionParameters.find((r) => r === 'Dev. stage'))
    c.push({
      key: 'devStage',
      text: 'Dev. stage',
      hide: MEDIA_QUERIES.DESKTOP,
    });
  if (data.requestedConditionParameters.find((r) => r === 'Sex'))
    c.push({
      key: 'sex',
      text: 'Sex',
      hide: MEDIA_QUERIES.DESKTOP,
    });
  if (data.requestedConditionParameters.find((r) => r === 'Strain'))
    c.push({
      key: 'strain',
      text: 'Strain',
      style: { width: 100 },
      hide: MEDIA_QUERIES.DESKTOP,
    });
  c = [
    ...c,
    {
      key: 'expScore',
      text: 'Expression score',
      hide: MEDIA_QUERIES.MOBILE_L,
    },
    {
      key: 'fdr',
      text: 'FDR',
      style: { width: 100 },
      hide: MEDIA_QUERIES.MOBILE_L,
    },
    {
      key: 'sources',
      text: 'Sources',
      style: {
        width: 110,
      },
      hide: MEDIA_QUERIES.DESKTOP,
    },
  ];
  return c;
};
const AnatEntityCell = ({ cell }) => {
  const cellInfo = [
    <LinkExternal
      key={`link-${cell.condition.anatEntity.id}`}
      to={`http://purl.obolibrary.org/obo/${cell.condition.anatEntity.id.replace(
        ':',
        '_'
      )}`}
      className="mr-1"
    >
      {cell.condition.anatEntity.id}
    </LinkExternal>,
  ];
  if (cell.condition.cellType) {
    cellInfo.push(<i key="link-in"> in </i>);
    cellInfo.push(
      <LinkExternal
        key={`link-${cell.condition.cellType.id}`}
        to={`http://purl.obolibrary.org/obo/${cell.condition.cellType.id.replace(
          ':',
          '_'
        )}`}
        className="mr-1"
      >
        {cell.condition.cellType.id}
      </LinkExternal>
    );
  }

  if (cell.condition.cellType) {
    cellInfo.push(
      <span key={`name-${cell.condition.cellType.name}`}>
        {cell.condition.cellType.name}
      </span>
    );
    cellInfo.push(<i key="name-in"> in </i>);
  }
  cellInfo.push(
    <span key={`name-${cell.condition.anatEntity.name}`}>
      {cell.condition.anatEntity.name}
    </span>
  );
  return <>{cellInfo}</>;
};

const GeneExpression = ({
  geneId,
  speciesId,
  setIsExpression,
  isExpression,
}) => {
  const history = useHistory();
  const hashExpr = useQuery('expression');
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [cFields, setCFields] = React.useState({ anat: true });

  useEffect(() => {
    if (data?.calls.length) {
      setIsExpression(true);
    } else {
      setIsExpression(false);
    }
  }, [data]);

  const columns = React.useMemo(columnsGenerator(cFields, data), [
    cFields,
    data,
  ]);

  // In order to disable the search button in the search has already been made
  const formSearchButtonIsDisabled = React.useMemo(() => {
    const oldQuery = Object.entries(cFields)
      .reduce((acc, [key, value]) => (value ? [...acc, key] : acc), [])
      .sort()
      .join(',');
    return oldQuery === (hashExpr || 'anat');
  }, [cFields, hashExpr]);

  const customHeader = React.useCallback(
    (searchElement, pageSizeElement) => (
      <>
        <div className="is-flex">
          {CUSTOM_FIELDS.map((c) => (
            <label
              className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
              key={c.key}
            >
              <input
                type="checkbox"
                checked={cFields[c.key] || false}
                onChange={(e) => {
                  setCFields((prev) => ({
                    ...prev,
                    [c.key]: e.target.checked || undefined,
                  }));
                }}
              />
              <b className="mx-1">{c.text}</b>
            </label>
          ))}
          <Bulma.Button
            className="search-form"
            disabled={formSearchButtonIsDisabled}
            onClick={() => {
              const query = Object.entries(cFields).reduce(
                (acc, [key, value]) => (value ? [...acc, key] : acc),
                []
              );
              history.replace(`?expression=${query.join(',')}`);
            }}
          >
            Update
          </Bulma.Button>
        </div>
        <Bulma.Columns vCentered className="mt-0">
          <Bulma.C size={8}>
            <div className="field">{searchElement}</div>
          </Bulma.C>
          <Bulma.C size={4}>
            <div>{pageSizeElement}</div>
          </Bulma.C>
        </Bulma.Columns>
      </>
    ),
    [isLoading, cFields]
  );
  const onRenderCell = React.useCallback(
    ({ cell, key }, defaultRender) => {
      switch (key) {
        case 'anatEntity':
          return <AnatEntityCell cell={cell} />;
        case 'devStage':
          return (
            <>
              <span className="is-size-7">
                <LinkExternal
                  to={`http://purl.obolibrary.org/obo/${cell.condition.devStage.id.replace(
                    ':',
                    '_'
                  )}`}
                  className="mr-1"
                >
                  {cell.condition.devStage.id}
                </LinkExternal>
                {cell.condition.devStage.name}
              </span>
            </>
          );
        case 'expScore':
          return (
            <span
              key={key}
              style={
                cell.expressionScore.expressionScoreConfidence !== 'high'
                  ? {
                      color: 'lightgrey',
                    }
                  : {}
              }
            >
              {cell.expressionScore.expressionScore}
            </span>
          );
        case 'fdr':
          return defaultRender(cell.fdr, key);
        case 'strain':
          return defaultRender(cell.condition.strain, key);
        case 'sex':
          return defaultRender(cell.condition.sex, key);
        case 'sources':
          const col = columns.find((c) => c.key === key);
          return (
            <div className="tags tags-source" style={col?.style}>
              <span
                title={`Affymetrix: ${
                  cell.dataTypesWithData.find((d) => d === 'Affymetrix')
                    ? 'presence'
                    : 'absence'
                }`}
                className={classnames('tag tag-source', {
                  present: cell.dataTypesWithData.find(
                    (d) => d === 'Affymetrix'
                  ),
                })}
              >
                A
              </span>
              <span
                title={`EST: ${
                  cell.dataTypesWithData.find((d) => d === 'EST')
                    ? 'presence'
                    : 'absence'
                }`}
                className={classnames('tag tag-source', {
                  present: cell.dataTypesWithData.find((d) => d === 'EST'),
                })}
              >
                E
              </span>
              <span
                title={`In Situ: ${
                  cell.dataTypesWithData.find(
                    (d) => d === 'in situ hybridization'
                  )
                    ? 'presence'
                    : 'absence'
                }`}
                className={classnames('tag tag-source', {
                  present: cell.dataTypesWithData.find(
                    (d) => d === 'in situ hybridization'
                  ),
                })}
              >
                I
              </span>
              <span
                title={`RNA-Seq: ${
                  cell.dataTypesWithData.find((d) => d === 'RNA-Seq')
                    ? 'presence'
                    : 'absence'
                }`}
                className={classnames('tag tag-source', {
                  present: cell.dataTypesWithData.find((d) => d === 'RNA-Seq'),
                })}
              >
                R
              </span>
              <span
                title={`full length single cell RNA-Seq: ${
                  cell.dataTypesWithData.find(
                    (d) => d === 'full length single cell RNA-Seq'
                  )
                    ? 'presence'
                    : 'absence'
                }`}
                className={classnames('tag tag-source', {
                  present: cell.dataTypesWithData.find(
                    (d) => d === 'full length single cell RNA-Seq'
                  ),
                })}
              >
                FL
              </span>
            </div>
          );
        default:
          return defaultRender(key, key);
      }
    },
    [columns]
  );
  const onFilter = React.useCallback(
    (search) => (element) => {
      const regExp = new RegExp(search, 'gi');
      return (
        regExp.test(element?.condition?.anatEntity?.id) ||
        regExp.test(element?.condition?.anatEntity?.name) ||
        regExp.test(element?.condition?.devStage?.id) ||
        regExp.test(element?.condition?.devStage?.name) ||
        regExp.test(element?.condition?.cellType?.id) ||
        regExp.test(element?.condition?.cellType?.name) ||
        regExp.test(element?.condition?.strain) ||
        regExp.test(element?.condition?.sex)
      );
    },
    []
  );

  React.useEffect(() => {
    setIsLoading(true);
    const fields = {};
    if (hashExpr) {
      hashExpr.split(',').forEach((key) => {
        fields[key] = true;
      });
    } else fields.anat = true;
    setCFields(fields);
    api.search.genes
      .expression(geneId, speciesId, fields)
      .then((res) => {
        setData(res.data);
        if (
          res.data.requestedConditionParameters.find(
            (r) => r === 'Anat. entity'
          )
        )
          schemaDotOrg.setGeneExpressionLdJSON(res.data);
      })
      .catch((err) => {
        console.error(err);
        setData();
      })
      .finally(() => setIsLoading(false));
    return () => {
      schemaDotOrg.unsetGeneExpressionLdJSON();
    };
  }, [hashExpr]);

  return (
    <>
      {isExpression && (
        <div>
          <Bulma.Title
            size={4}
            className="gradient-underline"
            id={GENE_DETAILS_HTML_IDS.EXPRESSION}
          >
            Expression
          </Bulma.Title>
          <div>
            {isLoading && (
              <progress
                className="progress is-small"
                max="100"
                style={{ animationDuration: '4s' }}
              >
                80%
              </progress>
            )}{' '}
            {!isLoading && data && (
              <>
                <Table
                  columns={columns}
                  data={data.calls}
                  onRenderCell={onRenderCell}
                  pagination
                  name="GeneExpression"
                  onFilter={onFilter}
                  customHeader={customHeader}
                  onRenderRow={(row, prev) => {
                    if (prev && row.clusterIndex > prev.clusterIndex) {
                      return 'gap-cluster';
                    }
                    return '';
                  }}
                />

                <p className="has-text-weight-semibold is-underlined mt-0">
                  Sources
                </p>
                <Bulma.Columns vCentered className="my-0">
                  <Bulma.C>
                    <span>
                      <b>A</b>
                      <span className="is-size-7"> Affimetrix</span>
                    </span>
                  </Bulma.C>
                  <Bulma.C>
                    <span>
                      <b>E</b>
                      <span className="is-size-7"> EST</span>
                    </span>
                  </Bulma.C>
                  <Bulma.C>
                    <span>
                      <b>I</b>
                      <span className="is-size-7"> In Situ</span>
                    </span>
                  </Bulma.C>
                  <Bulma.C>
                    <span>
                      <b>R</b>
                      <span className="is-size-7"> RNA-Seq</span>
                    </span>
                  </Bulma.C>
                  <Bulma.C>
                    <span>
                      <b>FL</b>
                      <span className="is-size-7"> scRNA-Seq Full Length</span>
                    </span>
                  </Bulma.C>
                  <Bulma.C className="is-flex is-align-items-center">
                    <span
                      className={classnames('tag tag-source present legend', {
                        'is-primary': true,
                      })}
                    >
                      data
                    </span>
                    <span
                      className={classnames('ml-1 tag tag-source legend', {
                        'is-primary': false,
                      })}
                    >
                      no data
                    </span>
                  </Bulma.C>
                </Bulma.Columns>
                <p className="has-text-weight-semibold is-underlined mt-0">
                  Expression scores
                </p>
                <Bulma.Columns vCentered className="mt-0">
                  <Bulma.C>
                    <span>
                      <span style={{ color: 'lightGrey' }}>3.25e4</span>
                      <span className="is-size-7">
                        {' '}
                        lightgrey: low confidence scores
                      </span>
                    </span>
                  </Bulma.C>
                  <Bulma.C className="is-flex is-align-items-center">
                    <hr className="dot-line m-0 mr-2" />
                    <span className="is-size-7">
                      {' '}
                      important score variation
                    </span>
                  </Bulma.C>
                </Bulma.Columns>
                <div className="separator my-5" />
                <p className="is-size-7">
                  <b>Expression scores</b> of expression calls is based on the
                  rank of a gene in a condition according to its expression
                  levels (non-parametric statistics), normalized using the
                  minimum and maximum Rank of the species. Values of Expression
                  scores are between 0 and 100. Low score means that the gene is
                  lowly expressed in the condition compared to other genes.
                  Scores are normalized and comparable across genes, conditions
                  and species.
                </p>
                <Bulma.Columns>
                  <Bulma.Column size={4}>
                    <p className="is-size-7">
                      Sources of annotations to anatomy and development:
                    </p>
                    <ul className="unordered">
                      {!!data?.gene?.species &&
                        data.gene.species.sourcesOfAnnotationsPerDataType.map(
                          (d, key) => (
                            <li key={key} className="is-size-7">
                              {`${d.dataType} data: `}
                              {d.sources.map((s, sKey) => (
                                <LinkExternal key={sKey} to={s.baseUrl}>
                                  {s.name}
                                </LinkExternal>
                              ))}
                            </li>
                          )
                        )}
                    </ul>
                  </Bulma.Column>
                  <Bulma.Column size={4}>
                    <p className="is-size-7">Sources of raw data:</p>
                    <ul className="unordered">
                      {!!data?.gene?.species &&
                        data.gene.species.sourcesOfDataPerDataType.map(
                          (d, key) => (
                            <li key={key} className="is-size-7">
                              {`${d.dataType} data: `}
                              {d.sources.reduce((acc, s, sKey) => {
                                if (sKey !== 0)
                                  acc.push(
                                    <span key={`comma-${sKey}`}>, </span>
                                  );
                                acc.push(
                                  <LinkExternal key={sKey} to={s.baseUrl}>
                                    {s.name}
                                  </LinkExternal>
                                );
                                return acc;
                              }, [])}
                            </li>
                          )
                        )}
                    </ul>
                  </Bulma.Column>
                </Bulma.Columns>
              </>
            )}
            {!isLoading && !data && <span>No data</span>}
          </div>
        </div>
      )}
    </>
  );
};

export default GeneExpression;
