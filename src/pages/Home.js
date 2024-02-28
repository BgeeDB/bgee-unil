/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import assets, {heroCounts}  from '../assets';
import CreativeCommons from '../components/CreativeCommons';
import PATHS from '../routes/paths';
import Bulma from '../components/Bulma';
import config from '../config.json';
import HomeNewsList from '../components/HomeNewsList';
import api from '../api';
import LinkExternal from '../components/LinkExternal';
import schemaDotOrg from '../helpers/schemaDotOrg';
import imagePath from '../helpers/imagePath';
import Indexes from "../components/Indexes/Indexes";

const HomeCard = props => {
    const {imgUrl, title, desc, linkUrl, linkText} = props;
    return (<Bulma.C size={6}><Link  to={linkUrl}>
            <Bulma.Card className="mt-4 home-card">
                <Bulma.Card.Body>
                    <h2 className="has-text-primary is-size-2">{title}</h2>
                    <div className="content">
                        <p>{desc}</p>
                        <p><Link to={linkUrl} className="home-card-link">{linkText}</Link></p>
                    </div>
                </Bulma.Card.Body>
                <div className="home-card-footer">
                    <Bulma.Image
                        className="no-responsive home-card-img"
                        src={imagePath(imgUrl)}
                        alt={`${title} screenshot`}
                    />
                </div>
            </Bulma.Card></Link>
        </Bulma.C>
    );
};

