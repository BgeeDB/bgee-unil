import React from 'react';
import api from '../api';

const useGeneSearch = (searchText) => {
  const [resListeGenes, setResListeGenes] = React.useState([]);
  const [resResultListeGenes, setResResultListeGenes] = React.useState([]);

  const searchHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.geneSearch.autoCompleteSearchGenes(val).then((resp) => {
          if (resp.code === 200 && resp.data.matchCount !== 0) {
            setResListeGenes(resp.data.match);
          } else {
            setResListeGenes([]);
          }
        });
      } else {
        setResListeGenes([]);
      }
    },
    [searchText]
  );

  const searchResultHandler = React.useCallback(
    (val) => {
      if (val !== '') {
        api.geneSearch.geneSearchResult(val).then((resp) => {
          if (resp.code === 200) {
            setResResultListeGenes(resp.data.result.geneMatches);
          } else {
            setResResultListeGenes([]);
          }
        });
      } else {
        setResResultListeGenes([]);
      }
    },
    [searchText]
  );

  return {
    resListeGenes,
    resResultListeGenes,
    searchHandler,
    searchResultHandler,
  };
};

export default useGeneSearch;
