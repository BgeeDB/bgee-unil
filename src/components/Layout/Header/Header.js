import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../../../assets';
import PATHS from '../../../routes/paths';
import Bulma from '../../Bulma';
import config from '../../../config.json';
import obfuscateMailLink from '../../../helpers/obfuscateMailLink';
import ROUTES from '../../../routes/routes';

const NAVBAR_LEFT = [
  {
    key: 'menu.analysis',
    title: 'Analysis',
    children: [
      {
        key: 'page.analysis.top-anat',
        title: ROUTES[PATHS.ANALYSIS.TOP_ANAT].title,
        type: 'internal',
        path: PATHS.ANALYSIS.TOP_ANAT,
      },
      {
        key: 'page.analysis.expression-comparison',
        title: ROUTES[PATHS.ANALYSIS.EXPRESSION_COMPARISON].title,
        type: 'internal',
        path: PATHS.ANALYSIS.EXPRESSION_COMPARISON,
      },
    ],
  },
  {
    key: 'menu.search',
    title: 'Search',
    children: [
      {
        key: 'page.search.gene-search',
        title: ROUTES[PATHS.SEARCH.GENE].title,
        type: 'internal',
        path: PATHS.SEARCH.GENE,
      },
      {
        key: 'page.search.anatomical-homology-search',
        title: ROUTES[PATHS.SEARCH.ANATOMICAL_HOMOLOGY].title,
        type: 'internal',
        path: PATHS.SEARCH.ANATOMICAL_HOMOLOGY,
      },
      {
        key: 'page.resources.sparql',
        title: 'SPARQL endpoint',
        path: 'https://bgee.org/sparql/',
        type: 'external',
      },
      {
        key: 'page.search.species',
        title: ROUTES[PATHS.SEARCH.SPECIES].title,
        type: 'internal',
        path: PATHS.SEARCH.SPECIES,
      },
    ],
  },
  {
    key: 'menu.download',
    title: 'Download',
    children: [
      {
        key: 'page.download.gene-expression-calls',
        title: ROUTES[PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS].title,
        type: 'internal',
        path: PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS,
      },
      {
        key: 'page.download.processed-expression-values',
        title: ROUTES[PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES].title,
        type: 'internal',
        path: PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES,
      },
      {
        key: 'page.download.data-dumps',
        title: ROUTES[PATHS.DOWNLOAD.DATA_DUMPS].title,
        type: 'internal',
        path: PATHS.DOWNLOAD.DATA_DUMPS,
      },
    ],
  },
  {
    key: 'menu.resources',
    title: 'Resources',
    children: [
      {
        key: 'page.resources.r-packages',
        title: ROUTES[PATHS.RESOURCES.R_PACKAGES].title,
        type: 'internal',
        path: PATHS.RESOURCES.R_PACKAGES,
      },
      {
        key: 'page.resources.sparql',
        title: ROUTES[PATHS.RESOURCES.SPARQL].title,
        type: 'internal',
        path: PATHS.RESOURCES.SPARQL,
      },
      {
        key: 'page.resources.annotations',
        title: ROUTES[PATHS.RESOURCES.ANNOTATIONS].title,
        type: 'internal',
        path: PATHS.RESOURCES.ANNOTATIONS,
      },
      {
        key: 'page.resources.ontologies',
        title: ROUTES[PATHS.RESOURCES.ONTOLOGIES].title,
        type: 'internal',
        path: PATHS.RESOURCES.ONTOLOGIES,
      },
      {
        key: 'page.resources.source-code',
        title: ROUTES[PATHS.RESOURCES.SOURCE_CODE].title,
        type: 'internal',
        path: PATHS.RESOURCES.SOURCE_CODE,
      },
    ],
  },
  {
    key: 'menu.support',
    title: 'Support',
    children: [
      {
        key: 'page.support.gtex',
        title: ROUTES[PATHS.SUPPORT.GTEX].title,
        type: 'internal',
        path: PATHS.SUPPORT.GTEX,
      },
      {
        key: 'page.support.top-anat',
        title: ROUTES[PATHS.SUPPORT.TOP_ANAT].title,
        type: 'internal',
        path: PATHS.SUPPORT.TOP_ANAT,
      },
      {
        key: 'page.support.gene-expression-calls',
        title: ROUTES[PATHS.SUPPORT.GENE_EXPRESSION_CALLS].title,
        type: 'internal',
        path: PATHS.SUPPORT.GENE_EXPRESSION_CALLS,
      },
      {
        key: 'page.support.faq',
        title: ROUTES[PATHS.SUPPORT.FAQ].title,
        type: 'internal',
        path: PATHS.SUPPORT.FAQ,
      },
      {
        key: 'page.support.contact-us',
        title: 'Contact us',
        type: 'mail',
        mail: config.contactEmail,
      },
    ],
  },
  {
    key: 'menu.about',
    title: 'About',
    children: [
      {
        key: 'page.about.about',
        title: ROUTES[PATHS.ABOUT.ABOUT].title,
        type: 'internal',
        path: PATHS.ABOUT.ABOUT,
      },
      {
        key: 'page.about.news',
        title: ROUTES[PATHS.ABOUT.NEWS].title,
        type: 'internal',
        path: PATHS.ABOUT.NEWS,
      },
      {
        key: 'page.about.collaborations',
        title: ROUTES[PATHS.ABOUT.COLLABORATIONS].title,
        type: 'internal',
        path: PATHS.ABOUT.COLLABORATIONS,
      },
      {
        key: 'page.about.publications',
        title: ROUTES[PATHS.ABOUT.PUBLICATION].title,
        type: 'internal',
        path: PATHS.ABOUT.PUBLICATION,
      },
      {
        key: 'page.about.sources',
        title: ROUTES[PATHS.ABOUT.SOURCES].title,
        type: 'internal',
        path: PATHS.ABOUT.SOURCES,
      },
      {
        key: 'page.about.blog',
        title: 'Bgee blog',
        type: 'external',
        path: 'https://bgeedb.wordpress.com/',
      },
      {
        key: 'page.about.privacy-policy',
        title: ROUTES[PATHS.ABOUT.PRIVACY_POLICY].title,
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
          {NAVBAR_LEFT.map(({ key, children, title }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              key={key}
              className={`navbar-item has-dropdown ${
                key === openedMenuId ? 'is-open' : ''
              }`}
              onClick={toggleOpenMenu(key)}
            >
              <a className="navbar-link">{title}</a>

              <div
                className={`navbar-dropdown ${
                  key === openedMenuId ? 'open' : ''
                }`}
              >
                {children.map(
                  ({
                    key: keyChild,
                    type,
                    title: pageTitle,
                    ...childProps
                  }) => {
                    switch (type) {
                      case 'mail':
                        return (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                          <a
                            key={keyChild}
                            className="navbar-item custom"
                            onClick={obfuscateMailLink(childProps.email)}
                          >
                            {pageTitle}
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
                            {pageTitle}
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
                            {pageTitle}
                          </Link>
                        );
                    }
                  }
                )}
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
