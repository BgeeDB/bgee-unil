/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import i18n from '../../i18n';
import staticBuilder from '../../helpers/staticBuilder';
import PATHS from '../../routes/paths';
import mockData from './mockTopAnat.json';
import ComplexTable from '../../components/ComplexTable';
import TextArea from '../../components/Form/TextArea';
import Toggle from '../../components/Form/Toggle';
import Input from '../../components/Form/Input';
import InfoIcon from '../../components/InfoIcon';
import HelpIcon from '../../components/HelpIcon';

const staticContent = [
  {
    type: 'title',
    content: 'TopAnat - Gene Expression Enrichment',
  },
  {
    type: 'rich_text',
    content: [
      {
        type: 'text',
        content:
          'GO-like enrichment of anatomical terms, mapped to genes by expression patterns. It is possible to run TopAnat using our ',
      },
      {
        type: 'link_external',
        path: 'https://bioconductor.org/packages/BgeeDB/',
        text: 'BgeeDB R package',
      },
      {
        type: 'text',
        content:
          '. This is the same as this web-service, but with more flexibility in the choice of parameters and developmental stages, and is based on the ',
      },
      {
        type: 'link_external',
        path: 'https://bioconductor.org/packages/topGO/',
        text: 'topGO package',
      },
      {
        type: 'text',
        content: '.',
      },
    ],
  },
];
const onSort =
  (sortKey, sortDirection) =>
  ({ [sortKey]: a }, { [sortKey]: b }) => {
    if (a === b) return 0;
    if (sortDirection === 'ascending') return a > b ? 1 : -1;
    if (sortDirection === 'descending') return a < b ? 1 : -1;
    return 0;
  };

