/* eslint-disable no-nested-ternary,jsx-a11y/label-has-associated-control,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions, no-case-declarations, react/no-array-index-key */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Bulma from '../Bulma';
import PATHS from '../../routes/paths';
import api from '../../api';
import GeneSearch from './GeneSearch';
import GeneExpandableList from './GeneExpandableList';
import GeneExpression from './GeneExpression';
import GeneHomologs from './GeneHomologs';
import GeneXRefs from './GeneXRefs';
import schemaDotOrg from '../../helpers/schemaDotOrg';
import GeneDetailsSideMenu from './GeneDetailsSideMenu';
import GENE_DETAILS_HTML_IDS from '../../helpers/constants/GeneDetailsHtmlIds';
import imagePath from '../../helpers/imagePath';

const Styles = {
  sideMenuWidth: {
    width: '13%',
  },
  searchBoxMargin: {
    marginRight: 100,
  },
};

const GeneDetails = ({
  details,
  details: { name, geneId, description, species, synonyms },
}) => {
  const loc = useLocation();
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

  const meta = React.useMemo(() => {
    const speciesName = species.name
      ? species.name
      : `${species.genus} ${species.speciesName}`;
    const hasNameOpener = name ? `${name} (` : '';
    const hasNameCloser = name ? `)` : '';
    const speciesNameBrackets = species.name ? `( ${species.name} )` : '';
    const nameExpr = name ? `${name}, ${name} expression, ` : '';
    const synonymsExpr = synonyms ? `, ${synonyms.join(', ')}` : '';
    return {
      title: `${name}  expression in ${speciesName}`,
      description: `Bgee gene expression data for ${hasNameOpener}${geneId}${hasNameCloser} in ${species.genus} ${species.name} ${speciesNameBrackets}`,
      keywords: `gene expression, ${nameExpr}${geneId}, ${geneId} expression${synonymsExpr}`,
    };
  }, [name, geneId, synonyms, species]);

  React.useEffect(() => {
    if (loc.hash) {
      const element = document.getElementById(loc.hash.replace('#', ''));
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Helmet>
      <div id="gene-wrapper">
        <div className="sidebar" style={Styles.sideMenuWidth}>
          <div className="side-menu">
            <div className="side-menu-wrapper">
              <GeneDetailsSideMenu />
            </div>
          </div>
        </div>
        <div id="gene-body">
          <div className="is-flex ">
            <div style={Styles.searchBoxMargin}>
              <GeneSearch />
            </div>
            <div className="content is-align-items-center is-flex">
              <Bulma.Image
                className="m-0 mr-2"
                src={imagePath(`/species/${species.id}_light.jpg`)}
                height={50}
                width={50}
              />
              <p className="title is-size-3 has-text-centered">
                {`Gene : ${name} - ${geneId} - `}
                <i>
                  {species.genus} {species.speciesName}
                </i>
                {` (${species.name})`}
              </p>
            </div>
          </div>
          <div id={GENE_DETAILS_HTML_IDS.GENERAL_INFORMATION}>
            <Bulma.Title size={4} className="gradient-underline">
              General information
            </Bulma.Title>
            <div className=" near-columns">
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
                  <p className="has-text-weight-semibold">Synonym(s)</p>
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
    </>
  );
};

export default GeneDetails;
