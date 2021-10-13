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
  TOP_ANAT_STATUS,
} from '../helpers/constants/topAnat';

let timeoutFg;
let timeoutBg;

const useTopAnat = (status) => {
  const { addNotification } = React.useContext(NotificationContext);
  const [requestParameters, setRP] = React.useState(TOP_ANAT_DEFAULT_RP);
  const [results, setResults] = React.useState();

  const history = useHistory();
  const onSubmit = React.useCallback((data) => {
    const formattedData = data; // to format for api
    setResults({ loading: true });
    api.topAnat.runJob(formattedData).then((res) => {
      history.push(
        PATHS.ANALYSIS[
          res.data.jobResponse.jobStatus === 'RUNNING'
            ? 'TOP_ANAT_RESULT_JOB_ID'
            : 'TOP_ANAT_RESULT'
        ]
          .replace(':id', res.data.jobResponse.data)
          .replace(':jobId', res.data.jobResponse.jobId)
      );
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
      if (status !== TOP_ANAT_STATUS.NEW_SEARCH) return;
      if (timeoutFg) clearTimeout(timeoutFg);
      if (e.target.value !== '') {
        timeoutFg = setTimeout(() => {
          api.topAnat
            .autoCompleteForegroundGenes(e.target.value, 'fg')
            .then((r) => {
              propsForm.handleChange('genesBg', () => '')();
              propsForm.handleChange('rnaSeq', () => true)();
              propsForm.handleChange('affymetrix', () => true)();
              propsForm.handleChange('inSitu', () => true)();
              propsForm.handleChange('est', () => true)();
              setRP((prev) => ({
                ...prev,
                fg: {
                  list: r.data.fg_list,
                  message: r.message,
                },
                bg: null,
                customBg: false,
              }));
            });
        }, 1000);
      } else
        setRP((prev) => ({ ...prev, fg: null, bg: null, customBg: false }));
    },
    [dataForm, propsForm, status]
  );
  const backgroundHandler = React.useCallback(
    (e) => {
      propsForm.handleChange('genesBg')(e);
      if (status !== TOP_ANAT_STATUS.NEW_SEARCH) return;
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
            .autoCompleteForegroundGenes(e.target.value, 'bg')
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
            });
        }, 1000);
      }
    },
    [dataForm, requestParameters, status]
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

  const cancelJob = React.useCallback(() =>
    // todo api cancel job
    // todo go back to new form with rp as data
    {}, []);
  const startNewJob = React.useCallback(() => {
    history.push(PATHS.ANALYSIS.TOP_ANAT, {
      form: dataForm,
      requestParameters,
    });
  }, [dataForm, requestParameters]);
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
