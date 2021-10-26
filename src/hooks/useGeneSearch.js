import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resListGenes, setResListGenes] = React.useState([]);
  const [resResultListGenes, setResResultListGenes] = React.useState([]);

  const searchHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.geneSearch.autoCompleteSearchGenes(val).then((resp) => {
          if (resp.code === 200 && resp.data.matchCount !== 0) {
            setResListGenes(resp.data.match);
          } else {
            setResListGenes([]);
          }
        });
      } else {
        setResListGenes([]);
      }
    },
    [searchText]
  );

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
          .catch((err) => {
            setResResultListGenes();
          });
      } else {
        setResResultListGenes(null);
      }
    },
    [searchText]
  );

  return {
    resListGenes,
    resResultListGenes,
    searchHandler,
    searchResultHandler,
    setResults: setResResultListGenes,
    setResListGenes,
  };
};

export default useGeneSearch;
