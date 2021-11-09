/* eslint-disable no-nested-ternary,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import api from '../../api';
import { SEARCH_CANCEL_API } from '../../api/prod/search';
import GeneSearch from './GeneSearch';
import GeneExpandableList from './GeneExpandableList';
import GeneExpression from './GeneExpression';
import GeneHomologs from './GeneHomologs';
import GeneXRefs from './GeneXRefs';

const styles = {
  sideMenuPosition: {
    position: 'fixed',
  },
  sideMenuText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

const GeneDetails = ({
  details: { name, geneId, description, species, synonyms },
}) => {
  const history = useHistory();
  const [homologsIsLoading, setHomologsIsLoading] = React.useState(true);
  const [homologs, setHomologs] = React.useState();
  React.useEffect(() => {
    api.search.genes
      .homologs(geneId, species.id)
      .then((res) => {
        const homo = { ...res.data, orthologs: 0, paralogs: 0 };
        res.data.orthologsByTaxon.forEach((o) => {
          if (o.genes.length > homo.orthologs) homo.orthologs = o.genes.length;
        });
        res.data.paralogsByTaxon.forEach((o) => {
          if (o.genes.length > homo.paralogs) homo.paralogs = o.genes.length;
        });
        setHomologs(homo);
      })
      .catch(() => setHomologs())
      .finally(() => setTimeout(() => setHomologsIsLoading(false), 500));
    return () => {
      if (SEARCH_CANCEL_API.genes.homologs) SEARCH_CANCEL_API.genes.homologs();
    };
  }, []);

  const handlerMenuClick = React.useCallback((id) => {
    history.replace(`#${id}`);
  }, []);

  const sideMenu = () => {
    const sideMenuElem = [
      { domId: 'general-infos', name: 'General information' },
      { domId: 'expression', name: 'Expression' },
      { domId: 'orthologs', name: 'Orthologs' },
      { domId: 'paralogs', name: 'Paralogs' },
      { domId: 'cross-references', name: 'Cross-references' },
    ];

    return (
      <aside className="menu" style={styles.sideMenuPosition}>
        <ul className="menu-list">
          {sideMenuElem.map((elem) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li key={elem.domId} onClick={() => handlerMenuClick(elem.domId)}>
              <a style={styles.sideMenuText}>{elem.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    );
  };

  return (
    <div className="is-widescreen">
      <div className="columns">
        <div className="column is-one-fifth">{sideMenu()}</div>
        <div className="column is-four-fifths">
          <Helmet>
            <title>{`Gene : ${name} - ${geneId} - `}</title>
          </Helmet>
          <Bulma.Columns className="my-0">
            <Bulma.C size={3} />
            <Bulma.C
              size={9}
              className="is-flex is-justify-content-center is-align-items-center"
            >
              <div className="content is-align-items-center is-flex">
                <Bulma.Image
                  className="m-0 mr-2"
                  src={`https://bgee.org/img/species/${species.id}_light.jpg`}
                  height={50}
                  width={50}
                />
                <p className="title is-5 has-text-centered">
                  {`Gene : ${name} - ${geneId} - `}
                  <i>
                    {species.genus} {species.speciesName}
                  </i>
                  {` (${species.name})`}
                </p>
              </div>
            </Bulma.C>
          </Bulma.Columns>
          <div className="mb-6" id="general-infos">
            <Bulma.Title size={5} className="gradient-underline">
              {i18n.t('search.gene.general-info')}
            </Bulma.Title>
            <div className="static-section near-columns">
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Gene identifier</p>
                </Bulma.C>
                <Bulma.C size={9}>{geneId}</Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Name</p>
                </Bulma.C>
                <Bulma.C size={9}>{name}</Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Description</p>
                </Bulma.C>
                <Bulma.C size={9}>{description}</Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Organism</p>
                </Bulma.C>
                <Bulma.C size={9}>
                  <p>
                    <Link
                      to={PATHS.SEARCH.SPECIES_ITEM.replace(':id', species.id)}
                      className="internal-link"
                    >
                      <i>{`${species.genus} ${species.speciesName}`}</i>
                      {` (${species.name})`}
                    </Link>
                  </p>
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">
                    {i18n.t('search.gene.synonyms')}
                  </p>
                </Bulma.C>
                <Bulma.C size={9}>
                  <GeneExpandableList
                    items={synonyms}
                    renderElement={(ref, key, elements) => (
                      <span key={ref}>
                        {ref}
                        {key !== elements.length - 1 ? (
                          <span className="mr-1">,</span>
                        ) : (
                          ''
                        )}
                      </span>
                    )}
                  />
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Orthologs</p>
                </Bulma.C>
                <Bulma.C size={9}>
                  <p>
                    <a className="internal-link" href="#orthologs">
                      {homologs ? `${homologs.orthologs} orthologs` : ''}
                    </a>
                  </p>
                </Bulma.C>
              </Bulma.Columns>
              <Bulma.Columns className="my-0">
                <Bulma.C size={3}>
                  <p className="has-text-weight-semibold">Paralogs</p>
                </Bulma.C>
                <Bulma.C size={9}>
                  <p>
                    <a className="internal-link" href="#paralogs">
                      {homologs ? `${homologs.paralogs} paralogs` : ''}
                    </a>
                  </p>
                </Bulma.C>
              </Bulma.Columns>
            </div>
          </div>
          <GeneExpression geneId={geneId} speciesId={species.id} />
          <GeneHomologs
            homologs={homologs}
            geneId={geneId}
            isLoading={homologsIsLoading}
          />
          <GeneXRefs geneId={geneId} speciesId={species.id} />
        </div>
      </div>
    </div>
  );
};

export default GeneDetails;
