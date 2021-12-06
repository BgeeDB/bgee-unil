import PATHS from './paths';

import Home from '../pages/Home';

import TopAnatAnalysis from '../pages/analysis/TopAnat';
import ExpComp from '../pages/analysis/ExpComp';

import GeneList from '../pages/search/GeneList';
import Gene from '../pages/search/Gene';
import AnatomicalHomologySearch from '../pages/search/AnatomicalHomologySearch';
import SpeciesList from '../pages/search/SpeciesList';
import Species from '../pages/search/Species';

import ProcessedExpressionValues from '../pages/download/ProcessedExpressionValues';
import GeneExpressionCallsDownload from '../pages/download/GeneExpressionCalls';

import ResourcesFile from '../static/resources/docs';
import RPackageFile from '../static/resources/rPackage';
import SparqlFile from '../static/resources/sparql';
import AnnotationsFile from '../static/resources/annotations';
import OntologiesFile from '../static/resources/ontologies';
import ResourceSourceFile from '../static/resources/source';

import GtexFile from '../markdown/support/gtex.md';
import TopAnatFile from '../markdown/support/topAnat.md';
import GeneExpressionFile from '../markdown/support/geneExpression.md';
import FaqFile from '../static/support/faq';

import AboutFile from '../static/about/about';
import CollaborationsFile from '../static/about/collaborations';
import PublicationsFile from '../static/about/publications';
import PrivacyPolicyFile from '../static/about/privacyPolicy';

import Error from '../pages/Error';
import DataDumps from '../pages/download/DataDumps';
import NewsPage from '../pages/about/NewsPage';
import DataSource from '../pages/about/DataSource';

