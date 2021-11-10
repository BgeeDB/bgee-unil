/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from '../../helpers/classnames';
import { CardSpecies } from '../CustomCard';

const GridSpecies = ({
  speciesList,
  onRenderSelection,
  onClick,
  expandable,
}) => {
  const [selectedSpecies, setSelectedSpecies] = React.useState();
  return (
    <div className="species-grid">
      {speciesList.map((species) => (
        <React.Fragment key={species.id}>
          <div
            id={`species-${species.id}`}
            onClick={(e) => {
              e.nativeEvent.preventDefault();
              if (onClick) onClick(species);
              if (onRenderSelection)
                setSelectedSpecies((prev) =>
                  prev === species.id ? undefined : species.id
                );
            }}
            className={classnames(
              'center-in-grid is-flex is-justify-content-center',
              {
                active: selectedSpecies === species.id,
              }
            )}
          >
            <CardSpecies {...species} />
          </div>
          {!expandable &&
            onRenderSelection &&
            selectedSpecies === species.id &&
            onRenderSelection(species)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GridSpecies;
