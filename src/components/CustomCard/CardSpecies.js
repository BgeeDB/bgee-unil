import React from 'react';
import Bulma from '../Bulma';

const CardSpecies = ({ scientificName, name, src }) => (
  <div className="card species">
    <div className="card-image">
      <Bulma.Image src={src} alt={`species ${scientificName} ${name}`} />
    </div>
    <div className="card-content py-2 px-1">
      <Bulma.Media>
        <Bulma.Media.Item>
          <p className="is-5 has-text-centered mb-1 is-underlined is-italic has-text-primary">
            {scientificName}
          </p>
          <p className="subtitle is-6 has-text-centered">{name}</p>
        </Bulma.Media.Item>
      </Bulma.Media>
    </div>
  </div>
);

export default CardSpecies;
