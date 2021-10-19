/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import PATHS from '../../routes/paths';
import Bulma from '../../components/Bulma';
import api from '../../api';
import TopAnatBanner from '../../components/TopAnat/TopAnatBanner';
import useTopAnat from '../../hooks/useTopAnat';
import TopAnatForm from '../../components/TopAnat/TopAnatForm';
import { NotificationContext } from '../../contexts/NotificationsContext';
import { addTopAnatHistory } from '../../components/TopAnat/TopAnatHistoryModal';
import TopAnatResult from '../../components/TopAnat/TopAnatResult';
import TopAnatHead from '../../components/TopAnat/TopAnatHead';
import TopAnatActionButtons from '../../components/TopAnat/TopAnatActionButtons';
import { TOP_ANAT_STATUS } from '../../helpers/constants/topAnat';
import isPlural from '../../helpers/isPlural';

let getJobStatusTimeOut;

const TopAnat = () => {
  const { state: pageState } = useLocation();
  const { id, jobId } = useParams();
  const PAGE_STATE = React.useMemo(() => {
    if (id && jobId) return TOP_ANAT_STATUS.LOADING;
    if (id) return TOP_ANAT_STATUS.RESULTS;
    return TOP_ANAT_STATUS.NEW_SEARCH;
  }, [id, jobId]);
  const history = useHistory();
  const { addNotification } = React.useContext(NotificationContext);
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
  } = useTopAnat(PAGE_STATE);

  React.useEffect(() => {
    if (PAGE_STATE === TOP_ANAT_STATUS.NEW_SEARCH && requestParameters.bg) {
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
  }, [requestParameters, PAGE_STATE]);

  const getJobStatus = React.useCallback((ID, jobID) => {
    api.topAnat.getStatus(ID, jobID).then((r) => {
      if (r.data.jobResponse.jobStatus === 'RUNNING') {
        getJobStatusTimeOut = setTimeout(() => getJobStatus(ID, jobID), 3000);
        setResults({ jobId: r.data.jobResponse.jobId });
      } else {
        setResults({ loading: true });
        history.push(
          PATHS.ANALYSIS.TOP_ANAT_RESULT.replace(':id', r.data.jobResponse.data)
        );
      }
    });
  }, []);
  const getResults = React.useCallback((ID) => {
    // use display_rp=1 in params to get requestParameters
    api.topAnat.getResults(ID).then((res) => {
      const rp = res.requestParameters;
      addTopAnatHistory(
        ID,
        res.data.fg_list.selectedSpecies,
        res.data.fg_list.detectedSpecies[res.data.fg_list.selectedSpecies].name,
        res.requestParameters.job_title
      );
      setData((prev) => ({
        ...prev,
        genes: rp.fg_list.join('\n'),
        genesBg: (rp.bg_list || []).join('\n'),
        email: '',
        jobDescription: rp.job_title || '',
        stages: 'all',
        dataQuality: rp.data_qual,
        decorrelationType: rp.decorr_type,
        nodeSize: rp.node_size || '',
        nbNode: rp.nb_node || '',
        fdrThreshold: rp.fdr_thr || '',
        pValueThreshold: rp.p_value_thr || '',
        rnaSeq: rp.data_type.find((f) => f === 'RNA_SEQ'),
        affymetrix: rp.data_type.find((f) => f === 'AFFYMETRIX'),
        inSitu: rp.data_type.find((f) => f === 'IN_SITU'),
        est: rp.data_type.find((f) => f === 'EST'),
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
      // todo set form + fg & bg data
    });
  }, []);

  React.useEffect(() => {
    if (getJobStatusTimeOut) clearTimeout(getJobStatusTimeOut);

    resetForm();
    if (!id && !jobId && pageState?.form && pageState?.requestParameters) {
      setData(pageState.form);
      requestParameters.set(pageState.requestParameters);
    }

    if (id && !jobId) {
      setResults({ loading: true });
      getResults(id);
    } else if (id && jobId) {
      setResults({ loading: true });
      getJobStatus(id, jobId);
    }
  }, [id, jobId, pageState]);

  return (
    <>
      <Bulma.Section className="py-0">
        <TopAnatHead />
        <TopAnatForm
          status={PAGE_STATE}
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
          status={PAGE_STATE}
          handleSubmit={job.submit}
          cancelJob={job.cancel}
          startNewJob={job.startNew}
        />
        <TopAnatBanner results={results} status={PAGE_STATE} />
      </Bulma.Section>
      {}
      <TopAnatResult
        status={PAGE_STATE}
        results={results}
        searchId={id}
        fg={requestParameters.value.fg}
      />
    </>
  );
};

export default TopAnat;
