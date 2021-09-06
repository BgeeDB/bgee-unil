/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import speciesList from '../search/species.json';
import Modal from '../../components/Modal';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';

const ProcessedExpressionValues = () => {
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
          'download.processed-exp-values.title'
        )}`}</p>
      </div>
      <p>
        {i18n.t('download.processed-exp-values.description-1')}
        <a
          className="external-link"
          href="https://bioconductor.org/packages/BgeeDB/"
        >
          {i18n.t('download.processed-exp-values.description-link-1')}
        </a>
        {i18n.t('download.processed-exp-values.description-2')}
        <Link
          to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          className="internal-link"
        >
          {i18n.t('download.processed-exp-values.description-link-2')}
        </Link>
        {i18n.t('download.processed-exp-values.description-3')}
        <a
          className="external-link"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          {i18n.t('download.processed-exp-values.description-link-3')}
        </a>
        {i18n.t('download.processed-exp-values.description-4')}
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
            {i18n.t('download.processed-exp-values.species')}
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

      <Modal
        isActive={Boolean(selectedSpecies)}
        closeModal={() =>
          history.push(PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES)
        }
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
              <div className="mt-2">
                <div>
                  <p className="mb-2">
                    <b>{i18n.t('download.processed-exp-values.rna-seq')}</b>
                  </p>
                  <div className="field has-addons">
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.rna-seq-button-experiments'
                          )}
                        </span>
                      </button>
                    </p>
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.rna-seq-button-count'
                          )}
                        </span>
                      </button>
                    </p>
                  </div>
                  <p>
                    {i18n.t('download.processed-exp-values.rna-seq-desc')}
                    <Link>
                      {i18n.t(
                        'download.processed-exp-values.rna-seq-desc-link'
                      )}
                    </Link>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="mb-2">
                    <b>{i18n.t('download.processed-exp-values.affymetrix')}</b>
                  </p>
                  <div className="field has-addons">
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.affymetrix-button-experiments'
                          )}
                        </span>
                      </button>
                    </p>
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.affymetrix-button-signal'
                          )}
                        </span>
                      </button>
                    </p>
                  </div>
                  <p>
                    {i18n.t('download.processed-exp-values.affymetrix-desc')}
                    <Link>
                      {i18n.t(
                        'download.processed-exp-values.affymetrix-desc-link'
                      )}
                    </Link>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="mb-2">
                    <b>
                      {i18n.t('download.processed-exp-values.full-rna-seq')}
                    </b>
                  </p>
                  <div className="field has-addons">
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.full-rna-seq-button-experiments'
                          )}
                        </span>
                      </button>
                    </p>
                    <p className="control">
                      <button
                        className="button is-primary is-outlined"
                        type="button"
                      >
                        <span>
                          {i18n.t(
                            'download.processed-exp-values.full-rna-seq-button-count'
                          )}
                        </span>
                      </button>
                    </p>
                  </div>
                  <p>
                    {i18n.t('download.processed-exp-values.full-rna-seq-desc')}
                    <Link>
                      {i18n.t(
                        'download.processed-exp-values.full-rna-seq-desc-link'
                      )}
                    </Link>
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

export default ProcessedExpressionValues;
