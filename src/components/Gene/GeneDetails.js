import React from 'react';
import { Link } from 'react-router-dom';
import Bulma from '../Bulma';
import LINK_ANCHOR from '../../routes/linkAnchor';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import api from '../../api';
import LinkExternal from '../LinkExternal';

const MAX_ELEMENTS = 8;

const XRef = ({ xRefs }) => {
  const [expand, setExpand] = React.useState(false);

  const elements = React.useMemo(() => {
    if (expand || xRefs.length <= MAX_ELEMENTS) return xRefs;
    return xRefs.slice(0, MAX_ELEMENTS);
  }, [xRefs, expand]);

  return (
    <>
      <div className="tags">
        {elements.map((ref, key) => (
          <span key={ref.xRefId}>
            <LinkExternal to={ref.xRefURL}>{ref.xRefId}</LinkExternal>
            {ref.xRefName && <>{` (${ref.xRefName})`}</>}
            {key !== elements.length - 1 ? <span className="mr-1">,</span> : ''}
          </span>
        ))}
        {xRefs.length > MAX_ELEMENTS && (
          <Bulma.Button
            size="small"
            className="ml-3"
            onClick={() => setExpand((prev) => !prev)}
          >
            <span className="icon">
              <ion-icon
                name={expand ? 'add-outline' : 'remove-outline'}
                size="large"
              />
            </span>
          </Bulma.Button>
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
                <XRef xRefs={xref.xRefs} />
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
  details: { name, geneId, description, species },
}) => (
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
        {/* todo */}
        <Bulma.Columns className="my-0">
          <Bulma.C size={4}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.synonyms')}
            </p>
          </Bulma.C>
          <Bulma.C size={8}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={4}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.orthologs')}
            </p>
          </Bulma.C>
          <Bulma.C size={8}>
            <p>
              <a
                className="internal-link"
                href={`#${LINK_ANCHOR.GENE.ORTHOLOGS}`}
              >
                XXXXXXXXXX orthologs
              </a>
            </p>
          </Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={4}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.paralogs')}
            </p>
          </Bulma.C>
          <Bulma.C size={8}>
            <p>
              <a
                className="internal-link"
                href={`#${LINK_ANCHOR.GENE.PARALOGS}`}
              >
                XXXXXXXXXXXXX paralogs
              </a>
            </p>
          </Bulma.C>
        </Bulma.Columns>
      </div>
    </>
    <GeneXRefs geneId={geneId} speciesId={species.id} />
  </>
);

export default GeneDetails;
