import React from 'react';

const CardSpecies = ({ scientificName, name, src }) => (
  <div className="card species">
    <div className="card-image">
      <figure className="image rounded-border">
        <img src={src} alt={`species ${scientificName} ${name}`} />
      </figure>
    </div>
    <div className="card-content py-2 px-1">
      <div className="media">
        <div className="media-content">
          <p className="is-5 has-text-centered mb-1 is-underlined is-italic has-text-primary">
            {scientificName}
          </p>
          <p className="subtitle is-6 has-text-centered">{name}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CardSpecies;
