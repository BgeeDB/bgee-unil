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

import GtexFile from '../static/support/gtex';
import TopAnatFile from '../static/support/topAnat';
import GeneExpressionCallsSupport from '../pages/support/GeneExpressionCalls';
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
  },
  [PATHS.RESOURCES.SPARQL]: {
    i18nKey: 'page.resources.sparql',
    source: SparqlFile,
  },
  [PATHS.RESOURCES.ANNOTATIONS]: {
    i18nKey: 'page.resources.annotations',
    source: AnnotationsFile,
  },
  [PATHS.RESOURCES.ONTOLOGIES]: {
    i18nKey: 'page.resources.ontologies',
    source: OntologiesFile,
  },
  [PATHS.RESOURCES.SOURCE_CODE]: {
    i18nKey: 'page.resources.source-code',
    source: ResourceSourceFile,
  },
};
const SUPPORT = {
  [PATHS.SUPPORT.GTEX]: {
    i18nKey: 'page.support.gtex',
    source: GtexFile,
  },
  [PATHS.SUPPORT.TOP_ANAT]: {
    i18nKey: 'page.support.top-anat',
    source: TopAnatFile,
  },
  [PATHS.SUPPORT.GENE_EXPRESSION_CALLS]: {
    i18nKey: 'page.support.gene-expression-calls',
    component: GeneExpressionCallsSupport,
  },
  [PATHS.SUPPORT.FAQ]: {
    i18nKey: 'page.support.faq',
    source: FaqFile,
  },
};
const ABOUT = {
  [PATHS.ABOUT.ABOUT]: {
    i18nKey: 'page.about.about',
    source: AboutFile,
  },
  [PATHS.ABOUT.COLLABORATIONS]: {
    i18nKey: 'page.about.collaborations',
    source: CollaborationsFile,
  },
  [PATHS.ABOUT.PUBLICATION]: {
    i18nKey: 'page.about.publications',
    source: PublicationsFile,
  },
  [PATHS.ABOUT.SOURCES]: {
    i18nKey: 'page.about.sources',
    source: AboutSourceFile,
  },
  [PATHS.ABOUT.PRIVACY_POLICY]: {
    i18nKey: 'page.about.privacy-policy',
    source: PrivacyPolicyFile,
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
