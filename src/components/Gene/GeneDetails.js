/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { isDate } from '@creativebulma/bulma-collapsible/src/js/utils/type';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import api from '../../api';
import LinkExternal from '../LinkExternal';
import { SEARCH_CANCEL_API } from '../../api/prod/search';
import ComplexTable from '../ComplexTable';
import isPlural from '../../helpers/isPlural';
import classnames from '../../helpers/classnames';
import GeneSearch from './GeneSearch';

const MAX_ELEMENTS = 8;

const ExpandableList = ({ items, renderElement }) => {
  const [expand, setExpand] = React.useState(false);

  const elements = React.useMemo(() => {
    if (expand || items.length <= MAX_ELEMENTS) return items;
    return items.slice(0, MAX_ELEMENTS);
  }, [items, expand]);

  return (
    <>
      <div className="tags">
        {elements.map((ref, key) => renderElement(ref, key, elements))}
        {items.length > MAX_ELEMENTS && (
          <Bulma.Button
            size="small"
            className="ml-3"
            onClick={() => setExpand((prev) => !prev)}
          >
            <span className="icon">
              <ion-icon
                name={expand ? 'remove-outline' : 'add-outline'}
                size="large"
              />
            </span>
          </Bulma.Button>
        )}
      </div>
    </>
  );
};

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
const GeneExpression = ({ geneId, speciesId }) => {
  const [data, setData] = React.useState();
  const [cFields, setCFields] = React.useState({ anat: true });

  const columns = React.useMemo(() => {
    let c = [];

    if (cFields.anat)
      c.push({
        key: 'anatEntity',
        text: 'Anatomical entity',
      });
    if (cFields.devStage)
      c.push({
        key: 'devStage',
        text: 'Dev. stage',
      });
    if (cFields.sex)
      c.push({
        key: 'sex',
        text: 'Sex',
      });
    if (cFields.strain)
      c.push({
        key: 'strain',
        text: 'Strain',
        style: { minWidth: 100 },
      });
    c = [
      ...c,
      {
        key: 'expScore',
        text: 'Expression score',
      },
      {
        key: 'fdr',
        text: 'FDR',
        style: { minWidth: 100 },
      },
      {
        key: 'sources',
        text: 'Sources',
        style: {
          maxWidth: 350,
        },
      },
    ];
    return c;
  }, [cFields]);
  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <Bulma.Columns vCentered>
        <Bulma.C size={8}>
          <div className="field">{searchElement}</div>
          <div className="is-flex">
            Fields:
            {CUSTOM_FIELDS.map((c) => (
              <label
                className="checkbox ml-2 is-size-7 is-flex is-align-items-center"
                key={c.key}
              >
                <input
                  type="checkbox"
                  checked={cFields[c.key]}
                  onChange={(e) => {
                    console.log(cFields[c.key], e.target.checked);
                    setCFields((prev) => ({
                      ...prev,
                      [c.key]: e.target.checked,
                    }));
                  }}
                />
                <b className="mx-1">{c.text}</b>
              </label>
            ))}
          </div>
        </Bulma.C>
        <Bulma.C size={4}>
          <div>
            {pageSizeElement}
            <div>{showEntriesText}</div>
          </div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    [cFields]
  );
  const onRenderCell = React.useCallback(
    ({ cell, key }, defaultRender) => {
      switch (key) {
        case 'anatEntity':
          return (
            <>
              <span className="is-size-7">
                <LinkExternal
                  to={`http://purl.obolibrary.org/obo/${cell.condition.anatEntity.id.replace(
                    ':',
                    '_'
                  )}`}
                  className="mr-1"
                >
                  {cell.condition.anatEntity.id}
                </LinkExternal>
                {cell.condition.anatEntity.name}
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
        case 'sources':
          return (
            <div className="tags">
              {cell.dataTypesWithData.map((d) => (
                <span key={d} className="tag is-size-7 is-primary">
                  {d}
                </span>
              ))}
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
        regExp.test(element?.condition?.strain)
      );
    },
    []
  );

  React.useEffect(() => {
    api.search.genes
      .expression(geneId, speciesId)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Bulma.Title size={5} className="gradient-underline">
        Expression
      </Bulma.Title>
      <div className="static-section near-columns">
        {data && (
          <>
            <ComplexTable
              columns={columns}
              data={data.calls}
              onRenderCell={onRenderCell}
              pagination
              onFilter={onFilter}
              customHeader={customHeader}
            />
            {/* todo add legends */}
            <p>
              <b>Expression scores</b> of expression calls is based on the rank
              of a gene in a condition according to its expression levels
              (non-parametric statistics), normalized using the minimum and
              maximum Rank of the species. Values of Expression scores are
              between 0 and 100. Low score means that the gene is lowly
              expressed in the condition compared to other genes. Scores are
              normalized and comparable across genes, conditions and species.
            </p>
            <Bulma.Columns className="mb-6">
              <Bulma.Column size={4}>
                <p>Sources of annotations to anatomy and development:</p>
                <ul className="unordered">
                  {data.gene.species.sourcesOfAnnotationsPerDataType.map(
                    (d, key) => (
                      <li key={key}>
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
                <p>Sources of raw data:</p>
                <ul className="unordered">
                  {data.gene.species.sourcesOfDataPerDataType.map((d, key) => (
                    <li key={key}>
                      {`${d.dataType} data: `}
                      {d.sources.reduce((acc, s, sKey) => {
                        if (sKey !== 0)
                          acc.push(<span key={`comma-${sKey}`}>, </span>);
                        acc.push(
                          <LinkExternal key={sKey} to={s.baseUrl}>
                            {s.name}
                          </LinkExternal>
                        );
                        return acc;
                      }, [])}
                    </li>
                  ))}
                </ul>
              </Bulma.Column>
            </Bulma.Columns>
          </>
        )}
      </div>
    </>
  );
};

const GeneHomologs = ({ homologs, geneId }) => {
  const onRenderCell = React.useCallback(
    ({ cell, key }, defaultRender, { expandAction }) => {
      // console.log(key);
      switch (key) {
        case 'taxonName':
          return (
            <LinkExternal
              key={key}
              to={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${cell.taxon.id}`}
            >
              {cell.taxon.scientificName}
            </LinkExternal>
          );
        case 'expressionComparison':
          let genes = [geneId, ...cell.genes.map((g) => g.geneId)];
          genes = encodeURI(genes.join('\n'));
          return (
            <Link
              key={key}
              to={`${PATHS.ANALYSIS.EXPRESSION_COMPARISON}?query=${genes}`}
            >
              Compare expression
            </Link>
          );
        case 4:
          return (
            <a key={key} className="expand-button" onClick={expandAction}>
              <Bulma.IonIcon name="chevron-down-sharp" />
            </a>
          );
        case 'genes':
          let prevSpecies = 0;
          const expandContent = cell.genes.reduce((r, a, pos) => {
            r.push(
              <span className="is-size-7" key={a.geneId}>
                {pos !== 0 && a.species.id !== prevSpecies && (
                  <div className={classnames('separator')} />
                )}
                <Link
                  className="internal-link"
                  to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES.replace(
                    ':geneId',
                    a.geneId
                  ).replace(':speciesId', a.species.id)}
                >
                  {a.geneId}
                </Link>
                {a.name ? ` ${a.name}` : ''}
                {pos < cell.genes.length && <br />}
              </span>
            );
            prevSpecies = a.species.id;

            return r;
          }, []);

          return (
            <div key={key} style={{ minWidth: 230 }}>
              <p>{`${cell.genes.length} ${isPlural(
                'gene',
                cell.genes.length
              )}`}</p>
              <div className="expand-content">{expandContent}</div>
            </div>
          );
        case 'species':
          const expandContentSpecies = cell.genes.reduce((r, a) => {
            const pos = r.findIndex((g) => g.id === a.species.id);
            if (pos === -1)
              r.push({
                id: a.species.id,
                scientificName: `${a.species.genus} ${a.species.speciesName}`,
                name: a.species.name,
                nbGenes: 1,
              });
            // eslint-disable-next-line no-param-reassign
            else r[pos].nbGenes += 1;
            return r;
          }, []);
          return (
            <div key={key} style={{ minWidth: 250 }}>
              <p>{`${expandContentSpecies.length} species`}</p>
              <div className="expand-content">
                {expandContentSpecies.map((s, pos) => (
                  <span key={s.id} className="is-size-7">
                    {pos !== 0 && <div className={classnames('separator')} />}
                    <Link
                      className="internal-link"
                      to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', s.id)}
                    >
                      {s.scientificName}
                    </Link>
                    {` (${s.name})`}
                    {new Array(s.nbGenes).fill(null).map((a, id) => (
                      <br key={id} />
                    ))}
                  </span>
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    },
    [geneId]
  );
  const onRenderCellParalogs = React.useCallback(
    ({ cell, key }, defaultRender, { expandAction }) => {
      switch (key) {
        case 'taxonName':
          return (
            <LinkExternal
              key={key}
              to={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${cell.taxon.id}`}
            >
              {cell.taxon.scientificName}
            </LinkExternal>
          );
        case 'expressionComparison':
          let genes = [geneId, ...cell.genes.map((g) => g.geneId)];
          genes = encodeURI(genes.join('\n'));
          return (
            <Link
              key={key}
              to={`${PATHS.ANALYSIS.EXPRESSION_COMPARISON}?query=${genes}`}
            >
              Compare expression
            </Link>
          );
        case 'details':
          return (
            <a key={key} className="expand-button" onClick={expandAction}>
              <Bulma.IonIcon name="chevron-down-sharp" />
            </a>
          );
        case 'genes':
          let prevSpecies = 0;
          const expandContent = cell.genes.reduce((r, a, pos) => {
            r.push(
              <span className="is-size-7" key={a.geneId}>
                {pos !== 0 && a.species.id !== prevSpecies && (
                  <div className={classnames('separator')} />
                )}
                <Link
                  className="internal-link"
                  to={PATHS.SEARCH.GENE_ITEM_BY_SPECIES.replace(
                    ':geneId',
                    a.geneId
                  ).replace(':speciesId', a.species.id)}
                >
                  {a.geneId}
                </Link>
                {a.name ? ` ${a.name}` : ''}
                {pos < cell.genes.length && <br />}
              </span>
            );
            prevSpecies = a.species.id;

            return r;
          }, []);

          return (
            <div key={key} style={{ minWidth: 230 }}>
              <p>{`${cell.genes.length} ${isPlural(
                'gene',
                cell.genes.length
              )}`}</p>
              <div className="expand-content">{expandContent}</div>
            </div>
          );
        default:
          return null;
      }
    },
    [geneId]
  );

  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <Bulma.Columns vCentered>
        <Bulma.C size={8}>
          <div className="field">{searchElement}</div>
        </Bulma.C>
        <Bulma.C size={4}>
          <div>
            {pageSizeElement}
            <div>{showEntriesText}</div>
          </div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    []
  );
  const onFilter = React.useCallback(
    (search) => (element) => {
      const regExp = new RegExp(search, 'gi');
      let isFound = regExp.test(element.taxon.scientificName);
      for (let i = 0; !isFound && i < element.genes.length; i += 1) {
        isFound =
          regExp.test(element.genes[i].geneId) ||
          regExp.test(element.genes[i].name) ||
          regExp.test(element.genes[i]?.species.name) ||
          regExp.test(element.genes[i]?.species.genus) ||
          regExp.test(element.genes[i]?.species.speciesName);
      }
      return isFound;
    },
    []
  );

  return (
    <>
      <Bulma.Title size={5} className="gradient-underline">
        Orthologs
      </Bulma.Title>
      <div id="orthologs" className="static-section near-columns mb-6">
        {homologs?.orthologyXRef && (
          <>
            <div className="table-container">
              <ComplexTable
                columns={[
                  {
                    key: 'taxonName',
                    text: 'Taxon Name',
                  },
                  {
                    key: 'species',
                    text: 'Species with orthologs',
                  },
                  {
                    key: 'genes',
                    text: 'Gene(s)',
                  },
                  {
                    key: 'expressionComparison',
                    text: 'Expression comparison',
                  },
                  'See details',
                ]}
                data={homologs?.orthologsByTaxon}
                fullwidth
                onRenderCell={onRenderCell}
                pagination
                onFilter={onFilter}
                customHeader={customHeader}
              />
            </div>
            <span>
              {`Orthology information comes from ${homologs.orthologyXRef.source.name} : `}
              <LinkExternal to={homologs.orthologyXRef.xRefURL}>
                {homologs.orthologyXRef.xRefId}
              </LinkExternal>
              .
            </span>
          </>
        )}
      </div>
      <Bulma.Title size={5} className="gradient-underline">
        Paralogs (same species)
      </Bulma.Title>
      <div id="paralogs" className="static-section near-columns mb-6">
        {homologs?.paralogyXRef && (
          <>
            <ComplexTable
              columns={[
                {
                  key: 'taxonName',
                  text: 'Taxon Name',
                },
                {
                  key: 'genes',
                  text: 'Gene(s)',
                },
                {
                  key: 'expressionComparison',
                  text: 'Expression comparison',
                },
                {
                  key: 'details',
                  text: 'See details',
                },
              ]}
              data={homologs?.paralogsByTaxon}
              fullwidth
              onRenderCell={onRenderCellParalogs}
              pagination
              onFilter={onFilter}
              customHeader={customHeader}
            />
            <span>
              {`Paralogy information comes from ${homologs.paralogyXRef.source.name} : `}
              <LinkExternal to={homologs.paralogyXRef.xRefURL}>
                {homologs.paralogyXRef.xRefId}
              </LinkExternal>
              .
            </span>
          </>
        )}
      </div>
    </>
  );
};
const GeneXRefs = ({ geneId, speciesId }) => {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    api.search.genes
      .xrefs(geneId, speciesId)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.debug(err);
        setData();
      });
  }, [geneId, speciesId]);

  if (data)
    return (
      <>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.cross-references')}
        </Bulma.Title>
        <div className="static-section near-columns">
          {data.data.gene.xRefs.map((xref) => (
            <Bulma.Columns key={xref.source.name} className="my-0">
              <Bulma.C size={3}>
                <p className="has-text-weight-semibold">{xref.source.name}</p>
              </Bulma.C>
              <Bulma.C size={9}>
                <ExpandableList
                  items={xref.xRefs}
                  renderElement={(ref, key, elements) => (
                    <span key={ref.xRefId}>
                      <LinkExternal to={ref.xRefURL}>{ref.xRefId}</LinkExternal>
                      {ref.xRefName && <>{` (${ref.xRefName})`}</>}
                      {key !== elements.length - 1 ? (
                        <span className="mr-1">,</span>
                      ) : (
                        ''
                      )}
                    </span>
                  )}
                />
              </Bulma.C>
            </Bulma.Columns>
          ))}
        </div>
      </>
    );
  return null;
};

