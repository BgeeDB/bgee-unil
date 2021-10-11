/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import Bulma from '../../components/Bulma';

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
      <Bulma.Columns vCentered>
        <Bulma.C size={3}>
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
        </Bulma.C>
        <Bulma.C size={6}>
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
        </Bulma.C>
        <Bulma.C size={3}>
          <div>
            {pageSizeElement}
            <div>{showEntriesText}</div>
          </div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    []
  );

  React.useEffect(() => {
    // axios
    //   .get(
    //     `https://bgee.org/bgee15_0/?page=top_anat&gene_info=1&display_rp=1&ajax=1&action=get_results&display_type=json&data=${id}`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, [id]);
  const loc = useLocation();
  React.useEffect(() => {
    console.log(loc);
  }, [loc]);

  return (
    <div>
      <Bulma.Section className="pt-0">
        <Bulma.Title size={5} className="gradient-underline">
          {i18n.t('global.results')}
        </Bulma.Title>
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
      </Bulma.Section>
    </div>
  );
};

export default TopAnat;
