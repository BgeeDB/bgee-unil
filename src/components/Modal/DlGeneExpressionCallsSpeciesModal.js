import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import LINK_ANCHOR from '../../routes/linkAnchor';
import Bulma from '../Bulma';

const DlGeneExpressionCallsSpeciesModal = ({ species }) => {
  const AnatSimple = React.useMemo(() => {
    const obj = species.downloadFiles.find(
      (f) =>
        f.category === 'expr_simple' &&
        f.conditionParameters.length === 1 &&
        f.conditionParameters[0] === 'anat_entity'
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const AnatAdvanced = React.useMemo(() => {
    const obj = species.downloadFiles.find(
      (f) =>
        f.category === 'expr_advanced' &&
        f.conditionParameters.length === 1 &&
        f.conditionParameters[0] === 'anat_entity'
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const FullSimple = React.useMemo(() => {
    const obj = species.downloadFiles.find(
      (f) => f.category === 'expr_simple' && f.conditionParameters.length > 1
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const FullAdvanced = React.useMemo(() => {
    const obj = species.downloadFiles.find(
      (f) => f.category === 'expr_advanced' && f.conditionParameters.length > 1
    );
    if (obj) return obj;
    return null;
  }, [species]);

  return (
    <Bulma.Modal.Content as="div" className="box">
      <Bulma.Media>
        <Bulma.Media.Item className="my-auto">
          <Bulma.Title className="is-size-4">
            {species
              ? `${species.genus} ${species.speciesName} (${species.name})`
              : null}
          </Bulma.Title>
        </Bulma.Media.Item>
        <Bulma.Media.Item align="right">
          <div>
            <figure className="image is-128x128 rounded-border">
              {species && (
                <Bulma.Image
                  src={`https://bgee.org/img/species/${species.id}_light.jpg`}
                  alt={`${species.genus} ${species.speciesName} (${species.name})`}
                  fallback="https://via.placeholder.com/128"
                />
              )}
            </figure>
          </div>
        </Bulma.Media.Item>
      </Bulma.Media>
      <div className="mt-3">
        <div>
          <p className="has-text-weight-semibold is-size-5">
            {i18n.t('download.gene-exp-calls.presence-absence-exp')}
            <Link
              className="is-size-6 internal-link ml-2"
              to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID}`}
            >
              {i18n.t('global.see-documentation')}
            </Link>
          </p>
          <div>
            <div>
              <p className="has-text-weight-semibold mt-3">
                {i18n.t('download.gene-exp-calls.anat-entities-only')}
              </p>
              <div className="field has-addons">
                {AnatSimple && (
                  <p className="control">
                    <a className="button" href={AnatSimple.path}>
                      <span>{i18n.t('global.simple-file')}</span>
                    </a>
                  </p>
                )}
                {AnatAdvanced && (
                  <p className="control">
                    <a className="button" href={AnatAdvanced.path}>
                      <span>{i18n.t('global.advanced-file')}</span>
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="has-text-weight-semibold mt-3">
                {i18n.t('download.gene-exp-calls.anat-entities-and-dev')}
              </p>
              <div className="field has-addons">
                {FullSimple && (
                  <p className="control">
                    <a className="button" href={FullSimple.path}>
                      <span>{i18n.t('global.simple-file')}</span>
                    </a>
                  </p>
                )}
                {FullAdvanced && (
                  <p className="control">
                    <a className="button" href={FullAdvanced.path}>
                      <span>{i18n.t('global.advanced-file')}</span>
                    </a>
                  </p>
                )}
              </div>
            </div>
            <p className="mt-2 is-italic">
              {i18n.t('download.gene-exp-calls.advanced-file-description')}
            </p>
          </div>
        </div>
        <div>
          <p className="has-text-weight-semibold is-size-5 mt-2">
            {i18n.t('download.gene-exp-calls.over-under-exp')}
            <Link
              className="is-size-6 internal-link ml-2"
              to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_DIFF_ID}`}
            >
              {i18n.t('global.see-documentation')}
            </Link>
          </p>
          <p>{i18n.t('download.gene-exp-calls.improvement-in-progress')}</p>
        </div>
      </div>
    </Bulma.Modal.Content>
  );
};

export default DlGeneExpressionCallsSpeciesModal;
