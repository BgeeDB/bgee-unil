import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';
import json from '../../static/resources/sparql';

const Sparql = () => (
  <div className="container mt-5">{staticBuilder(json)}</div>
);

export default Sparql;