const Home = () => {
  const [speciesList, setSpeciesList] = useState([]);

  React.useEffect(() => {
    api.search.species.list().then((resp) => {
      if (resp.code === 200) {
        setSpeciesList(resp.data.species);
        schemaDotOrg.setHomeDatasetLdJSON(resp.data.species);
      } else {
        setSpeciesList([]);
      }
    });
  }, []);

  return (
    <>
      <Bulma.Hero className="home-hero-banner">
        <Bulma.Hero.Body className="py-3">
          <p className="has-text-right has-text-black-ter">{`${
              config.archive ? 'Archived version' : 'Version'
          } ${config.fullversion}`}</p>
          <Bulma.Columns>
            <Bulma.C size={6} className="my-auto">
              <Bulma.Title
                className="is-size-2 has-text-left has-text-weight-medium my-3"
                colorClassName="has-text-white"
              >
                Discover gene expression data in animals
              </Bulma.Title>
              <p className="has-text-left is-size-4 has-text-black-ter my-6">
                Bgee is a database for retrieval and comparison of gene expression
                patterns across multiple animal species.
                It provides an intuitive answer to the question &quot;where is a gene expressed?&quot;
                and supports research in cancer and agriculture as well as evolutionary biology.
              </p>
              <Bulma.Columns className="has-text-uppercase has-text-weight-bold is-size-6 has-text-white my-3 is-desktop">
                <Bulma.C size={3}>
                  <span>comparable<br/>species</span>
                  <p className="is-size-2 has-text-primary">{heroCounts.speciesCount}</p>
                </Bulma.C>
                <Bulma.C size={4}>
                  <span>bulk and single-cell<br/>RNA-Seq libraries</span>
                  <p className="is-size-2 has-text-primary">{heroCounts.libraryCount}</p>
                </Bulma.C>
                <Bulma.C size={4}>
                  <span>unique annotated<br/>conditions</span>
                  <p className="is-size-2 has-text-primary">{heroCounts.conditionCount}</p>
                </Bulma.C>
              </Bulma.Columns>
            </Bulma.C>
            <Bulma.C size={6}>
              <Bulma.Image
                className="hero-image is-justify-content-flex-end"
                src={assets.heroImg}
                alt="Hero logo"
                height={480}
                width={711}
              />
            </Bulma.C>
          </Bulma.Columns>
        </Bulma.Hero.Body>
      </Bulma.Hero>

      <Bulma.Section className="home-cards">
        <Bulma.Columns>
          <HomeCard imgUrl="/home/gene_screenshot.png" title="Gene expression"
                    desc="Discover important details about your selected gene including its expression 
                            in various conditions and its orthologs."
                    linkUrl={PATHS.SEARCH.GENE}
                    linkText="Gene search"/>
          <HomeCard imgUrl="/home/exp_comp_screenshot.png" title="Expression comparison"
                    desc="Compare gene expression for a iconlist of genes in anatomical entities."
                    linkUrl={PATHS.ANALYSIS.EXPRESSION_COMPARISON}
                    linkText="Compare"/>
          <HomeCard imgUrl="/home/topanat_screenshot.png" title="Expression enrichment analysis"
                    desc="Tool similar to a GO enrichment test but rather than using Gene Ontology annotations
                             it is based on anatomical annotations."
                    linkUrl={PATHS.ANALYSIS.TOP_ANAT}
                    linkText="Analyse"/>
          <HomeCard imgUrl="/home/raw_annot_screenshot.png" title="Raw data annotations"
                    desc="Explore all libraries in Bgee that match your selected conditions and access their 
                            fully annotated raw (unprocessed) data."
                    linkUrl={PATHS.SEARCH.RAW_DATA_ANNOTATIONS}
                    linkText="Explore"/>
          <HomeCard imgUrl="/home/exp_call_screenshot.png" title="Expression calls"
                    desc="Search all present/absent gene expression calls in the Bgee database."
                    linkUrl={PATHS.SEARCH.EXPRESSION_CALLS}
                    linkText="Search"/>

          <Bulma.C size={6}>
            <Bulma.Card className="mt-4 home-card">
              <Bulma.Card.Body>
                <h3 className="is-size-2 has-text-primary">
                  Data retrieval
                </h3>
                <div className="content">
                  <p>How to retrieve data.</p>
                  <ul className="unordered">
                    <li key="data-retrieval-1">
                      <Link to={PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS} className="home-card-link">
                        Expression calls download files
                      </Link>
                    </li>
                    <li key="data-retrieval-2">
                      <Link to={PATHS.DOWNLOAD.PROCESSED_EXPRESSION_VALUES} className="home-card-link">
                        Expression values download files
                      </Link>
                    </li>
                    <li key="data-retrieval-3">
                      <Link to={PATHS.RESOURCES.R_PACKAGES} className="home-card-link">R packages</Link>
                    </li>
                    <li key="data-retrieval-4">
                      <Link to={PATHS.RESOURCES.SPARQL} className="home-card-link">SPARQL endpoint</Link>
                    </li>
                  </ul>
                </div>
              </Bulma.Card.Body>
              <div className="home-card-footer">
                <Bulma.Image
                  className="no-responsive home-card-img"
                  style={{ backgroundColor: 'white' }}
                  src={imagePath("/home/data_retrieval_screenshot.png")}
                  alt='Data retrieval screenshot'
                />
              </div>
            </Bulma.Card>
          </Bulma.C>
        </Bulma.Columns>

        <Bulma.Card className="mt-4">
          <HomeNewsList />
        </Bulma.Card>
        
        <Bulma.Card className="mt-4">
          <Indexes speciesList={speciesList}/>
        </Bulma.Card>

      </Bulma.Section>

      <Bulma.Section>
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
      </Bulma.Section>

      <Bulma.Section>
        <Bulma.Columns>
          <Bulma.C size={12}>
            <p className="has-text-centered is-size-5">
              <LinkExternal className='ext-as-int-link' to='https://globalbiodata.org/scientific-activities/global-core-biodata-resources'>
                <img src={imagePath(`/logo/GCBR-Logo.png`)} alt='Global Core Biodata Resource Logo' width='165' height='70' />
              </LinkExternal>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <LinkExternal className='ext-as-int-link' to='https://elixir-europe.org/platforms/interoperability/rirs'>
                <img src={imagePath(`/logo/ELIXIR-rir-logo.png`)} alt='ELIXIR Recommended Interoperability Resources Logo' width='89' height='70' />
              </LinkExternal>
              <br /><br />
            </p>
            <p className="has-text-centered is-size-4 has-text-weight-bold">
              Bgee have been recognised as a&nbsp;
              <LinkExternal className='ext-as-int-link'
                            to='https://globalbiodata.org/scientific-activities/global-core-biodata-resources'>
                Global Core Biodata Resource
              </LinkExternal>
              and an&nbsp;
              <LinkExternal className='ext-as-int-link'
                            to='https://elixir-europe.org/platforms/interoperability/rirs'>
                ELIXIR Recommended Interoperability Resource
              </LinkExternal>
            </p>
          </Bulma.C>
        </Bulma.Columns>
      </Bulma.Section>
    </>
  );
};

export default Home;
