import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resResultListGenes, setResResultListGenes] = React.useState([]);

  const searchResultHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.geneSearch
          .geneSearchResult(val)
          .then((resp) => {
            if (resp.code === 200) {
              setResResultListGenes(resp.data.result.geneMatches);
            } else {
              setResResultListGenes();
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
