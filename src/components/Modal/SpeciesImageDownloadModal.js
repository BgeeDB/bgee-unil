import React from 'react';
import Bulma from '../Bulma';

const SpeciesImageDownloadModal = ({ species }) =>
  species ? (
    <Bulma.Media.Item align="right">
      <div>
        <figure className="image is-128x128 rounded-border">
          {species && (
            <Bulma.Image
              src={`/static/img/species/${species.id}_light.jpg`}
              alt={`${species.genus} ${species.speciesName} (${species.name})`}
              fallback="https://via.placeholder.com/128"
            />
          )}
        </figure>
      </div>
    </Bulma.Media.Item>
  ) : null;

export default SpeciesImageDownloadModal;
