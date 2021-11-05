/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import i18n from '../i18n';
import assets from '../assets';
import packageJson from '../../package.json';
import CreativeCommons from '../components/CreativeCommons';
import PATHS from '../routes/paths';
import { CardSpecies } from '../components/CustomCard';
import Bulma from '../components/Bulma';
import config from '../config.json';
import HomeNewsList from '../components/Home/HomeNewsList';
import api from '../api';
import { ModalContext } from '../contexts/ModalContext';
import HomeSpeciesModal from '../components/Modal/HomeSpeciesModal';
import LinkExternal from '../components/LinkExternal';

const Home = () => {
  const { showModal, hideModal } = React.useContext(ModalContext);
  const [speciesList, setSpeciesList] = useState([]);

  const openSpeciesModal = React.useCallback(
    (species) => () => {
      console.log(species);
      showModal(<HomeSpeciesModal species={species} hide={hideModal} />);
    },
    []
  );
  React.useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
    return () => {
      if (hideModal) hideModal();
    };
  }, []);

  return (
    <>
      <Bulma.Hero className="home-hero-banner">
        <Bulma.Hero.Body className="pt-3">
          <p className="has-text-right mb-5">{`${i18n.t(
            config.archive ? 'global.archived-version' : 'global.version'
          )} ${packageJson.version}`}</p>
          <div className="is-flex is-justify-content-center">
            <Bulma.Image
              src={assets.bgeeLogo}
              alt="Bgee logo"
              width={248}
              height={100}
            />
          </div>
          <p className="subtitle has-text-uppercase has-text-centered has-text-white mb-6">
            {i18n.t('global.description')}
          </p>
          <div className="field is-grouped is-justify-content-center">
            <p className="control">
              <Link
                className="button is-primary"
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
              >
                <Bulma.IonIcon name="list-outline" />
                <span>{i18n.t('home.exp-comparison')}</span>
              </Link>
            </p>
            <p className="control">
              <Link className="button is-primary" to={PATHS.ANALYSIS.TOP_ANAT}>
                <Bulma.IonIcon name="stats-chart-outline" />
                <span>{i18n.t('home.exp-enrichment-analysis')}</span>
              </Link>
            </p>
            <p className="control">
              <Link className="button is-primary" to={PATHS.SEARCH.GENE}>
                <Bulma.IonIcon name="search-outline" />
                <span>{i18n.t('home.gene-search')}</span>
              </Link>
            </p>
          </div>
        </Bulma.Hero.Body>
      </Bulma.Hero>
      <Bulma.Section>
        <Bulma.Container>
          <Bulma.Columns>
            <Bulma.C size={12}>
              <p className="has-text-centered">
                {i18n.t('home.description-1')}
              </p>
              <p className="has-text-centered">
                {i18n.t('home.description-2')}
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns>
            <Bulma.C size={4}>
              <div>
                <p className="is-size-5">GENE EXPRESSION DATA</p>
                Bgee is a database for retrieval and comparison of gene
                expression patterns across multiple animal species, produced
                from multiple data types (bulk RNA-Seq, single-cell RNA-Seq,
                Affymetrix, in situ hybridization, and EST data) and from
                multiple data sets (including{' '}
                <LinkExternal to="https://www.gtexportal.org/home/">
                  GTEx data
                </LinkExternal>
                ).
              </div>
            </Bulma.C>
            <Bulma.C size={4}>
              <div>
                <p className="is-size-5">SIMPLY NORMAL</p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Bgee is based exclusively on curated "normal", healthy
                wild-type, expression data (e.g., no gene knock-out, no
                treatment, no disease), to provide a comparable reference of
                normal gene expression.
              </div>
            </Bulma.C>
            <Bulma.C size={4}>
              <div>
                <p className="is-size-5">COMPARABLE BETWEEN SPECIES</p>
                Bgee produces calls of presence/absence of expression, and of
                differential over-/under-expression, integrated along with
                information of gene orthology, and of homology between organs.
                This allows comparisons of expression patterns between species.
              </div>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Card className="mt-4">
            <Bulma.Card.Header>
              <Bulma.Card.Header.Title className="is-size-5 has-text-primary">
                Species with data in Bgee
              </Bulma.Card.Header.Title>
            </Bulma.Card.Header>
            <Bulma.Card.Body className="species">
              <div className="content">
                <div className="grid-species">
                  {speciesList.map((s) => (
                    <div
                      onClick={openSpeciesModal(s)}
                      className="center-in-grid"
                    >
                      <CardSpecies {...s} />
                    </div>
                  ))}
                </div>
              </div>
            </Bulma.Card.Body>
          </Bulma.Card>
          <Bulma.Card className="mt-4">
            <HomeNewsList />
          </Bulma.Card>
          <div className="my-6 field is-grouped is-justify-content-center">
            <p className="control">
              <Link
                className="button is-primary"
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
              >
                <Bulma.IonIcon name="list-outline" />
                <span>{i18n.t('home.exp-comparison')}</span>
              </Link>
            </p>
            <p className="control">
              <Link className="button is-primary" to={PATHS.ANALYSIS.TOP_ANAT}>
                <Bulma.IonIcon name="stats-chart-outline" />
                <span>{i18n.t('home.exp-enrichment-analysis')}</span>
              </Link>
            </p>
            <p className="control">
              <Link className="button is-primary" to={PATHS.SEARCH.GENE}>
                <Bulma.IonIcon name="search-outline" />
                <span>{i18n.t('home.gene-search')}</span>
              </Link>
            </p>
          </div>
          <Bulma.Columns>
            <Bulma.C size={config.archive ? 12 : 9}>
              <CreativeCommons />
            </Bulma.C>
            {!config.archive && (
              <Bulma.C size={3}>
                <p className="is-size-7 archived-link">
                  View archive sites:
                  {config.archivedVersion.map((archived) => (
                    <LinkExternal key={archived.version} to={archived.url}>
                      {`version ${archived.version}`}
                    </LinkExternal>
                  ))}
                </p>
              </Bulma.C>
            )}
          </Bulma.Columns>
        </Bulma.Container>
      </Bulma.Section>
    </>
  );
};

export default Home;
