/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import species from './species.json';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import { CardSpecies } from '../../components/CustomCard';
import Bulma from '../../components/Bulma';

const SpeciesList = () => {
  const page = 'SpeciesList';
  return (
    <>
      <div className="content has-text-centered">
        <Bulma.Title size={4}>
          {i18n.t('search.species.list-title')}
        </Bulma.Title>
      </div>
      <div className="content">
        <div className="grid-species">
          {species.map((s, key) => (
            <Link
              key={key}
              to={`${PATHS.SEARCH.SPECIES}/165198498498789789`}
              className="center-in-grid"
            >
              <CardSpecies {...s} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpeciesList;
