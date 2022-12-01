import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Bulma from '../../../../components/Bulma';
import Table from '../../../../components/Table';
import useLogic from './useLogic';

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

      <div>
        <div>
          <Bulma.Title className="has-text-centered">
            {data.experiment.name}
          </Bulma.Title>
        </div>

        <div className="mt-6 mb-5 near-columns">
          <div>
            <span className="has-text-weight-semibold">Experiment ID:</span>
            &nbsp;
            <span>{data.experiment.id}</span>
          </div>
          <div>
            <span className="has-text-weight-semibold">Technology:</span>
            &nbsp;
            <span>{data.dataType}</span>
          </div>
          <div>
            <span className="has-text-weight-semibold">
              Experiment description:
            </span>
            &nbsp;
            <span>{data.experiment.description}</span>
          </div>
        </div>

        <Table
          pagination
          columns={columns}
          data={data.assays}
          onRenderCell={onRenderCell}
          onFilter={onFilter}
          customHeader={customHeader}
        />
      </div>
    </>
  );
};

export default Experiment;
