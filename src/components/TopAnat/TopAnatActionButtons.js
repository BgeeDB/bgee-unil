import React from 'react';
import i18n from '../../i18n';
import { TOP_ANAT_STATUS } from '../../helpers/constants/topAnat';

const TopAnatActionButtons = ({
  status,
  handleSubmit,
  cancelJob,
  startNewJob,
}) => {
  if (status === TOP_ANAT_STATUS.LOADING)
    return (
      <div className="field">
        <p className="control">
          <button
            type="button"
            className="button is-danger"
            onClick={cancelJob}
          >
            {i18n.t('analysis.top-anat.cancel-job')}
          </button>
        </p>
      </div>
    );
  if (status === TOP_ANAT_STATUS.RESULTS)
    return (
      <div className="field">
        <p className="control">
          <button
            type="button"
            className="button is-info"
            onClick={startNewJob}
          >
            {i18n.t('analysis.top-anat.start-new-job')}
          </button>
        </p>
      </div>
    );
  if (status === TOP_ANAT_STATUS.NEW_SEARCH)
    return (
      <div className="field">
        <p className="control">
          <button
            type="button"
            className="button is-success"
            onClick={handleSubmit}
          >
            {i18n.t('analysis.top-anat.submit-job')}
          </button>
        </p>
      </div>
    );
  return null;
};

export default TopAnatActionButtons;
