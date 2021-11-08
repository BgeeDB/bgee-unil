import React from 'react';

import { useHistory } from 'react-router-dom';
import Bulma from '../Bulma';
import readableFileSize from '../../helpers/readableFileSize';
import { ModalContext } from '../../contexts/ModalContext';
import PATHS from '../../routes/paths';
import GaEvent from '../GaEvent/GaEvent';
import SpeciesImageDownloadModal from './SpeciesImageDownloadModal';

const DlProcessedExpressionValuesSpeciesModal = ({ species, files }) => {
  const { hideModal, customOnClose } = React.useContext(ModalContext);
  const history = useHistory();
  if (!species) return null;

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
              history.push(
                `${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}?id=${species.id}`
              );
            }}
          >
            See gene expression calls <ion-icon name="arrow-redo-outline" />
          </a>
        </Bulma.Media.Item>
        <SpeciesImageDownloadModal species={species} />
      </Bulma.Media>
      <div className="mt-2">
        <div>
          <p className="mb-2">
            <b>RNA-Seq data</b>
          </p>
          {files.rnaSeqAnnot || files.rnaSeqData ? (
            <div className="field has-addons">
              {files.rnaSeqAnnot && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_rna-seq_annotation-file"
                    label={files.rnaSeqAnnot.path}
                  >
                    <a className="button" href={files.rnaSeqAnnot.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download experiments/libraries info
                        {` (${readableFileSize(files.rnaSeqAnnot.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
              {files.rnaSeqData && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_rna-seq_data-file"
                    label={files.rnaSeqData.path}
                  >
                    <a className="button" href={files.rnaSeqData.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download read count, TPMs and FPKMs
                        {` (${readableFileSize(files.rnaSeqData.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
            </div>
          ) : (
            <p className="is-size-7 has-text-grey mb-2">No data</p>
          )}
          <p className="is-size-7 has-text-grey">
            Files can also be retrieved per experiment, see{' '}
            <a
              className="internal-link"
              href={`https://bgee.org/ftp/bgee_v15_0/download/processed_expr_values/rna_seq/${species.genus}_${species.speciesName}/`}
            >
              RNA-Seq data directory
            </a>
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-2">
            <b>Affymetrix data</b>
          </p>
          {files.affymetrixAnnot || files.affymetrixData ? (
            <div className="field has-addons">
              {files.affymetrixAnnot && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_affymetrix_annotation-file"
                    label={files.affymetrixAnnot.path}
                  >
                    <a className="button " href={files.affymetrixAnnot.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download experiments/chips info
                        {` (${readableFileSize(files.rnaSeqData.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
              {files.affymetrixData && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_affymetrix_data-file"
                    label={files.affymetrixData.path}
                  >
                    <a className="button t" href={files.affymetrixData.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download signal intensities
                        {` (${readableFileSize(files.affymetrixData.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
            </div>
          ) : (
            <p className="is-size-7 has-text-grey mb-2">No data</p>
          )}
          <p className="is-size-7 has-text-grey">
            Files can also be retrieved per experiment, see{' '}
            <a
              className="internal-link"
              href={`https://bgee.org/ftp/current/download/processed_expr_values/affymetrix/${species.genus}_${species.speciesName}/`}
            >
              Affymetrix data directory
            </a>
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-2">
            <b>Single cell full length RNA-Seq data</b>
          </p>
          {files.fullLengthAnnot || files.fullLengthData ? (
            <div className="field has-addons">
              {files.fullLengthAnnot && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_full-length_annotation-file"
                    label={files.fullLengthAnnot.path}
                  >
                    <a className="button" href={files.fullLengthAnnot.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download experiments/libraries info
                        {` (${readableFileSize(files.fullLengthAnnot.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
              {files.fullLengthData && (
                <p className="control">
                  <GaEvent
                    category="Processed Expression Values"
                    action="download_full-length_data-file"
                    label={files.fullLengthData.path}
                  >
                    <a className="button" href={files.fullLengthData.path}>
                      <ion-icon name="download-outline" />
                      <span className="is-size-7 ml-2">
                        Download read count, TPMs and FPKMs
                        {` (${readableFileSize(files.fullLengthData.size)})`}
                      </span>
                    </a>
                  </GaEvent>
                </p>
              )}
            </div>
          ) : (
            <p className="is-size-7 has-text-grey mb-2">No data</p>
          )}
          <p className="is-size-7 has-text-grey">
            Files can also be retrieved per experiment, see{' '}
            <a
              className="internal-link"
              href={`https://bgee.org/ftp/bgee_v15_0/download/processed_expr_values/sc_full_length/${species.genus}_${species.speciesName}/`}
            >
              Full length single cell RNA-Seq data directory
            </a>
          </p>
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

export default DlProcessedExpressionValuesSpeciesModal;
