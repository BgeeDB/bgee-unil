/* eslint-disable react/no-array-index-key,react/button-has-type,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PATHS from '../../routes/paths';
import useQuery from '../../hooks/useQuery';
import Bulma from '../../components/Bulma';
import CreativeCommons from '../../components/CreativeCommons';
import api from '../../api';
import GridSpecies from '../../components/GridSpecies/GridSpecies';
import classnames from '../../helpers/classnames';
import GaEvent from '../../components/GaEvent/GaEvent';
import readableFileSize from '../../helpers/readableFileSize';

const ProcessedExpressionValues = () => {
  const history = useHistory();
  const [speciesList, setSpeciesList] = React.useState([]);
  const [kwList, setKwList] = React.useState({});
  const [search, setSearch] = React.useState('');
  const filteredSpecies = React.useMemo(() => {
    const tmp = JSON.parse(JSON.stringify(speciesList));
    if (search === '') return tmp;
    const regExp = new RegExp(search, 'i');
    return tmp.filter(({ id }) =>
      !kwList[id] ? false : Boolean(kwList[id].find((a) => regExp.test(a)))
    );
  }, [speciesList, search, kwList]);
  const [files, setFiles] = React.useState({});
  const speciesID = useQuery('id');

  React.useEffect(() => {
    api.search.species.processedValues().then((res) => {
      const sList = res.data.downloadFilesGroups.map((o) => ({
        ...o,
        ...o.members[0],
      }));
      setSpeciesList(sList);
      setKwList(res.data.speciesIdToKeywords);

      const speciesFiles = {};
      sList.forEach((s) => {
        speciesFiles[s.id.toString()] = {
          affymetrixData: s.downloadFiles.find(
            (d) => d.category === 'affy_data'
          ),
          affymetrixAnnot: s.downloadFiles.find(
            (d) => d.category === 'affy_annot'
          ),
          rnaSeqData: s.downloadFiles.find((d) => d.category === 'rnaseq_data'),
          rnaSeqAnnot: s.downloadFiles.find(
            (d) => d.category === 'rnaseq_annot'
          ),
          fullLengthAnnot: s.downloadFiles.find(
            (d) => d.category === 'full_length_annot'
          ),
          fullLengthData: s.downloadFiles.find(
            (d) => d.category === 'full_length_data'
          ),
        };
      });
      setFiles(speciesFiles);
    });
    return () => {};
  }, []);

  return (
    <>
      <div className="content has-text-centered">
        <Bulma.Title size={5}>Processed expression values</Bulma.Title>
      </div>
      <p>
        This page provides annotations and experiment information (e.g.,
        annotations to anatomy and development, quality scores used in QCs, chip
        or library information), and processed expression values (e.g., read
        counts, TPM and FPKM values, log values of Affymetrix probeset
        normalized signal intensities). Click on a species to browse files
        available for download. It is possible to download these data directly
        into R using our{' '}
        <a
          className="external-link"
          href="https://bioconductor.org/packages/BgeeDB/"
        >
          R package
        </a>
        . See also{' '}
        <Link
          to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}
          className="internal-link"
        >
          gene expression calls
        </Link>
        . All data are available under the{' '}
        <a
          className="external-link"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          Creative Commons Zero license (CC0)
        </a>
        .
      </p>
      <div>
        <Bulma.Card className="search-input mx-auto my-3">
          <Bulma.Card.Body>
            <div className="content">
              <div className="field">
                <label className="label" htmlFor="search-species">
                  Search species
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="search-species"
                    placeholder="Scientific name, common name..."
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
            Species with data in Bgee{' '}
            <span className="ml-2 has-text-grey is-size-6">
              (click on species to see more details)
            </span>
          </Bulma.Card.Header.Title>
        </Bulma.Card.Header>
        <Bulma.Card.Body>
          <div className="content">
            <div className="species-grid">
              <GridSpecies
                speciesList={filteredSpecies}
                defaultSelection={speciesID}
                onClick={(species, isSelected) => {
                  console.log(species, isSelected);
                  history.replace(
                    isSelected
                      ? `?id=${species.id}`
                      : PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES
                  );
                }}
                onRenderSelection={(species, { onClose }) => (
                  <div
                    className={classnames(
                      'processed-exp is-flex is-flex-direction-row p-4'
                    )}
                  >
                    <div className="image-container">
                      <Bulma.Image
                        className="m-0"
                        src={`/static/img/species/${species.id}_light.jpg`}
                        alt={`species ${species.genus} ${species.speciesName}- ${species.name}`}
                        fallback="https://via.placeholder.com/260"
                        height={260}
                        width={260}
                      />
                    </div>
                    <div
                      className="is-flex is-flex-direction-column is-justify-content-space-around ml-4"
                      style={{ height: '100%', flex: 1, overflow: 'hidden' }}
                    >
                      <div className="is-flex is-flex-direction-column">
                        <div className="is-flex is-justify-content-flex-end">
                          <Link
                            className="internal-link grey"
                            to={`${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}?id=${species.id}`}
                          >
                            See gene expression calls
                          </Link>
                          <div className="close" onClick={onClose}>
                            <ion-icon name="close-outline" />
                          </div>
                        </div>
                        <p className="is-size-3">
                          <i>{`${species.genus} ${species.speciesName}`}</i>
                          {species.name ? ` (${species.name})` : ''}
                        </p>
                      </div>
                      <div>
                        <div>
                          <p className="mb-2 is-size-5 has-text-weight-semibold">
                            RNA-Seq data
                          </p>
                          {files[species.id.toString()]?.rnaSeqAnnot ||
                          files[species.id.toString()]?.rnaSeqData ? (
                            <>
                              <div className="buttons-wrapper">
                                {files[species.id.toString()]?.rnaSeqAnnot && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_rna-seq_annotation-file"
                                    label={
                                      files[species.id.toString()]?.rnaSeqAnnot
                                        .path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]
                                          ?.rnaSeqAnnot.path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download experiments/libraries info
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.rnaSeqAnnot.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                                {files[species.id.toString()]?.rnaSeqData && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_rna-seq_data-file"
                                    label={
                                      files[species.id.toString()]?.rnaSeqData
                                        .path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]?.rnaSeqData
                                          .path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download read count, TPMs and FPKMs
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.rnaSeqData.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                              </div>
                              <p className="is-size-6 has-text-grey">
                                Files can also be retrieved per experiment, see{' '}
                                <a
                                  className="internal-link"
                                  href={`https://bgee.org/ftp/bgee_v15_0/download/processed_expr_values/rna_seq/${species.genus}_${species.speciesName}/`}
                                >
                                  RNA-Seq data directory
                                </a>
                              </p>
                            </>
                          ) : (
                            <p className="is-size-6 has-text-grey mb-2">
                              No data
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <p className="mb-2 is-size-5 has-text-weight-semibold">
                            Affymetrix data
                          </p>
                          {files[species.id.toString()]?.affymetrixAnnot ||
                          files[species.id.toString()]?.affymetrixData ? (
                            <>
                              <div className="buttons-wrapper">
                                {files[species.id.toString()]
                                  ?.affymetrixAnnot && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_affymetrix_annotation-file"
                                    label={
                                      files[species.id.toString()]
                                        ?.affymetrixAnnot.path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]
                                          ?.affymetrixAnnot.path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download experiments/chips info
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.rnaSeqData.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                                {files[species.id.toString()]
                                  ?.affymetrixData && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_affymetrix_data-file"
                                    label={
                                      files[species.id.toString()]
                                        ?.affymetrixData.path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]
                                          ?.affymetrixData.path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download signal intensities
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.affymetrixData.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                              </div>
                              <p className="is-size-6 has-text-grey">
                                Files can also be retrieved per experiment, see{' '}
                                <a
                                  className="internal-link"
                                  href={`https://bgee.org/ftp/current/download/processed_expr_values/affymetrix/${species.genus}_${species.speciesName}/`}
                                >
                                  Affymetrix data directory
                                </a>
                              </p>
                            </>
                          ) : (
                            <p className="is-size-6 has-text-grey mb-2">
                              No data
                            </p>
                          )}
                        </div>
                        <div className="mt-4">
                          <p className="mb-2 is-size-5 has-text-weight-semibold">
                            Single cell full length RNA-Seq data
                          </p>
                          {files[species.id.toString()]?.fullLengthAnnot ||
                          files[species.id.toString()]?.fullLengthData ? (
                            <>
                              <div className="buttons-wrapper">
                                {files[species.id.toString()]
                                  ?.fullLengthAnnot && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_full-length_annotation-file"
                                    label={
                                      files[species.id.toString()]
                                        ?.fullLengthAnnot.path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]
                                          ?.fullLengthAnnot.path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download experiments/libraries info
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.fullLengthAnnot.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                                {files[species.id.toString()]
                                  ?.fullLengthData && (
                                  <GaEvent
                                    category="Processed Expression Values"
                                    action="download_full-length_data-file"
                                    label={
                                      files[species.id.toString()]
                                        ?.fullLengthData.path
                                    }
                                  >
                                    <a
                                      href={
                                        files[species.id.toString()]
                                          ?.fullLengthData.path
                                      }
                                    >
                                      <button className="button is-light is-multiline">
                                        <ion-icon name="download-outline" />
                                        <span className="is-size-6 ml-2">
                                          Download read count, TPMs and FPKMs
                                          {` (${readableFileSize(
                                            files[species.id.toString()]
                                              ?.fullLengthData.size
                                          )})`}
                                        </span>
                                      </button>
                                    </a>
                                  </GaEvent>
                                )}
                              </div>
                              <p className="is-size-6 has-text-grey">
                                Files can also be retrieved per experiment, see{' '}
                                <a
                                  className="internal-link"
                                  href={`https://bgee.org/ftp/bgee_v15_0/download/processed_expr_values/sc_full_length/${species.genus}_${species.speciesName}/`}
                                >
                                  Full length single cell RNA-Seq data directory
                                </a>
                              </p>
                            </>
                          ) : (
                            <p className="is-size-6 has-text-grey mb-2">
                              No data
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
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

export default ProcessedExpressionValues;
