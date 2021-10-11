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
const TIMEOUT_NOTIF = 3000;

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
  const {
    form: {
      data,
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
    notifications: { value: notif, setNotif, closeNotif },
    searchInfo: { value: searchInfo, setSearchInfo },
    expandOpts: { value: expandOpts, setExpandOpts },
    fgData: { value: fgData },
    bgData: { value: bgData },
    canSearch,
    species: { speciesBg, setSpeciesBgTrue, setSpeciesBgFalse },
  } = useTopAnat();

  React.useEffect(() => {
    let timeoutPointer;
    if (bgData) {
      const uuid = Math.random().toString(10);
      const message =
        fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
          ? 'Foreground/background species are identical.'
          : 'Foreground and background species differ. You can either change your background or the default one will be used.';
      const status =
        fgData.fg_list.selectedSpecies === bgData.bg_list.selectedSpecies
          ? 'success'
          : 'danger';
      setNotif((prev) => {
        const curr = [...prev];
        curr.push({
          id: uuid,
          children: <p>{message}</p>,
          className: `is-${status}`,
        });
        return curr;
      });
      timeoutPointer = setTimeout(() => {
        closeNotif(uuid)();
      }, TIMEOUT_NOTIF);
    }
    return () => {
      if (timeoutPointer) clearTimeout(timeoutPointer);
    };
  }, [fgData, bgData]);

  const { id, jobId } = useParams();
  const history = useHistory();

  const getJobStatus = React.useCallback((ID, jobID) => {
    api.topAnat.getStatus(ID, jobID).then((r) => {
      if (r.data.jobResponse.jobStatus === 'RUNNING') {
        getJobStatusTimeOut = setTimeout(() => getJobStatus(ID, jobID), 2000);
        setSearchInfo({ isRunning: true, jobId: r.data.jobResponse.jobId });
      } else {
        history.push(
          PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(':id', r.data.jobResponse.data)
        );
      }
    });
  }, []);
  const getResults = React.useCallback((ID) => {
    api.topAnat.getResults(ID).then((r) => {
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
    } else if (id && jobId) {
      getJobStatus(id, jobId);
    } else {
      // reset fg data, bgData, etc.
      setIsEditable(true);
      resetForm();
    }
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
  const customHeader = React.useCallback(
    (searchElement, pageSizeElement, showEntriesText) => (
      <Bulma.Columns vCentered>
        <Bulma.C size={4}>
          <div className="is-flex is-flex-direction-column">
            <p>{i18n.t('analysis.top-anat.view')}</p>
            {searchInfo.results.map((r, key) => (
              <a key={r.zipFile} href={r.zipFile} className="internal-link">
                {`result ${key}`}
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
            {/* <div className="control"> */}
            {/*  <a className="button"> */}
            {/*    <span>{searchInfo?.data.length}</span> */}
            {/*    <span className="icon is-small"> */}
            {/*      <ion-icon name="download-outline" /> */}
            {/*    </span> */}
            {/*  </a> */}
            {/* </div> */}
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
    [searchInfo]
  );

  const isLoading =
    searchInfo && !searchInfo?.isRunning && searchInfo?.isLoading;
  return (
    <div>
      <Bulma.Section className="py-0">
        {staticBuilder(staticContent)}
        {!isLoading && (
          <>
            <div className="my-4 is-flex">
              <div>
                <div className="buttons has-addons">
                  <button
                    className="button is-bgee-link is-outlined"
                    type="button"
                  >
                    <Bulma.IonIcon name="list-outline" />
                    <span>{i18n.t('analysis.top-anat.recent-jobs')}</span>
                  </button>
                  <Link
                    to={PATHS.SUPPORT.TOP_ANAT}
                    className="button is-bgee-link is-outlined"
                  >
                    <Bulma.IonIcon name="newspaper-outline" />
                    <span>{i18n.t('analysis.top-anat.documentation')}</span>
                  </Link>
                </div>
              </div>
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
            <div className="field">
              <p className="control">
                <button
                  type="button"
                  className="button is-success"
                  onClick={handleSubmit}
                  disabled={!canSearch}
                >
                  {i18n.t('analysis.top-anat.submit-job')}
                </button>
                {searchInfo && searchInfo.isRunning && (
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={handleSubmit}
                    disabled={!canSearch}
                  >
                    {i18n.t('analysis.top-anat.cancel-job')}
                  </button>
                )}
              </p>
            </div>
          </>
        )}
        <TopAnatBanner searchInfo={searchInfo} />
      </Bulma.Section>
      <Notifications content={notif} closeElement={closeNotif} />
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
