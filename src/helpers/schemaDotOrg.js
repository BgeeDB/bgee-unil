import config from '../config.json';
import PATHS from '../routes/paths';
import obolibraryLinkFromID, {
  obolibraryNCBITaxonLinkFromID,
} from './obolibraryLinkFromID';

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
  name,
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
    name: `${species.genus} ${species.speciesName}${
      species.name ? ` (${species.name})` : ''
    }`,
    identifier: species.id,
    sameAs: obolibraryNCBITaxonLinkFromID(species.id),
  },
  sameAs: xRefs?.reduce((acc, a) => {
    if (a.xRefs.length === 1) acc.push(a.xRefs[0].xRefURL);
    return acc;
  }, []),
});

const geneHomologsToLdJSON = (homo) => {
  const ldJson = [];
  homo.forEach((h) => {
    ldJson.push({
      '@context': 'https://schema.org/',
      '@type': 'https://schema.org/Taxon',
      '@id': `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${h.taxon.id}`,
      'http://purl.org/dc/terms/conformsTo': {
        '@id': 'https://bioschemas.org/profiles/Taxon/1.0-RELEASE',
        '@type': 'CreativeWork',
      },
      identifier: h.taxon.id,
      name: h.taxon.scientificName,
      alternateName: h.taxon.name,
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
        '@context': 'https://schema.org/',
        '@type': 'Gene',
        '@id': window.location.href,
        expressedIn: {
          '@type': 'AnatomicalStructure',
          name: `${cellType.name} in ${anatEntity.name}`,
          subStructure: [
            {
              '@type': 'AnatomicalStructure',
              '@id': obolibraryLinkFromID(cellType.id),
              identifier: cellType.id,
              name: cellType.name,
            },
            {
              '@type': 'AnatomicalStructure',
              '@id': obolibraryLinkFromID(anatEntity.id),
              identifier: anatEntity.id,
              name: anatEntity.name,
            },
          ],
        },
      });
    else
      ldJson.push({
        '@context': 'https://schema.org/',
        '@type': 'Gene',
        '@id': window.location.href,
        expressedIn: {
          '@type': 'AnatomicalStructure',
          '@id': obolibraryLinkFromID(anatEntity.id),
          identifier: anatEntity.id,
          name: anatEntity.name,
        },
      });
  });

  return ldJson;
};

const fileDownloadProps = (file) => ({
  '@type': 'Dataset',
  'http://purl.org/dc/terms/conformsTo': {
    '@id': 'https://bioschemas.org/profiles/Dataset/1.0-RELEASE',
    '@type': 'CreativeWork',
  },
  dateModified: config.bioSchemaModifiedData,
  creator: {
    '@type': 'Organization',
    url: 'https://www.bgee.org/',
    name: 'The Bgee Team',
  },
  license: {
    '@type': 'CreativeWork',
    name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
    url: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  isAccessibleForFree: 'true',
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'TSV',
      contentUrl: file.path,
    },
  ],
});

