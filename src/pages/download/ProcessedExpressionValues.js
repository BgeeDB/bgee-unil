/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import speciesList from '../search/species.json';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import DlProcessedExpressionValuesSpeciesModal from '../../components/Modal/DlProcessedExpressionValuesSpeciesModal';
import { ModalContext } from '../../contexts/ModalContext';

const ProcessedExpressionValues = () => {
  const history = useHistory();
  const { showModal } = React.useContext(ModalContext);
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
      if (species) {
        setSelectedSpecies(species);
        showModal(
          <DlProcessedExpressionValuesSpeciesModal
            selectedSpecies={selectedSpecies}
          />,
          {
            onClose: () =>
              history.push(PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES),
          }
        );
      }
    } else if (selectedSpecies && !speciesID) {
      setSelectedSpecies(null);
    }
  }, [speciesID, filteredSpecies, selectedSpecies]);
  return (
    <div className="section pt-5">
      <div className="content has-text-centered">
        <Bulma.Title size={5}>{`${i18n.t(
          'download.processed-exp-values.title'
        )}`}</Bulma.Title>
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
        <Bulma.Card className="search-input mx-auto my-3">
          <Bulma.Card.Body>
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
          </Bulma.Card.Body>
        </Bulma.Card>
      </div>
      <Bulma.Card className="mt-4">
        <Bulma.Card.Header>
          <Bulma.Card.Header.Title className="is-size-4 has-text-primary">
            {i18n.t('download.processed-exp-values.species')}
          </Bulma.Card.Header.Title>
        </Bulma.Card.Header>
        <Bulma.Card.Body>
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
        </Bulma.Card.Body>
      </Bulma.Card>
    </div>
  );
};

export default ProcessedExpressionValues;
