/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import Modal from '../../components/Modal';
import speciesList from '../search/species.json';
import LINK_ANCHOR from '../support/linkAnchor';

const GeneExpressionCalls = () => {
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
                <div
                  key={key}
                  className="center-in-grid"
                  onClick={() => setSelectedSpecies(s)}
                >
                  <div className="card species">
                    <div className="card-image">
                      <figure className="image is-96x96 rounded-border">
                        <img
                          src={s.src}
                          alt={`species ${s.scientificName} ${s.name}`}
                        />
                      </figure>
                    </div>
                    <div className="card-content py-2 px-1">
                      <div className="media">
                        <div className="media-content">
                          <p className="is-5 has-text-centered mb-1 is-underlined is-italic has-text-primary">
                            {s.scientificName}
                          </p>
                          <p className="subtitle is-6 has-text-centered">
                            {s.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        closeModal={() => setSelectedSpecies(null)}
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
                <p className="has-text-weight-semibold is-size-5">
                  {i18n.t('download.gene-exp-calls.presence-absence-exp')}
                  <Link
                    className="is-size-6 internal-link ml-2"
                    to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID}`}
                  >
                    {i18n.t('global.see-documentation')}
                  </Link>
                </p>
                <div className="is-flex">
                  <div className="mx-5 my-auto">
                    <a className="download-button">
                      {i18n.t('global.download')}
                    </a>
                  </div>
                  <div>
                    <p className="has-text-weight-semibold">
                      {i18n.t(
                        'download.gene-exp-calls.choose-condition-parameters'
                      )}
                    </p>
                    <div className="field is-grouped">
                      <p className="control">
                        <label className="checkbox" htmlFor="xxxxx1">
                          <input type="checkbox" name="xxxxx1" />
                          key
                        </label>
                      </p>
                      <p className="control">
                        <label className="checkbox" htmlFor="xxxxx1">
                          <input type="checkbox" name="xxxxx1" />
                          key
                        </label>
                      </p>
                    </div>
                    <p className="has-text-weight-semibold mt-4">
                      {i18n.t('download.gene-exp-calls.get-advanced-cols')}
                      <Link
                        className="is-size-6 internal-link ml-2"
                        to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID}`}
                      >
                        {i18n.t('global.see-documentation')}
                      </Link>
                    </p>
                    <div className="control">
                      <label className="radio" htmlFor="answer">
                        <input type="radio" name="answer" />
                        Yes
                      </label>
                      <label className="radio" htmlFor="answer2">
                        <input type="radio" name="answer2" />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <p className="has-text-weight-semibold is-size-5 mt-2">
                  {i18n.t('download.gene-exp-calls.over-under-exp')}
                </p>
                <p>
                  {i18n.t('download.gene-exp-calls.improvement-in-progress')}
                </p>
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
