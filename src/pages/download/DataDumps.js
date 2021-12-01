import React from 'react';
import { Helmet } from 'react-helmet';
import Bulma from '../../components/Bulma';
import classnames from '../../helpers/classnames';
import GaEvent from '../../components/GaEvent/GaEvent';
import imagePath from '../../helpers/imagePath';
import config from '../../config.json';

const DataDumps = () => (
  <>
    <Helmet>
      <title>Data dumps download page</title>
      <meta
        name="description"
        content="Download a simplified view of the Bgee database in various formats."
      />
      <meta
        name="keywords"
        content="dataset, data download, MySQL, RDF, EasyBgee, gene expression data"
      />
    </Helmet>
    <div className="content has-text-centered">
      <Bulma.Title size={3}>Bgee data dumps</Bulma.Title>
    </div>

    <Bulma.Tile kind="ancestor">
      <Bulma.Tile kind="parent">
        <Bulma.Tile kind="child">
          <GaEvent
            category="Data dumps"
            action="download_EasyBgee dump"
            label={`${config.ftpDomain}/easybgee_dump.tar.gz`}
          >
            <a href={`${config.ftpDomain}/easybgee_dump.tar.gz`}>
              <div className={classnames('card custom-card', 'mb-3')}>
                <div className="card-image">
                  <figure
                    className={`image is-128x128'
                  }`}
                  >
                    <img src={imagePath('/logo/mysql_logo.png')} />
                  </figure>
                </div>

                <div className="card-content">
                  <p className="card-title">EasyBgee dump</p>
                </div>
              </div>
            </a>
          </GaEvent>
          <p className="has-text-centered">
            Download the dump of the MySQL EasyBgee database, that contains most
            useful, and explicit information. Does not contain raw data.
          </p>
        </Bulma.Tile>
      </Bulma.Tile>
      <Bulma.Tile kind="parent">
        <Bulma.Tile kind="child">
          <GaEvent
            category="Data dumps"
            action="download_Bgee RDF data dump"
            label={`${config.ftpDomain}/rdf_easybgee.zip`}
          >
            <a href={`${config.ftpDomain}/rdf_easybgee.zip`}>
              <div className={classnames('card custom-card', 'mb-3')}>
                <div className="card-image">
                  <figure className="image is-128x128">
                    <img src={imagePath('/logo/rdf_logo.png')} />
                  </figure>
                </div>

                <div className="card-content">
                  <p className="card-title">Bgee RDF data dump</p>
                </div>
              </div>
            </a>
          </GaEvent>
          <p className="has-text-centered">
            Download the Bgee RDF data dump that contains all data present in
            the EasyBgee database.
          </p>
        </Bulma.Tile>
      </Bulma.Tile>
    </Bulma.Tile>
  </>
);

export default DataDumps;
