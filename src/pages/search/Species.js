/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PATHS from '../../routes/paths';
import i18n from '../../i18n';
import Bulma from '../../components/Bulma';
import api from '../../api';
import LinkExternal from '../../components/LinkExternal';
import readableFileSize from '../../helpers/readableFileSize';

const SpeciesList = () => {
  const [data, setData] = React.useState();

  const { id } = useParams();
  const files = React.useMemo(() => {
    const src = {
      anatOnlyXpr: {},
      fullXpr: {},
      affymetrix: {},
      rnaSeq: {},
      fullLength: {},
    };

    if (data) {
      let search = data.downloadFiles.downloadFiles.find(
        (d) =>
          d.category === 'expr_simple' && d.conditionParameters.length === 1
      );
      if (search) src.anatOnlyXpr.simple = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) =>
          d.category === 'expr_advanced' && d.conditionParameters.length === 1
      );
      if (search) src.anatOnlyXpr.advanced = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'expr_simple' && d.conditionParameters.length > 1
      );
      if (search) src.fullXpr.simple = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) =>
          d.category === 'expr_advanced' && d.conditionParameters.length > 1
      );
      if (search) src.fullXpr.advanced = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'affy_annot'
      );
      if (search) src.affymetrix.annot = search;
      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'affy_data'
      );
      if (search) src.affymetrix.data = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'rnaseq_annot'
      );
      if (search) src.rnaSeq.annot = search;
      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'rnaseq_data'
      );
      if (search) src.rnaSeq.data = search;

      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'full_length_annot'
      );
      if (search) src.fullLength.annot = search;
      search = data.downloadFiles.downloadFiles.find(
        (d) => d.category === 'full_length_data'
      );
      if (search) src.fullLength.data = search;
    }
    return src;
  }, [data]);
  React.useEffect(() => {
    setData();
    api.search.species
      .species(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(() => {
        // go to error
      });
  }, [id]);

  return !data ? null : (
    <>
      <div className="content has-text-centered">
        <Bulma.Title
          size={4}
        >{`Species: ${data.species.genus} ${data.species.speciesName} (${data.species.name})`}</Bulma.Title>
      </div>
      <div>
        <Bulma.Title size={5} className="gradient-underline">
          General information
        </Bulma.Title>
        <div className="static-section">
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Scientific name</b>
              </p>
            </div>
            <div>
              <p>{`${data.species.genus} ${data.species.speciesName}`}</p>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Common name</b>
              </p>
            </div>
            <div>
              <p>{data.species.name}</p>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Species ID</b>
              </p>
            </div>
            <div>
              <LinkExternal
                to={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${data.species.id}`}
              >
                {data.species.id}
              </LinkExternal>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Genome source</b>
              </p>
            </div>
            <div>
              <LinkExternal
                to={`${
                  data.species.genomeSource.baseUrl + data.species.genus
                }_${data.species.speciesName}`}
              >
                {data.species.genomeSource.name}
              </LinkExternal>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Genome version</b>
              </p>
            </div>
            <div>
              <p>{data.species.genomeVersion}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Bulma.Title size={5} className="gradient-underline">
          Gene expression call files
        </Bulma.Title>
        <div className="static-section">
          <p>
            Bgee provides calls of presence/absence of expression. Each call
            corresponds to a unique combination of a gene, an anatomical entity,
            a life stage, a sex, and a strain, with reported presence or absence
            of expression. More information in our
            <Link
              to={PATHS.SUPPORT.GENE_EXPRESSION_CALLS}
              className="internal-link"
            >
              documentation
            </Link>
            .
          </p>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              Anatomical entities only
            </p>
            <ul className="unordered">
              {files.anatOnlyXpr.simple && (
                <li>
                  File without advanced column:{' '}
                  <a
                    className="internal-link"
                    href={files.anatOnlyXpr.simple.path}
                  >
                    <code>{files.anatOnlyXpr.simple.name}</code>
                  </a>
                  {` (${readableFileSize(files.anatOnlyXpr.simple.size)})`}
                </li>
              )}
              {files.anatOnlyXpr.advanced && (
                <li>
                  File with advanced column:{' '}
                  <a
                    className="internal-link"
                    href={files.anatOnlyXpr.advanced.path}
                  >
                    <code>{files.anatOnlyXpr.simple.name}</code>
                  </a>
                  {` (${readableFileSize(files.anatOnlyXpr.advanced.size)})`}
                </li>
              )}
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              Anatomical entities, developmental stages, sexes and strains
            </p>
            <ul className="unordered">
              {files.fullXpr.simple && (
                <li>
                  File without advanced column:{' '}
                  <a className="internal-link" href={files.fullXpr.simple.path}>
                    <code>{files.fullXpr.simple.name}</code>
                  </a>
                  {` (${readableFileSize(files.fullXpr.simple.size)})`}
                </li>
              )}
              {files.fullXpr.advanced && (
                <li>
                  File with advanced column:{' '}
                  <a
                    className="internal-link"
                    href={files.fullXpr.advanced.path}
                  >
                    <code>{files.fullXpr.advanced.name}</code>
                  </a>
                  {` (${readableFileSize(files.fullXpr.advanced.size)})`}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Bulma.Title size={5} className="gradient-underline">
          Processed expression value files
        </Bulma.Title>
        <div className="static-section">
          <p>
            Bgee provides annotations and experiment annotations, and processed
            expression values.
          </p>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">Affymetrix</p>
            <ul className="unordered">
              {files.affymetrix.annot && (
                <li>
                  Experiments/chips annotations and meta data:{' '}
                  <a
                    className="internal-link"
                    href={files.affymetrix.annot.path}
                  >
                    <code>{files.affymetrix.annot.name}</code>
                  </a>
                  {` (${readableFileSize(files.affymetrix.annot.size)})`}
                </li>
              )}
              {files.affymetrix.data && (
                <li>
                  Data (signal intensities):{' '}
                  <a
                    className="internal-link"
                    href={files.affymetrix.data.path}
                  >
                    <code>{files.affymetrix.data.name}</code>
                  </a>
                  {` (${readableFileSize(files.affymetrix.data.size)})`}
                </li>
              )}
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">RNA-Seq</p>
            <ul className="unordered">
              {files.rnaSeq.annot && (
                <li>
                  Experiments/libraries annotations and meta data:{' '}
                  <a className="internal-link" href={files.rnaSeq.annot.path}>
                    <code>{files.rnaSeq.annot.name}</code>
                  </a>
                  {` (${readableFileSize(files.rnaSeq.annot.size)})`}
                </li>
              )}
              {files.rnaSeq.data && (
                <li>
                  Data (read counts, TPMs, and FPKMs):{' '}
                  <a className="internal-link" href={files.rnaSeq.data.path}>
                    <code>{files.rnaSeq.data.name}</code>
                  </a>
                  {` (${readableFileSize(files.rnaSeq.data.size)})`}
                </li>
              )}
            </ul>
          </div>
          <div className="mt-2">
            <p className="is-6 has-text-weight-semibold">
              {i18n.t('search.species.full-rna-seq')}
            </p>
            <ul className="unordered">
              {files.fullLength.annot && (
                <li>
                  Experiments/libraries annotations and meta data:{' '}
                  <a
                    className="internal-link"
                    href={files.fullLength.annot.path}
                  >
                    <code>{files.fullLength.annot.name}</code>
                  </a>
                  {` (${readableFileSize(files.fullLength.annot.size)})`}
                </li>
              )}
              {files.fullLength.data && (
                <li>
                  Data (read counts, TPMs, and FPKMs){' '}
                  <a
                    className="internal-link"
                    href={files.fullLength.data.path}
                  >
                    <code>{files.fullLength.data.name}</code>
                  </a>
                  {` (${readableFileSize(files.fullLength.data.size)})`}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeciesList;
