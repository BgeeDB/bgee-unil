import React from 'react';
import PATHS from './paths';

import Home from '../pages/Home';

import TopAnatAnalysis from '../pages/analysis/TopAnat';
import ExpComp from '../pages/analysis/ExpComp';

import GeneSearch from '../pages/search/GeneSearch';
import AnatomicalHomologySearch from '../pages/search/AnatomicalHomologySearch';
import SparqlSearch from '../pages/search/SparqlSearch';
import SpeciesList from '../pages/search/SpeciesList';

import DataDumps from '../pages/download/DataDumps';
import ProcessedExpressionValues from '../pages/download/ProcessedExpressionValues';
import GeneExpressionCallsDownload from '../pages/download/GeneExpressionCalls';

import Docs from '../pages/resources/Docs';
import RPackages from '../pages/resources/RPackages';
import Sparql from '../pages/resources/Sparql';
import Annotations from '../pages/resources/Annotations';
import Ontologies from '../pages/resources/Ontologies';
import SourceCode from '../pages/resources/SourceCode';

import GTEx from '../pages/support/GTEx';
import TopAnatSupport from '../pages/support/TopAnat';
import GeneExpressionCallsSupport from '../pages/support/GeneExpressionCalls';
import FAQ from '../pages/support/FAQ';

import About from '../pages/about/About';
import Collaborations from '../pages/about/Collaborations';
import Publications from '../pages/about/Publications';
import Sources from '../pages/about/Sources';
import PrivacyPolicy from '../pages/about/PrivacyPolicy';

import Error from '../pages/Error';

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
    component: GeneSearch,
  },
  [PATHS.SEARCH.ANATOMICAL_HOMOLOGY]: {
    i18nKey: 'page.search.anatomical-homology-search',
    component: AnatomicalHomologySearch,
  },
  [PATHS.SEARCH.SPARQL]: {
    i18nKey: 'page.search.sparql',
    component: SparqlSearch,
  },
  [PATHS.SEARCH.SPECIES]: {
    i18nKey: 'page.search.species',
    component: SpeciesList,
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
    component: Docs,
  },
  [PATHS.RESOURCES.R_PACKAGES]: {
    i18nKey: 'page.resources.r-packages',
    component: RPackages,
  },
  [PATHS.RESOURCES.SPARQL]: {
    i18nKey: 'page.resources.sparql',
    component: Sparql,
  },
  [PATHS.RESOURCES.ANNOTATIONS]: {
    i18nKey: 'page.resources.annotations',
    component: Annotations,
  },
  [PATHS.RESOURCES.ONTOLOGIES]: {
    i18nKey: 'page.resources.ontologies',
    component: Ontologies,
  },
  [PATHS.RESOURCES.SOURCE_CODE]: {
    i18nKey: 'page.resources.source-code',
    component: SourceCode,
  },
};
const SUPPORT = {
  [PATHS.SUPPORT.GTEX]: {
    i18nKey: 'page.support.gtex',
    component: GTEx,
  },
  [PATHS.SUPPORT.TOP_ANAT]: {
    i18nKey: 'page.support.top-anat',
    component: TopAnatSupport,
  },
  [PATHS.SUPPORT.GENE_EXPRESSION_CALLS]: {
    i18nKey: 'page.support.gene-expression-calls',
    component: GeneExpressionCallsSupport,
  },
  [PATHS.SUPPORT.FAQ]: {
    i18nKey: 'page.support.faq',
    component: FAQ,
  },
};
const ABOUT = {
  [PATHS.ABOUT.ABOUT]: {
    i18nKey: 'page.about.about',
    component: About,
  },
  [PATHS.ABOUT.COLLABORATIONS]: {
    i18nKey: 'page.about.collaborations',
    component: Collaborations,
  },
  [PATHS.ABOUT.PUBLICATION]: {
    i18nKey: 'page.about.publications',
    component: Publications,
  },
  [PATHS.ABOUT.SOURCES]: {
    i18nKey: 'page.about.sources',
    component: Sources,
  },
  [PATHS.ABOUT.PRIVACY_POLICY]: {
    i18nKey: 'page.about.privacy-policy',
    component: PrivacyPolicy,
  },
};

const ROUTES = {
  [PATHS.HOME]: {
    i18nKey: 'page.home',
    component: Home,
  },
  ANALYSIS,
  SEARCH,
  DOWNLOAD,
  RESOURCES,
  SUPPORT,
  ABOUT,
  [PATHS.ERROR]: {
    i18nKey: 'page.error',
    component: Error,
  },
};

export default ROUTES;
