/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import Bulma from '../../components/Bulma';
import api from '../../api';
import GridSpecies from '../../components/GridSpecies/GridSpecies';

const SpeciesList = () => {
  const history = useHistory();
  const [speciesList, setSpeciesList] = useState([]);

  React.useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
  }, []);

  const metaKeywords = speciesList
    .map((s) => `${s.genus} ${s.speciesName} ${s.name ? `, ${s.name}` : ''}`)
    .join(', ');

  return (
    <>
      <Helmet>
        <title>Species list</title>
        <meta
          name="description"
          content="List of species with expression data available in Bgee"
        />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>
      <div className="content has-text-centered">
        <Bulma.Title size={4}>
          {i18n.t('search.species.list-title')}
        </Bulma.Title>
      </div>
      <div className="content">
        <div className="grid-species">
          <GridSpecies
            speciesList={speciesList}
            onClick={(species) =>
              history.push(PATHS.SEARCH.SPECIES_ITEM.replace(':id', species.id))
            }
          />
        </div>
      </div>
    </>
  );
};

export default SpeciesList;
