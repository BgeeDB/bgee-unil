import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Bulma from '../../Bulma';
import config from '../../../config.json';
import copyToClipboard from '../../../helpers/copyToClipboard';
import PATHS from '../../../routes/paths';
import { NotificationContext } from '../../../contexts/NotificationsContext';
import obfuscateMailLink from '../../../helpers/obfuscateMailLink';
import random from '../../../helpers/random';
import imagePath from '../../../helpers/imagePath';
import assets from "../../../assets";

const NAVBAR_RIGHT = [
  {
    href: 'https://genomic.social/@bgeedb',
    src: assets.mastodonLogo,
    alt: 'Mastodon Bgee',
    height: '20',
    width: '19',
    className: 'no-responsive',
  },
  {
    href: 'https://www.linkedin.com/company/bgee/',
    src: assets.linkedinLogo,
    alt: 'LinkedIn Bgee',
    height: '20',
    width: '24',
    className: 'no-responsive',
  },
  // {
  //   href: 'https://www.facebook.com/bgee',
  //   src: assets.facebookLogo,
  //   alt: 'Facebook Bgee',
  //   height: '20',
  //   width: '20',
  //   className: 'no-responsive',
  // },
  // {
  //   href: 'INSTA_bgee',
  //   src: assets.instagramLogo,
  //   alt: 'Instagram Bgee',
  //   height: '20',
  //   width: '20',
  //   className: 'no-responsive',
  // },
];

const Footer = () => {
  const { addNotification } = React.useContext(NotificationContext);
  const loc = useLocation();
  loc.pathname = `${config.archive ? loc.pathname.replace(/[\\/][^\\/]*/, '') : loc.pathname}`;
  const permanentLink = React.useMemo(
    () => config.permanentVersionedDomain + loc.pathname,
    [loc]
  );

  return (
    <Bulma.Footer>
      <nav className="nav-footer" role="presentation">
        <div className="nav-footer-line">
          <div className="nav-footer-col">
            <div className="nav-footer-col-head">Tools</div>
            <ul>
              <li><Link to={PATHS.ANALYSIS.TOP_ANAT} className="nav_a">TopAnat</Link></li>
              <li><Link to={PATHS.ANALYSIS.EXPRESSION_COMPARISON} className="nav_a">Expression comparison</Link></li>
            </ul>
          </div>
          <div className="nav-footer-col-spacer" />
          <div className="nav-footer-col">
            <div className="nav-footer-col-head">Browse</div>
            <ul>
              <li><Link to={PATHS.SEARCH.GENE} className="nav_a">Gene expression</Link></li>
              <li><Link to={PATHS.SEARCH.RAW_DATA_ANNOTATIONS} className="nav_a">Raw data annotations</Link></li>
              <li><Link to={PATHS.SEARCH.SPECIES} className="nav_a">Species</Link></li>
            </ul>
          </div>
          <div className="nav-footer-col-spacer"/>
          <div className="nav-footer-col">
            <div className="nav-footer-col-head">Download</div>
            <ul>
              <li><Link to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS} className="nav_a">Gene expression calls</Link></li>
              <li><Link to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES} className="nav_a">Processed expression values</Link></li>
            </ul>
          </div>
          <div className="nav-footer-col-spacer"/>
          <div className="nav-footer-col">
            <div className="nav-footer-col-head">Resources</div>
            <ul>
              <li><Link to={PATHS.RESOURCES.R_PACKAGES} className="nav_a">R packages</Link></li>
              <li><a href={PATHS.SEARCH.SPARQL} target="_blank" rel="noopener noreferrer" className="nav_a">SPARQL endpoint</a></li>
            </ul>
          </div>
          <div className="nav-footer-col-spacer"/>
          <div className="nav-footer-col">
            <div className="nav-footer-col-head">Help and documentation</div>
            <ul>
              <li><Link to={PATHS.SUPPORT.TUTORIALS} className="nav_a">Documentation and tutorials</Link></li>
              <li><Link to={PATHS.SUPPORT.FAQ} className="nav_a">FAQ</Link></li>
              <li><Link to={PATHS.ABOUT.PUBLICATION} className="nav_a">Cite us</Link></li>
              <li>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <a onClick={obfuscateMailLink(config.contactEmail)} className="nav_a">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="is-flex is-justify-content-space-between">
        <div className="left-wrapper">
          <a
            href="https://www.sib.swiss/"
            target="_blank"
            rel="noopener noreferrer"
            className="dflex"
          >
            <Bulma.Image
              className="no-responsive"
              src={imagePath('/logo/sib-emblem.png')}
              alt="SIB logo"
              height={15}
              width={20}
            />
            &nbsp;SIB Swiss Institute of Bioinformatics
          </a>
          <a
            className="image cc"
            rel="license noopener noreferrer"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
          >
            <Bulma.Image
              className="no-responsive"
              src={imagePath('/cc-zero.png')}
              alt="CC0 license logo"
              height={15}
              width={80}
            />
          </a>
        </div>
        <div className="right-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a
            onClick={() => {
              copyToClipboard(permanentLink);
              addNotification({
                id: random().toString(),
                children: (
                  <>
                    Copied link <u>{permanentLink}</u>
                  </>
                ),
                className: 'is-success',
              });
            }}
          >
            Copy permanent link
          </a>
          {NAVBAR_RIGHT.map(({ href, alt, ...imgProps }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Bulma.Image alt={alt} {...imgProps} />
            </a>
          ))}
        </div>
      </div>
    </Bulma.Footer>
  );
};

export default Footer;
