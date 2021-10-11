const PATHS = {
  HOME: '/',
  ANALYSIS: {
    TOP_ANAT: '/analysis/top-anat/',
    TOP_ANAT_RESULT: '/analysis/top-anat/:id',
    TOP_ANAT_RESULT_JOB_ID: '/analysis/top-anat/:id/:jobId',
    EXPRESSION_COMPARISON: '/analysis/expr-comparison',
  },
  SEARCH: {
    GENE: '/search/genes',
    GENE_ITEM: '/search/genes/:id',
    ANATOMICAL_HOMOLOGY: '/search/anatomical-homology',
    SPECIES: '/search/species',
    SPECIES_ITEM: '/search/species/:id',
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
    FAQ: '/support/faq',
  },
  ABOUT: {
    ABOUT: '/about/',
    COLLABORATIONS: '/about/collaborations',
    PUBLICATION: '/about/publications',
    SOURCES: '/about/source',
    PRIVACY_POLICY: '/about/privacy-policy',
  },
  ERROR: '/error',
};

export default PATHS;
