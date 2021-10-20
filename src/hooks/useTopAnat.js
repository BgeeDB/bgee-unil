import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import useForm from './useForm';
import array from '../helpers/array';
import PATHS from '../routes/paths';
import { NotificationContext } from '../contexts/NotificationsContext';
import {
  TOP_ANAT_DEFAULT_RP,
  TOP_ANAT_FORM_CONFIG,
} from '../helpers/constants/topAnat';

let timeoutFg;
let timeoutBg;
// todo handle timeout + api cancel

export const TOP_ANAT_FLOW = {
  LOADING: 'loading',
  NEW_JOB: 'newJob',
  LAUNCHING_JOB: 'launchingJob',
  ERROR_LAUNCH_JOB: 'errorLaunchJob',
  GETTING_JOB: 'gettingJob',
  ERROR_GET_JOB: 'errorGetJob',
  GOT_JOB: 'gotJob',
  GETTING_RESULTS: 'gettingResults',
  ERROR_GET_RESULTS: 'errorGetResults',
  GOT_RESULTS: 'gotResults',
};

// todo improve with context usage
const useTopAnat = (flowState, setFlowState) => {
  const { addNotification } = React.useContext(NotificationContext);
  const [requestParameters, setRP] = React.useState(TOP_ANAT_DEFAULT_RP);
  const [results, setResults] = React.useState();

  const history = useHistory();
  const onSubmit = React.useCallback((data) => {
    setFlowState(TOP_ANAT_FLOW.LAUNCHING_JOB);
    api.topAnat
      .runJob(data)
      .then((res) => {
        history.push(
          PATHS.ANALYSIS[
            res.data.jobResponse.jobStatus === 'RUNNING'
              ? 'TOP_ANAT_RESULT_JOB_ID'
              : 'TOP_ANAT_RESULT'
          ]
            .replace(':id', res.data.jobResponse.data)
            .replace(':jobId', res.data.jobResponse.jobId)
        );
      })
      .catch((err) => {
        console.debug('[ERROR] api.topAnat.runJob', data, err);
        setFlowState(TOP_ANAT_FLOW.ERROR_LAUNCH_JOB);
      });
  }, []);

  const {
    data: dataForm,
    handleSubmit: submitJob,
    reset,
    ...propsForm
  } = useForm({
    ...TOP_ANAT_FORM_CONFIG,
    onSubmit,
  });

  const foregroundHandler = React.useCallback(
    (e) => {
      propsForm.handleChange('genes')(e);
      if (flowState !== TOP_ANAT_FLOW.NEW_JOB) return;
      if (timeoutFg) clearTimeout(timeoutFg);
      if (e.target.value !== '') {
        timeoutFg = setTimeout(() => {
          api.topAnat
            .autoCompleteGenes(e.target.value)
            .then((r) => {
              propsForm.handleChange('genesBg', () => '')();
              propsForm.handleChange('rnaSeq', () => true)();
              propsForm.handleChange('affymetrix', () => true)();
              propsForm.handleChange('inSitu', () => true)();
              propsForm.handleChange('est', () => true)();
              setRP((prev) => ({
                ...(prev || {}),
                fg: {
                  list: r.data.fg_list,
                  message: r.message,
                },
                bg: null,
                customBg: false,
              }));
            })
            .catch((err) => {
              console.debug('[ERROR] api.topAnat.autoComplete', err);
            });
        }, 1000);
      } else
        setRP((prev) => ({ ...prev, fg: null, bg: null, customBg: false }));
    },
    [dataForm, propsForm, flowState]
  );
  const backgroundHandler = React.useCallback(
    (e) => {
      propsForm.handleChange('genesBg')(e);
      if (flowState !== TOP_ANAT_FLOW.NEW_JOB) return;
      const bg = e.target.value.split('\n');
      const fg = dataForm.genes.split('\n');

      if (timeoutBg) clearTimeout(timeoutBg);
      if (!array.equals(fg, bg)) {
        timeoutBg = setTimeout(
          () =>
            addNotification({
              id: Math.random().toString(10),
              children: (
                <p>Gene list contains genes not found in background genes.</p>
              ),
              className: `is-danger`,
            }),
          2000
        );
      }
      if (e.target.value !== '' && array.equals(fg, bg)) {
        timeoutBg = setTimeout(() => {
          api.topAnat
            .autoCompleteGenes(e.target.value, false)
            .then((r) => {
              if (
                r.data.fg_list.selectedSpecies !==
                requestParameters.fg.list.selectedSpecies
              ) {
                addNotification({
                  id: Math.random().toString(10),
                  children: (
                    <p>
                      Foreground and background species differ. You can either
                      change your background or the default one will be used.
                    </p>
                  ),
                  className: `is-danger`,
                });
              }
              setRP((prev) => ({
                ...prev,
                bg: {
                  list: r.data.bg_list,
                  message: r.message,
                },
              }));
            })
            .catch((err) => {
              console.debug('[ERROR] api.topAnat.autoComplete', err);
            });
        }, 1000);
      }
    },
    [dataForm, requestParameters, flowState]
  );
  const checkBoxHandler = React.useCallback(
    (key) => (e) =>
      propsForm.handleChange(key, (event) => event.target.checked)(e),
    []
  );
  const onSelectCustomStage = React.useCallback(
    (id) => (e) => {
      if (!requestParameters) {
        addNotification({
          id: Math.random().toString(10),
          children: <p>No species detected from gene list</p>,
          className: `is-warning`,
        });
        return;
      }
      if (id) {
        const tmp = [...dataForm.stages];
        if (e.target.checked) {
          tmp.push(id);
        } else {
          // remove
          tmp.splice(
            tmp.findIndex((a) => a === id),
            1
          );
        }
        propsForm.handleChange('stages', () => tmp)();
      } else {
        propsForm.handleChange('stages', () =>
          e === 'all'
            ? 'all'
            : requestParameters.fg.list.stages.map((s) => s.id)
        )();
      }
    },
    [dataForm, requestParameters]
  );

  const cancelJob = React.useCallback(
    (jobId) => () => {
      if (jobId) {
        api.topAnat
          .cancelJob(jobId)
          .then((res) => {
            addNotification({
              id: Math.random().toString(10),
              children: res.message,
              className: 'is-success',
            });
            history.push(PATHS.ANALYSIS.TOP_ANAT, {
              form: dataForm,
              requestParameters,
            });
          })
          .catch((err) => {
            console.debug('[ERROR] api.topAnat.cancelJob(%s)', jobId, err);
            history.push(PATHS.ANALYSIS.TOP_ANAT);
          });
      }
    },
    [dataForm, requestParameters]
  );
  const startNewJob = React.useCallback(
    (newJob) => () => {
      history.push(PATHS.ANALYSIS.TOP_ANAT, {
        form: newJob ? undefined : dataForm,
        requestParameters,
      });
    },
    [dataForm, requestParameters]
  );
  const resetForm = React.useCallback(() => {
    setRP(TOP_ANAT_DEFAULT_RP);
    setResults();
    reset();
  }, []);

  return {
    form: {
      ...propsForm,
      data: dataForm,
      foregroundHandler,
      backgroundHandler,
      checkBoxHandler,
      onSelectCustomStage,
      resetForm,
    },
    job: {
      submit: submitJob,
      cancel: cancelJob,
      startNew: startNewJob,
    },
    results,
    setResults,
    requestParameters: {
      value: requestParameters,
      set: setRP,
    },
  };
};

export default useTopAnat;
