/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import api from '../../api';
import LinkExternal from '../LinkExternal';
import { SEARCH_CANCEL_API } from '../../api/prod/search';
import ComplexTable from '../ComplexTable';
import isPlural from '../../helpers/isPlural';
import classnames from '../../helpers/classnames';

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

  return (
    <>
      <Bulma.Title size={5} className="gradient-underline">
        Orthologs
      </Bulma.Title>
      <div id="orthologs" className="static-section near-columns">
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
                pagination
                fullwidth
                onRenderCell={onRenderCell}
                // customHeader={customHeader}
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
      <div id="paralogs" className="static-section near-columns">
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
              pagination
              onRenderCell={onRenderCellParalogs}
              // onFilter={onFilter}
              // customHeader={customHeader}
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
              <Bulma.C size={4}>
                <p className="has-text-weight-semibold">{xref.source.name}</p>
              </Bulma.C>
              <Bulma.C size={8}>
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
  details,
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
      <div className="content has-text-centered mb-6">
        <p className="title is-5">
          {`Gene : ${name} - ${geneId} - `}
          <i>
            {species.genus} {species.speciesName}
          </i>
          {` (${species.name})`}
        </p>
      </div>
      <>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.general-info')}
        </Bulma.Title>
        <div className="static-section near-columns">
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.ensembl-id')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>{geneId}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.name')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>{name}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.description')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>{description}</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.organism')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>
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
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.synonyms')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>
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
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">Orthologs</p>
            </Bulma.C>
            <Bulma.C size={8}>
              <p>
                <a className="internal-link" href="#orthologs">
                  {homologs ? `${homologs.orthologs} orthologs` : ''}
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">Paralogs</p>
            </Bulma.C>
            <Bulma.C size={8}>
              <p>
                <a className="internal-link" href="#paralogs">
                  {homologs ? `${homologs.paralogs} paralogs` : ''}
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
        </div>
      </>
      <GeneHomologs homologs={homologs} geneId={geneId} />
      <GeneXRefs geneId={geneId} speciesId={species.id} />
    </>
  );
};

export default GeneDetails;
