import React from 'react';
import Table from '../../../../components/Table';
import useLogic from './useLogic';

const Experiment = () => {
  const { data, columns, onRenderCell } = useLogic();

  if (!data) {
    return null;
  }

  return (
    <div>
      <div>
        <div>Experiment ID: {data.experiment.id}</div>
        <div>Technology: {data.dataType}</div>
        <div>Experiment description: {data.experiment.description}</div>
      </div>

      <Table
        pagination
        columns={columns}
        data={data.assays}
        onRenderCell={onRenderCell}
      />
    </div>
  );
};

export default Experiment;
