import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/geneExpCalls';
import useAnchorAtMount from '../../hooks/usAnchorAtMount';

const GeneExpressionCalls = () => {
  useAnchorAtMount();

  return <div className="container">{staticBuilder(json)}</div>;
};

export default GeneExpressionCalls;
