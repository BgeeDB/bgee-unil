/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';
import api from '../../api';
import TopAnatBanner from '../../components/TopAnat/TopAnatBanner';
import useTopAnat, { TOP_ANAT_FLOW } from '../../hooks/useTopAnat';
import TopAnatForm from '../../components/TopAnat/TopAnatForm';
import { NotificationContext } from '../../contexts/NotificationsContext';
import { addTopAnatHistory } from '../../components/TopAnat/TopAnatHistoryModal';
import TopAnatResult from '../../components/TopAnat/TopAnatResult';
import TopAnatHead from '../../components/TopAnat/TopAnatHead';
import TopAnatActionButtons from '../../components/TopAnat/TopAnatActionButtons';
import isPlural from '../../helpers/isPlural';

// todo clean timeout and cancel api call @ event
let getJobStatusTimeOut;

const TopAnat = () => {
  const history = useHistory();
  const { id, jobId } = useParams();
  const { state: pageState } = useLocation();
  const { addNotification } = React.useContext(NotificationContext);
  const [flowState, setFlowState] = React.useState(TOP_ANAT_FLOW.LOADING);

  const {
    form: {
      data,
      setData,
      handleChange,
      errors,
      foregroundHandler,
      backgroundHandler,
      checkBoxHandler,
      onSelectCustomStage,
      resetForm,
    },
    job,
    requestParameters,
    results,
    setResults,
  } = useTopAnat(flowState, setFlowState);

  const getJobStatus = React.useCallback((ID, jobID, requestParams = true) => {
    api.topAnat
      .getJob(ID, jobID, requestParams)
      .then((r) => {
        if (r.data.jobResponse.jobStatus === 'RUNNING') {
          getJobStatusTimeOut = setTimeout(
            () => getJobStatus(ID, jobID, false),
            7000
          );
          setResults({ jobId: r.data.jobResponse.jobId });
          setData((prev) => {
            let current = { ...prev };
            if (r.requestParameters) {
              current = {
                ...{
                  ...prev,
                  genes: r.requestParameters.fg_list.join('\n'),
                  genesBg: (r.requestParameters.bg_list || []).join('\n'),
                  email: '',
                  jobDescription: r.requestParameters.job_title || '',
                  stages: r.requestParameters.stage_id || 'all',
                  dataQuality: r.requestParameters.data_qual,
                  decorrelationType: r.requestParameters.decorr_type,
                  nodeSize: r.requestParameters.node_size || '',
                  nbNode: r.requestParameters.nb_node || '',
                  fdrThreshold: r.requestParameters.fdr_thr || '',
                  pValueThreshold: r.requestParameters.p_value_thr || '',
                  rnaSeq: Boolean(
                    r.requestParameters.data_type.find((f) => f === 'RNA_SEQ')
                  ),
                  affymetrix: Boolean(
                    r.requestParameters.data_type.find(
                      (f) => f === 'AFFYMETRIX'
                    )
                  ),
                  inSitu: Boolean(
                    r.requestParameters.data_type.find((f) => f === 'IN_SITU')
                  ),
                  full: Boolean(
                    r.requestParameters.data_type.find(
                      (f) => f === 'FULL_LENGTH'
                    )
                  ),
                  est: Boolean(
                    r.requestParameters.data_type.find((f) => f === 'EST')
                  ),
                },
                genes: r.requestParameters.fg_list.join('\n'),
                genesBg: (r.requestParameters.bg_list || []).join('\n'),
                email: '',
                jobDescription: r.requestParameters.job_title || '',
                stages: r.requestParameters.stage_id || 'all',
                dataQuality: r.requestParameters.data_qual,
                decorrelationType: r.requestParameters.decorr_type,
                nodeSize: r.requestParameters.node_size || '',
                nbNode: r.requestParameters.nb_node || '',
                fdrThreshold: r.requestParameters.fdr_thr || '',
                pValueThreshold: r.requestParameters.p_value_thr || '',
                rnaSeq: Boolean(
                  r.requestParameters.data_type.find((f) => f === 'RNA_SEQ')
                ),
                affymetrix: Boolean(
                  r.requestParameters.data_type.find((f) => f === 'AFFYMETRIX')
                ),
                inSitu: Boolean(
                  r.requestParameters.data_type.find((f) => f === 'IN_SITU')
                ),
                full: Boolean(
                  r.requestParameters.data_type.find((f) => f === 'FULL_LENGTH')
                ),
                est: Boolean(
                  r.requestParameters.data_type.find((f) => f === 'EST')
                ),
              };
            }
            return current;
          });
          // requestParameters.set(r.requestParameters)
          setFlowState(TOP_ANAT_FLOW.GOT_JOB);
        } else {
          history.push(
            PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(
              ':id',
              r.data.jobResponse.data
            )
          );
        }
      })
      .catch((err) => {
        console.debug('[ERROR] api.topAnat.getResults(%s)', ID, err);
        setFlowState(TOP_ANAT_FLOW.ERROR_GET_JOB);
      });
  }, []);
  const getResults = React.useCallback((ID) => {
    // use display_rp=1 in params to get requestParameters
    api.topAnat
      .getResults(ID)
      .then((res) => {
        const rp = res.requestParameters;
        addTopAnatHistory(
          ID,
          res.data.fg_list.selectedSpecies,
          res.data.fg_list.detectedSpecies[res.data.fg_list.selectedSpecies]
            .name,
          res.requestParameters.job_title
        );
        setData((prev) => ({
          ...prev,
          genes: rp.fg_list.join('\n'),
          genesBg: (rp.bg_list || []).join('\n'),
          email: '',
          jobDescription: rp.job_title || '',
          stages: rp.stage_Id || 'all',
          dataQuality: rp.data_qual,
          decorrelationType: rp.decorr_type,
          nodeSize: rp.node_size || '',
          nbNode: rp.nb_node || '',
          fdrThreshold: rp.fdr_thr || '',
          pValueThreshold: rp.p_value_thr || '',
          rnaSeq: Boolean(rp.data_type.find((f) => f === 'RNA_SEQ')),
          full: Boolean(rp.data_type.find((f) => f === 'FULL_LENGTH')),
          affymetrix: Boolean(rp.data_type.find((f) => f === 'AFFYMETRIX')),
          inSitu: Boolean(rp.data_type.find((f) => f === 'IN_SITU')),
          est: Boolean(rp.data_type.find((f) => f === 'EST')),
        }));
        requestParameters.set((prev) => {
          const curr = JSON.parse(JSON.stringify(prev));

          curr.fg = {
            list: res.data.fg_list,
            message: `${rp.fg_list.length} IDs provided, ${
              res.data.fg_list.geneCount[res.data.fg_list.selectedSpecies]
            } unique gene${isPlural(
              'gene',
              res.data.fg_list.geneCount[res.data.fg_list.selectedSpecies]
            )} found in ${
              res.data.fg_list.detectedSpecies[res.data.fg_list.selectedSpecies]
                .name
            }`,
          };
          if (rp.bg_list) curr.customBg = true;
          if (res.data.bg_list)
            curr.bg = res.data.bg_list
              ? {
                  list: res.data.bg_list,
                  message: `${rp.bg_list.length} IDs provided, ${
                    res.data.bg_list.geneCount[res.data.bg_list.selectedSpecies]
                  } unique ${isPlural(
                    'gene',
                    res.data.bg_list.geneCount[res.data.bg_list.selectedSpecies]
                  )} found in ${
                    res.data.bg_list.detectedSpecies[
                      res.data.bg_list.selectedSpecies
                    ].name
                  }`,
                }
              : null;
          return curr;
        });
        setResults({
          analysis: res.data.topAnatResults,
          data: res.data.topAnatResults.reduce(
            (acc, a) => [...acc, ...a.results],
            []
          ),
        });
        setFlowState(TOP_ANAT_FLOW.GOT_RESULTS);
      })
      .catch((err) => {
        console.debug('[ERROR] api.topAnat.getResults(%s)', ID, err);
        setFlowState(TOP_ANAT_FLOW.ERROR_GET_RESULTS);
      });
  }, []);

  React.useEffect(() => {
    if (flowState === TOP_ANAT_FLOW.NEW_JOB && requestParameters.bg) {
      addNotification({
        id: Math.random().toString(10),
        children: (
          <p>
            {requestParameters.fg.list.selectedSpecies ===
            requestParameters.bg.list.selectedSpecies
              ? 'Foreground/background species are identical.'
              : 'Foreground and background species differ. You can either change your background or the default one will be used.'}
          </p>
        ),
        className: `is-${
          requestParameters.fg.list.selectedSpecies ===
          requestParameters.bg.list.selectedSpecies
            ? 'success'
            : 'danger'
        }`,
      });
    }
  }, [requestParameters, flowState]);
  /*
   * Effect @ url change
   */
  React.useEffect(() => {
    if (getJobStatusTimeOut) clearTimeout(getJobStatusTimeOut);

    resetForm();
    if (!id && !jobId && pageState?.form && pageState?.requestParameters) {
      setData(pageState.form);
      requestParameters.set(pageState.requestParameters);
    }

    if (id && !jobId) {
      setFlowState(TOP_ANAT_FLOW.GETTING_RESULTS);
      getResults(id);
    } else if (id && jobId) {
      setFlowState(TOP_ANAT_FLOW.GETTING_JOB);
      getJobStatus(id, jobId);
    } else {
      setFlowState(TOP_ANAT_FLOW.NEW_JOB);
    }
  }, [id, jobId, pageState]);

  return (
    <>
      <Bulma.Section className="py-0">
        <TopAnatHead />
        <TopAnatForm
          status={flowState}
          form={{ handleChange, data, errors }}
          requestParameters={requestParameters.value}
          handlers={{
            foregroundHandler,
            backgroundHandler,
            setRP: requestParameters.set,
            onSelectCustomStage,
            checkBoxHandler,
          }}
        />
        <TopAnatActionButtons
          status={flowState}
          handleSubmit={job.submit}
          jobId={jobId}
          cancelJob={job.cancel(jobId)}
          startNewJob={job.startNew}
        />
        <TopAnatBanner results={results} status={flowState} />
      </Bulma.Section>

      <TopAnatResult
        status={flowState}
        results={results}
        searchId={id}
        fg={requestParameters.value.fg}
      />
    </>
  );
};

export default TopAnat;
