import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';

import Bulma from '../Bulma';

const DlProcessedExpressionValuesSpeciesModal = ({ selectedSpecies }) => (
  <Bulma.Modal.Content as="div" className="box">
    <article className="media">
      <div className="media-content my-auto">
        <p className="title">
          {selectedSpecies
            ? `${selectedSpecies.scientificName} (${selectedSpecies.name})`
            : null}
        </p>
      </div>
      <div className="media-right">
        <div className="">
          <figure className="image is-128x128 rounded-border">
            {selectedSpecies && (
              <img
                src={selectedSpecies.src}
                alt={selectedSpecies.scientificName}
              />
            )}
          </figure>
        </div>
      </div>
    </article>
    <div className="mt-2">
      <div>
        <p className="mb-2">
          <b>{i18n.t('download.processed-exp-values.rna-seq')}</b>
        </p>
        <div className="field has-addons">
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t(
                  'download.processed-exp-values.rna-seq-button-experiments'
                )}
              </span>
            </button>
          </p>
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t('download.processed-exp-values.rna-seq-button-count')}
              </span>
            </button>
          </p>
        </div>
        <p>
          {i18n.t('download.processed-exp-values.rna-seq-desc')}
          <Link>
            {i18n.t('download.processed-exp-values.rna-seq-desc-link')}
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <p className="mb-2">
          <b>{i18n.t('download.processed-exp-values.affymetrix')}</b>
        </p>
        <div className="field has-addons">
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t(
                  'download.processed-exp-values.affymetrix-button-experiments'
                )}
              </span>
            </button>
          </p>
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t(
                  'download.processed-exp-values.affymetrix-button-signal'
                )}
              </span>
            </button>
          </p>
        </div>
        <p>
          {i18n.t('download.processed-exp-values.affymetrix-desc')}
          <Link>
            {i18n.t('download.processed-exp-values.affymetrix-desc-link')}
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <p className="mb-2">
          <b>{i18n.t('download.processed-exp-values.full-rna-seq')}</b>
        </p>
        <div className="field has-addons">
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t(
                  'download.processed-exp-values.full-rna-seq-button-experiments'
                )}
              </span>
            </button>
          </p>
          <p className="control">
            <button className="button is-primary is-outlined" type="button">
              <span>
                {i18n.t(
                  'download.processed-exp-values.full-rna-seq-button-count'
                )}
              </span>
            </button>
          </p>
        </div>
        <p>
          {i18n.t('download.processed-exp-values.full-rna-seq-desc')}
          <Link>
            {i18n.t('download.processed-exp-values.full-rna-seq-desc-link')}
          </Link>
        </p>
      </div>
    </div>
  </Bulma.Modal.Content>
);

export default DlProcessedExpressionValuesSpeciesModal;
