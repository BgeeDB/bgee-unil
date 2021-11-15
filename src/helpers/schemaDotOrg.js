import config from '../config.json';
import PATHS from '../routes/paths';

const geneToLdJSON = ({
  name,
  geneId,
  description,
  synonyms,
  species,
  xRefs,
  path,
}) => ({
  '@context': 'https://schema.org/',
  '@type': 'Gene',
  '@id': window.location.href,
  'http://purl.org/dc/terms/conformsTo': {
    '@id': 'https://bioschemas.org/profiles/Gene/1.0-RELEASE',
    '@type': 'CreativeWork',
  },
  description,
  alternateName: synonyms,
  identifier: geneId,
  subjectOf: {
    '@type': 'WebPage',
    url: config.permanentVersionedDomain + path,
    name: `Gene: ${name} - ${geneId} - ${species.genus} ${species.speciesName}${
      species.name ? ` (${species.name})` : ''
    }`,
  },
  taxonomicRange: {
    '@type': 'Taxon',
    '@id':
      config.permanentVersionedDomain +
      PATHS.SEARCH.SPECIES_ITEM.replace(':id', species.id),
    name: `${name} - ${geneId}`,
    identifier: species.id,
    sameAs: `http://purl.obolibrary.org/obo/NCBITaxon_${species.id}`,
  },
  sameAs: xRefs?.reduce((acc, a) => {
    if (a.source.name !== 'Ensembl' && a.xRefs.length === 1)
      acc.push(a.xRefs[0].xRefURL);
    return acc;
  }, []),
});
const geneHomologsToLdJSON = (homo) => {
  const ldJson = [];
  homo.forEach((h) => {
    ldJson.push({
      '@type': 'https://schema.org/Taxon',
      '@id': `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${h.taxon.id}`,
      'https://schema.org/identifier': h.taxon.id,
      'https://schema.org/name': h.taxon.name,
    });
  });

  return ldJson;
};
const geneExpressionToLdJSON = (genes) => {
  const ldJson = [];
  genes.forEach((g) => {
    const { anatEntity, cellType } = g.condition;
    if (g.condition.cellType)
      ldJson.push({
        '@type': 'Gene',
        '@id': window.location.href,
        expressedIn: {
          '@type': 'AnatomicalStructure',
          '@id': `https://schema.org/_:${cellType.id.replace(
            ':',
            '_'
          )}_${anatEntity.id.replace(':', '_')}`,
          name: `${cellType.name} in ${anatEntity.name}`,
          subStructure: [
            {
              '@type': 'AnatomicalStructure',
              '@id': `http://purl.obolibrary.org/obo/${cellType.id.replace(
                ':',
                '_'
              )}`,
              identifier: cellType.id,
              name: cellType.name,
            },
            {
              '@type': 'AnatomicalStructure',
              '@id': `http://purl.obolibrary.org/obo/${anatEntity.id.replace(
                ':',
                '_'
              )}`,
              identifier: anatEntity.id,
              name: anatEntity.name,
            },
          ],
        },
      });
    else
      ldJson.push({
        '@type': 'Gene',
        '@id': window.location.href,
        expressedIn: {
          '@type': 'AnatomicalStructure',
          '@id': `http://purl.obolibrary.org/obo/${anatEntity.id.replace(
            ':',
            '_'
          )}`,
          identifier: anatEntity.id,
          name: anatEntity.name,
        },
      });
  });

  return ldJson;
};

