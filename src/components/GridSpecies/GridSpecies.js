/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import classnames from '../../helpers/classnames';
import { CardSpecies } from '../CustomCard';
import useQuery from '../../hooks/useQuery';

const GridSpecies = ({
  speciesList,
  onRenderSelection,
  onClick,
  expandable,
  defaultSelection,
  scrollAt = true,
}) => {
  const speciesID = useQuery('id');
  const [selectedSpecies, setSelectedSpecies] = React.useState(
    defaultSelection ? parseInt(defaultSelection, 10) : undefined
  );
  React.useEffect(() => {
    if (speciesID && scrollAt) {
      setSelectedSpecies(parseInt(speciesID, 10));
      setTimeout(() => {
        document
          .getElementById(`species-${speciesID}`)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, [speciesID]);

  return (
    <div className="species-grid">
      {speciesList.map((species) => (
        <React.Fragment key={species.id}>
          <div
            id={`species-${species.id}`}
            onClick={(e) => {
              e.nativeEvent.preventDefault();
              if (onClick) onClick(species, selectedSpecies !== species.id);
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
            onRenderSelection(species, {
              onClose: () => {
                if (onClick) onClick(species, false);
                setSelectedSpecies();
              },
            })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GridSpecies;
