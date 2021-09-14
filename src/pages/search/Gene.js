import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import LinkExternal from '../../components/LinkExternal';
import LINK_ANCHOR from '../../routes/linkAnchor';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';

const Gene = ({
  name = 'NAME',
  ensemblId = 'ENSEMBL ID',
  speciesScientificName = 'Homo sapiens',
  speciesCommonName = 'human',
}) => {
  const history = useHistory();
  const [search, setSearch] = React.useState('');
  const onClickSearch = React.useCallback(
    () => history.push(`${PATHS.SEARCH.GENE}?search=${search}`),
    [search, history]
  );

  return (
    <>
      <Bulma.Columns vCentered>
        <Bulma.C size={3}>
          <Bulma.Card className="search-input mx-auto my-3">
            <Bulma.Card.Body className=" py-3">
              <div className="content">
                <div className="field">
                  <label className="label" htmlFor="search-species">
                    {i18n.t('search.genes.search-gene')}
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="search-species"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className="button mr-2"
                    type="button"
                    disabled={search === ''}
                    onClick={onClickSearch}
                  >
                    {i18n.t('global.search')}
                  </button>
                </div>
              </div>
            </Bulma.Card.Body>
          </Bulma.Card>
        </Bulma.C>
        <Bulma.C
          size={9}
          className="is-flex is-flex-direction-row is-align-items-center is-justify-content-center"
        >
          <Bulma.Image
            src="https://bulma.io/images/placeholders/128x128.png"
            size={128}
          />
          <Bulma.Title size={4} className="ml-4">{`${i18n.t(
            'search.gene.gene'
          )}: ${name} - ${ensemblId} - ${speciesScientificName} (${speciesCommonName})`}</Bulma.Title>
        </Bulma.C>
      </Bulma.Columns>
      <div>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.general-info')}
        </Bulma.Title>
        <div className="static-section near-columns">
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.ensembl-id')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>Content</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.name')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>Content</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.description')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>Content</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.organism')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>
              <p>
                <Link
                  to={`${PATHS.SEARCH.SPECIES_ITEM}/ID`}
                  className="internal-link"
                >
                  species
                </Link>
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.synonyms')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>Content</Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.orthologs')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>
              <p>
                <a
                  className="internal-link"
                  href={`#${LINK_ANCHOR.GENE.ORTHOLOGS}`}
                >
                  54 orthologs{' '}
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
          <Bulma.Columns className="my-0">
            <Bulma.C size={4}>
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.paralogs')}
              </p>
            </Bulma.C>
            <Bulma.C size={8}>
              <p>
                <a
                  className="internal-link"
                  href={`#${LINK_ANCHOR.GENE.PARALOGS}`}
                >
                  5 paralogs
                </a>
              </p>
            </Bulma.C>
          </Bulma.Columns>
        </div>
      </div>
      <div>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.expression')}
        </Bulma.Title>
        <div className="static-section">
          <p>WATING TABLE</p>
          <p className="is-size-7">
            <b>Rank scores </b> of expression calls are normalized across genes,
            conditions and species. Low score means that the gene is highly
            expressed in the condition. Max rank score in all species: 4.10e4.
            Min rank score varies across species.
          </p>
          <p className="is-size-7">
            <b>Expression scores</b> of expression calls use the minimum and
            maximum Rank of the species to normalize the expression to a value
            between 0 and 100. Low score means that the gene is lowly expressed
            in the condition.
          </p>
          <Bulma.Columns>
            <Bulma.C size={3}>
              <p className="is-size-7">
                {i18n.t('search.gene.source-anatomy-dev')}
              </p>
              <ul className="unordered">
                <li>
                  <p className="is-size-7">
                    Affymetrix data:
                    <LinkExternal to="https://bgee.org" text="Bgee" />
                  </p>
                </li>
                <li>
                  <p className="is-size-7">
                    RNA-Seq data:
                    <LinkExternal to="https://bgee.org" text="Bgee" />
                  </p>
                </li>
                <li>
                  <p className="is-size-7">
                    Full length single cell RNA-Seq data:
                    <LinkExternal to="https://bgee.org" text="Bgee" />
                  </p>
                </li>
              </ul>
            </Bulma.C>
            <Bulma.C size={3}>
              <p className="is-size-7">
                {i18n.t('search.gene.source-raw-data')}
              </p>
              <ul className="unordered">
                <li>
                  <p className="is-size-7">
                    Affymetrix data:
                    <LinkExternal
                      to="https://www.ebi.ac.uk/arrayexpress/"
                      text="ArrayExpress"
                    />
                    {', '}
                    <LinkExternal
                      to="https://www.ncbi.nlm.nih.gov/geo/"
                      text="GEO"
                    />
                  </p>
                </li>
                <li>
                  <p className="is-size-7">
                    RNA-Seq data:
                    <LinkExternal
                      to="https://www.ncbi.nlm.nih.gov/geo/"
                      text="GEO"
                    />
                    {', '}
                    <LinkExternal
                      to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000424"
                      text="GTEx - dbGAP"
                    />
                    {', '}
                    <LinkExternal
                      to="https://www.ncbi.nlm.nih.gov/sra/"
                      text="SRA"
                    />
                  </p>
                </li>
                <li>
                  <p className="is-size-7">
                    Full length single cell RNA-Seq data:
                    <LinkExternal
                      to="https://www.ncbi.nlm.nih.gov/sra/"
                      text="SRA"
                    />
                  </p>
                </li>
              </ul>
            </Bulma.C>
          </Bulma.Columns>
        </div>
      </div>
      <div id={LINK_ANCHOR.GENE.ORTHOLOGS}>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.orthologs')}
        </Bulma.Title>
        <div className="static-section">
          <p>WAITING TABLE</p>
          <p className="is-size-7">
            {`${i18n.t('search.gene.orthology-info')}: `}
            <LinkExternal to="" text="sample" />
          </p>
        </div>
      </div>
      <div id={LINK_ANCHOR.GENE.PARALOGS}>
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('search.gene.paralogs')}
        </Bulma.Title>
        <div className="static-section">
          <p>WAITING TABLE</p>
          <p className="is-size-7">
            {`${i18n.t('search.gene.paralogy-info')}: `}
            <LinkExternal to="" text="sample" />
          </p>
        </div>
      </div>
      <Bulma.Title size={5} className="gradient-underline">
        {i18n.t('search.gene.cross-references')}
      </Bulma.Title>
      <div className="static-section near-columns">
        <Bulma.Columns>
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.ccds')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.ensembl')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.hgnc')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.embl')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.onco-mx')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <p className="has-text-weight-semibold">
              {i18n.t('search.gene.uniprot-sptrembl')}
            </p>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
        <Bulma.Columns className="my-0">
          <Bulma.C size={3}>
            <Bulma.Element renderAs="p" textWeight="semibold">
              {i18n.t('search.gene.uniprot-swissprot')}
            </Bulma.Element>
          </Bulma.C>
          <Bulma.C size={9}>Content</Bulma.C>
        </Bulma.Columns>
      </div>
    </>
  );
};

export default Gene;
