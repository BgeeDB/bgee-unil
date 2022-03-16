const PATHS = {
  HOME: '/',
  ANALYSIS: {
    TOP_ANAT: '/analysis/top-anat/',
    TOP_ANAT_RESULT: '/analysis/top-anat/:id',
    TOP_ANAT_RESULT_JOB_ID: '/analysis/top-anat/:id/:jobId',
    EXPRESSION_COMPARISON: '/analysis/expr-comparison',
    EXPRESSION_COMPARISON_RESULT: '/analysis/expr-comparison/:hash',
  },
  SEARCH: {
    GENE: '/search/genes',
    GENE_ITEM: '/gene/:geneId',
    GENE_ITEM_BY_SPECIES: '/gene/:geneId/:speciesId',
    ANATOMICAL_HOMOLOGY: '/search/anatomical-homology',
    SPECIES: '/search/species',
    SPECIES_ITEM: '/species/:id',
  },
  DOWNLOAD: {
    GENE_EXPRESSION_CALLS: '/download/gene-expression-calls',
    PROCESSED_EXPRESSION_VALUES: '/download/processed-expression-values',
    DATA_DUMPS: '/download/data-dumps',
  },
  RESOURCES: {
    DOCS: '/resources/',
    R_PACKAGES: '/resources/r-packages',
    SPARQL: '/resources/sparql',
    ANNOTATIONS: '/resources/annotations',
    ONTOLOGIES: '/resources/ontologies',
    SOURCE_CODE: '/resources/source-code',
  },
  SUPPORT: {
    GTEX: '/support/data-sets',
    TOP_ANAT: '/support/top-anat',
    GENE_EXPRESSION_CALLS: '/support/gene-expression-calls',
    PROCESSED_EXPRESSION_VALUES: '/support/processed-expression-values',
    RNASEQ_PROCESSED_EXPRESSION_VALUES: '/support/rnaseq-processed-expression-values',
    SCRNASEQ_FULLLENGTH_PROCESSED_EXPRESSION_VALUES: '/support/singlecell-rnaseq-fulllength-processed-expression-values',
    AFFYMETRIX_PROCESSED_EXPRESSION_VALUES: '/support/affymetrix-processed-expression-values',
    FAQ: '/support/faq',
  },
  ABOUT: {
    ABOUT: '/about/',
    NEWS: '/about/news',
    COLLABORATIONS: '/about/collaborations',
    PUBLICATION: '/about/publications',
    SOURCES: '/about/sources',
    PRIVACY_POLICY: '/about/privacy-policy',
  },
  ERROR: '/error',
};

export default PATHS;
