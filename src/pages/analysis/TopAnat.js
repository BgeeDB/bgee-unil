import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import staticBuilder from '../../helpers/staticBuilder';
import PATHS from '../../routes/paths';
import mockData from './mockTopAnat.json';
import ComplexTable from '../../components/ComplexTable';
import Select from '../../components/Select';

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
const TopAnat = () => {
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

  return (
    <div>
      <section className="section pt-1">
        {staticBuilder(staticContent)}
        {/* <div className="my-4 is-flex"> */}
        {/*  <div> */}
        {/*    <div className="buttons has-addons"> */}
        {/*      <button className="button is-bgee-link is-outlined" type="button"> */}
        {/*        <span className="icon"> */}
        {/*          <ion-icon name="list-outline" /> */}
        {/*        </span> */}
        {/*        <span>{i18n.t('analysis.top-anat.recent-jobs')}</span> */}
        {/*      </button> */}
        {/*      <Link */}
        {/*        to={PATHS.SUPPORT.TOP_ANAT} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span className="icon"> */}
        {/*          <ion-icon name="newspaper-outline" /> */}
        {/*        </span> */}
        {/*        <span>{i18n.t('analysis.top-anat.documentation')}</span> */}
        {/*      </Link> */}
        {/*    </div> */}
        {/*  </div> */}
        {/*  <div className="is-align-items-center is-flex"> */}
        {/*    <span className="icon-text"> */}
        {/*      <span className="icon"> */}
        {/*        <ion-icon name="bookmarks-sharp" /> */}
        {/*      </span> */}
        {/*      <span>{i18n.t('analysis.top-anat.examples')}</span> */}
        {/*    </span> */}
        {/*    <div className="ml-1 buttons has-addons"> */}
        {/*      <Link */}
        {/*        to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span>1</span> */}
        {/*      </Link> */}
        {/*      <Link */}
        {/*        to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span>2</span> */}
        {/*      </Link> */}
        {/*      <Link */}
        {/*        to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span>3</span> */}
        {/*      </Link> */}
        {/*      <Link */}
        {/*        to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span>4</span> */}
        {/*      </Link> */}
        {/*      <Link */}
        {/*        to={`${PATHS.SUPPORT.TOP_ANAT}?id=1234564987`} */}
        {/*        className="button is-bgee-link is-outlined" */}
        {/*      > */}
        {/*        <span>5</span> */}
        {/*      </Link> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
        {/* <div className="columns "> */}
        {/*  <div className="column is-4"> */}
        {/*    <article className="message  is-small"> */}
        {/*      <div className="message-header"> */}
        {/*        <p className="is-size-5"> */}
        {/*          {i18n.t('analysis.top-anat.gene-list')} */}
        {/*        </p> */}
        {/*      </div> */}
        {/*      <div className="message-body"> */}
        {/*        {i18n.t('analysis.top-anat.gene-list-details')} */}
        {/*      </div> */}
        {/*    </article> */}
        {/*    <div className="field"> */}
        {/*      <div className="control"> */}
        {/*        <textarea */}
        {/*          rows={10} */}
        {/*          className="textarea" */}
        {/*          placeholder={i18n.t( */}
        {/*            'analysis.top-anat.textarea-placeholder-gene-list' */}
        {/*          )} */}
        {/*        /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*  </div> */}
        {/*  <div className="column is-4"> */}
        {/*    <div className="field"> */}
        {/*      <div className="control"> */}
        {/*        <textarea className="textarea" rows={10} disabled /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
        {/* <div> */}
        {/*  <div className="field is-grouped"> */}
        {/*    <p className="control"> */}
        {/*      <a className="button is-primary"> */}
        {/*        {i18n.t('analysis.top-anat.submit-job')} */}
        {/*      </a> */}
        {/*    </p> */}
        {/*    <div className="control has-icons-left"> */}
        {/*      <Input */}
        {/*        type="email" */}
        {/*        placeholder={i18n.t('analysis.top-anat.email')} */}
        {/*      /> */}
        {/*      <span className="icon is-left"> */}
        {/*        <ion-icon name="mail-outline" /> */}
        {/*      </span> */}
        {/*    </div> */}
        {/*    <div className="control has-icons-left has-icons-right"> */}
        {/*      <Input */}
        {/*        placeholder={i18n.t('analysis.top-anat.job-description')} */}
        {/*      /> */}
        {/*      <span className="icon is-left"> */}
        {/*        <ion-icon name="document-outline" /> */}
        {/*      </span> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
      </section>

      <section className="section">
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
          classNamesTable="is-striped"
          customHeader={customHeader}
        />
      </section>
    </div>
  );
};

export default TopAnat;