const fileDownloadProps = (file) => ({
  '@type': 'Dataset',
  dateModified: config.bioSchemaModifiedData,
  creator: {
    '@type': 'Organization',
    url: 'https://bgee.org/',
    name: 'The Bgee Team',
  },
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'TSV',
      contentUrl: file.path,
    },
  ],
});
const speciesToLdJSON = ({
  downloadFiles: { downloadFiles },
  species: { genus, name, speciesName, id },
}) => {
  const json = {
    '@context': 'https://schema.org/',
    '@id': window.location.href,
    '@type': 'Taxon',
    'http://purl.org/dc/terms/conformsTo': {
      '@id': 'https://bioschemas.org/profiles/Gene/1.0-RELEASE',
      '@type': 'CreativeWork',
    },
    name: `${genus} ${speciesName}`,
    alternateName: name,
    identifier: id,
    sameAs: [
      `http://purl.obolibrary.org/obo/NCBITaxon_${id}`,
      `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
      `http://nov2020.archive.ensembl.org/${genus}_${speciesName}`,
    ],
    subjectOf: [
      {
        '@type': 'Dataset',
        dateModified: config.bioSchemaModifiedData,
        citation: 'https://doi.org/10.1093/nar/gkaa793',
        description: `${genus} ${speciesName} calls of presence/absence of expression. Each call corresponds to a unique combination of a gene, an anatomical entity, a life stage, a sex, and a strain, with reported presence or absence of expression.`,
        includedInDataCatalog: {
          '@id': config.genericDomain,
          '@type': 'DataCatalog',
          name: 'Bgee',
        },
        keywords: ['gene expression', 'call', `${genus} ${speciesName}`, name],
        creator: {
          '@type': 'Organization',
          url: 'https://bgee.org/',
          name: 'The Bgee Team',
        },
        license: 'https://creativecommons.org/publicdomain/zero/1.0/',
        name: `${genus} ${speciesName} gene expression calls`,
        url: `${window.location.href}#expr-calls`,
        version: config.version,
        hasPart: [
          {
            '@type': 'Dataset',
            dateModified: config.bioSchemaModifiedData,
            creator: {
              '@type': 'Organization',
              url: 'https://bgee.org/',
              name: 'The Bgee Team',
            },
            license: 'https://creativecommons.org/publicdomain/zero/1.0/',
            name: `${genus} ${speciesName} gene expression simple`,
            description:
              'Anatomical entities only, file without advanced columns.',
            url: `${
              config.genericDomain +
              PATHS.SEARCH.SPECIES_ITEM.replace(':id', id)
            }#expr-calls-anat-simple`,
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'TSV',
                contentUrl: downloadFiles.find(
                  (d) =>
                    d.category === 'expr_simple' &&
                    d.conditionParameters.length === 1
                ).path,
              },
            ],
          },
          {
            '@type': 'Dataset',
            dateModified: config.bioSchemaModifiedData,
            creator: {
              '@type': 'Organization',
              url: 'https://bgee.org/',
              name: 'The Bgee Team',
            },
            license: 'https://creativecommons.org/publicdomain/zero/1.0/',
            name: `${genus} ${speciesName} gene expression advanced`,
            description:
              'Anatomical entities only, file with advanced columns.',
            url: `${
              config.genericDomain +
              PATHS.SEARCH.SPECIES_ITEM.replace(':id', id)
            }#expr-calls-anat-advanced`,
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'TSV',
                contentUrl: downloadFiles.find(
                  (d) =>
                    d.category === 'expr_advanced' &&
                    d.conditionParameters.length === 1
                ).path,
              },
            ],
          },
          {
            '@type': 'Dataset',
            dateModified: config.bioSchemaModifiedData,
            creator: {
              '@type': 'Organization',
              url: 'https://bgee.org/',
              name: 'The Bgee Team',
            },
            license: 'https://creativecommons.org/publicdomain/zero/1.0/',
            name: `${genus} ${speciesName} gene expression simple with all conditions`,
            description:
              'Anatomical entities, developmental stages, sexes and strains. File without advanced columns.',
            url: `${
              config.genericDomain +
              PATHS.SEARCH.SPECIES_ITEM.replace(':id', id)
            }#expr-calls-cond-simple`,
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'TSV',
                contentUrl: downloadFiles.find(
                  (d) =>
                    d.category === 'expr_simple' &&
                    d.conditionParameters.length > 1
                ).path,
              },
            ],
          },
          {
            '@type': 'Dataset',
            dateModified: config.bioSchemaModifiedData,
            creator: {
              '@type': 'Organization',
              url: 'https://bgee.org/',
              name: 'The Bgee Team',
            },
            license: 'https://creativecommons.org/publicdomain/zero/1.0/',
            name: `${genus} ${speciesName} gene expression advanced with all conditions`,
            description:
              'Anatomical entities, developmental stages, sexes and strains. File with advanced columns.',
            url: `${
              config.genericDomain +
              PATHS.SEARCH.SPECIES_ITEM.replace(':id', id)
            }#expr-calls-cond-advanced`,
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'TSV',
                contentUrl: downloadFiles.find(
                  (d) =>
                    d.category === 'expr_advanced' &&
                    d.conditionParameters.length > 1
                ).path,
              },
            ],
          },
        ],
      },
      {
        '@type': 'Dataset',
        dateModified: config.bioSchemaModifiedData,
        creator: {
          '@type': 'Organization',
          url: 'https://bgee.org/',
          name: 'The Bgee Team',
        },
        citation: 'https://doi.org/10.1093/nar/gkaa793',
        description: `Annotations and experiment information (e.g., annotations to anatomy and development, quality scores used in QCs, library information), and processed expression values (e.g., read counts, TPM and FPKM values) for ${genus} ${speciesName}.`,
        includedInDataCatalog: {
          '@id': config.permanentVersionedDomain,
          '@type': 'DataCatalog',
          name: 'Bgee',
        },
        keywords: [
          'annotations',
          'experiment information',
          'processed expression values',
          `${genus} ${speciesName}`,
          name,
        ],
        license: 'https://creativecommons.org/publicdomain/zero/1.0/',
        name: `${genus} ${speciesName} processed expression values`,
        url: `${window.location.href}#proc-values`,
        version: config.version,
        hasPart: [],
      },
      {
        '@type': 'WebPage',
        url: `${window.location.href}`,
        name: `Species: ${genus} ${speciesName} (${name})`,
      },
    ],
  };

  let file = downloadFiles.find((d) => d.category === 'affy_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} Affymetrix experiments chips`,
      keywords: ['Affymetrix'],
      description: 'Affymetrix experiments/chips annotations and metadata.',
      url: `${window.location.href}#proc-values-affymetrix`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'affy_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} Affymetrix probesets`,
      description: `${genus} ${speciesName} Affymetrix probesets, data (signal intensities).`,
      url: `${window.location.href}#proc-values-affymetrix`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'rnaseq_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} RNA-Seq experiment libraries`,
      keywords: ['RNA-Seq'],
      description: `${genus} ${speciesName} RNA-Seq experiments/libraries annotations and metadata.`,
      url: `${window.location.href}#proc-values-rna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'rnaseq_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} RNA-Seq read counts, TPM and FPKM`,
      description: `${genus} ${speciesName} RNA-Seq read counts, TPM (Transcript Per Million) and FPKM (Fragments Per Kilobase of transcript per Million mapped reads).`,
      keywords: ['RNA-Seq'],
      url: `${window.location.href}#proc-values-rna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'full_length_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} full-length Single cell RNA-Seq experiment libraries`,
      description: `${genus} ${speciesName} full-length Single cell RNA-Seq experiments/ libraries annotations and metadata.`,
      keywords: ['Single cell full length RNA-Seq', 'Single cell RNA-Seq'],
      url: `${window.location.href}#proc-values-fl-scrna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'full_length_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName} Full-Length Single Cell RNA-Seq read counts, TPM and FPKM`,
      description: `${genus} ${speciesName} Full-Length Single Cell RNA-Seq read counts, TPM (Transcript Per Million) and FPKM (Fragments Per Kilobase of transcript per Million mapped reads).`,
      keywords: ['Single cell full length RNA-Seq', 'Single cell RNA-Seq'],
      url: `${window.location.href}#proc-values-fl-scrna-seq`,
    });
  }

  return json;
};

