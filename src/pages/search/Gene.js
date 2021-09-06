import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import i18n from '../../i18n';
import LinkExternal from '../../components/LinkExternal';
import LINK_ANCHOR from '../../routes/linkAnchor';
import PATHS from '../../routes/paths';

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
    <section className="section pt-5">
      <div className="columns is-vcentered">
        <div className="column is-3">
          <div className="card search-input mx-auto my-3">
            <div className="card-content py-3">
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
            </div>
          </div>
        </div>
        <div className="column is-9 is-flex is-flex-direction-row is-align-items-center is-justify-content-center">
          <figure className="image is-128x128">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </figure>
          <p className="title is-size-5 ml-4">{`${i18n.t(
            'search.gene.gene'
          )}: ${name} - ${ensemblId} - ${speciesScientificName} (${speciesCommonName})`}</p>
        </div>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.gene.general-info')}
        </p>
        <div className="static-section near-columns">
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.ensembl-id')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.name')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.description')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.organism')}
              </p>
            </div>
            <div className="column is-10">
              <p>
                <Link
                  to={`${PATHS.SEARCH.SPECIES_ITEM}/ID`}
                  className="internal-link"
                >
                  species
                </Link>
              </p>
            </div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.synonyms')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.orthologs')}
              </p>
            </div>
            <div className="column is-10">
              <p>
                <a
                  className="internal-link"
                  href={`#${LINK_ANCHOR.GENE.ORTHOLOGS}`}
                >
                  54 orthologs{' '}
                </a>
              </p>
            </div>
          </div>
          <div className="columns my-0">
            <div className="column is-4">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.paralogs')}
              </p>
            </div>
            <div className="column is-10">
              <p>
                <a
                  className="internal-link"
                  href={`#${LINK_ANCHOR.GENE.PARALOGS}`}
                >
                  5 paralogs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.gene.expression')}
        </p>
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
          <div className="columns">
            <div className="column is-3">
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
            </div>
            <div className="column is-3">
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
            </div>
          </div>
        </div>
      </div>
      <div id={LINK_ANCHOR.GENE.ORTHOLOGS}>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.gene.orthologs')}
        </p>
        <div className="static-section">
          <p>WAITING TABLE</p>
          <p className="is-size-7">
            {`${i18n.t('search.gene.orthology-info')}: `}
            <LinkExternal to="" text="sample" />
          </p>
        </div>
      </div>
      <div id={LINK_ANCHOR.GENE.PARALOGS}>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.gene.paralogs')}
        </p>
        <div className="static-section">
          <p>WAITING TABLE</p>
          <p className="is-size-7">
            {`${i18n.t('search.gene.paralogy-info')}: `}
            <LinkExternal to="" text="sample" />
          </p>
        </div>
      </div>
      <div>
        <p className="title is-6 gradient-underline">
          {i18n.t('search.gene.cross-references')}
        </p>
        <div className="static-section near-columns">
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.ccds')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.ensembl')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.hgnc')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.embl')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.onco-mx')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.uniprot-sptrembl')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
          <div className="columns my-0">
            <div className="column is-3">
              <p className="has-text-weight-semibold">
                {i18n.t('search.gene.uniprot-swissprot')}
              </p>
            </div>
            <div className="column is-10">Content</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gene;
