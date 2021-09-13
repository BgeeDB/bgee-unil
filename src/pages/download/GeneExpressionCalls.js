/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import speciesList from '../search/species.json';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import DlGeneExpressionCallsSpeciesModal from '../../components/Modal/Custom/DlGeneExpressionCallsSpeciesModal';

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
    <div className="section pt-5">
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
      <Bulma.Modal
        show={Boolean(selectedSpecies)}
        onClose={() => history.push(PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS)}
      >
        <DlGeneExpressionCallsSpeciesModal selectedSpecies={selectedSpecies} />
      </Bulma.Modal>
    </div>
  );
};
/*
{i18n.t('download.gene-exp-calls.')}
 */
export default GeneExpressionCalls;
