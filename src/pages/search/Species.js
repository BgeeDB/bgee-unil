/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';
import api from '../../api';
import LinkExternal from '../../components/LinkExternal';
import readableFileSize from '../../helpers/readableFileSize';
import schemaDotOrg from '../../helpers/schemaDotOrg';
import imagePath from '../../helpers/imagePath';
import { FULL_LENGTH_LABEL } from '../../api/prod/constant';

const Species = () => {
  let metaTitle = '';
  let metaDescription = '';
  let metaKeywords = '';

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
      let search = data.downloadFilesGroups.downloadFiles.find(
        (d) =>
          d.category === 'expr_simple' && d.conditionParameters.length === 1
      );
      if (search) src.anatOnlyXpr.simple = search;
      search = data.downloadFilesGroups.downloadFiles.find(
        (d) =>
          d.category === 'expr_advanced' && d.conditionParameters.length === 1
      );
      if (search) src.anatOnlyXpr.advanced = search;

      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'expr_simple' && d.conditionParameters.length > 1
      );
      if (search) src.fullXpr.simple = search;

      search = data.downloadFilesGroups.downloadFiles.find(
        (d) =>
          d.category === 'expr_advanced' && d.conditionParameters.length > 1
      );
      if (search) src.fullXpr.advanced = search;

      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'affy_annot'
      );
      if (search) src.affymetrix.annot = search;
      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'affy_data'
      );
      if (search) src.affymetrix.data = search;

      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'rnaseq_annot'
      );
      if (search) src.rnaSeq.annot = search;
      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'rnaseq_data'
      );
      if (search) src.rnaSeq.data = search;

      search = data.downloadFilesGroups.downloadFiles.find(
        (d) => d.category === 'full_length_annot'
      );
      if (search) src.fullLength.annot = search;
      search = data.downloadFilesGroups.downloadFiles.find(
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
        setData(res.data);
        schemaDotOrg.setSpeciesLdJSON(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (data) {
    metaTitle = `${data.species.genus}  ${data.species.speciesName}
       ${data.species.name ? `( ${data.species.name} )` : ''}`;
    metaDescription = `General information and datasets available
        in Bgee for species
        ${data.species.genus}  ${data.species.speciesName}
       ${data.species.name ? `( ${data.species.name} )` : ''}`;
    metaKeywords = `gene expression in
       ${data.species.genus} ${data.species.speciesName},
       ${data.species.name ? `gene expression in ${data.species.name} , ` : ''}
       ${data.species.genus} ${data.species.speciesName},
       ${data.species.name ? `${data.species.name} , ` : ''}
       species, taxon`;
  }

  return !data ? null : (
    <>
      {data && (
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />
        </Helmet>
      )}
      <div className="content has-text-centered is-flex is-justify-content-center is-align-items-center">
        <Bulma.Image
          className="m-0 mr-2 species-img"
          src={imagePath(`/species/${data.species.id}_light.jpg`)}
          alt={`${data.species.genus} ${data.species.speciesName}`}
        />
        <Bulma.Title size={3} className="m-0">{`Species: ${
          data.species.genus
        } ${data.species.speciesName}${
          data.species.name ? ` (${data.species.name})` : ''
        }`}</Bulma.Title>
      </div>
      <div>
        <Bulma.Title size={4} className="gradient-underline" renderAs="h2">
          General information
        </Bulma.Title>
        <div className="">
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
              <LinkExternal to={data.species.genomeAssemblyXRef}>
                {data.species.genomeSource.name}
              </LinkExternal>
            </div>
          </div>
          <div className="is-flex">
            <div style={{ width: 150 }}>
              <p>
                <b style={{ width: 140 }}>Gene list</b>
              </p>
            </div>
            <div>
              <p>
                <Link className="internal-link"
                      to={PATHS.SEARCH.GENE_LIST_ITEM_BY_SPECIES
                          .replace(':speciesId', data.species.id)
                          .replace(':speciesName', data.species.speciesFullNameWithoutSpace?.replace("_", "-").toLowerCase())}
                      title={`Gene list for ${data.species.genus} ${data.species.speciesName}`}>
                  All genes for {data.species.genus} {data.species.speciesName} genome version &apos;{data.species.genomeVersion}&apos;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Bulma.Title
          size={4}
          className="gradient-underline"
          id="exp-calls"
          renderAs="h2"
        >
          Gene expression call files
        </Bulma.Title>
        <div className="">
          <p>
            Bgee provides calls of presence/absence of expression. Each call
            corresponds to a unique combination of a gene, an anatomical entity,
            a life stage, a sex, and a strain, with reported presence or absence
            of expression. More information in our{' '}
            <Link
              to={PATHS.SUPPORT.TUTORIAL_GENE_EXPR}
              className="internal-link"
            >
              documentation
            </Link>
            .
          </p>
          <div className="mt-2">
            <p className="is-size-5 has-text-primary has-text-weight-semibold">
              Anatomical entities only
            </p>
            <ul className="unordered">
              {files.anatOnlyXpr.simple && (
                <li id="exp-calls-anat-simple">
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
                <li id="exp-calls-anat-advanced">
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
            <p className="is-size-5 has-text-primary has-text-weight-semibold">
              Anatomical entities, developmental stages, sexes and strains
            </p>
            <ul className="unordered">
              {files.fullXpr.simple && (
                <li id="exp-calls-cond-simple">
                  File without advanced column:{' '}
                  <a className="internal-link" href={files.fullXpr.simple.path}>
                    <code>{files.fullXpr.simple.name}</code>
                  </a>
                  {` (${readableFileSize(files.fullXpr.simple.size)})`}
                </li>
              )}
              {files.fullXpr.advanced && (
                <li id="exp-calls-cond-advanced">
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
        <Bulma.Title
          size={4}
          className="gradient-underline"
          id="proc-values"
          renderAs="h2"
        >
          Processed expression value files
        </Bulma.Title>
        <div className="">
          <p>
            Bgee provides annotations and experiment annotations, and processed
            expression values. More information in our{' '}
            <Link
              to={PATHS.SUPPORT.TUTORIAL_EXPR_VAL}
              className="internal-link"
            >
              documentation
            </Link>
            .
          </p>
          <div className="mt-2">
            <p
              className="is-size-5 has-text-primary has-text-weight-semibold"
              id="proc-values-affymetrix"
            >
              Affymetrix
            </p>
            {files.affymetrix.annot || files.affymetrix.data ? (
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
            ) : (
              <p className="mt-2 mb-4">No data</p>
            )}
          </div>
          <div className="mt-2">
            <p
              className="is-size-5 has-text-primary has-text-weight-semibold"
              id="proc-values-rna-seq"
            >
              RNA-Seq
            </p>
            {files.rnaSeq.annot || files.rnaSeq.data ? (
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
            ) : (
              <p className="mt-2 mb-4">No data</p>
            )}
          </div>
          <div className="mt-2">
            <p
              className="is-size-5 has-text-primary has-text-weight-semibold"
              id="proc-values-scrna-seq"
            >
              {FULL_LENGTH_LABEL}
            </p>
            {files.fullLength.annot || files.fullLength.data ? (
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
            ) : (
              <p className="mt-2 mb-4">No data</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Species;
