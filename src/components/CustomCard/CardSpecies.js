import React from 'react';
import Bulma from '../Bulma';

const CardSpecies = ({
  speciesName,
  name,
  genus,
  src = 'https://bgee.ord/...',
}) => {
  const scientificName = `${genus}. ${speciesName}`;

  return (
    <Bulma.Card className="species">
      <Bulma.Card.Image>
        <Bulma.Image src={src} alt={`species ${scientificName} ${name}`} />
      </Bulma.Card.Image>
      <Bulma.Card.Body className="py-2 px-1">
        <Bulma.Media>
          <Bulma.Media.Item>
            <p className="is-5 has-text-centered mb-1 is-underlined is-italic has-text-primary">
              {scientificName}
            </p>
            <p className="subtitle is-6 has-text-centered">{name}</p>
          </Bulma.Media.Item>
        </Bulma.Media>
      </Bulma.Card.Body>
    </Bulma.Card>
  );
};

export default CardSpecies;
