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
import AboutSourceFile from '../static/about/sources';
import PrivacyPolicyFile from '../static/about/privacyPolicy';

import Error from '../pages/Error';
import DataDumps from '../pages/download/DataDumps';

const ANALYSIS = {
  [PATHS.ANALYSIS.TOP_ANAT]: {
    i18nKey: 'page.analysis.top-anat',
    component: TopAnatAnalysis,
  },
  [PATHS.ANALYSIS.EXPRESSION_COMPARISON]: {
    i18nKey: 'page.analysis.expression-comparison',
    component: ExpComp,
  },
};
const SEARCH = {
  [PATHS.SEARCH.GENE]: {
    i18nKey: 'page.search.gene-search',
    component: GeneList,
  },
  [PATHS.SEARCH.GENE_ITEM]: {
    // i18nKey: 'page.search.gene-search',
    component: Gene,
  },
  [PATHS.SEARCH.ANATOMICAL_HOMOLOGY]: {
    i18nKey: 'page.search.anatomical-homology-search',
    component: AnatomicalHomologySearch,
  },
  [PATHS.SEARCH.SPECIES]: {
    i18nKey: 'page.search.species',
    component: SpeciesList,
  },
  [PATHS.SEARCH.SPECIES_ITEM]: {
    i18nKey: 'page.search.species-item',
    component: Species,
  },
};
const DOWNLOAD = {
  [PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS]: {
    i18nKey: 'page.download.gene-expression-calls',
    component: GeneExpressionCallsDownload,
  },
  [PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES]: {
    i18nKey: 'page.download.processed-expression-values',
    component: ProcessedExpressionValues,
  },
  [PATHS.DOWNLOAD.DATA_DUMPS]: {
    i18nKey: 'page.download.data-dumps',
    component: DataDumps,
  },
};
const RESOURCES = {
  [PATHS.RESOURCES.DOCS]: {
    i18nKey: 'page.resources.docs',
    source: ResourcesFile,
  },
  [PATHS.RESOURCES.R_PACKAGES]: {
    i18nKey: 'page.resources.r-packages',
    source: RPackageFile,
    meta: {
      title: 'R packages and containers available',
      description:
        'Access R packages allowing to retrieve Bgee data, or to perform Bgee analyses on your own data.',
      keywords: 'R package, Bioconductor, BgeeDB, BgeeCall, Docker container',
    },
  },
  [PATHS.RESOURCES.SPARQL]: {
    i18nKey: 'page.resources.sparql',
    source: SparqlFile,
    meta: {
      title: 'SPARQL endpoint documentation',
      description:
        'Documentation about how to access the Bgee SPARQL endpoint to retrieve present/absent calls of expression',
      keywords: 'SPARQL, SPARQL endpoint, GenEx, OWL, OWL2, RDF, ontology',
    },
  },
  [PATHS.RESOURCES.ANNOTATIONS]: {
    i18nKey: 'page.resources.annotations',
    source: AnnotationsFile,
    meta: {
      title: 'Annotation resources',
      description:
        'Access annotations of expression data and of anatomical similarities produced by Bgee.',
      keywords:
        'Anatomical similarity annotations, RNA-Seq annotations, Affymetrix annotations, EST annotations, GTEx annotations, scRNA-Seq annotations',
    },
  },
  [PATHS.RESOURCES.ONTOLOGIES]: {
    i18nKey: 'page.resources.ontologies',
    source: OntologiesFile,
    meta: {
      title: 'Ontology resources',
      description:
        'Access ontologies used or developed as part of the Bgee project.',
      keywords:
        'Developmental and life stage ontologies, Confidence Information Ontology, CIO ontology, Homology Ontology, HOM ontology, Uberon ontology, NCBITaxon ontology, NCBI taxonomy ontology',
    },
  },
  [PATHS.RESOURCES.SOURCE_CODE]: {
    i18nKey: 'page.resources.source-code',
    source: ResourceSourceFile,
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
    i18nKey: 'page.support.gtex',
    source: GtexFile,
    meta: {
      title: 'Datasets of interest',
      description:
        'Retrieve information about the datasets of special interest present in Bgee and how we integrated them.',
      keywords: 'Dataset, gene expression dataset, GTEx, annotation',
    },
  },
  [PATHS.SUPPORT.TOP_ANAT]: {
    i18nKey: 'page.support.top-anat',
    source: TopAnatFile,
    meta: {
      title: 'TopAnat documentation',
      description:
        'Documentation to use TopAnat, performing gene set expression enrichment analyses.',
      keywords:
        'TopAnat, gene set enrichment analysis, gene expression enrichment analysis, GO-like enrichment analysis, gene expression patterns, topGO, BgeeDB',
    },
  },
  [PATHS.SUPPORT.GENE_EXPRESSION_CALLS]: {
    i18nKey: 'page.support.gene-expression-calls',
    source: GeneExpressionFile,
  },
  [PATHS.SUPPORT.FAQ]: {
    i18nKey: 'page.support.faq',
    source: FaqFile,
    meta: {
      title: 'FAQ',
      description: 'Answers to Frequently Asked Questions',
      keywords: 'FAQ, Frequently Asked Questions',
    },
  },
};
const ABOUT = {
  [PATHS.ABOUT.ABOUT]: {
    i18nKey: 'page.about.about',
    source: AboutFile,
    meta: {
      title: 'About Bgee',
      description: 'General information about Bgee and the team developing it.',
      keywords: 'About, license, CC0',
    },
  },
  [PATHS.ABOUT.COLLABORATIONS]: {
    i18nKey: 'page.about.collaborations',
    source: CollaborationsFile,
    meta: {
      title: 'Bgee collaborations',
      description:
        'Examples of collaboration with groups making use of Bgee data.',
      keywords: 'Collaborations, Bio-SODA, INODE, OMA, OncoMX',
    },
  },
  [PATHS.ABOUT.PUBLICATION]: {
    i18nKey: 'page.about.publications',
    source: PublicationsFile,
    meta: {
      title: 'Bgee publications',
      description:
        'List of publications about Bgee and related tools to use to cite us.',
      keywords: 'cite us, how to cite us, publications',
    },
  },
  [PATHS.ABOUT.SOURCES]: {
    i18nKey: 'page.about.sources',
    source: AboutSourceFile,
    meta: {
      title: 'Data sources',
      description:
        'List of the sources and the versions used to build the Bgee database.',
      keywords: 'data sources, data source versions',
    },
  },
  [PATHS.ABOUT.PRIVACY_POLICY]: {
    i18nKey: 'page.about.privacy-policy',
    source: PrivacyPolicyFile,
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
    i18nKey: 'page.home',
    component: Home,
  },
  ...ANALYSIS,
  ...SEARCH,
  ...DOWNLOAD,
  ...RESOURCES,
  ...SUPPORT,
  ...ABOUT,
  [PATHS.ERROR]: {
    i18nKey: 'page.error',
    component: Error,
  },
};

export default ROUTES;
