/* eslint-disable no-nested-ternary,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Bulma from '../Bulma';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import api from '../../api';
import GeneSearch from './GeneSearch';
import GeneExpandableList from './GeneExpandableList';
import GeneExpression from './GeneExpression';
import GeneHomologs from './GeneHomologs';
import GeneXRefs from './GeneXRefs';
import schemaDotOrg from '../../helpers/schemaDotOrg';

const GeneDetails = ({
  details,
  details: { name, geneId, description, species, synonyms },
}) => {
  const loc = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);
  const [homologs, setHomologs] = React.useState();
  const [xRefs, setXRefs] = React.useState();
  React.useEffect(() => {
    Promise.allSettled([
      api.search.genes.homologs(geneId, species.id),
      api.search.genes.xrefs(geneId, species.id),
    ]).then(([homologsPromise, xRefsPromise]) => {
      if (homologsPromise.status === 'fulfilled') {
        const homo = {
          ...homologsPromise.value.data,
          orthologs: 0,
          paralogs: 0,
        };
        homologsPromise.value.data.orthologsByTaxon.forEach((o) => {
          if (o.genes.length > homo.orthologs) homo.orthologs = o.genes.length;
        });
        homologsPromise.value.data.paralogsByTaxon.forEach((o) => {
          if (o.genes.length > homo.paralogs) homo.paralogs = o.genes.length;
        });
        setHomologs(homo);
        schemaDotOrg.setGeneHomologsLdJSON(homo);
      } else {
        setHomologs();
      }

      if (xRefsPromise.status === 'fulfilled') {
        setXRefs(xRefsPromise.value.data);
      } else {
        setXRefs();
      }

      schemaDotOrg.setGeneLdJSON({
        ...details,
        xRefs: xRefsPromise.value.data?.gene?.xRefs,
        path: loc.pathname,
      });
      setTimeout(() => setIsLoading(false), 500);
    });
    return () => {
      schemaDotOrg.unsetGeneLdJSON();
      schemaDotOrg.unsetGeneHomologsLdJSON();
    };
  }, []);

  const handlerMenuClick = React.useCallback((id) => {
    history.replace(`#${id}`);
  }, []);

  const sideMenu = React.useMemo(() => {
    const sideMenuElem = [
      { domId: 'general-infos', name: 'General information' },
      { domId: 'expression', name: 'Expression' },
      { domId: 'orthologs', name: 'Orthologs' },
      { domId: 'paralogs', name: 'Paralogs' },
      { domId: 'cross-references', name: 'Cross-references' },
    ];

    return (
      <aside className="menu">
        <ul className="menu-list">
          {sideMenuElem.map((elem) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li key={elem.domId} onClick={() => handlerMenuClick(elem.domId)}>
              <a className="is-size-5 has-text-weight-semibold">{elem.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }, []);

  const metaTitle = `${name} 
       expression in
       ${
         species.name ? species.name : `${species.genus} ${species.speciesName}`
       }`;
  const metaDescription = `Bgee gene expression data for ${
    name ? `${name} (` : ''
  }
   ${geneId}  ${name ? ')' : ''} in ${species.genus} ${species.name} ${
    species.name ? `( ${species.name} )` : ''
  }`;

  const metaKeywords = `gene expression,
  ${name ? `${name} , ${name} expression, ` : ''}
  ${geneId}, ${geneId} expression
  ${synonyms ? `, ${synonyms.join(', ')}` : ''}`;

  return (
    <div className="is-widescreen">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>
      <div className="columns">
        <div className="column is-narrow-tablet is-narrow-desktop is-narrow-widescreen is-narrow-fullhd">
          <div className="side-menu">
            <div className="side-menu-wrapper">
              <GeneSearch />
              {sideMenu}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="is-flex is-justify-content-center is-align-items-center">
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
          </div>
          <div id="general-infos">
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
            isLoading={isLoading}
          />
          <GeneXRefs data={xRefs} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default GeneDetails;
