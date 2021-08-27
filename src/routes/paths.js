const PATHS = {
  HOME: '/',
  ANALYSIS: {
    TOP_ANAT: '/analysis/top-anat',
    EXPRESSION_COMPARISON: '/analysis/expr-comparison',
  },
  SEARCH: {
    GENE: '/search/gene',
    ANATOMICAL_HOMOLOGY: '/search/anat-similarities',
    SPARQL: '/search/sparql',
    SPECIES: '/search/species',
  },
  DOWNLOAD: {
    GENE_EXPRESSION_VALUES: '/download/expr-calls',
    PROCESSED_EXPRESSION_VALUES: '/download/proc-values',
    DATA_DUMPS: '/download/dumps',
  },
  RESOURCES: {
    R_PACKAGES: '/resources/r-packages',
    SPARQL: '/resources/sparql',
    ANNOTATIONS: '/resources/annotations',
    ONTOLOGIES: '/resources/ontologies',
    SOURCE_CODE: '/resources/source-code',
  },
  SUPPORT: {
    GTEX: '/support/data-sets',
    TOP_ANAT: '/support/top-anat',
    GENE_EXPRESSION_CALLS: '/support/call-files',
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
