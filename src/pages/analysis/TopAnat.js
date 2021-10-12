/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import staticBuilder from '../../helpers/staticBuilder';
import i18n from '../../i18n';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';
import Tooltip from '../../components/Tooltip';
import api from '../../api';
import Notifications from '../../components/Notifications';
import TopAnatBanner from '../../components/TopAnat/TopAnatBanner';
import useTopAnat from '../../hooks/useTopAnat';
import TopAnatForm from '../../components/TopAnat/TopAnatForm';
import ComplexTable from '../../components/ComplexTable';
import { NotificationContext } from '../../contexts/NotificationsContext';

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
const EXAMPLES = [
  {
    id: '0e165086d430555eda6d6ee5693519ae6c437536',
    description:
      'Autism spectrum associated genes from Satterstrom et al. 2020 https://doi.org/10.1016/j.cell.2019.12.036',
  },
  {
    id: 'f3fede86b7cc61a7d8239c31bac012da77ab797b',
    description: 'Mouse genes mapped to the GO term "spermatogenesis".',
  },
  {
    id: 'b7d412c35f14b5574305c078b1053b026df315eb',
    description:
      'Zebrafish 3R ohnologs from Roux et al. 2017 https://doi.org/10.1093/molbev/msx199 showing nervous system expression of 3R duplicates.',
  },
  {
    id: '2d80cdb2fa09681389f935d71d67c327558a09a1',
    description: 'Pigmentation genes in rabbit.',
  },
  {
    id: '9bbddda9dea22c21edcada56ad552a35cb8e29a7',
    description: 'COVID-19 related human genes.',
  },
];

let getJobStatusTimeOut;

const onSort =
  (sortKey, sortDirection) =>
  ({ [sortKey]: a }, { [sortKey]: b }) => {
    const AFormatted = typeof a === 'string' ? a.toLowerCase() : a;
    const bFormatted = typeof b === 'string' ? b.toLowerCase() : b;
    if (AFormatted === bFormatted) return 0;
    if (sortDirection === 'ascending') return AFormatted > bFormatted ? 1 : -1;
    if (sortDirection === 'descending') return AFormatted < bFormatted ? 1 : -1;
    return 0;
  };

