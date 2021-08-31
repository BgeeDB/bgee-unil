import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/support/geneExpCalls';

const GeneExpressionCalls = () => (
  <div className="container">{staticBuilder(json)}</div>
);

export default GeneExpressionCalls;