const ANALYSIS = {
  [PATHS.ANALYSIS.TOP_ANAT]: {
    title: 'TopAnat: Expression enrichment analysis',
    component: TopAnatAnalysis,
  },
  [PATHS.ANALYSIS.EXPRESSION_COMPARISON]: {
    title: 'Expression comparison',
    component: ExpComp,
  },
};
const SEARCH = {
  [PATHS.SEARCH.GENE]: {
    title: 'Gene search',
    component: GeneList,
  },
  [PATHS.SEARCH.GENE_ITEM]: {
    component: Gene,
    title: 'Gene',
  },
  [PATHS.SEARCH.ANATOMICAL_HOMOLOGY]: {
    component: AnatomicalHomologySearch,
    title: 'Anatomical homology search',
  },
  [PATHS.SEARCH.SPECIES]: {
    component: SpeciesList,
    title: 'Species list',
  },
  [PATHS.SEARCH.SPECIES_ITEM]: {
    component: Species,
    title: 'Species',
  },
};
const DOWNLOAD = {
  [PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS]: {
    component: GeneExpressionCallsDownload,
    title: 'Gene expression calls',
  },
  [PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES]: {
    component: ProcessedExpressionValues,
    title: 'Processed expression values',
  },
  [PATHS.DOWNLOAD.DATA_DUMPS]: {
    component: DataDumps,
    title: 'Data dumps',
  },
};
const RESOURCES = {
  [PATHS.RESOURCES.DOCS]: {
    source: ResourcesFile,
    title: 'Bgee documentation',
  },
  [PATHS.RESOURCES.R_PACKAGES]: {
    source: RPackageFile,
    title: 'R packages',
    meta: {
      title: 'R packages and containers available',
      description:
        'Access R packages allowing to retrieve Bgee data, or to perform Bgee analyses on your own data.',
      keywords: 'R package, Bioconductor, BgeeDB, BgeeCall, Docker container',
    },
  },
  [PATHS.RESOURCES.SPARQL]: {
    source: SparqlFile,
    title: 'SPARQL endpoint',
    meta: {
      title: 'SPARQL endpoint documentation',
      description:
        'Documentation about how to access the Bgee SPARQL endpoint to retrieve present/absent calls of expression',
      keywords: 'SPARQL, SPARQL endpoint, GenEx, OWL, OWL2, RDF, ontology',
    },
  },
  [PATHS.RESOURCES.ANNOTATIONS]: {
    source: AnnotationsFile,
    title: 'Annotations',
    meta: {
      title: 'Annotation resources',
      description:
        'Access annotations of expression data and of anatomical similarities produced by Bgee.',
      keywords:
        'Anatomical similarity annotations, RNA-Seq annotations, Affymetrix annotations, EST annotations, GTEx annotations, scRNA-Seq annotations',
    },
  },
  [PATHS.RESOURCES.ONTOLOGIES]: {
    source: OntologiesFile,
    title: 'Ontologies',
    meta: {
      title: 'Ontology resources',
      description:
        'Access ontologies used or developed as part of the Bgee project.',
      keywords:
        'Developmental and life stage ontologies, Confidence Information Ontology, CIO ontology, Homology Ontology, HOM ontology, Uberon ontology, NCBITaxon ontology, NCBI taxonomy ontology',
    },
  },
  [PATHS.RESOURCES.SOURCE_CODE]: {
    source: ResourceSourceFile,
    title: 'Source code',
    meta: {
      title: 'Source code information',
      description: 'Access the source code of the resources developed by Bgee.',
      keywords:
        'Source code, Bgee pipeline, bgee_pipeline, bgee_apps, BgeeDB, BgeeDB R package, BgeeCall, BgeeCall R package, IQRray',
    },
  },
};
const SUPPORT = {
  [PATHS.SUPPORT.GTEX]: {
    source: GtexFile,
    title: 'GTEx in Bgee',
    meta: {
      title: 'Datasets of interest',
      description:
        'Retrieve information about the datasets of special interest present in Bgee and how we integrated them.',
      keywords: 'Dataset, gene expression dataset, GTEx, annotation',
    },
  },
  [PATHS.SUPPORT.TOP_ANAT]: {
    source: TopAnatFile,
    title: 'TopAnat: Expression enrichment analysis',
    meta: {
      title: 'TopAnat documentation',
      description:
        'Documentation to use TopAnat, performing gene set expression enrichment analyses.',
      keywords:
        'TopAnat, gene set enrichment analysis, gene expression enrichment analysis, GO-like enrichment analysis, gene expression patterns, topGO, BgeeDB',
    },
  },
  [PATHS.SUPPORT.GENE_EXPRESSION_CALLS]: {
    source: GeneExpressionFile,
    title: 'Gene expression calls',
  },
  [PATHS.SUPPORT.FAQ]: {
    source: FaqFile,
    title: 'FAQ',
    meta: {
      title: 'FAQ',
      description: 'Answers to Frequently Asked Questions',
      keywords: 'FAQ, Frequently Asked Questions',
    },
  },
};
const ABOUT = {
  [PATHS.ABOUT.ABOUT]: {
    source: AboutFile,
    title: 'About Bgee',
    meta: {
      title: 'About Bgee',
      description: 'General information about Bgee and the team developing it.',
      keywords: 'About, license, CC0',
    },
  },
  [PATHS.ABOUT.NEWS]: {
    component: NewsPage,
    title: 'News',
  },
  [PATHS.ABOUT.COLLABORATIONS]: {
    source: CollaborationsFile,
    title: 'Bgee collaborations',
    meta: {
      title: 'Bgee collaborations',
      description:
        'Examples of collaboration with groups making use of Bgee data.',
      keywords: 'Collaborations, Bio-SODA, INODE, OMA, OncoMX',
    },
  },
  [PATHS.ABOUT.PUBLICATION]: {
    source: PublicationsFile,
    title: 'Bgee publications',
    meta: {
      title: 'Bgee publications',
      description:
        'List of publications about Bgee and related tools to use to cite us.',
      keywords: 'cite us, how to cite us, publications',
    },
  },
  [PATHS.ABOUT.SOURCES]: {
    component: DataSource,
    title: 'Bgee source',
    meta: {
      title: 'Data sources',
      description:
        'List of the sources and the versions used to build the Bgee database.',
      keywords: 'data sources, data source versions',
    },
  },
  [PATHS.ABOUT.PRIVACY_POLICY]: {
    source: PrivacyPolicyFile,
    title: 'Bgee privacy notice',
    meta: {
      title: 'Privacy notice',
      description:
        'Privacy notice describing the use of personal data by Bgee.',
      keywords:
        'privacy notice, privacy policy, personal data, data controller, personal data collection, GDPR',
    },
  },
};

const ROUTES = {
  [PATHS.HOME]: {
    component: Home,
    title: 'Bgee: gene expression data in animals',
  },
  ...ANALYSIS,
  ...SEARCH,
  ...DOWNLOAD,
  ...RESOURCES,
  ...SUPPORT,
  ...ABOUT,
  [PATHS.ERROR]: {
    title: 'Error',
    component: Error,
  },
};

export default ROUTES;
