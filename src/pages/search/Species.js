/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';

const SpeciesList = () => {
  const species = {
    scientificName: 'Danio rerio',
    commonName: 'zebrafish',
    img: 'https://bgee.org/bgee15_0/img/species/7955_light.jpg',
    id: 7955,
    genomeSource: 'http://nov2020.archive.ensembl.org/Danio_rerio',
    genomeVersion: 'GRCz11',
    anatomicalEntitiesSimple:
      'ftp://ftp.bgee.org/bgee_v15_0/download/calls/expr_calls/Danio_rerio_expr_simple.tsv.gz',
    anatomicalEntitiesAdvanced:
      'ftp://ftp.bgee.org/bgee_v15_0/download/calls/expr_calls/Danio_rerio_expr_advanced.tsv.gz',
    anatomicalEntitiesCompleteSimple:
      'ftp://ftp.bgee.org/bgee_v15_0/download/calls/expr_calls/Danio_rerio_expr_simple_all_conditions.tsv.gz',
    anatomicalEntitiesCompleteAdvanced:
      'ftp://ftp.bgee.org/bgee_v15_0/download/calls/expr_calls/Danio_rerio_expr_advanced_all_conditions.tsv.gz',
    affimetrixExperimentsChips:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/affymetrix/Danio_rerio/Danio_rerio_Affymetrix_experiments_chips.tar.gz',
    affimetrixData:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/affymetrix/Danio_rerio/Danio_rerio_Affymetrix_probesets.tar.gz',
    rnaSeqExperimentsLibraries:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Danio_rerio/Danio_rerio_RNA-Seq_experiments_libraries.tar.gz',
    rnaSeqData:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Danio_rerio/Danio_rerio_RNA-Seq_read_counts_TPM_FPKM.tar.gz',
    fullRnaSeqExperimentsLibraries:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Danio_rerio/Danio_rerio_RNA-Seq_experiments_libraries.tar.gz',
    fullRnaSeqData:
      'ftp://ftp.bgee.org/bgee_v15_0/download/processed_expr_values/rna_seq/Danio_rerio/Danio_rerio_RNA-Seq_read_counts_TPM_FPKM.tar.gz',
  };
  return (
    <div className="section pt-5">
      <div className="content has-text-centered">
        <p className="title is-5">{`${i18n.t('search.species.species')}: ${
          species.scientificName
        } (${species.commonName})`}</p>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.species.general-information')}
        </p>
        <div className="static-section">
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>{`${i18n.t(
                  'search.species.scientific-name'
                )}`}</b>
              </p>
            </div>
            <div>
              <p>{species.scientificName}</p>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>{`${i18n.t(
                  'search.species.common-name'
                )}`}</b>
              </p>
            </div>
            <div>
              <p>{species.commonName}</p>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>{`${i18n.t(
                  'search.species.species-id'
                )}`}</b>
              </p>
            </div>
            <div>
              <a className="external-link">{species.id}</a>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>{`${i18n.t(
                  'search.species.genome-source'
                )}`}</b>
              </p>
            </div>
            <div>
              <a className="external-link" href={species.genomeSource}>
                {i18n.t('search.species.genome-source-provider')}
              </a>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>{`${i18n.t(
                  'search.species.genome-version'
                )}`}</b>
              </p>
            </div>
            <div>
              <p>{species.genomeVersion}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.species.gene-expr-call-files')}
        </p>
        <div className="static-section">
          <p>
            {i18n.t('search.species.gene-expr-call-files-description')}
            <Link
              to={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}
              className="internal-link"
            >
              {i18n.t('search.species.gene-expr-call-files-doc')}
            </Link>
          </p>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.anatomical-only')}
            </p>
            <ul className="unordered">
              <li>
                {i18n.t('search.species.anatomical-only-simple')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
              <li>
                {i18n.t('search.species.anatomical-only-advanced')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.anatomical-full')}
            </p>
            <ul className="unordered">
              <li>
                {i18n.t('search.species.anatomical-full-simple')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
              <li>
                {i18n.t('search.species.anatomical-full-advanced')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.species.processed-expr-value-files')}
        </p>
        <div className="static-section">
          <p>
            {i18n.t('search.species.processed-expr-value-files-description')}
          </p>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.affymetrix')}
            </p>
            <ul className="unordered">
              <li>
                {i18n.t('search.species.affymetrix-experiment')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
              <li>
                {i18n.t('search.species.affymetrix-data')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.rna-seq')}
            </p>
            <ul className="unordered">
              <li>
                {i18n.t('search.species.rna-seq-experiment')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
              <li>
                {i18n.t('search.species.rna-seq-data')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.full-rna-seq')}
            </p>
            <ul className="unordered">
              <li>
                {i18n.t('search.species.full-rna-seq-experiment')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
              <li>
                {i18n.t('search.species.full-rna-seq-data')}{' '}
                <a>
                  <code>{i18n.t('global.download')}</code>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesList;
