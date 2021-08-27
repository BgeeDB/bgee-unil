import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../../../assets';
import PATHS from '../../../routes/paths';
import i18n from '../../../i18n';

const NAVBAR_LEFT = [
  {
    key: 'menu.analysis',
    children: [
      {
        key: 'page.analysis.top-anat',
        type: 'internal',
        path: PATHS.ANALYSIS.TOP_ANAT,
      },
      {
        key: 'page.analysis.expression-comparison',
        type: 'internal',
        path: PATHS.ANALYSIS.EXPRESSION_COMPARISON,
      },
    ],
  },
  {
    key: 'menu.search',
    children: [
      {
        key: 'page.search.gene-search',
        type: 'internal',
        path: PATHS.SEARCH.GENE,
      },
      {
        key: 'page.search.anatomical-homology-search',
        type: 'internal',
        path: PATHS.SEARCH.ANATOMICAL_HOMOLOGY,
      },
      {
        key: 'page.search.sparql',
        type: 'internal',
        path: PATHS.SEARCH.SPARQL,
      },
      {
        key: 'page.search.species',
        type: 'internal',
        path: PATHS.SEARCH.SPECIES,
      },
    ],
  },
  {
    key: 'menu.download',
    children: [
      {
        key: 'page.download.gene-expression-calls',
        type: 'internal',
        path: PATHS.DOWNLOAD.GENE_EXPRESSION_VALUES,
      },
      {
        key: 'page.download.processed-expression-values',
        type: 'internal',
        path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
      },
      {
        key: 'page.download.data-dumps',
        type: 'internal',
        path: PATHS.DOWNLOAD.DATA_DUMPS,
      },
    ],
  },
  {
    key: 'menu.resources',
    children: [
      {
        key: 'page.resources.r-packages',
        type: 'internal',
        path: PATHS.RESOURCES.R_PACKAGES,
      },
      {
        key: 'page.resources.sparql',
        type: 'internal',
        path: PATHS.RESOURCES.SPARQL,
      },
      {
        key: 'page.resources.annotations',
        type: 'internal',
        path: PATHS.RESOURCES.ANNOTATIONS,
      },
      {
        key: 'page.resources.ontologies',
        type: 'internal',
        path: PATHS.RESOURCES.ONTOLOGIES,
      },
      {
        key: 'page.resources.source-code',
        type: 'internal',
        path: PATHS.RESOURCES.SOURCE_CODE,
      },
    ],
  },
  {
    key: 'menu.support',
    children: [
      {
        key: 'page.support.gtex',
        type: 'internal',
        path: PATHS.SUPPORT.GTEX,
      },
      {
        key: 'page.support.top-anat',
        type: 'internal',
        path: PATHS.SUPPORT.TOP_ANAT,
      },
      {
        key: 'page.support.gene-expression-calls',
        type: 'internal',
        path: PATHS.SUPPORT.GENE_EXPRESSION_CALLS,
      },
      {
        key: 'page.support.faq',
        type: 'internal',
        path: PATHS.SUPPORT.FAQ,
      },
      {
        key: 'page.support.contact-us',
        type: 'mail',
        mail: 'Bgee@sib.swiss',
      },
    ],
  },
  {
    key: 'menu.about',
    children: [
      {
        key: 'page.about.about',
        type: 'internal',
        path: PATHS.ABOUT.ABOUT,
      },
      {
        key: 'page.about.collaborations',
        type: 'internal',
        path: PATHS.ABOUT.COLLABORATIONS,
      },
      {
        key: 'page.about.publications',
        type: 'internal',
        path: PATHS.ABOUT.PUBLICATION,
      },
      {
        key: 'page.about.sources',
        type: 'internal',
        path: PATHS.ABOUT.SOURCES,
      },
      {
        key: 'page.about.blog',
        type: 'external',
        path: 'https://bgeedb.wordpress.com/',
      },
      {
        key: 'page.about.privacy-policy',
        type: 'internal',
        path: PATHS.ABOUT.PRIVACY_POLICY,
      },
    ],
  },
];
const NAVBAR_RIGHT = [
  {
    href: 'https://bioconductor.org/packages/BgeeDB/',
    src: assets.rLogo,
    alt: 'R',
    height: '20',
    width: '20',
  },
  {
    href: 'https://twitter.com/Bgeedb',
    src: assets.twitterLogo,
    alt: 'Twitter Bgee',
    height: '20',
    width: '20',
  },
  {
    href: 'https://www.unil.ch/central/en/home.html',
    src: assets.unilLogo,
    alt: 'Unil',
    height: '35',
    width: '100',
  },
  {
    href: 'https://www.sib.swiss/',
    src: assets.sibLogo,
    alt: 'Sib',
    height: '35',
    width: '46',
  },
];

const Header = () => (
  <nav
    className="navbar is-bgee-inverted"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img alt="Bgee logo" src={assets.bgeeLogo} width="99" height="40" />
      </a>

      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        {NAVBAR_LEFT.map(({ key, children }) => (
          <div key={key} className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{i18n.t(key)}</a>

            <div className="navbar-dropdown">
              {children.map(({ key: keyChild, type, ...childProps }) => {
                switch (type) {
                  case 'mail':
                    return (
                      <a
                        key={keyChild}
                        className="navbar-item"
                        href={`mailto:${childProps.mail}`}
                      >
                        {i18n.t(keyChild)}
                      </a>
                    );
                  case 'external':
                    return (
                      <a
                        key={keyChild}
                        className="navbar-item"
                        href={childProps.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {i18n.t(keyChild)}
                      </a>
                    );
                  case 'internal':
                  default:
                    return (
                      <Link
                        key={keyChild}
                        to={childProps.path}
                        className="navbar-item"
                        onClick={(event) => {
                          event.target.blur();
                        }}
                      >
                        {i18n.t(keyChild)}
                      </Link>
                    );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="navbar-end">
        {NAVBAR_RIGHT.map(({ href, alt, ...imgProps }) => (
          <a key={href} className="navbar-item" href={href}>
            <img alt={alt} {...imgProps} />
          </a>
        ))}
      </div>
    </div>
  </nav>
);

export default Header;
