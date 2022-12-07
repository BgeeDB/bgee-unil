import './styles.scss';

import React from 'react';
import { Helmet } from 'react-helmet';
import Bulma from '../../../../components/Bulma';
import useLogic from './useLogic';
import SearchForm from './SearchForm';

const Experiments = () => {
  const {
    searchForm,
    // searchResult,
    // allCounts,
    // localCount,
    // dataType,
    // isLoading,
    // filters,
    // limit,
    // setDataType,
    // setFilters,
    // triggerSearch,
    // triggerCounts,
  } = useLogic('experiments');

  return (
    <>
      <Helmet>
        <title>List of experiments</title>
        <meta name="description" content="List of exeriments in Bgee" />
        <meta name="keywords" content="list of experiments" />
      </Helmet>

      <div className="experiments-page">
        <div className="mb-4">
          <Bulma.Title className="has-text-centered">
            List of experiments
          </Bulma.Title>
        </div>

        <SearchForm {...searchForm} />
      </div>
    </>
  );
};

export default Experiments;