const schemaDotOrg = {
  setSpeciesLdJSON: (species) => {
    /* add ld+json @ bottom of body */
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'species-ld+json';
    script.text = JSON.stringify(speciesToLdJSON(species), null, 4);
    const body = document.querySelector('body');
    body.appendChild(script);
  },
  unsetSpeciesLdJSON: () => {
    /* remove ld+json @ bottom of body */
    document.getElementById('species-ld+json')?.remove();
  },
  setGeneLdJSON: (gene) => {
    /* add ld+json @ bottom of body */
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'gene-ld+json';
    script.text = JSON.stringify(geneToLdJSON(gene), null, 4);
    const body = document.querySelector('body');
    body.appendChild(script);
  },
  unsetGeneLdJSON: () => {
    /* remove ld+json @ bottom of body */
    document.getElementById('gene-ld+json')?.remove();
  },
  setGeneHomologsLdJSON: (gene) => {
    /* add ld+json @ bottom of body */
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'gene_homologs-ld+json';
    script.text = JSON.stringify(
      geneHomologsToLdJSON([...gene.orthologsByTaxon, ...gene.paralogsByTaxon]),
      null,
      4
    );
    const body = document.querySelector('body');
    body.appendChild(script);
  },
  unsetGeneHomologsLdJSON: () => {
    /* remove ld+json @ bottom of body */
    document.getElementById('gene_homologs-ld+json')?.remove();
  },
  setGeneExpressionLdJSON: (genes) => {
    /* add ld+json @ bottom of body */
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'gene_expression-ld+json';
    script.text = JSON.stringify(geneExpressionToLdJSON(genes.calls), null, 4);
    const body = document.querySelector('body');
    body.appendChild(script);
  },
  unsetGeneExpressionLdJSON: () => {
    /* remove ld+json @ bottom of body */
    document.getElementById('gene_expression-ld+json')?.remove();
  },
};

export default schemaDotOrg;
