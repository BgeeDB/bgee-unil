import React from 'react';
import Bulma from '../Bulma';

const CardSpecies = ({ genus, speciesName, name, id }) => (
  <Bulma.Card className="species">
    <Bulma.Card.Image
      src={`https://bgee.org/img/species/${id}_light.jpg`}
      alt={`species ${genus} ${speciesName}- ${name}`}
      fallback="https://via.placeholder.com/68"
      height={68}
      width={68}
    />
    <Bulma.Card.Body className="py-2 px-1">
      <Bulma.Media>
        <Bulma.Media.Item>
          <p className="is-7 has-text-centered mb-1 is-underlined is-italic has-text-primary">
            {`${genus[0]}. ${speciesName}`}
          </p>
          <p className="subtitle is-7 has-text-centered">{name}</p>
        </Bulma.Media.Item>
      </Bulma.Media>
    </Bulma.Card.Body>
  </Bulma.Card>
);

export default CardSpecies;
