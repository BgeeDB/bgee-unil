import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resResultListGenes, setResResultListGenes] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const searchResultHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        setIsLoading(true);
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
          })
          .finally(() => {
            setIsLoading(false);
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
    isLoading,
  };
};

export default useGeneSearch;
