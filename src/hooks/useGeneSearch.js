import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resResultListGenes, setResResultListGenes] = React.useState();

  const searchResultHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.search.genes
          .geneSearchResult(val)
          .then((resp) => {
            if (resp.code === 200) {
              setResResultListGenes(resp.data.result);
            } else {
              setResResultListGenes(null);
            }
          })
          .catch(() => {
            setResResultListGenes();
          });
      } else {
        setResResultListGenes(null);
      }
    },
    [searchText]
  );

  return {
    resResultListGenes,
    searchResultHandler,
    setResults: setResResultListGenes,
  };
};

export default useGeneSearch;
