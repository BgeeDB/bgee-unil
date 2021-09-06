import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/about/publications';

const Publications = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default Publications;
