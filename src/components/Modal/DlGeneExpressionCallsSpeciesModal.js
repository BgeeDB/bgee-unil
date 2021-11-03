import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import LINK_ANCHOR from '../../routes/linkAnchor';
import Bulma from '../Bulma';
import { ModalContext } from '../../contexts/ModalContext';
import GaEvent from '../GaEvent/GaEvent';

const DlGeneExpressionCallsSpeciesModal = ({ species }) => {
  const { hideModal, customOnClose } = React.useContext(ModalContext);
  const history = useHistory();
  const AnatSimple = React.useMemo(() => {
    const obj = species?.downloadFiles.find(
      (f) =>
        f.category === 'expr_simple' &&
        f.conditionParameters.length === 1 &&
        f.conditionParameters[0] === 'anat_entity'
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const AnatAdvanced = React.useMemo(() => {
    const obj = species?.downloadFiles.find(
      (f) =>
        f.category === 'expr_advanced' &&
        f.conditionParameters.length === 1 &&
        f.conditionParameters[0] === 'anat_entity'
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const FullSimple = React.useMemo(() => {
    const obj = species?.downloadFiles.find(
      (f) => f.category === 'expr_simple' && f.conditionParameters.length > 1
    );
    if (obj) return obj;
    return null;
  }, [species]);
  const FullAdvanced = React.useMemo(() => {
    const obj = species?.downloadFiles.find(
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
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a
            className="internal-link"
            onClick={() => {
              // hideModal();
              history.push(
                `${PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES}?id=${species.id}`
              );
            }}
          >
            See processed Expression values{' '}
            <ion-icon name="arrow-redo-outline" />
          </a>
        </Bulma.Media.Item>
        <Bulma.Media.Item align="right">
          <div>
            <figure className="image is-128x128 rounded-border">
              {species && (
                <Bulma.Image
                  src={`/static/img/species/${species.id}_light.jpg`}
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
            Presence/Absence of expression
            <Link
              className="is-size-6 internal-link ml-2"
              to={`${PATHS.SUPPORT.GENE_EXPRESSION_CALLS}#${LINK_ANCHOR.GENE_EXPRESSION_CALLS.SINGLE_EXPR_ID}`}
            >
              See documentation
            </Link>
          </p>
          <div>
            <div>
              <p className="has-text-weight-semibold mt-3">
                Anatomical entities only
              </p>
              <div className="field has-addons">
                {AnatSimple && (
                  <p className="control">
                    <GaEvent
                      category="Gene Expression Calls"
                      action="download_anat-only_simple-file"
                      label={AnatSimple.path}
                    >
                      <a className="button" href={AnatSimple.path}>
                        <span>Simple file</span>
                      </a>
                    </GaEvent>
                  </p>
                )}
                {AnatAdvanced && (
                  <p className="control">
                    <GaEvent
                      category="Gene Expression Calls"
                      action="download_anat-only_advanced-file"
                      label={AnatAdvanced.path}
                    >
                      <a className="button" href={AnatAdvanced.path}>
                        <span>Advanced File</span>
                      </a>
                    </GaEvent>
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="has-text-weight-semibold mt-3">
                All conditions parameters
              </p>
              <div className="field has-addons">
                {FullSimple && (
                  <p className="control">
                    <GaEvent
                      category="Gene Expression Calls"
                      action="download_all-conditions-parameters_simple-file"
                      label={FullSimple.path}
                    >
                      <a className="button" href={FullSimple.path}>
                        <span>Simple file</span>
                      </a>
                    </GaEvent>
                  </p>
                )}
                {FullAdvanced && (
                  <p className="control">
                    <GaEvent
                      category="Gene Expression Calls"
                      action="download_all-conditions-parameters_advanced-file"
                      label={FullAdvanced.path}
                    >
                      <a className="button" href={FullAdvanced.path}>
                        <span>Advanced File</span>
                      </a>
                    </GaEvent>
                  </p>
                )}
              </div>
            </div>
            <p className=" is-size-7 mt-2">
              <span className="is-underlined is-italic has-text-weight-semibold has-text-primary">
                All conditions
              </span>
              : combinations anatomy-development
            </p>
            <p className=" is-size-7">
              <span className="is-underlined is-italic has-text-weight-semibold has-text-primary">
                Advanced file
              </span>
              : includes information by data types
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
      <button
        className="modal-close is-large"
        aria-label="close"
        type="button"
        onClick={() => {
          if (customOnClose) {
            customOnClose();
          }
          hideModal();
        }}
      />
    </Bulma.Modal.Content>
  );
};

export default DlGeneExpressionCallsSpeciesModal;
