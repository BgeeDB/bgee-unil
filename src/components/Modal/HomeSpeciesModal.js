import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import LINK_ANCHOR from '../../routes/linkAnchor';
import Bulma from '../Bulma';

const HomeSpeciesModal = ({ species, hide }) => (
  <Bulma.Modal.Content as="div" className="box">
    <Bulma.Media>
      <Bulma.Media.Item className="my-auto">
        <Bulma.Title className="is-size-4">
          {species
            ? `${species.genus} ${species.speciesName} (${species.name})`
            : null}
        </Bulma.Title>
      </Bulma.Media.Item>
      <Bulma.Media.Item align="right">
        <div>
          <figure className="image is-128x128 rounded-border">
            {species && (
              <Bulma.Image
                src={`https://bgee.org/img/species/${species.id}_light.jpg`}
                alt={`${species.genus} ${species.speciesName} (${species.name})`}
                fallback="https://via.placeholder.com/128"
              />
            )}
          </figure>
        </div>
      </Bulma.Media.Item>
    </Bulma.Media>
    <div className="button-species-wrapper">
      <Link
        className="button-species"
        onClick={() => {
          hide();
        }}
        to={`${PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}?id=${species.id}`}
      >
        RNA-Seq and Affymetrix data
      </Link>
      <Link
        to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}?id=${species.id}`}
        className="button-species"
      >
        Gene expression calls
      </Link>
      <Link
        className="button-species"
        onClick={() => {
          hide();
        }}
        to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', species.id)}
      >
        Species information
      </Link>
    </div>
  </Bulma.Modal.Content>
);

export default HomeSpeciesModal;
