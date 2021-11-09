/* eslint-disable react/no-array-index-key,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import { CardSpecies } from '../../components/CustomCard';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import DlGeneExpressionCallsSpeciesModal from '../../components/Modal/DlGeneExpressionCallsSpeciesModal';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api';
import CreativeCommons from '../../components/CreativeCommons';

const GeneExpressionCalls = () => {
  const history = useHistory();
  const { showModal, hideModal } = React.useContext(ModalContext);
  const [singleSpeciesList, setSingleSpeciesList] = React.useState([]);
  const [kwList, setKwList] = React.useState({});
  const [search, setSearch] = React.useState('');
  const filteredSingleSpecies = React.useMemo(() => {
    const tmp = JSON.parse(JSON.stringify(singleSpeciesList));
    if (search === '') return tmp;
    const regExp = new RegExp(search, 'i');
    return tmp.filter(({ id }) =>
      !kwList[id] ? false : Boolean(kwList[id].find((a) => regExp.test(a)))
    );
  }, [singleSpeciesList, search, kwList]);

  const speciesID = useQuery('id');
  React.useEffect(() => {
    if (speciesID) {
      const species = singleSpeciesList.find(
        (s) => s.id.toString() === speciesID
      );
      if (species) {
        showModal(<DlGeneExpressionCallsSpeciesModal species={species} />, {
          onClose: () => () => {
            history.push(PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS);
          },
        });
      }
    }
  }, [speciesID, singleSpeciesList]);
  React.useEffect(() => {
    api.search.species.exprCalls().then((res) => {
      setSingleSpeciesList(
        res.data.downloadFilesGroups.map((o) => ({
          ...o,
          ...o.members[0],
        }))
      );
      setKwList(res.data.speciesIdToKeywords);
    });
    return () => {
      if (hideModal) hideModal();
    };
  }, []);

  return (
    <>
      <div className="content has-text-centered">
        <Bulma.Title size={5}>{`${i18n.t(
          'download.gene-exp-calls.title'
        )}`}</Bulma.Title>
      </div>
      <p>
        {i18n.t('download.gene-exp-calls.description-1')}
        <a
          className="external-link"
          href="https://bioconductor.org/packages/BgeeDB/"
        >
          {i18n.t('download.gene-exp-calls.description-link-1')}
        </a>
        {i18n.t('download.gene-exp-calls.description-2')}
        <Link
          to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}
          className="internal-link"
        >
          {i18n.t('download.gene-exp-calls.description-link-2')}
        </Link>
        {i18n.t('download.gene-exp-calls.description-3')}
        <a
          className="external-link"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          {i18n.t('download.gene-exp-calls.description-link-3')}
        </a>
        {i18n.t('download.gene-exp-calls.description-4')}
      </p>
      <div>
        <Bulma.Card className="search-input mx-auto my-3">
          <Bulma.Card.Body>
            <div className="content">
              <div className="field">
                <label className="label" htmlFor="search-species">
                  {i18n.t('download.processed-exp-values.search-label')}
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="search-species"
                    placeholder={i18n.t(
                      'download.processed-exp-values.search-placeholder'
                    )}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Bulma.Card.Body>
        </Bulma.Card>
      </div>
      <Bulma.Card className="mt-4">
        <Bulma.Card.Header>
          <Bulma.Card.Header.Title className="is-size-4 has-text-primary">
            Single-species{' '}
            <span className="ml-2 has-text-grey is-size-7">
              (click on species to see more details)
            </span>
          </Bulma.Card.Header.Title>
        </Bulma.Card.Header>
        <Bulma.Card.Body>
          <div className="content">
            <div className="grid-species">
              {filteredSingleSpecies.map((s, key) => (
                <div
                  key={key}
                  className="center-in-grid"
                  onClick={() => history.replace(`?id=${s.id}`)}
                >
                  <CardSpecies {...s} />
                </div>
              ))}
            </div>
          </div>
        </Bulma.Card.Body>
      </Bulma.Card>
      <Bulma.Card className="mt-4">
        <Bulma.Card.Header>
          <Bulma.Card.Header.Title className="is-size-4 has-text-primary">
            Multi-species{' '}
            <span className="ml-2 has-text-grey is-size-7">
              (orthologous genes in homologous anatomical structures)
            </span>
          </Bulma.Card.Header.Title>
        </Bulma.Card.Header>
        <Bulma.Card.Body>
          <div className="content">
            <p>These files will be available in a future release.</p>
          </div>
        </Bulma.Card.Body>
      </Bulma.Card>
      <Bulma.Columns className="mt-4">
        <Bulma.C size={12}>
          <CreativeCommons />
        </Bulma.C>
      </Bulma.Columns>
    </>
  );
};
export default GeneExpressionCalls;
