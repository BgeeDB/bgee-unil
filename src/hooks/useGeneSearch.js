import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resListeGenes, setResListeGenes] = React.useState([]);

  const SearchHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.geneSearch.autoCompleteSearchGenes(val).then((resp) => {
          if (resp.code === 200) {
            setResListeGenes(resp.data);
          }
        });
      } else {
        setResListeGenes([]);
      }
    },
    [searchText]
  );

  return {
    resListeGenes,
    SearchHandler,
  };
};

export default useGeneSearch;
