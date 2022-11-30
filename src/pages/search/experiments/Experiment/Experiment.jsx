import React from 'react';
import { useParams } from 'react-router-dom';

const Experiment = () => {
  const { id: experimentId } = useParams();

  return <div>Experiment {experimentId} infos</div>;
};

export default Experiment;
