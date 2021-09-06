/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import Modal from '../../components/Modal';
import speciesList from '../search/species.json';
import LINK_ANCHOR from '../support/linkAnchor';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';

const GeneExpressionCalls = () => {
  const history = useHistory();
  const [selectedSpecies, setSelectedSpecies] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const filteredSpecies = React.useMemo(() => {
    const tmp = JSON.parse(JSON.stringify(speciesList));
    if (search === '') return tmp;
    const regExp = new RegExp(search, 'i');
    return tmp.filter(
      (s) => regExp.test(s.scientificName) || regExp.test(s.name)
    );
  }, [search]);

  const speciesID = useQuery('id');
  React.useEffect(() => {
    if (!selectedSpecies && speciesID) {
      const species = filteredSpecies.find(
        (s) => s.scientificName === speciesID
      );
      if (species) setSelectedSpecies(species);
    } else if (selectedSpecies && !speciesID) {
      setSelectedSpecies(null);
    }
  }, [speciesID, filteredSpecies, selectedSpecies]);

  return (
    <div className="section pt-1">
      <div className="content has-text-centered">
        <p className="title is-5">{`${i18n.t(
          'download.gene-exp-calls.title'
        )}`}</p>
      </div>
      <p>
        {i18n.t('download.gene-exp-calls.description-1')}
        <a
          className="external-link"
          href="https://bioconductor.org/packages/BgeeDB/"
        >
          {i18n.t('download.gene-exp-calls.description-link-1')}
        </a>
        {i18n.t('download.gene-exp-calls.description-2')}
        <Link
          to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
          className="internal-link"
        >
          {i18n.t('download.gene-exp-calls.description-link-2')}
        </Link>
        {i18n.t('download.gene-exp-calls.description-3')}
        <a
          className="external-link"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          {i18n.t('download.gene-exp-calls.description-link-3')}
        </a>
        {i18n.t('download.gene-exp-calls.description-4')}
      </p>
      <div>
        <div className="card search-input mx-auto my-3">
          <div className="card-content">
            <div className="content">
              <div className="field">
                <label className="label" htmlFor="search-species">
                  {i18n.t('download.processed-exp-values.search-label')}
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="search-species"
                    placeholder={i18n.t(
                      'download.processed-exp-values.search-placeholder'
                    )}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <header className="card-header">
          <p className="card-header-title is-size-4 has-text-primary">
            {i18n.t('download.gene-exp-calls.single-species')}
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="grid-species">
              {filteredSpecies.map((s, key) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                <Link
                  key={key}
                  className="center-in-grid"
                  to={`?id=${s.scientificName}`}
                >
                  <CardSpecies {...s} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <header className="card-header">
          <p className="card-header-title is-size-4 has-text-primary">
            {i18n.t('download.gene-exp-calls.multi-species')}
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <p>{i18n.t('download.gene-exp-calls.available-future-release')}</p>
          </div>
        </div>
      </div>
      <Modal
        isActive={Boolean(selectedSpecies)}
        closeModal={() => history.push(PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS)}
        content={
          selectedSpecies ? (
            <div>
              <article className="media">
                <div className="media-content my-auto">
                  <p className="title">
                    {selectedSpecies
                      ? `${selectedSpecies.scientificName} (${selectedSpecies.name})`
                      : null}
                  </p>
                </div>
                <div className="media-right">
                  <div className="">
                    <figure className="image is-128x128 rounded-border">
                      <img
                        src={selectedSpecies.src}
                        alt={selectedSpecies.scientificName}
                      />
                    </figure>
                  </div>
                </div>
              </article>
              <div className="mt-3">
                <div>
                  <p className="has-text-weight-semibold is-size-5">
                    {i18n.t('download.gene-exp-calls.presence-absence-exp')}
                    <Link
                      className="is-size-6 internal-link ml-2"
                      to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID}`}
                    >
                      {i18n.t('global.see-documentation')}
                    </Link>
                  </p>
                  <div>
                    <div>
                      <p className="has-text-weight-semibold mt-3">
                        {i18n.t('download.gene-exp-calls.anat-entities-only')}
                      </p>
                      <div className="field has-addons">
                        <p className="control">
                          <button className="button" type="button">
                            <span>{i18n.t('global.simple-file')}</span>
                          </button>
                        </p>
                        <p className="control">
                          <button className="button" type="button">
                            <span>{i18n.t('global.advanced-file')}</span>
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="has-text-weight-semibold mt-3">
                        {i18n.t(
                          'download.gene-exp-calls.anat-entities-and-dev'
                        )}
                      </p>
                      <div className="field has-addons">
                        <p className="control">
                          <button className="button" type="button">
                            <span>{i18n.t('global.simple-file')}</span>
                          </button>
                        </p>
                        <p className="control">
                          <button className="button" type="button">
                            <span>{i18n.t('global.advanced-file')}</span>
                          </button>
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 is-italic">
                      {i18n.t(
                        'download.gene-exp-calls.advanced-file-description'
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="has-text-weight-semibold is-size-5 mt-2">
                    {i18n.t('download.gene-exp-calls.over-under-exp')}
                    <Link
                      className="is-size-6 internal-link ml-2"
                      to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID}`}
                    >
                      {i18n.t('global.see-documentation')}
                    </Link>
                  </p>
                  <p>
                    {i18n.t('download.gene-exp-calls.improvement-in-progress')}
                  </p>
                </div>
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
};

/*
{i18n.t('download.gene-exp-calls.')}
 */
export default GeneExpressionCalls;