const TopAnat = () => {
  const [expandOpts, setExpandOpts] = React.useState(false);
  const { id } = useParams();
  const initialData = React.useMemo(() => mockData, []);

  const data = React.useMemo(
    () => initialData.result.topAnatResults[0].results,
    [initialData]
  );

  const onRenderCell = React.useCallback(({ cell, key }, defaultRender) => {
    if (key === 0)
      return (
        <a
          className="external-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`http://purl.obolibrary.org/obo/${cell.replace(':', '_')}`}
        >
          {cell}
        </a>
      );
    return defaultRender(cell, key);
  }, []);
  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <div className="columns is-vcentered">
        <div className="column is-3">
          <div className="is-flex is-flex-direction-column">
            <p>{i18n.t('analysis.top-anat.view')}</p>

            <Link to={PATHS.ANALYSIS.TOP_ANAT} className="internal-link">
              {i18n.t('analysis.top-anat.all-stage-present')}
            </Link>
            <a
              className="button is-small mt-2"
              href={initialData.result.topAnatResults[0].zipFile}
            >
              <span className="icon is-small">
                <ion-icon name="download-outline" />
              </span>
              <span>{i18n.t('analysis.top-anat.download-job-archive')}</span>
            </a>
          </div>
        </div>
        <div className="column is-6">
          <div className="field has-addons">
            {searchElement}
            <div className="control">
              <a className="button">
                <span>{data.length}</span>
                <span className="icon is-small">
                  <ion-icon name="download-outline" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="column is-3">
          <div>
            {pageSizeElement}
            <div>{showEntriesText}</div>
          </div>
        </div>
      </div>
    ),
    []
  );

  React.useEffect(() => {
    console.log(id);
    // axios
    //   .get(
    //     `https://bgee.org/bgee15_0/?page=top_anat&gene_info=1&display_rp=1&ajax=1&action=get_results&display_type=json&data=${id}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, [id]);

  return (
    <div>
      <section className="section pt-5">
        {staticBuilder(staticContent)}
        <div className="my-4 is-flex">
          <div>
            <div className="buttons has-addons">
              <button className="button is-bgee-link is-outlined" type="button">
                <span className="icon">
                  <ion-icon name="list-outline" />
                </span>
                <span>{i18n.t('analysis.top-anat.recent-jobs')}</span>
              </button>
              <Link
                to={PATHS.SUPPORT.TOP_ANAT}
                className="button is-bgee-link is-outlined"
              >
                <span className="icon">
                  <ion-icon name="newspaper-outline" />
                </span>
                <span>{i18n.t('analysis.top-anat.documentation')}</span>
              </Link>
            </div>
          </div>
          <div className="is-align-items-center is-flex">
            <span className="icon-text">
              <span className="icon">
                <ion-icon name="bookmarks-sharp" />
              </span>
              <span>{i18n.t('analysis.top-anat.examples')}</span>
            </span>
            <div className="ml-1 buttons has-addons">
              <Link
                to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`}
                className="button is-bgee-link is-outlined"
              >
                <span>1</span>
              </Link>
              <Link
                to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`}
                className="button is-bgee-link is-outlined"
              >
                <span>2</span>
              </Link>
              <Link
                to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`}
                className="button is-bgee-link is-outlined"
              >
                <span>3</span>
              </Link>
              <Link
                to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`}
                className="button is-bgee-link is-outlined"
              >
                <span>4</span>
              </Link>
              <Link
                to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`}
                className="button is-bgee-link is-outlined"
              >
                <span>5</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="columns ">
          <div className="column is-4">
            <article className="message  is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.gene-list')}
                </p>
              </div>
              <div className="message-body">
                <div className="is-flex is-align-items-center">
                  <p className="mr-1">
                    {i18n.t('analysis.top-anat.gene-list-details')}
                  </p>
                  <InfoIcon
                    title="Gene detection details"
                    content={
                      <div className="content">
                        <p>
                          Selected species: Mus musculus, 332 unique genes
                          identified in Bgee
                        </p>
                        <p>IDs not identified: 2</p>
                        <p>IDs not identified:</p>
                        <ul className="unordered">
                          <li>
                            <p>ENSMUSG00000030771</p>
                          </li>
                          <li>
                            <p>ENSMUSG00000094727</p>
                          </li>
                        </ul>
                      </div>
                    }
                  />
                </div>
              </div>
            </article>
            <div className="field">
              <div className="control">
                <TextArea rows={10} className="is-small" disabled />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <article className="message  is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.background')}
                </p>
                <HelpIcon
                  title="Custom background"
                  content={
                    <p>
                      By default, the gene universe considered for the
                      enrichment analysis is all genes with data in Bgee for the
                      selected species. It is possible to provide a custom gene
                      universe, as a list of Ensembl gene IDs. All gene IDs
                      present in the foreground must be present in the
                      background.
                    </p>
                  }
                />
              </div>
              <div className="message-body">
                {i18n.t('analysis.top-anat.gene-list-details')}
              </div>
            </article>
            <div className="field">
              <div className="control">
                <TextArea rows={10} className="is-small" disabled />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <article className="message  is-small">
              <div className="message-header">
                <p className="is-size-6">
                  {i18n.t('analysis.top-anat.analysis-opts')}
                </p>
              </div>
            </article>
            <div className="columns">
              <div className="column is-6">
                <p className="has-text-weight-semibold mb-2">
                  {i18n.t('analysis.top-anat.expr-types')}
                </p>
                <p>Present</p>
              </div>
              <div className="column is-6">
                <p className="has-text-weight-semibold mb-2">
                  {i18n.t('analysis.top-anat.data-types')}
                </p>
                <div className="control">
                  <label className="checkbox" disabled>
                    <input type="checkbox" disabled checked />
                    Remember me
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox" disabled>
                    <input type="checkbox" disabled checked />
                    Remember me
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox" disabled>
                    <input type="checkbox" disabled checked />
                    Remember me
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox" disabled>
                    <input type="checkbox" disabled checked />
                    Remember me
                  </label>
                </div>
                <div className="control">
                  <label className="checkbox" disabled>
                    <input type="checkbox" disabled checked />
                    Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-flex-direction-column">
          <a onClick={() => setExpandOpts(!expandOpts)}>
            <article className="message  is-small">
              <div className="message-header">
                <p className="is-size-5">Advanced Options</p>
                <span className={`icon is-medium ${expandOpts ? 'open' : ''}`}>
                  <ion-icon name="chevron-up-outline" size="large" />
                </span>
              </div>
            </article>
          </a>

          <div
            className="mt-5"
            style={{ display: expandOpts ? 'block' : 'none' }}
          >
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="stages">
                    Stages
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <Toggle
                          elements={[
                            { value: 'all', text: 'All stages' },
                            { value: 'custom', text: 'Custom stages' },
                          ]}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="dataQuality">
                    dataQuality
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <Toggle
                          elements={[
                            { value: 'all', text: 'All' },
                            { value: 'gold', text: 'Gold confidence' },
                          ]}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
                <div className="field">
                  <label className="label" htmlFor="decorrelationType">
                    decorrelationType
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Toggle
                        elements={[
                          { value: 'no', text: 'No decorrelation' },
                          { value: 'elim', text: 'Elim' },
                          { value: 'weight', text: 'Weight' },
                          { value: 'parent-child', text: 'Parent-child' },
                        ]}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="nodeSize">
                    nodeSize
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <Input value={data.nodeSize} disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="nbNode">
                    nbNode
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Input value={data.nbNode} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="fdrThreshold">
                    fdrThreshold
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Input value={data.fdrThreshold} disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label className="label" htmlFor="pValueThreshold">
                    pValueThreshold
                  </label>
                  <div className="field-body">
                    <div className="field">
                      <Input value={data.pValueThreshold} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <p className="title is-6 gradient-underline">
          {i18n.t('global.results')}
        </p>
        <ComplexTable
          columns={[
            {
              key: 'anatEntityId',
              text: 'Anat Entity ID',
            },
            {
              key: 'anatEntityName',
              text: 'Anat Entity Name',
            },
            {
              key: 'annotated',
              text: 'Annotated',
            },
            {
              key: 'significant',
              text: 'Significant',
            },
            {
              key: 'expected',
              text: 'Expected',
            },
            {
              key: 'foldEnrichment',
              text: 'Fold Enrichment',
            },
            {
              key: 'pValue',
              text: 'P value',
            },
            {
              key: 'FDR',
              text: 'Fdr',
            },
          ]}
          data={data}
          onRenderCell={onRenderCell}
          sortable
          pagination
          onFilter={(search) => (element) =>
            Boolean(new RegExp(search).test(element.anatEntityId)) ||
            Boolean(new RegExp(search).test(element.anatEntityName))}
          onSort={onSort}
          classNamesTable="is-striped"
          customHeader={customHeader}
          mappingObj={({
            anatEntityId,
            anatEntityName,
            annotated,
            significant,
            expected,
            foldEnrichment,
            pValue,
            FDR,
          }) => [
            anatEntityId,
            anatEntityName,
            annotated,
            significant,
            expected,
            foldEnrichment,
            pValue,
            FDR,
          ]}
        />
      </section>
    </div>
  );
};

export default TopAnat;