const datasetToLdJSON = () => {
// const datasetToLdJSON = (species) => {
//    const datasets = [];
//    species.forEach((s) => {
//        const { genus, name, speciesName, id } = s;
//        datasets.push({
//            '@type': 'Dataset',
//            '@id': `https://www.bgee.org/species/${id}#exp-calls`,
//            name: `expr-calls ${id}`,
//            description: `Expression calls generated by Bgee for the species ${genus} ${speciesName} (${name} ${id})`,
//            license: {
//              '@type': 'CreativeWork',
//              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
//              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
//            },
//            isAccessibleForFree: 'true',
//            sameAs: `https://www.bgee.org/species/${id}`,
//            creator: [{
//                '@type': 'Person',
//                name: 'The Bgee Team',
//            }],
//        }, {
//            '@type': 'Dataset',
//            '@id': `https://www.bgee.org/species/${id}#proc-values-rna-seq`,
//            name: `proc-values-rna-seq ${id}`,
//            description: `RNA-Seq expression values processed for the species ${genus} ${speciesName} (${name} ${id})`,
//            license: {
//              '@type': 'CreativeWork',
//              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
//              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
//            },
//            isAccessibleForFree: 'true',
//            sameAs: `https://www.bgee.org/species/${id}`,
//            creator: [{
//                '@type': 'Person',
//                name: 'The Bgee Team',
//            }],
//        }, {
//            '@type': 'Dataset',
//            '@id': `https://www.bgee.org/species/${id}#proc-values-scrna-seq`,
//            name: `proc-values-scrna-seq ${id}`,
//            description: `Single cell RNA-Seq expression values processed for the species ${genus} ${speciesName} (${name} ${id})`,
//            license: {
//              '@type': 'CreativeWork',
//              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
//              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
//            },
//            isAccessibleForFree: 'true',
//            sameAs: `https://www.bgee.org/species/${id}`,
//            creator: [{
//                '@type': 'Person',
//                name: 'The Bgee Team',
//            }],
//        }, {
//            '@type': 'Dataset',
//            '@id': `https://www.bgee.org/species/${id}#proc-values-affymetrix`,
//            name: `proc-values-affymetrix ${id}`,
//            description: `Affymetrix expression values processed for the species ${genus} ${speciesName} (${name} ${id})`,
//            license: {
//              '@type': 'CreativeWork',
//              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
//              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
//            },
//            isAccessibleForFree: 'true',
//            sameAs: `https://www.bgee.org/species/${id}`,
//            creator: [{
//                '@type': 'Person',
//                name: 'The Bgee Team',
//            }],
//        },
//        );
//    });

    const ldJson = [];
    ldJson.push({
        '@context': 'https://schema.org/',
        '@id': 'https://www.bgee.org/#schema-org',
        '@graph': [{
            '@type': 'Organization',
            '@id': 'https://www.bgee.org/about/team',
            name: 'Bgee - Bring Gene Expression Expertise',
            url: 'https://www.bgee.org/',
            description: 'The aim of Bgee is to help biologists to use and understand gene expression',
            logo: 'https://www.bgee.org/img/logo/bgee13_hp_logo.png',
            sameAs: [
                'https://twitter.com/Bgeedb',
                'https://genomic.social/@bgeedb',
                'https://bgeedb.wordpress.com/',
            ],
            parentOrganization: [{
                '@type': 'Organization',
                '@id': 'https://www.sib.swiss',
                name: 'SIB Swiss Institute of Bioinformatics',
                url: 'https://www.sib.swiss',
                sameAs: [
                  'https://ror.org/002n09z45',
                  'https://en.wikipedia.org/wiki/Swiss_Institute_of_Bioinformatics',
                ],
              }, {
                '@type': 'CollegeOrUniversity',
                '@id': 'https://www.unil.ch',
                name: 'UNIL University of Lausanne',
                url: 'https://www.unil.ch',
                sameAs: [
                  'https://ror.org/019whta54',
                  'https://en.wikipedia.org/wiki/University_of_Lausanne',
                ],
              }, {
                '@type': 'EducationalOrganization',
                '@id': 'https://www.unil.ch/dee/robinson-rechavi-group',
                name: 'Evolutionary Bioinformatics group',
                url: 'https://www.unil.ch/dee/robinson-rechavi-group',
            }],
        }, {
            '@type': 'Dataset',
            '@id': window.location.href,
            'http://purl.org/dc/terms/conformsTo': {
                '@id': 'https://bioschemas.org/profiles/Dataset/1.0-RELEASE',
                '@type': 'CreativeWork',
            },
            url: window.location.href,
            name: 'Bgee gene expression data',
            description: 'Bgee is a database for retrieval and comparison of gene expression patterns across multiple animal species. It provides an intuitive answer to the question -where is a gene expressed?- and supports research in cancer and agriculture, as well as evolutionary biology.',
            keywords: ['bgee', 'gene expression', 'evolution', 'ontology', 'anatomy', 'development', 'evo-devo database', 'anatomical ontology', 'developmental ontology', 'gene expression evolution'],
            creator: {
                '@id': 'https://www.bgee.org/',
                '@type': 'Organization',
                url: 'https://www.bgee.org/',
                name: 'The Bgee Team',
            },
            citation: {
                '@type': 'CreativeWork',
                name: 'The Bgee suite: integrated curated expression atlas and comparative transcriptomics in animals',
                headline: 'The Bgee suite: integrated curated expression atlas and comparative transcriptomics in animals',
                author: [
                    {'@type': 'Person', givenName: 'Frederic',  familyName: 'Bastian',          identifier: 'https://orcid.org/0000-0002-9415-5104'},
                    {'@type': 'Person', givenName: 'Julien',    familyName: 'Roux',             identifier: 'https://orcid.org/0000-0002-4192-5099'},
                    {'@type': 'Person', givenName: 'Anne',      familyName: 'Niknejad',         identifier: 'https://orcid.org/0000-0003-3308-6245'},
                    {'@type': 'Person', givenName: 'Aurelie',   familyName: 'Comte'},
                    {'@type': 'Person', givenName: 'Sara',      familyName: 'Fonseca Costa',    identifier: 'https://orcid.org/0000-0001-7794-7997'},
                    {'@type': 'Person', givenName: 'Tarcisio',  familyName: 'Mendes de Farias', identifier: 'https://orcid.org/0000-0002-3175-5372'},
                    {'@type': 'Person', givenName: 'Sebastien', familyName: 'Moretti',          identifier: 'https://orcid.org/0000-0003-3947-488X'},
                    {'@type': 'Person', givenName: 'Gilles',    familyName: 'Parmentier'},
                    {'@type': 'Person', givenName: 'Valentine', familyName: 'Rech de Laval',    identifier: 'https://orcid.org/0000-0002-3020-1490'},
                    {'@type': 'Person', givenName: 'Marta',     familyName: 'Rosikiewicz'},
                    {'@type': 'Person', givenName: 'Julien',    familyName: 'Wollbrett',        identifier: 'https://orcid.org/0000-0002-3099-3117'},
                    {'@type': 'Person', givenName: 'Amina',     familyName: 'Echchiki'},
                    {'@type': 'Person', givenName: 'Angelique', familyName: 'Escoriza'},
                    {'@type': 'Person', givenName: 'Walid',     familyName: 'Gharib',           identifier: 'https://orcid.org/0000-0003-4831-8408'},
                    {'@type': 'Person', givenName: 'Mar',       familyName: 'Gonzalez-Porta',   identifier: 'https://orcid.org/0000-0002-1661-7254'},
                    {'@type': 'Person', givenName: 'Yohan',     familyName: 'Jarosz'},
                    {'@type': 'Person', givenName: 'Balazs',    familyName: 'Laurenczy'},
                    {'@type': 'Person', givenName: 'Philippe',  familyName: 'Moret',            identifier: 'https://orcid.org/0000-0002-3810-2091'},
                    {'@type': 'Person', givenName: 'Emilie',    familyName: 'Person'},
                    {'@type': 'Person', givenName: 'Patrick',   familyName: 'Roelli'},
                    {'@type': 'Person', givenName: 'Komal',     familyName: 'Sanjeev'},
                    {'@type': 'Person', givenName: 'Mathieu',   familyName: 'Seppey',           identifier: 'https://orcid.org/0000-0003-3248-011X'},
                    {'@type': 'Person', givenName: 'Marc',      familyName: 'Robinson-Rechavi', identifier: 'https://orcid.org/0000-0002-3437-3329'},
                ],
                identifier: 'http://dx.doi.org/10.1093/nar/gkaa793',
                sameas: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7778977/',
            },
            license: {
                '@type': 'CreativeWork',
                name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
                url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
            isAccessibleForFree: 'true',
            version: config.version,
        },
        ],
    });

    return ldJson[0];
};

const speciesToLdJSON = ({
  downloadFilesGroups: { downloadFiles },
  species: { genus, name, speciesName, id },
}) => {
  const json = {
    '@context': 'https://schema.org/',
    '@id': window.location.href,
    '@type': 'Taxon',
    'http://purl.org/dc/terms/conformsTo': {
      '@id': 'https://bioschemas.org/profiles/Taxon/1.0-RELEASE',
      '@type': 'CreativeWork',
    },
    name: `${genus} ${speciesName}`,
    identifier: id,
    sameAs: [
      obolibraryNCBITaxonLinkFromID(id),
      `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
      `https://nov2020.archive.ensembl.org/${genus}_${speciesName}`,
    ],
    taxonRank: [
        'http://rs.tdwg.org/ontology/voc/TaxonRank#Species',
        'http://purl.uniprot.org/core/Species',
        'http://purl.obolibrary.org/obo/NCBITaxon_species',
        'http://www.wikidata.org/entity/Q7432',
        'species',
    ],
    subjectOf: [
      {
        '@type': 'Dataset',
        dateModified: config.bioSchemaModifiedData,
        citation: 'https://doi.org/10.1093/nar/gkaa793',
        description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} calls of presence/absence of expression. Each call corresponds to a unique combination of a gene, an anatomical entity, a life stage, a sex, and a strain, with reported presence or absence of expression.`,
        includedInDataCatalog: {
          '@id': config.genericDomain,
          '@type': 'DataCatalog',
          name: 'Bgee',
        },
        keywords: ['gene expression', 'call', `${genus} ${speciesName}`, name],
        creator: {
          '@type': 'Organization',
          url: 'https://www.bgee.org/',
          name: 'The Bgee Team',
        },
        license: {
          '@type': 'CreativeWork',
          name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
          url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        isAccessibleForFree: 'true',
        name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} gene expression calls`,
        url: `${window.location.href}#expr-calls`,
        version: config.version,
        hasPart: [
          {
            '@type': 'Dataset',
            dateModified: config.bioSchemaModifiedData,
            creator: {
              '@type': 'Organization',
              url: 'https://www.bgee.org/',
              name: 'The Bgee Team',
            },
            license: {
              '@type': 'CreativeWork',
              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
            isAccessibleForFree: 'true',
            name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} gene expression simple`,
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
              url: 'https://www.bgee.org/',
              name: 'The Bgee Team',
            },
            license: {
              '@type': 'CreativeWork',
              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
            isAccessibleForFree: 'true',
            name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} gene expression advanced`,
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
              url: 'https://www.bgee.org/',
              name: 'The Bgee Team',
            },
            license: {
              '@type': 'CreativeWork',
              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
            isAccessibleForFree: 'true',
            name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} gene expression simple with all conditions`,
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
              url: 'https://www.bgee.org/',
              name: 'The Bgee Team',
            },
            license: {
              '@type': 'CreativeWork',
              name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
              url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            },
            isAccessibleForFree: 'true',
            name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} gene expression advanced with all conditions`,
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
          url: 'https://www.bgee.org/',
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
        license: {
          '@type': 'CreativeWork',
          name: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
          url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        isAccessibleForFree: 'true',
        name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} processed expression values`,
        url: `${window.location.href}#proc-values`,
        version: config.version,
        hasPart: [],
      },
      {
        '@type': 'WebPage',
        url: `${window.location.href}`,
        name: `Species: ${genus} ${speciesName}${ name ? ` (${name})` : ''}`,
      },
    ],
  };

  let file = downloadFiles.find((d) => d.category === 'affy_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Affymetrix experiments chips`,
      keywords: ['Affymetrix'],
      description: 'Affymetrix experiments/chips annotations and metadata.',
      url: `${window.location.href}#proc-values-affymetrix`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'affy_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Affymetrix probesets`,
      description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Affymetrix probesets, data (signal intensities).`,
      url: `${window.location.href}#proc-values-affymetrix`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'rnaseq_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} RNA-Seq experiment libraries`,
      keywords: ['RNA-Seq'],
      description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} RNA-Seq experiments/libraries annotations and metadata.`,
      url: `${window.location.href}#proc-values-rna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'rnaseq_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} RNA-Seq read counts, TPM and FPKM`,
      description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} RNA-Seq read counts, TPM (Transcript Per Million) and FPKM (Fragments Per Kilobase of transcript per Million mapped reads).`,
      keywords: ['RNA-Seq'],
      url: `${window.location.href}#proc-values-rna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'full_length_annot');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Single cell RNA-Seq experiment libraries`,
      description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Single cell RNA-Seq experiments/ libraries annotations and metadata.`,
      keywords: ['scRNA-Seq', 'Single cell RNA-Seq'],
      url: `${window.location.href}#proc-values-scrna-seq`,
    });
  }
  file = downloadFiles.find((d) => d.category === 'full_length_data');
  if (file) {
    json.subjectOf[1].hasPart.push({
      ...fileDownloadProps(file),
      name: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Single Cell RNA-Seq read counts, TPM and FPKM`,
      description: `${genus} ${speciesName}${ name ? ` (${name})` : ''} Single Cell RNA-Seq read counts, TPM (Transcript Per Million) and FPKM (Fragments Per Kilobase of transcript per Million mapped reads).`,
      keywords: ['scRNA-Seq', 'Single cell RNA-Seq'],
      url: `${window.location.href}#proc-values-scrna-seq`,
    });
  }

  return json;
};

const schemaDotOrg = {
  setHomeDatasetLdJSON: (species) => {
    /* add ld+json @ bottom of body */
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dataset-ld+json';
    script.text = JSON.stringify(datasetToLdJSON(species), null, 4);
    const body = document.querySelector('body');
    body.appendChild(script);
  },
  unsetHomeDatasetLdJSON: () => {
    /* remove ld+json @ bottom of body */
    document.getElementById('dataset-ld+json')?.remove();
  },
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
