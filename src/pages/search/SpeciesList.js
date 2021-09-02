/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import species from './species.json';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';

const SpeciesList = () => {
  const page = 'SpeciesList';
  return (
    <div className="section pt-1">
      <div className="content has-text-centered">
        <p className="title is-5">{i18n.t('search.species.list-title')}</p>
      </div>
      <div className="grid-species">
        {species.map((s, key) => (
          <Link key={key} to={`${PATHS.SEARCH.SPECIES}/165198498498789789`}>
            <div className="card species">
              <div className="card-image">
                <figure className="image is-96x96">
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
                    <p className="subtitle is-6 has-text-centered">{s.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpeciesList;
