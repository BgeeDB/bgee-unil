import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PATHS from '../../routes/paths';
import api from '../../api';
import GeneDetails from '../../components/Gene/GeneDetails';
import GeneList from '../../components/Gene/GeneList';

const FLOW = {
  LOADING: 'loading',
  LOADED: 'loaded',
};

const Gene = () => {
  const history = useHistory();
  const { geneId, speciesId: urlSpeciesId } = useParams();

  const [flowState, setFlowState] = React.useState(FLOW.LOADING);
  const [geneDetails, setGeneDetails] = React.useState();

  React.useEffect(() => {
    setFlowState(FLOW.LOADING);
    api.search.genes
      .getGeneralInformation(geneId)
      .then(({ data }) => {
        if (data.genes.length === 1 && urlSpeciesId) {
          history.replace(PATHS.SEARCH.GENE_ITEM.replace(':geneId', geneId));
        } else {
          setGeneDetails(data.genes);
          setFlowState(FLOW.LOADED);
        }
      })
      .catch((err) => {
        console.log(err.message);
        history.replace(PATHS.ERROR, {
          error: {
            message: err.message || err?.data?.code,
          },
        });
      });
  }, [geneId, urlSpeciesId]);

  if (flowState === FLOW.LOADING) return null;

  if (
    (!urlSpeciesId && geneDetails?.length === 1) ||
    (urlSpeciesId &&
      geneDetails?.length > 1 &&
      geneDetails?.find((g) => g.species.id === urlSpeciesId))
  ) {
    return (
      <GeneDetails
        details={
          geneDetails.length === 1
            ? geneDetails[0]
            : geneDetails?.find((g) => g.species.id === urlSpeciesId)
        }
      />
    );
  }
  if (!urlSpeciesId && geneDetails?.length > 1) {
    return <GeneList details={geneDetails} history={history} />;
  }
  return null;
};

export default Gene;
