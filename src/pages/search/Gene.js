import React from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import i18n from '../../i18n';
import LinkExternal from '../../components/LinkExternal';
import LINK_ANCHOR from '../../routes/linkAnchor';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';
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
  const [search, setSearch] = React.useState('');
  const onClickSearch = React.useCallback(
    () => history.push(`${PATHS.SEARCH.GENE}?search=${search}`),
    [search, history]
  );

  const [flowState, setFlowState] = React.useState(FLOW.LOADING);
  const [geneDetails, setGeneDetails] = React.useState();

  const speciesId = React.useMemo(() => {
    if (urlSpeciesId) return urlSpeciesId;
    if (Array.isArray(geneDetails) && geneDetails.length === 1)
      return geneDetails[0].species.id;
    return null;
  }, [urlSpeciesId, geneDetails]);

  React.useEffect(() => {
    setFlowState(FLOW.LOADING);
    api.search.genes
      .getGeneralInformation(geneId)
      .then(({ data }) => {
        if (data.genes.length === 1 && urlSpeciesId) {
          history.push(PATHS.SEARCH.GENE_ITEM.replace(':geneId', geneId));
        } else {
          setGeneDetails(data.genes);
          setFlowState(FLOW.LOADED);
        }
      })
      .then((err) => console.error(err));
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
    return <GeneList details={geneDetails} />;
  }
  return null;
};

export default Gene;
