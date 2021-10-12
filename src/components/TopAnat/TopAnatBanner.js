import React from 'react';
import Bulma from '../Bulma';

const TopAnatBanner = ({ searchInfo }) => {
  if (searchInfo && searchInfo.waitingResponse) {
    return (
      <Bulma.Notification color="warning" className="mt-5">
        <progress
          className="progress is-small"
          max="100"
          style={{ animationDuration: '3s', marginBottom: 12 }}
        >
          80%
        </progress>

        <p>
          Processing job, waiting for a job id. Please stand by until the job is
          started, or until results are retrieved, if they already exist on our
          server (in that case, we won&apos;t send you a notification email, if
          you provided your address)
        </p>
      </Bulma.Notification>
    );
  }
  if (searchInfo && searchInfo.isRunning) {
    return (
      <Bulma.Notification color="warning" className="mt-5">
        <progress
          className="progress is-small"
          max="100"
          style={{ animationDuration: '3s', marginBottom: 12 }}
        >
          80%
        </progress>

        <p>
          After bookmarking this page, it is safe to close this window. Your
          analysis is being run on our server, and the results will appear as
          soon as available. Please note that the results can be slow to
          compute, typically from 5 to 30 minutes, depending on the amount of
          data to process. It is not necessary to refresh this page, it will be
          automatically updated.
        </p>
        <p className="mt-2">Job is running - Job ID: {searchInfo.jobId}</p>
      </Bulma.Notification>
    );
  }
  if (searchInfo && !searchInfo.isRunning) {
    if (searchInfo.isLoading)
      return (
        <Bulma.Notification color="info" className="mt-5">
          <p className="has-text-centered">Loading</p>
          <progress
            className="progress is-small"
            max="100"
            style={{ animationDuration: '3s', marginBottom: 12 }}
          >
            80%
          </progress>
        </Bulma.Notification>
      );
    const nbRecords = searchInfo.results.reduce(
      (acc, analysis) => acc + analysis.results.length,
      0
    );
    const nbAnalysis = searchInfo.results.length + 1;
    const nbAnalysisSuccess = 0;
    return (
      <Bulma.Notification color="info" className="my-5">
        <p>
          {`TopAnat request successful. Found ${nbRecords} record${
            nbRecords > 1 ? 's' : ''
          }, from ${nbAnalysisSuccess} analyse${
            nbAnalysisSuccess > 1 ? 's' : ''
          } with results, over ${nbAnalysis} analyse${
            nbAnalysis > 1 ? 's' : ''
          } launched.`}
        </p>
      </Bulma.Notification>
    );
  }
  return null;
};

export default TopAnatBanner;
