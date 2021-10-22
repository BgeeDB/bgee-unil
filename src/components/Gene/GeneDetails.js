import React from 'react';
import { Link } from 'react-router-dom';
import Bulma from '../Bulma';
import LINK_ANCHOR from '../../routes/linkAnchor';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';

const GeneDetails = ({
  details,
  details: { name, geneId, description, species },
}) => {
  console.log(details);
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
      <div>
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
      </div>
    </>
  );
};

export default GeneDetails;
