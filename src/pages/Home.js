import React from 'react';
import { Link } from 'react-router-dom';
import species from './search/species.json';
import i18n from '../i18n';
import assets from '../assets';
import packageJson from '../../package.json';
import NewsItem from '../components/NewsItem';
import CreativeCommons from '../components/CreativeCommons';
import PATHS from '../routes/paths';
import { CardSpecies } from '../components/CustomCard';

const Home = () => {
  const page = 'Home';
  return (
    <>
      <section className="hero" style={{ backgroundColor: '#d9d9d9' }}>
        <div className="hero-body pt-3">
          <p className="has-text-right mb-5">{`${i18n.t('global.version')} ${
            packageJson.version
          }`}</p>
          <div className="is-flex is-justify-content-center">
            <img
              src={assets.bgeeLogo}
              alt="Bgee logo"
              width={248}
              height={100}
            />
          </div>
          <p className="subtitle has-text-uppercase has-text-centered mb-6">
            {i18n.t('global.description')}
          </p>
          <div className="field is-grouped is-justify-content-center">
            <p className="control">
              <Link
                className="button is-primary is-outlined"
                to={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
              >
                <span className="icon">
                  <span className="icon">
                    <ion-icon name="list-outline" />
                  </span>
                </span>
                <span>{i18n.t('home.exp-comparison')}</span>
              </Link>
            </p>
            <p className="control">
              <Link
                className="button is-primary is-outlined"
                to={PATHS.ANALYSIS.TOP_ANAT}
              >
                <span className="icon">
                  <ion-icon name="stats-chart-outline" />
                </span>
                <span>{i18n.t('home.exp-enrichment-analysis')}</span>
              </Link>
            </p>
            <p className="control">
              <Link
                className="button is-primary is-outlined"
                to={PATHS.SEARCH.GENE}
              >
                <span className="icon">
                  <ion-icon name="search-outline" />
                </span>
                <span>{i18n.t('home.gene-search')}</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div className="section">
        <div className="columns">
          <div className="column is-12">
            <p className="has-text-centered">{i18n.t('home.description-1')}</p>
            <p className="has-text-centered">{i18n.t('home.description-2')}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column is-4">
            <div>
              <p className="is-size-5">GENE EXPRESSION DATA</p>
              Bgee is a database for retrieval and comparison of gene expression
              patterns across multiple animal species, produced from multiple
              data types (bulk RNA-Seq, single-cell RNA-Seq, Affymetrix, in situ
              hybridization, and EST data) and from multiple data sets
              (including GTEx data).
            </div>
          </div>
          <div className="column is-4">
            <div>
              <p className="is-size-5">SIMPLY NORMAL</p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Bgee is based exclusively on curated "normal", healthy wild-type,
              expression data (e.g., no gene knock-out, no treatment, no
              disease), to provide a comparable reference of normal gene
              expression.
            </div>
          </div>
          <div className="column is-4">
            <div>
              <p className="is-size-5">COMPARABLE BETWEEN SPECIES</p>
              Bgee produces calls of presence/absence of expression, and of
              differential over-/under-expression, integrated along with
              information of gene orthology, and of homology between organs.
              This allows comparisons of expression patterns between species.
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <header className="card-header">
            <p className="card-header-title is-size-4 has-text-primary">
              {i18n.t('home.grid-species-title')}
            </p>
          </header>
          <div
            className="card-content"
            style={{ height: 350, overflowY: 'auto' }}
          >
            <div className="content">
              <div className="grid-species">
                {species.map((s, key) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/no-array-index-key
                  <Link key={key} className="center-in-grid">
                    <CardSpecies {...s} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <header className="card-header">
            <p className="card-header-title is-size-4 has-text-primary">
              {i18n.t('home.news')}
            </p>
          </header>
          <div
            className="card-content"
            style={{ height: 350, overflowY: 'auto' }}
          >
            <div className="content">
              {[0, 1, 0, 1].map((item, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <NewsItem key={`news-${key}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="columns mt-4">
          <div className="column is-9">
            <CreativeCommons />
          </div>
          <div className="column is-3">
            <p className="is-size-7">
              View archive sites:{' '}
              <a className="external-link" href="https://bgee.org/bgee14_2/">
                version 14.2
              </a>{' '}
              <a className="external-link" href="https://bgee.org/bgee14_1/">
                version 14.1
              </a>{' '}
              <a className="external-link" href="https://bgee.org/bgee14/">
                version 14.0
              </a>{' '}
              <a className="external-link" href="https://bgee.org/bgee13/">
                version 13
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
