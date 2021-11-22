import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../../../assets';
import PATHS from '../../../routes/paths';
import i18n from '../../../i18n';
import Bulma from '../../Bulma';
import config from '../../../config.json';
import obfuscateMailLink from '../../../helpers/obfuscateMailLink';

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
        key: 'page.resources.sparql',
        path: 'https://bgee.org/sparql/',
        type: 'external',
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
        path: PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS,
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
        mail: config.contactEmail,
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
    className: 'no-responsive',
  },
  {
    href: 'https://twitter.com/Bgeedb',
    src: assets.twitterLogo,
    alt: 'Twitter Bgee',
    height: '20',
    width: '20',
    className: 'no-responsive',
  },
  {
    href: 'https://www.unil.ch/central/en/home.html',
    src: assets.unilLogo,
    alt: 'Unil',
    height: '35',
    width: '100',
    className: 'no-responsive',
  },
  {
    href: 'https://www.sib.swiss/',
    src: assets.sibLogo,
    alt: 'Sib',
    height: '35',
    width: '46',
    className: 'no-responsive',
  },
];

const Styles = {
  logo: { width: '6%' },
};

const Header = () => {
  const [openedMenuId, setOpenMenuId] = React.useState(undefined);
  const toggleOpenMenu = React.useCallback(
    (key) => (e) => {
      setOpenMenuId(openedMenuId === key ? undefined : key);
      e.nativeEvent.stopImmediatePropagation();
    },
    [openedMenuId]
  );

  const [hamburgerActive, setHamburgerActive] = React.useState(false);
  React.useEffect(() => {
    const closeMenu = () => {
      setOpenMenuId(false);
    };
    document.getElementById('root').addEventListener('click', closeMenu);
    return () => {
      document.getElementById('root').removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <nav
      className="navbar is-bgee-inverted"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand" style={Styles.logo}>
        <Link className="navbar-item" to={PATHS.HOME}>
          <Bulma.Image alt="Bgee logo" className="logo" src={assets.bgeeLogo} />
        </Link>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setHamburgerActive(!hamburgerActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div className={`navbar-menu ${hamburgerActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {NAVBAR_LEFT.map(({ key, children }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              key={key}
              className={`navbar-item has-dropdown ${
                key === openedMenuId ? 'is-open' : ''
              }`}
              onClick={toggleOpenMenu(key)}
            >
              <a className="navbar-link">{i18n.t(key)}</a>

              <div
                className={`navbar-dropdown ${
                  key === openedMenuId ? 'open' : ''
                }`}
              >
                {children.map(({ key: keyChild, type, ...childProps }) => {
                  switch (type) {
                    case 'mail':
                      return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                        <a
                          key={keyChild}
                          className="navbar-item custom"
                          onClick={obfuscateMailLink(childProps.email)}
                        >
                          {i18n.t(keyChild)}
                        </a>
                      );
                    case 'external':
                      return (
                        <a
                          key={keyChild}
                          className="navbar-item custom"
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
                          className="navbar-item custom"
                          onClick={(event) => {
                            event.target.blur();
                            setHamburgerActive(false);
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
            <a
              key={href}
              className="navbar-item"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bulma.Image alt={alt} {...imgProps} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