const TopAnat = () => {
  const { addNotification, cleanNotifications } =
    React.useContext(NotificationContext);
  const {
    form: {
      data,
      setData,
      handleChange,
      handleSubmit,
      errors,
      edition: { isEditable, setIsEditable },
      foregroundHandler,
      backgroundHandler,
      checkBoxHandler,
      onSelectCustomStage,
      resetForm,
    },
    searchInfo: { value: searchInfo, setSearchInfo },
    expandOpts: { value: expandOpts, setExpandOpts },
    fgData: { value: fgData, setFgData },
    bgData: { value: bgData, setBgData },
    species: { speciesBg, setSpeciesBgTrue, setSpeciesBgFalse },
  } = useTopAnat();

  React.useEffect(() => {
    let timeoutPointer;
    if (bgData) {
      addNotification({
        id: Math.random().toString(10),
        children: (
          <p>
            {fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
              ? 'Foreground/background species are identical.'
              : 'Foreground and background species differ. You can either change your background or the default one will be used.'}
          </p>
        ),
        className: `is-${
          fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
            ? 'success'
            : 'danger'
        }`,
      });
    }
    return () => {
      if (timeoutPointer) clearTimeout(timeoutPointer);
    };
  }, [fgData, bgData]);

  const [isLoading, setLoading] = React.useState(false);
  const { id, jobId } = useParams();
  const history = useHistory();

  const getJobStatus = React.useCallback(
    (ID, jobID) => {
      if (!(fgData && bgData)) setLoading(true);
      api.topAnat.getStatus(ID, jobID).then((r) => {
        if (r.data.jobResponse.jobStatus === 'RUNNING') {
          getJobStatusTimeOut = setTimeout(() => getJobStatus(ID, jobID), 2000);
          setSearchInfo({ isRunning: true, jobId: r.data.jobResponse.jobId });
        } else {
          history.push(
            PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              r.data.jobResponse.data
            )
          );
        }
      });
    },
    [fgData, bgData]
  );
  const getResults = React.useCallback((ID) => {
    api.topAnat.getResults(ID).then((r) => {
      const formData = r.requestParameters;
      setData((prev) => ({
        ...prev,
        genes: formData.fg_list.join('\n'),
        genesBg: formData.bg_list.join('\n'),
        email: '',
        jobDescription: formData.job_title || '',
        stages: 'all',
        dataQuality: formData.data_qual,
        decorrelationType: formData.decorr_type,
        nodeSize: formData.node_size || '',
        nbNode: formData.nb_node || '',
        fdrThreshold: formData.fdr_thr || '',
        pValueThreshold: formData.p_value_thr || '',
        rnaSeq: formData.data_type.find((f) => f === 'RNA_SEQ'),
        affymetrix: formData.data_type.find((f) => f === 'AFFYMETRIX'),
        inSitu: formData.data_type.find((f) => f === 'IN_SITU'),
        est: formData.data_type.find((f) => f === 'EST'),
      }));
      setFgData({
        fg_list: r.data.fg_list,
        message: `${formData.fg_list.length} IDs provided, ${
          r.data.fg_list.geneCount[r.data.fg_list.selectedSpecies]
        } unique gene${
          r.data.fg_list.geneCount[r.data.fg_list.selectedSpecies] > 0
            ? 's'
            : ''
        } found in ${
          r.data.fg_list.detectedSpecies[r.data.fg_list.selectedSpecies].name
        }`,
      });
      setBgData({
        bg_list: r.data.bg_list,
        message: `${formData.bg_list.length} IDs provided, ${
          r.data.bg_list.geneCount[r.data.bg_list.selectedSpecies]
        } unique gene${
          r.data.bg_list.geneCount[r.data.bg_list.selectedSpecies] > 0
            ? 's'
            : ''
        } found in ${
          r.data.bg_list.detectedSpecies[r.data.bg_list.selectedSpecies].name
        }`,
      });
      if (r.data.bg_list) setSpeciesBgTrue();
      setSearchInfo((prev) => ({
        ...prev,
        isLoading: false,
        results: r.data.topAnatResults,
        data: r.data.topAnatResults.reduce(
          (acc, a) => [...acc, ...a.results],
          []
        ),
      }));
      // todo set form + fg & bg data
    });
  }, []);

  React.useEffect(() => {
    if (getJobStatusTimeOut) clearInterval(getJobStatusTimeOut);

    if (id && !jobId) {
      getResults(id);
      setSearchInfo({ isRunning: false, isLoading: true });
      setIsEditable(false);
      setLoading(false);
    } else if (id && jobId) {
      getJobStatus(id, jobId);
    } else {
      // reset fg data, bgData, etc.
      setIsEditable(true);
      resetForm();
      setLoading(false);
      setSearchInfo();
    }
    cleanNotifications();
  }, [id, jobId]);

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
  const dataCsvHref = React.useMemo(() => {
    let csvContent =
      'data:text/csv;charset=utf-8,Anat Entity ID;Anat Entity ID;Annotated;Significant;Expected;Fold Enrichment;P value;Fdr\n';
    if (searchInfo?.data)
      searchInfo?.data.forEach((row) => {
        csvContent += `${row.anatEntityId};${row.anatEntityName};${row.annotated};${row.significant};${row.expected};${row.foldEnrichment};${row.pValue};${row.FDR}\n`;
      });

    return csvContent;
  }, [searchInfo]);
  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <Bulma.Columns vCentered>
        <Bulma.C size={4}>
          <div className="is-flex is-flex-direction-column">
            <p>Archive(s)</p>
            <a
              href={`https://bgee.org/?page=top_anat&action=download&data=${id}`}
              className="external-link"
              style={{ width: 'fit-content' }}
              rel="noreferrer"
            >
              All stages, expression type &quot;Present&quot;
            </a>
            {searchInfo.results.length > 1 &&
              searchInfo.results.map((r, key) => (
                <a
                  key={r.zipFile}
                  href={r.zipFile}
                  className="external-link"
                  style={{ width: 'fit-content' }}
                >
                  {`${
                    fgData.fg_list.stages.find((s) => s.id === r.devStageId)
                      ?.name
                  }, expression type "Present" (${r.results.length})`}
                </a>
              ))}
            {/* todo */}
            {/* <a */}
            {/*  className="button is-small mt-2" */}
            {/*  href={initialData.result.topAnatResults[0].zipFile} */}
            {/* > */}
            {/*  <span className="icon is-small"> */}
            {/*    <ion-icon name="download-outline" /> */}
            {/*  </span> */}
            {/*  <span>{i18n.t('analysis.top-anat.download-job-archive')}</span> */}
            {/* </a> */}
          </div>
        </Bulma.C>
        <Bulma.C size={5}>
          <div className="field has-addons">
            {searchElement}
            {/* todo dl as csv */}
            <div className="control">
              <a
                className="button"
                href={dataCsvHref}
                download="data.csv"
                target="_blank"
                rel="noreferrer"
              >
                <span>CSV</span>
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
    [fgData, searchInfo]
  );

  return (
    <div>
      <Bulma.Section className="py-0">
        {staticBuilder(staticContent)}
        {!isLoading && (
          <>
            <div className="my-4 is-flex">
              <button
                className="button is-bgee-link is-outlined mr-2"
                type="button"
              >
                <Bulma.IonIcon name="list-outline" />
              </button>
              <Link
                to={PATHS.SUPPORT.TOP_ANAT}
                className="button is-bgee-link is-outlined mr-2"
              >
                <Bulma.IonIcon name="newspaper-outline" />
                <span>{i18n.t('analysis.top-anat.documentation')}</span>
              </Link>
              <div className="is-align-items-center is-flex">
                <span className="icon-text">
                  <Bulma.IonIcon name="bookmarks-sharp" />
                  <span>{i18n.t('analysis.top-anat.examples')}</span>
                </span>
                <div className="ml-1 buttons has-addons">
                  {EXAMPLES.map((ex, key) => (
                    <Tooltip
                      key={ex.id}
                      title={`Example ${key + 1}`}
                      content={ex.description}
                    >
                      <Link
                        to={PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
                          ':id',
                          ex.id
                        )}
                        className="button is-bgee-link is-outlined"
                      >
                        <span>{key + 1}</span>
                      </Link>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            <TopAnatForm
              form={{ handleChange, data, errors, isEditable }}
              fgData={fgData}
              bgData={bgData}
              handlers={{
                foregroundHandler,
                backgroundHandler,
                setSpeciesBgTrue,
                setSpeciesBgFalse,
                onSelectCustomStage,
                checkBoxHandler,
                setExpandOpts,
              }}
              expandOpts={expandOpts}
              speciesBg={speciesBg}
            />
          </>
        )}
        <div className="field">
          <p className="control">
            {!isLoading && (
              <button
                type="button"
                className="button is-success"
                onClick={handleSubmit}
                disabled={!isEditable}
              >
                {i18n.t('analysis.top-anat.submit-job')}
              </button>
            )}
            {searchInfo && searchInfo.isRunning && (
              <button
                type="button"
                className="button is-primary"
                onClick={handleSubmit}
                disabled={!isEditable}
              >
                {i18n.t('analysis.top-anat.cancel-job')}
              </button>
            )}
          </p>
        </div>
        <TopAnatBanner searchInfo={searchInfo} />
      </Bulma.Section>
      {searchInfo && Array.isArray(searchInfo.data) && (
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
          key={id}
          data={searchInfo.data}
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
      )}
    </div>
  );
};

export default TopAnat;
