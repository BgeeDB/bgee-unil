import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Bulma from '../../../../components/Bulma';
import Table from '../../../../components/Table';
import useLogic from './useLogic';
import './ExperimentStyles.scss';

const Experiment = () => {
  const { data, columns, onRenderCell, onFilter } = useLogic();

  const customHeader = useCallback(
    (searchElement, pageSizeElement) => (
      <Bulma.Columns vCentered className="mt-5">
        <Bulma.C size={6}>
          <div className="field has-addons">{searchElement}</div>
        </Bulma.C>
        <Bulma.C size={6}>
          <div>{pageSizeElement}</div>
        </Bulma.C>
      </Bulma.Columns>
    ),
    []
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{data.experiment.name}</title>
        <meta name="description" content={data.experiment.description} />
        <meta
          name="keywords"
          content={`experiment,${data.experiment.id}, ${data.experiment.name}`}
        />
      </Helmet>

      <div className="experimentPage">
        <div>
          <Bulma.Title className="has-text-centered">
            {data.experiment.name}
          </Bulma.Title>
        </div>

        <div className="is-flex is-justify-content-center	">
          <div className="mt-6 mb-5 near-columns is-flex encartTop">
            <div className="is-flex is-flex-direction-column mr-2">
              <span className="has-text-weight-semibold my-1">
                Experiment&nbsp;ID:
              </span>
              <span className="has-text-weight-semibold my-1">Technology:</span>
              <span className="has-text-weight-semibold my-1">
                Experiment&nbsp;description:
              </span>
            </div>
            <div className="is-flex is-flex-direction-column">
              <span className="my-1">{data.experiment.id}</span>
              <span className="my-1">{data.dataType}</span>
              <span className="my-1">{data.experiment.description}</span>
              <div className="is-flex is-justify-content-flex-end">
                <Bulma.Button
                  className="download-btn is-small mt-2"
                  // href={hreflinkfromAPI} @todo
                  renderAs="a"
                  target="_blank"
                  rel="noreferrer"
                >
                  Export all libraries
                  <span className="icon is-small ml-1">
                    <ion-icon name="download-outline" />
                  </span>
                </Bulma.Button>
              </div>
            </div>
          </div>
        </div>
        <Table
          pagination
          columns={columns}
          data={data.assays}
          onRenderCell={onRenderCell}
          onFilter={onFilter}
          customHeader={customHeader}
          fullwidth={false}
          minThWidth="7rem"
          classNamesTable="is-striped"
        />
      </div>
    </>
  );
};

export default Experiment;