const GeneDetails = ({
  details: { name, geneId, description, species, synonyms },
}) => {
  const [homologs, setHomologs] = React.useState();
  React.useEffect(() => {
    api.search.genes
      .homologs(geneId, species.id)
      .then((res) => {
        const homo = { ...res.data, orthologs: 0, paralogs: 0 };
        res.data.orthologsByTaxon.forEach((o) => {
          if (o.genes.length > homo.orthologs) homo.orthologs = o.genes.length;
        });
        res.data.paralogsByTaxon.forEach((o) => {
          if (o.genes.length > homo.paralogs) homo.paralogs = o.genes.length;
        });
        setHomologs(homo);
      })
      .catch(() => setHomologs());
    return () => {
      if (SEARCH_CANCEL_API.genes.homologs) SEARCH_CANCEL_API.genes.homologs();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Gene : ${name} - ${geneId} - `}</title>
      </Helmet>
      <Bulma.Columns className="my-0">
        <Bulma.C size={3}>
          <GeneSearch title={false} />
        </Bulma.C>
        <Bulma.C
          size={9}
          className="is-flex is-justify-content-center is-align-items-center"
        >
          <div className="content is-align-items-center is-flex">
            <Bulma.Image
              className="m-0 mr-2"
              src={`https://bgee.org/img/species/${species.id}_light.jpg`}
              height={50}
              width={50}
            />
            <p className="title is-5 has-text-centered">
              {`Gene : ${name} - ${geneId} - `}
              <i>
                {species.genus} {species.speciesName}
              </i>
              {` (${species.name})`}
            </p>
          </div>
        </Bulma.C>
      </Bulma.Columns>
      <div className="mb-6">
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.general-info')}
        </Bulma.Title>
        <div className="static-section near-columns">
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Gene identifier</p>
            </Bulma.C>
            <Bulma.C size={9}>{geneId}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Name</p>
            </Bulma.C>
            <Bulma.C size={9}>{name}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Description</p>
            </Bulma.C>
            <Bulma.C size={9}>{description}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Organism</p>
            </Bulma.C>
            <Bulma.C size={9}>
              <p>
                <Link
                  to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', species.id)}
                  className="internal-link"
                >
                  <i>{`${species.genus} ${species.speciesName}`}</i>
                  {` (${species.name})`}
                </Link>
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.synonyms')}
              </p>
            </Bulma.C>
            <Bulma.C size={9}>
              <ExpandableList
                items={synonyms}
                renderElement={(ref, key, elements) => (
                  <span key={ref}>
                    {ref}
                    {key !== elements.length - 1 ? (
                      <span className="mr-1">,</span>
                    ) : (
                      ''
                    )}
                  </span>
                )}
              />
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Orthologs</p>
            </Bulma.C>
            <Bulma.C size={9}>
              <p>
                <a className="internal-link" href="#orthologs">
                  {homologs ? `${homologs.orthologs} orthologs` : ''}
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3}>
              <p className="has-text-weight-semibold">Paralogs</p>
            </Bulma.C>
            <Bulma.C size={9}>
              <p>
                <a className="internal-link" href="#paralogs">
                  {homologs ? `${homologs.paralogs} paralogs` : ''}
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
        </div>
      </div>
      <GeneExpression geneId={geneId} speciesId={species.id} />
      <GeneHomologs homologs={homologs} geneId={geneId} />
      <GeneXRefs geneId={geneId} speciesId={species.id} />
    </>
  );
};

export default GeneDetails;
